import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Bots = new Mongo.Collection('bots');

Meteor.methods({
	'bots.remove'(_id){
		Bots.remove({_id});
	},

	'bots.create'(bot, url){
		check(bot, String);

		if(bot.length <= 0){
			throw new Meteor.error(403, `'Bot' should not be empty!`);
			return;
		}

		Bots.insert({bot, url});

	},

	'bots.update'(_id, bot, url){
		check(bot, String);

		Bots.update({_id}, {$set:{bot, url}});
	}
});

if(Meteor.isServer){
	//This code only runs on the server
	Meteor.publish('bots', () =>{
		return Bots.find();
	});

	Meteor.publish('bots', (_id)=>{
		return Bots.find({_id});
	});
}


