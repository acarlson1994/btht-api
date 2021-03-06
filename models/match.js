// btht-api/models/match.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var MatchSchema   = new Schema({
    tournamentid: Number,
    lastname: String,
	winners: [{
		userid: Number,
		name: String,
		position: Number
	}]
},
{
	id: false,
    timestamps: true,
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	}
});

MatchSchema.virtual('matchid').get(function() {
    return this._id;
});

module.exports = mongoose.model('Match', MatchSchema);
