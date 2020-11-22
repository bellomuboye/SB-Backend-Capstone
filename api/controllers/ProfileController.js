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
      	response.view('profile', { data , owner: true, username: request.session.username});
      } else {
      	response.view('profile', { data , owner: false, username: request.session.username});
      }
      
    } catch (err) {
      response.serverError(err);
    }
  },
  update: async(request, response) => {
    console.log(request.file(avatarupload));
    try {
      await User.update({ username: request.session.username })
      .set({
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        location: request.body.location,
        bio: request.body.bio
      });

    response.redirect('/profiles/' + request.session.username)
    } catch (error) {
      response.serverError(err);
    }
  }
};
