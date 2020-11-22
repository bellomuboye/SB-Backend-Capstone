/**
 * ProfileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  render: async (request, response) => {
    try {
      let data = await User.findOne({
        username: request.params.username
      });
      if (!data) {
        return response.notFound('The user was NOT found!');
      }

      if (request.session.userId == data.id) {
      	response.view('profile', { data , owner: true});
      } else {
      	response.view('profile', { data , owner: false});
      }
      
    } catch (err) {
      response.serverError(err);
    }
  }
};
