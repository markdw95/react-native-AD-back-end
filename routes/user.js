const express = require('express');

const router = express.Router();
const {
  createUser,
  userSignIn,
  signOut,
  addConnection,
  getConnectionInfo,
  updateUserConnectionToken,
  deleteAccount,
  jwtSignIn
} = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} = require('../middlewares/validation/user');
const User = require('../models/user');

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

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

//STRIPE
var stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.ENDPOINT_SECRETE;

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-in-with-token', isAuth, jwtSignIn);
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
router.post(
  '/deleteAccount',
  isAuth,
  deleteAccount
);
// Payment
router.get('/payment', function(req, res, next) {
  stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    subscription_data: {
      items: [{
        plan: process.env.STRIPE_PLAN,
      }],
    },
    success_url: 'http://localhost:8000/payment?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:8000/payment',
  }, function(err,session){
        var Id = session.id;

        res.render('payment', {
          session: Id,
          STRIPE_PUBLIC_KEY : process.env.STRIPE_PUBLIC_KEY
        })
  });
});
router.get('/cancelSubscription', async function(req, res, next) {
  res.render('cancelSubscription');
});

module.exports = router;
