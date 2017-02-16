// btht-api/models/user.js

var mongoose    = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema      = mongoose.Schema;
var ObjectId    = Schema.Types.ObjectId;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema  = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    firstname: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }/*,
    tournaments: [{
        tournamentid: Number
    }],
    games: [{
        gameid: Number
    }],
    teams: [{
        teamid: Number
    }]*/
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

UserSchema.virtual('fullname').get(function() {  
    return this.firstname + ' ' + this.lastname;
});

UserSchema.virtual('userid').get(function() {
    return this._id;
});

UserSchema.virtual('created').get(function() {
    return this.createdAt;
});

UserSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj._id
  delete obj.__v
  delete obj.id
  delete obj.createdAt
  delete obj.updatedAt
  delete obj.email
  return obj
}

UserSchema.plugin(uniqueValidator);

module.exports  = mongoose.model('User', UserSchema);