/**
 * LoginsController
 *
 * @description :: Server-side logic for managing logins and logouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

  module.exports = {

 	authenticate: async (request, response) => {
 		const email  = request.body.email;
 		const password = request.body.password;

 			// Validate signup form
 			if(!LoginsService.validateLoginForm(request, response)) {
 				return;
 			}
 			
 		

 		// Attempt to log in
 		const success = await LoginsService.login(request, response);
 	},

 	logout: (request, response) => {
 		LoginsService.logout(request, response);
 	}
 };
