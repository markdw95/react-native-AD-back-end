const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');
var path = require("path");
const expressLayouts = require('express-ejs-layouts');
const User = require('./models/user');
const {userSignIn} = require('./controllers/user');

const app = express();

app.use(userRouter);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//STRIPE
var stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = process.env.ENDPOINT_SECRETE;

// Match the raw body to content type application/json
app.post('/pay-success', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Fulfill the purchase...
    //console.log(session);

    User.findOne({email: session.customer_details.email}, async function(err, user){
      if(user){
        await User.findByIdAndUpdate(user._id, { 
          subscriptionActive: true,
          customerID:session.customer,
          subscriptionID:session.subscription
        });

      }
    });
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

app.use(express.urlencoded()); // for application/x-www-form-urlencoded

app.post('/pay-cancel', (req, res) => {

  User.findOne({email: req.body.email}, async function(err, user){

    stripe.subscriptions.del(user.subscriptionID);

    if(user){
      await User.findByIdAndUpdate(user._id, { 
        subscriptionActive: false,
        customerID: '',
        subscriptionID: ''
      });

    }
  });

  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(express.json());

app.listen(process.env.PORT || 8000, () => {
  console.log('Port is listening');
});
