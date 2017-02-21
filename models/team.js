// btht-api/models/match.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var TeamSchema   = new Schema({
    name: String,
    description: String,
    roster: [{
      userid: ObjectId,
      identifier: String
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

TeamSchema.virtual('teamid').get(function() {
    return this._id;
});

module.exports = mongoose.model('Team', TeamSchema);
