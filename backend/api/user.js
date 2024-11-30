const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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' // Replace with your SendGrid API key
    }
}));


const handleUserAction = async ({
    connection, action, method, body, response,
}) => {
    if (action === "signup" && method === "POST") {
        try {
            const { userName, email, password, location } = JSON.parse(body);

            const userRes = await connection.promise().query(
                'INSERT INTO Customers (Username, Email, Password, Location) VALUES (?, ?, ?, ?)',
                [userName, email, password, location] // Passing all 4 values
            );

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                customerId: userRes[0]?.insertId,
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

    } else if (action === "signin" && method === "POST") {
        try {
            const { userName, password } = JSON.parse(body);
            const [rows] = await connection.promise().query(
                'SELECT * FROM Customers WHERE Username = ? AND Password = ?',
                [userName, password]
            );

            if (rows.length > 0) {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: true,
                    customerId: rows[0].CustomerID, //  ID is the primary key for the Customers table
                }));
                response.end();
            } else {
                response.writeHead(401, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: false,
                }));
                response.end();
            }
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    }



    else if (action === "update" && method === "POST") {
        try {
            const { customerId, userName, email, pw, location } = JSON.parse(body);

            // Start constructing the query
            let updateQuery = 'UPDATE Customers SET ';
            let updateValues = [];

            // Add fields to be updated dynamically
            if (userName) {
                updateQuery += 'Username = ?, ';
                updateValues.push(userName);
            }

            if (email) {
                updateQuery += 'Email = ?, ';
                updateValues.push(email);
            }

            if (pw) {
                updateQuery += 'Password = ?, ';
                updateValues.push(pw);
            }

            if (location) {
                updateQuery += 'Location = ?, ';
                updateValues.push(location);
            }

            // Remove the trailing comma and space from the query
            updateQuery = updateQuery.slice(0, -2);

            // Add the WHERE clause with the customerId
            updateQuery += ' WHERE customerId = ?';
            updateValues.push(customerId);

            // Execute the query
            const updateRes = await connection.promise().query(updateQuery, updateValues);

            // Send a success response
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: updateRes[0].affectedRows > 0,
            }));
            response.end();
        } catch (e) {
            // Handle any errors
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                error: e.message || e,
            }));
            response.end();
        }
    }

    else if (action === "forgotpassword" && method === "POST") {
        try {
            const { email } = JSON.parse(body);
            if (!email) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "Email is required" }));
                response.end();
                return;
            }

            // Generate a unique token
            const token = crypto.randomBytes(10).toString('hex');

            const [results] = await connection.promise().query('SELECT CustomerID FROM Customers WHERE Email = ?', [email]);

            if (results.length > 0) {
                const customerID = results[0].CustomerID;

                // Store the token with an expiration time 
                await connection.promise().query('INSERT INTO PasswordResetTokens (Token, CustomerID, CreatedAt) VALUES (?, ?, NOW())', [token, customerID]);

                const mailOptions = {
                    from: 'granddessertpalace@gmail.com',
                    to: email,
                    subject: 'Password Reset Token',
                    text: `You requested a password reset. Your token is: ${token}`
                };

                await transporter.sendMail(mailOptions);
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: true, message: "Reset token sent to your email " }));
                response.end();
            } else {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "No user found with that email" }));
                response.end();
            }
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, e }));
            response.end();
        }

    } else if (action === "resetpassword" && method === "POST") {
        try {
            const { token, newPassword } = JSON.parse(body);
            if (!token || !newPassword) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "Token and new password are required" }));
                response.end();
                return;
            }

            const [results] = await connection.promise().query('SELECT CustomerID FROM PasswordResetTokens WHERE Token = ? AND CreatedAt > NOW() - INTERVAL 1 HOUR', [token]);

            if (results.length > 0) {
                const customerID = results[0].CustomerID;
                await connection.promise().query('UPDATE Customers SET Password = ? WHERE CustomerID = ?', [newPassword, customerID]);
                await connection.promise().query('DELETE FROM PasswordResetTokens WHERE Token = ?', [token]);

                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: true, message: "Password successfully reset please log in with your new password" }));
                response.end();
            } else {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "Invalid or expired token" }));
                response.end();
            }
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, e }));
            response.end();
        }

    }
    else if (action === "contact" && method === "POST") {
        try {
            // Parse the request body (no need for manual parsing, it's already done in your main server)
            const { name, email, subject, message } = JSON.parse(body);

            // Validate if all required fields are provided
            if (!name || !email || !subject || !message) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: false,
                    message: "All fields (name, email, subject, message) are required."
                }));
                response.end();
                return;
            }

            // SQL query to insert the contact form data into the ContactUs table
            const query = `
                INSERT INTO ContactUs (Name, Email, Subject, Message)
                VALUES (?, ?, ?, ?)`;

            // Insert the contact form data into the database
            connection.promise().query(query, [name, email, subject, message])
                .then(() => {
                    // Respond with a success message
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.write(JSON.stringify({
                        success: true,
                        message: "Your message has been successfully submitted."
                    }));
                    response.end();
                })
                .catch((error) => {
                    // If there's a database error, respond with an error message
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.write(JSON.stringify({
                        success: false,
                        message: "Database error occurred while submitting your message.",
                        error: error.message
                    }));
                    response.end();
                });

        } catch (e) {
            // Handle invalid JSON format or other errors
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                message: "Invalid data format or missing required fields.",
                error: e.message
            }));
            response.end();
        }
    }

    else if (action === "history" && method === "GET") {
        try {
            const { customerId } = JSON.parse(body); // Assuming `customerId` is passed in the request body

            if (!customerId) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "Customer ID is required" }));
                response.end();
                return;
            }

            // SQL query to get the purchase history of the user
            const query = `
                SELECT 
                    o.OrderID, o.OrderDate, o.TotalAmount, 
                    od.Quantity, od.Price, p.ProductName, p.ImageLink
                FROM Orders o
                JOIN OrderDetails od ON o.OrderID = od.OrderID
                JOIN Products p ON od.ProductID = p.ProductID
                WHERE o.CustomerID = ?
                ORDER BY o.OrderDate DESC;
            `;

            // Execute the query
            const [results] = await connection.promise().query(query, [customerId]);

            // Return the results as the purchase history
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: true,
                history: results, // The order history data
            }));
            response.end();
        } catch (e) {
            response.writeHead(500, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                error: e.message || e,
            }));
            response.end();
        }
    }
    else if (action === "history" && method === "POST") {
        try {
            // Parse the body to get customerId
            const { customerId } = JSON.parse(body);

            if (!customerId) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "Customer ID is required" }));
                response.end();
                return;
            }

            // SQL query to get the purchase history of the user
            const query = `
                SELECT 
                    o.OrderID, o.OrderDate, o.TotalAmount, 
                    od.Quantity, od.Price, p.ProductName, p.ImageLink
                FROM Orders o
                JOIN OrderDetails od ON o.OrderID = od.OrderID
                JOIN Products p ON od.ProductID = p.ProductID
                WHERE o.CustomerID = ?
                ORDER BY o.OrderDate DESC;
            `;

            // Execute the query
            const [results] = await connection.promise().query(query, [customerId]);

            // Check if results are available
            if (results.length > 0) {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: true,
                    history: results, // The order history data
                }));
            } else {
                response.writeHead(404, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: false,
                    message: "No purchase history found for the given customer ID."
                }));
            }

            response.end();
        } catch (e) {
            response.writeHead(500, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                error: e.message || e,
            }));
            response.end();
        }
    }


    else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({}));
        response.end();
    }
    connection.end();
};

module.exports = {
    handleUserAction,
};




