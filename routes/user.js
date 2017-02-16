/*
 * btht-api/routes/user.js
 * User Routes
 */

var User		= require('../models/user');
var mongoose	= require('mongoose');

module.exports = function(router)
{
	router.route('/user')
		.post(function(req,res){
			
			/*
			 * Create new user object.
			 */
			var user = new User();
			
			/*
			 * Populate user object.
			 */
			user.username = req.body.username;
			user.firstname = req.body.firstname;
			user.lastname = req.body.lastname;
			user.email = req.body.email;
			
			/*
			 * Save populated user object.
			 */
			user.save(function(err) {
				if (err) {
					// Return new user validation error(s).
					res.send(err);
				} else {
					// Return new user JSON.
					res.json(user);
				}
			});
			
		})
		.get(function(req,res){
			
			/*
			 * Find all users.
			 * @TODO Remove for production environment
			 */
			User.find(function(err, user) {
				if (err) {
					// Return validation error(s).
					res.send(err);
				} else {
					// Return new user JSON.
					res.json(user);
				}
			});
			
		});
		
	router.route('/user/:id')
        /**
         * @api {get} /user/:id Request User information
         * @apiName GetUser
         * @apiGroup User
         *
         * @apiParam {ObjectId} id Users unique ID.
         *
         * @apiSuccess {ObjectId} userid  Userid of the User.
         * @apiSuccess {String} firstname  Firstname of the User.
         * @apiSuccess {String} lastname Lastname of the User.
         * @apiSuccess {String} fullname  Fullame of the User.
         * @apiSuccess {String} username Username of the User.
         *
         * @apiSuccessExample Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *       "userid": "58a55bf5a5ea51140ce7d5b5",
         *       "firstname": "John",
         *       "lastname": "Doe",
         *       "fullname": "John Doe",
         *       "username": "johndoe"
         *     }
         *
         * @apiError UserNotFound The id of the User was not found.
         *
         * @apiErrorExample Error-Response:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "error": "UserNotFound"
         *     }
         */
		.get(function(req, res) {
			
			/*
			 * Find user by id.
			 */
			User.findById(req.params.id, function(err, user) {
				if (err) {
					// Return requested user error(s).
					res.send(err);
				} else {
					// Return requested user JSON.
					res.json(user);
				}
			});
			
		})
		.delete(function(req,res){
			
			/*
			 * Delete user by id.
			 */
			User.remove({
				_id: req.params.id
			}, function(err, user) {
				if (err) {
					res.send(err);
				} else {
					res.json({ message: 'Successfully deleted' });
				}
			});
		})
		.put(function(req,res){
			
			/*
			 * Edit user by id.
			 */
			User.findById(req.params.id, function(err, user) {

				if (err){
					res.send(err);
				}
				user.username = req.body.username;
				user.email = req.body.email;

				user.save(function(err) {
					if (err) {
						res.send(err);
					} else {
						res.json(user);
					}
				});

			});
		})
		
}