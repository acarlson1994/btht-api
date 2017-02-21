var Match = require('../models/match');

module.exports = function(router)
{
  router.route('/match')
    .post(function(req,res){
      
      var match = new Match();
      
      res.send('Create Match');
    })
    .get(function(req,res){
      /*
       * Find all matchs.
       * @TODO Remove for production environment
       */
      Match.find(function(err, match) {
          if (err) {
              // Return validation error(s).
              res.send(err);
          } else {
              // Return match JSON.
              res.json(match);
          }
      });
    });
    
  router.route('/match/:id')
    .get(function(req,res){
      res.send('Read Match');
    })
    .put(function(req,res){
      res.send('Update Match');
    })
    .delete(function(req,res){
      res.send('Delete Match');
    });
}