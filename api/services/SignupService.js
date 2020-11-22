/**
* SignupService.js
*
**/

const gravatar = require('gravatar')

// Where to display auth errors
const view = 'signup';

module.exports = { 

  sendAuthError: (response, title, message, options) => {
    options = options || {};
    const { email, name} = options;
    response.view(view, { error: {title, message}, email, name });
    return false;
  },

  validateSignupForm: (request, response) => {
    if(request.body.name == '') {
      return SignupService.sendAuthError(response, 'Signup Failed!', "You must provide a name to sign up", {email:request.body.email});
    } else if(request.body.email == '') {
      return SignupService.sendAuthError(response, 'Signup Failed!', "You must provide an email address to sign up", {name:request.body.name});
    } else if(request.body.username == '') {
      return SignupService.sendAuthError(response, 'Signup Failed!', "You must provide a username or generate one to sign up", {email:request.body.email});
    } else if(request.body.password == '') {
      return SignupService.sendAuthError(response, 'Signup Failed!', "You must provide a password to sign up", {email:request.body.email});
    }
    return true;
  },

  checkDuplicateMail: async (request, response) => {
    try {
      let existingUser = await User.findOne({email:request.body.email});
      if(existingUser) {
        const options = {email:request.body.email, name:request.body.name};
        return SignupService.sendAuthError(response, 'Duplicate Registration!', "The email provided has already been registered", options);
      }
      return true;
    } catch (err) {
      response.serverError(err);
      return false;
    }
  },
  checkDuplicateUsername: async (request, response) => {
    try {
      let existingUser = await User.findOne({username:request.body.username});
      if(existingUser) {
        const options = {email:request.body.email, name:request.body.name};
        return SignupService.sendAuthError(response, 'Duplicate Registration!', "The username provided has already been chosen", options);
      }
      return true;
    } catch (err) {
      response.serverError(err);
      return false;
    }
  },

  registerUser: async (data, response) => {
    try {
      const {name, email, username, password} = data;
      const avatar = gravatar.url(email, {s:200}, "https");
      let newUser = await User.create({name, email, avatar, username, password});
      // Let all sockets know a new user has been created
      User.publishCreate(newUser);
      return newUser;
    } catch (err) {
      response.serverError(err);
      return false;
    }
  },
}
