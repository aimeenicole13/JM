//
//  publishNewEvent.js
//  
//
//  Created by Aimee Turner on 26/8/20.
//

'use strict';
var AWS = require("aws-sdk");
var sns = new AWS.SNS();

exports.handler = (event, context, callback) => {

    event.Records.forEach((record) => {
        console.log('Stream record: ', JSON.stringify(record, null, 2));

        if (record.eventName == 'INSERT') {
            var who = JSON.stringify(record.dynamodb.NewImage.User.S);
            var when = JSON.stringify(record.dynamodb.NewImage.RequestTime.S);
            var what = JSON.stringify(record.dynamodb.NewImage.EventName.S);
            var params = {
                Subject: 'A new event registration from ' + who,
                Message: 'Jan Michaels user ' + who + ' requested to participate in the ' + what + 'at ' + when,
                TopicArn: 'arn:aws:sns:us-east-1:327718086577:JMTopic'
            };
            sns.publish(params, function(err, data) {
                if (err) {
                    console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Results from sending message: ", JSON.stringify(data, null, 2));
                }
            });
        }
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};   
