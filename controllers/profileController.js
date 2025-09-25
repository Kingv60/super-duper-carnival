const Profile = require('../models/Profile');

// Create profile
exports.createProfile = async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const profile = await Profile.create({ name, email, number, image: imagePath });
    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ success: false, msg: 'Profile not found' });

    res.json({ success: true, data: profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const profile = await Profile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ success: false, msg: 'Profile not found' });

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
