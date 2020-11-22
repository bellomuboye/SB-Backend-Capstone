/**
* LoginsService.js
*
**/

const gravatar = require('gravatar')

// Where to display auth errors
const view = 'login';

module.exports = { 

  sendAuthError: (response, title, message, options) => {
    options = options || {};
    const { email, name} = options;
    response.view(view, { error: {title, message}, email, name });
    return false;
  },

  validateLoginForm: (request, response) => {
    if(request.body.email == '') {
      return LoginsService.sendAuthError(response, 'Login Failed!', "You must provide an email address to sign up", {email:request.body.email});
    } else if(request.body.password == '') {
      return LoginsService.sendAuthError(response, 'Login Failed!', "You must provide a password to sign up", {name:request.body.name});
    }
    return true;
  },

  login: async (request, response) => {
    try {
			let user = await User.findOne({email:request.body.email});
			if(user.password == request.body.password) { // Login Passed
				request.session.userId = user.id;
        request.session.username = user.username;
				request.session.authenticated = true;
				return response.redirect('/chat');
			} else { // Login Failed
        return LoginsService.sendAuthError(response, 'Login Failed!', "Incorrect details", {email:request.body.email});
      }
		} catch (err) {
			return response.serverError(err);
		}
  },

  logout: (request, response) => {
    request.session.userId = null;
    request.session.username = null;
		request.session.authenticated = false;
		response.redirect('/');
  }
}
