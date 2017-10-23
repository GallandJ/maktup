var mongoose = require("mongoose");
var kasba    = require("kasba");

var roomSchema = mongoose.Schema({
	owner: {type: String, required:true},
	ownerId: {type:String},
	title:{type:String},
	link: {type:String},
	membersCount: {type: Number}
});

// Object constructor for Room model
// roomSchema.statics.createRoom = function(owner, ownerId, title){
roomSchema.statics.createRoom = function(room){

	this.owner   = room.owner;
	this.ownerId = room.ownerId;
	this.title   = room.title;
	this.rawLink = generateLink();
	this.link    = `/rooms/room/${this.rawLink}`;
	this.membersCount = 0;

	return this;
}

roomSchema.methods.generateLink = function(){
	this.rawLink = generateLink();
	this.link    = `/rooms/room/${this.rawLink}`;
	this.membersCount = 0; // No online users yet.

	return this;
}

// Generates a random link for chat rooms. 
// The link will be used to access these rooms.
// Link generation must be validated to prevent duplicate links
function generateLink(){
	return kasba.randomString(15);
}


// A method to check if the room already exists, might be useful.

module.exports = mongoose.model("Room", roomSchema);