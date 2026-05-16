const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ firstName, lastName, email, password });

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, email },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // Always return 200 so we don't reveal if an email exists
    if (!user) {
      return res.status(200).json({
        message: "If that email is registered, you will receive a reset link.",
      });
    }

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save hashed token to DB (never store raw tokens)
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires in 1 hour
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // The link sent to the user contains the RAW token
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const html = `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset for your Notes App account.</p>
      <p>Click the link below to reset your password. This link expires in <strong>1 hour</strong>.</p>
      <a href="${resetURL}" style="
        display: inline-block;
        padding: 12px 24px;
        background: #4F46E5;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        margin: 16px 0;
      ">Reset My Password</a>
      <p>If you did not request this, you can safely ignore this email.</p>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset — Notes App",
      html,
    });

    res.status(200).json({
      message: "If that email is registered, you will receive a reset link.",
    });
  } catch (error) {
    console.error("forgotPassword error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Hash the incoming raw token to compare with the stored hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" });
    }

    // Set new password — the pre('save') hook will hash it automatically
    user.password = newPassword;

    // Clear the reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("resetPassword error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

