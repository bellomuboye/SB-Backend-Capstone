/**
 * SignupController
 *
 * @description :: Server-side logic for managing signups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	authenticate: async (request, response) => {
 		const email  = request.body.email;
 		const name = request.body.name;
 		const username = request.body.username;
 		const password = request.body.password;
 			// Validate signup form
 			if(!SignupService.validateSignupForm(request, response)) {
 				return;
 			}
 			// Check if email is registered
 			const duplicateMailFound = await SignupService.checkDuplicateMail(request, response);
 			if(!duplicateMailFound) {
 				return;
 			}

 			// Check if username is chosen
 			const duplicateUsernameFound = await SignupService.checkDuplicateUsername(request, response);
 			if(!duplicateUsernameFound) {
 				return;
 			}

 			// Create new user
 			const newUser = await SignupService.registerUser({name,email, username, password}, response);
 			if(!newUser) {
 				return;
 			}
 		

 		// Attempt to log in
 		const success = await LoginsService.login(request, response);
 	}

}; 
 