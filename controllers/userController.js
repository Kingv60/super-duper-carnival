const User = require('../models/User');

// GET /api/users/by-email?email=foo@bar.com
const getUserIdByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({
      where: { email },
      attributes: ['id'], // fetch only id column
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ userId: user.id });
  } catch (err) {
    console.error('Error fetching user ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getUserIdByEmail };
