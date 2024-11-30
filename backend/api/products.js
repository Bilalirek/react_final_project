const handleProductAction = async ({ connection, action, method, body, response, url }) => {
    if (action === "all" && method === "GET") {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM Products ');
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true, products: rows }));
            response.end();
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, error: e }));
            response.end();
        }
    }


    else if (action == "add-to-cart" && method == "POST") {
        try {
            const { customerId, quantity, ProductID } = JSON.parse(body);

            // Insert the product into the cart
            await connection.promise().query('INSERT INTO cartDetails (CustomerID, ProductID, Quantity) VALUES (?, ?, ?)', [customerId, ProductID, quantity]);

            // Get the updated cart quantity for the customer
            const getCartsRes = await connection.promise().query('SELECT SUM(Quantity) AS totalQuantity FROM CartDetails WHERE CustomerID = ?', [customerId]);

            // Respond with success and the updated cart quantity
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: true,  // Indicating success
                newNumberOfItems: getCartsRes[0][0].totalQuantity
            }));
            response.end();

        } catch (e) {
            console.error("Error adding to cart:", e);  // Log error for debugging
            // Respond with failure and error message
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                message: "Failed to add product to cart.",  // Make sure the client knows something went wrong
                error: e
            }));
            response.end();
        }
    }

    else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ success: false, error: "Not Found" }));
        response.end();
    }

    connection.end();

};

module.exports = {
    handleProductAction
};