const mongoose = require('mongoose');

const UserConnectionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  D365ResourceURL:{
    type: String
  },
  AuthHostURL:{
    type: String
  },
  AuthClientId:{
    type: String
  },
  AuthClientSecret:{
    type: String
  },
  AuthToken:{
    type: String
  },
  AuthTokenExp:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('UserConnection', UserConnectionSchema);

module.exports = User;