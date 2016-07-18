var User = require('../models/game');

module.exports = function(router)
{
	router.route('/game')
		.post(function(req,res){
			
			var game = new Game();
			
			res.send('Create Game');
		})
		.get(function(req,res){
			res.send('Read Game');
		});
		
	router.route('/game/:id')
		.get(function(req,res){
			res.send('Read Game');
		})
		.put(function(req,res){
			res.send('Update Game');
		})
		.delete(function(req,res){
			res.send('Delete Game');
		});
}