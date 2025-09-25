const express = require('express');
const multer = require('multer');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes

// Create profile
router.post('/', upload.single('image'), profileController.createProfile);

// Get profile by userId
router.get('/user/:userId', profileController.getProfileByUserId);

// Update profile by userId
router.put('/', upload.single('image'), profileController.updateProfile);

module.exports = router;
