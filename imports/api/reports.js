import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Reports = new Mongo.Collection('reports');

Meteor.methods({
	'reports.remove'(_id){
		Reports.remove({_id});
	},

	'reports.create'(report, url){
		check(report, String);

		if(report.length <= 0){
			throw new Meteor.error(403, `'Report' should not be empty!`);
			return;
		}

		Reports.insert({report, url});

	},

	'reports.update'(_id, report, url){
		check(report, String);

		Reports.update({_id}, {$set:{report, url}});
	}
});

if(Meteor.isServer){
	//This code only runs on the server
	Meteor.publish('reports', () =>{
		return Reports.find();
	});

	Meteor.publish('reports', (_id)=>{
		return Reports.find({_id});
	});
}


