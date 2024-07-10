// Import required modules
import express from "express";
import mysql from "mysql";
import cors from "cors";

// Create an instance of Express
const app = express();
const fetchAllProduceQuery = 'SELECT * FROM produce';
const addToCartQuery = 'INSERT INTO cart (produce_id, quantity) VALUES ($1, $2)';
const updateCartQuery = 'UPDATE cart SET quantity = $1 WHERE produce_id = $2';
const fetchCartQuery = 'SELECT * FROM cart';

// Middleware setup
app.use(express.json());
app.use(cors());


// Set up a MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});


// Route to test if the backend is working
app.get("/", (req, res) => {
  res.json("hello dis is backend");
});


// Route to fetch all produce items from the database
app.get("/produce", (req, res) => {
  const q = "SELECT * FROM produce";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});


// Route to add a new produce item to the database
app.post("/produce", (req, res) => {
  const q =
    "INSERT INTO produce (`name`, `price`, `description`, `image`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.price,
    req.body.description,
    req.body.image,
  ];

  db.query(q, [values], (err, result) => {
    if (err) {
      return res.json(err);
    }

    if (result.affectedRows > 0) {
      return res.json("produce has been added !!");
    } else {
      return res.json("Failed to add produce.");
    }
  });
});



// Route to add a new account to the database
app.post("/account", (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email is already in use
  const checkEmailQuery = "SELECT * FROM account WHERE email = ?";
  db.query(checkEmailQuery, [email], (checkEmailErr, existingAccount) => {
    if (checkEmailErr) {
      return res.status(500).json(checkEmailErr);
    }

    if (existingAccount.length > 0) {
      // Email is already in use
      return res.status(409).json("Email is already in use");
    }

    // Password requirements: At least 8 characters, containing at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      // Password does not meet requirements
      return res.status(400).json("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
    }

    // Password is valid, proceed to insert
    const insertAccountQuery =
      "INSERT INTO account (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [name, email, password];

    db.query(insertAccountQuery, values, (insertErr, result) => {
      if (insertErr) {
        return res.status(500).json(insertErr);
      }

      if (result.affectedRows > 0) {
        return res.json("You have successfully signed up !!");
      } else {
        return res.json("Failed to sign up");
      }
    });
  });
});


// Route to fetch all account items from the database
app.get("/account", (req, res) => {
  const q = "SELECT * FROM account";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});



// Example login route in your Express backend
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const checkLoginQuery = "SELECT * FROM account WHERE email = ? AND password = ?";
  db.query(checkLoginQuery, [email, password], (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (user.length > 0) {
      const { role } = user[0];

      if (role === 'admin') {
        // Admin login
        return res.status(200).json({ message: "Admin login successful", role: 'admin', redirect: "/produce" });
      } else {
        // User login
        return res.status(200).json({ message: "User login successful", role: 'user', redirect: "/marketplace" });
      }
    } else {
      // Invalid login, return unauthorized status
      return res.status(401).json({ error: "Invalid email or password" });
    }
  });
});



// Route to delete a produce item from the database
app.delete("/produce/:produce_id", (req, res) => {
  const produceId = req.params.produce_id; // Correct parameter name
  const q = "DELETE FROM produce WHERE produce_id = ?"; // Correct column name

  db.query(q, [produceId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Produce has been deleted successfully");
  });
});

// Route to update a produce item in the database
app.put("/produce/:produce_id", (req, res) => {
  const produceId = req.params.produce_id; // Correct parameter name
  const q =
    "UPDATE produce SET `name` = ?, `price`=?, `description`=?, `image`=? WHERE produce_id =?"; // Correct column name

  const values = [
    req.body.name,
    req.body.price,
    req.body.description,
    req.body.image,
  ];

  db.query(q, [...values, produceId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Produce has been updated successfully");
  });
})

app.listen(8800, () => {
  console.log("Connected to backend~");
});