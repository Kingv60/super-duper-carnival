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
router.post('/', upload.single('image'), profileController.createProfile);
router.get('/:id', profileController.getProfileById);
router.put('/:id', upload.single('image'), profileController.updateProfile);

module.exports = router;
