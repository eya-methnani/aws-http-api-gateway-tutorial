const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = 'ticket-dev-eya-WebSocketConnections';

exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const params = {
    TableName: tableName,
    Item: {
      connectionId: connectionId,
    },
  };
  try {
    await dynamo.put(params).promise();
    return { statusCode: 200, body: 'Connected.' };
  } catch (error) {
    return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(error) };
  }
};
