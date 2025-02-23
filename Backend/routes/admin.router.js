const express = require("express");
const bcrypt = require("bcrypt"); // For password comparison
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const AdminModel = require("../models/admin.model"); // Assuming Admin schema exists

const adminRouter = express.Router();

// --------->>>> POST: Admin Login <<<<<---------
adminRouter.post("/login", async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    // Check if admin exists
    const admin = await AdminModel.findOne({ username: UserName });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(Password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = { adminRouter };
