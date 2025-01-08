const XLSX = require('xlsx');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
const registerUser = async (req, res) => {
  const { name, password, age, email, contact } = req.body;
  if (!name || !password || !age || !email || !contact) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ name, password: hashedPassword, age, email, contact });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registerUser:', error.message);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare hashed passwords
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error in loginUser:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error.message);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Export Users to Excel
const exportUsersToExcel = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(400).json({ message: 'No users to export' });
    }

    const usersData = users.map(user => ({
      Name: user.name,
      Age: user.age,
      Email: user.email,
      Contact: user.contact,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(usersData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
    res.send(excelBuffer);
  } catch (error) {
    console.error('Error in exportUsersToExcel:', error.message);
    res.status(500).json({ message: 'Error exporting users to Excel' });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser:', error.message);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  getAllUsers, 
  exportUsersToExcel,
  deleteUser,
};
