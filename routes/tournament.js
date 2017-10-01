var Tournament = require('../models/tournament');
var queueTournament = require('../queue/tournament');

module.exports = function(router)
{
    router.route('/tournament')
        .post(function(req,res){
            
            /*
             * Create new tournament object.
             */
            var tournament = new Tournament();
            
            /*
             * Populate tournament object.
             */
            tournament.title = req.body.title;
            tournament.description = req.body.description;
            tournament.type = req.body.type;
            tournament.private = req.body.private;
            tournament.hostuserid = req.body.hostuserid;
            tournament.gameid = req.body.gameid;
            tournament.participants = req.body.participants;
            tournament.seeding = req.body.seeding;
            
            /*
             * Save populated tournament object.
             */
            tournament.save(function(err) {
                if (err) {
                    // Return new tournament validation error(s).
                    res.send(err);
                } else {
                    // Return new tournament JSON.
                    res.json(tournament);
                }
            });

            /*
             * Queue create tournament.
             */
            if (req.body.participants) {
              queueTournament.create(tournament);
            }

        })
        .get(function(req,res){
            
            /*
             * Find all tournaments.
             * @TODO Remove for production environment
             */
            Tournament.find(function(err, user) {
                if (err) {
                    // Return validation error(s).
                    res.send(err);
                } else {
                    // Return new user JSON.
                    res.json(user);
                }
            });
            
        });
        
    router.route('/tournament/:id')
        .get(function(req, res) {
            
            /*
             * Find tournament by id.
             */
            Tournament.findById(req.params.id, function(err, tournament) {
                if (err) {
                    // Return requested tournament error(s).
                    res.send(err);
                } else {
                    // Return requested tournament JSON.
                    res.json(tournament);
                }
            });
            
        })
        .put(function(req,res){
            
            /*
             * Edit tournament by id.
             */
            Tournament.findById(req.params.id, function(err, tournament) {

                if (err){
                    res.send(err);
                }
                tournament.title = req.body.title;
                tournament.description = req.body.description;
                tournament.type = req.body.type;
                tournament.private = req.body.private;
                tournament.hostuserid = req.body.hostuserid;
                tournament.gameid = req.body.gameid;
                tournament.participants = req.body.participants;
                tournament.seeding = req.body.seeding;

                tournament.save(function(err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(tournament);
                    }
                });

            });
        
        })
        .delete(function(req,res){
            
            /*
             * Delete tournament by id.
             */
            Tournament.remove({
                _id: req.params.id
            }, function(err, tournament) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'Successfully deleted' });
                }
            });
        });
}