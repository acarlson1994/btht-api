// btht-api/models/tournament.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var TournamentSchema   = new Schema({
    title: String,
    description: String,
    private: Boolean,
    gameid: Number,
	winners: [{
		userid: Number,
		name: String,
		position: Number
	}]
},
{
    timestamps: true,
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	}
});

module.exports = mongoose.model('Tournament', TournamentSchema);
