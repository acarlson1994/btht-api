// btht-api/models/game.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var GameSchema   = new Schema({
	//gameid: ObjectId,
    name: String
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

GameSchema.virtual('gameid').get(function() {
    return this._id;
});

module.exports = mongoose.model('Game', GameSchema);
