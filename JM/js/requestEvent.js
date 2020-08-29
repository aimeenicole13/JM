//
//  requestEvent.js
//  
//
//  Created by Aimee Turner on 26/8/20.
//

const randomBytes = require('crypto').randomBytes;

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    if (!event.requestContext.authorizer) {
      errorResponse('Authorization not configured', context.awsRequestId, callback);
      return;
    }
    
    const distance = "5K";
    
    const eventName = "Simple Ricks 5K Fun ";

    const eventId = toUrlString(randomBytes(16));
    console.log('Received event (', eventId, '): ', event);

    const username = event.requestContext.authorizer.claims['cognito:username'];

  //  const requestBody = JSON.parse(event.body);

    recordRide(eventId, username, distance, eventName).then(() => {
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                EventId: eventId,
                EventDistance: distance,
                EventName: eventName,
                User: username,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);

        errorResponse(err.message, context.awsRequestId, callback);
    });
};

function recordRide(eventId, username, distance, eventName) {
    return ddb.put({
        TableName: 'Events',
        Item: {
            EventId: eventId,
            User: username,
            EventDistance: distance,
            EventName: eventName,
            RequestTime: new Date().toISOString(),
        },
    }).promise();
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  
}
