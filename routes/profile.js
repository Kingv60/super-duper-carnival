const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Profile = require('../models/Profile');

// Multer config to store images in /upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); // folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Add / update profile
router.post('/update', upload.single('image'), async (req, res) => {
  try {
    const { userId, name, email } = req.body;
    const image = req.file ? req.file.filename : null;

    let profile = await Profile.findOne({ where: { userId } });

    if (profile) {
      // Delete old image if new one uploaded
      if (image && profile.image) {
        const oldImagePath = path.join(__dirname, '../upload', profile.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      await profile.update({ name, email, image: image || profile.image });
    } else {
      profile = await Profile.create({ userId, name, email, image });
    }

    res.json({ success: true, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get profile by userId
router.get('/', async (req, res) => {
  const userId = req.query.userId;  // get userId from query
  if (!userId) return res.status(400).json({ success: false, message: 'userId is required' });

  try {
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

    res.json({ success: true, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Delete profile by userId
router.delete('/', async (req, res) => {
  const userId = req.query.userId;  // get userId from query
  if (!userId) return res.status(400).json({ success: false, message: 'userId is required' });

  try {
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

    // Delete image file if exists
    if (profile.image) {
      const imagePath = path.join(__dirname, '../upload', profile.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await profile.destroy();
    res.json({ success: true, message: 'Profile deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
