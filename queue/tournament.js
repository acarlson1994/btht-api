// btht-api/queue/tournament.js

var Match    = require('../models/match');
var Tournament = require('../models/tournament');
var mongoose  = require('mongoose');

let redisConfig;  
if (process.env.NODE_ENV === 'production') {  
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS
    }
  };
} else {
  redisConfig = {
    redis: {
      port: 6379,
      host: "localhost",
      auth: ""
    }
  };
}

const queue = require('kue').createQueue(redisConfig);

queue.watchStuckJobs(6000);

queue.on('ready', () => {  
  // If you need to 
  console.info('Queue is ready!');
});

queue.on('error', (err) => {  
  // handle connection errors here
  console.error('There was an error in the main queue!');
  console.error(err);
  console.error(err.stack);
});

function createTournament(data, done) {  
  var job = queue.create('tournament', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .save((err) => {
      if (err) {
        console.error(err);
      }
    });

  // job.on('complete', function(result){
  //   console.log('Job completed with data ', result);

  // }).on('failed attempt', function(errorMessage, doneAttempts){
  //   console.log('Job failed');

  // }).on('failed', function(errorMessage){
  //   console.log('Job failed');

  // }).on('progress', function(progress, data){
  //   console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data );

  // });
}

// Process up to 20 jobs concurrently
queue.process('tournament', 20, function(job, done){

  var match = new Match();
  var tournament = job.data;

  match.tournamentid = tournament.id;

  match.save((err) => {
    if (!err) {

      // Update tournament job status - will need to happen after all matches are created
      Tournament.findById(tournament.id, function(err, tournament) {
        if (err){
          done(err);
        }
        tournament.matchcreationstatus = 'complete';

        tournament.save(function(err) {
          if (err) {
            done(err);
          }
        });
      });

    } else {
      done(err);
    }
  });

  done();
});

module.exports = {  
  create: (data, done) => {
    createTournament(data, done);
  }
};