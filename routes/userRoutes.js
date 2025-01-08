const express = require('express'); 
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');
const User = require('../models/User');


const router = express.Router();
router.get('/', (req, res) => {
  res.send('Welcome to API');
});

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get All Users
router.get('/users', getAllUsers);


router.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  });
  
module.exports = router;
