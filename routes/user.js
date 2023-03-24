const express = require('express');

const router = express.Router();
const {
  createUser,
  userSignIn,
  signOut,
  addConnection,
  getConnectionInfo,
  updateUserConnectionToken
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require('../middlewares/validation/user');

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);
router.post(
  '/addConnection',
  isAuth,
  addConnection
);
router.post(
  '/getConnectionInfo',
  isAuth,
  getConnectionInfo
);
router.post(
  '/updateUserConnectionToken',
  isAuth,
  updateUserConnectionToken
);

module.exports = router;
