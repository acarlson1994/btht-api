var Tournament = require('../models/tournament');

module.exports = function(router)
{
	router.route('/tournament')
		.post(function(req,res){
			
			var tournament = new Tournament();
			
			res.send('Create Tournament');
		})
		.get(function(req,res){
			res.send('Read Tournament');
		});
		
	router.route('/tournament/:id')
		.get(function(req,res){
			res.send('Read Tournament');
		})
		.put(function(req,res){
			res.send('Update Tournament');
		})
		.delete(function(req,res){
			res.send('Delete Tournament');
		});
}