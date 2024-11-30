const { generatePDF, sendEmail } = require('./utils');

const handleCartAction = async ({
    connection, action, method, body, response,
}) => {
    if (action == "get-user-carts" && method == "POST") {
        try {
            const { customerId } = JSON.parse(body);
            const getCartsRes = await connection.promise().query('SELECT * FROM CartDetails WHERE CustomerID = ?', customerId);

            const carts = getCartsRes[0];

            if (carts.length == 0) {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ carts }));
                return response.end();
            };
            const attachedProductIds = [];

            carts.forEach(cart => {
                if (!attachedProductIds.includes(cart.ProductID)) {
                    attachedProductIds.push(cart.ProductID);
                }
            });

            const productPlaceholders = attachedProductIds.map(() => '?').join(',');
            const productSql = `SELECT * FROM products WHERE ProductID IN (${productPlaceholders})`;
            const productsRes = await connection.promise().query(productSql, attachedProductIds);

            const cartsWithAttachments = carts.map(cart => {
                cart.attachedProduct = productsRes[0].find(p => p.ProductID == cart.ProductID);
                return cart;
            });

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                carts: cartsWithAttachments,
            }));
            response.end();

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }


    }
    else if (action == "get-cart-count" && method == "POST") {
        try {
            const { customerId } = JSON.parse(body);

            // Query the CartDetails table to count the items for this customer
            const getCartCountRes = await connection.promise().query(
                'SELECT COUNT(*) AS cartCount FROM CartDetails WHERE CustomerID = ?', customerId
            );

            const cartCount = getCartCountRes[0][0].cartCount;

            // Respond with the cart count
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ cartCount }));
            response.end();

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }
    }

    else if (action == "remove-from-cart" && method == "POST") {
        try {
            const { Cart } = JSON.parse(body);
            await connection.promise().query('DELETE FROM cartDetails WHERE CartDetailID = ?', [Cart]);


            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
            }));
            response.end();

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    }
    else if (action === "checkout" && method === "POST") {
        try {
            const { customerId } = JSON.parse(body);

            // Start a transaction
            await connection.promise().beginTransaction();

            // Retrieve the user's cart items
            const [carts] = await connection.promise().query('SELECT * FROM CartDetails WHERE CustomerID = ?', customerId);

            if (carts.length === 0) {
                throw new Error('Cart is empty.');
            }

            // Calculate the total amount and check stock availability
            let totalAmount = 0;
            const orderDetails = [];
            for (const cart of carts) {
                const [product] = await connection.promise().query('SELECT Price, ProductName, Stock FROM Products WHERE ProductID = ?', cart.ProductID);

                // Check if there's enough stock
                if (product[0].Stock < cart.Quantity) {
                    throw new Error(`Not enough stock for ${product[0].ProductName}. Only ${product[0].Stock} left.`);
                }

                totalAmount += product[0].Price * cart.Quantity;
                orderDetails.push({
                    ProductID: cart.ProductID,
                    ProductName: product[0].ProductName,
                    Quantity: cart.Quantity,
                    Price: product[0].Price
                });
            }

            // Insert a new order
            const [result] = await connection.promise().query(
                'INSERT INTO Orders (CustomerID, TotalAmount) VALUES (?, ?)',
                [customerId, totalAmount]
            );
            const orderId = result.insertId;

            // Insert order details
            for (const cart of carts) {
                const [product] = await connection.promise().query('SELECT Price FROM Products WHERE ProductID = ?', cart.ProductID);
                await connection.promise().query(
                    'INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)',
                    [orderId, cart.ProductID, cart.Quantity, product[0].Price]
                );

                // Update the stock for the product
                await connection.promise().query(
                    'UPDATE Products SET Stock = Stock - ? WHERE ProductID = ?',
                    [cart.Quantity, cart.ProductID]
                );
            }

            // Clear the cart
            await connection.promise().query('DELETE FROM CartDetails WHERE CustomerID = ?', customerId);

            // Get customer's email
            const [customer] = await connection.promise().query('SELECT Email, Username FROM Customers WHERE CustomerID = ?', customerId);

            console.log('customer', customer[0]);
            const cusName = customer[0].Username;

            // Commit the transaction
            await connection.promise().commit();

            // Generate PDF
            const pdfPath = await generatePDF({ OrderID: orderId, cusName, OrderDate: new Date(), TotalAmount: totalAmount }, orderDetails);

            // Send email
            await sendEmail(customer[0].Email, 'Order Confirmation', 'Dear ' + cusName + ',\n\nThank you for placing your order with Grand Desert Palace.\n\nPlease find the attached PDF document containing detailed information regarding your order.\n\nBest regards,\n[Bilal]\nGrand Desert Palace', pdfPath);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true }));
            response.end();

        } catch (e) {
            // Rollback the transaction in case of error
            await connection.promise().rollback();
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, message: e.message }));
            response.end();
        }
    }

    else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({}));
        response.end();
    };
    connection.end();
};

module.exports = {
    handleCartAction,
}