const Profile = require('../models/Profile');

// Create profile
exports.createProfile = async (req, res) => {
  try {
    const { name, email, number, userId } = req.body; // get userId from request
    if (!userId) return res.status(400).json({ success: false, msg: 'userId is required' });

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const profile = await Profile.create({ name, email, number, image: imagePath, userId });
    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get profile by userId
exports.getProfileByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) return res.status(404).json({ success: false, msg: 'Profile not found' });

    res.json({ success: true, data: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update profile by userId
exports.updateProfile = async (req, res) => {
  try {
    const { userId, name, email, number } = req.body;
    if (!userId) return res.status(400).json({ success: false, msg: 'userId is required' });

    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) return res.status(404).json({ success: false, msg: 'Profile not found' });

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    await profile.update({
      name: name || profile.name,
      email: email || profile.email,
      number: number || profile.number,
      image: imagePath || profile.image
    });

    res.json({ success: true, data: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
