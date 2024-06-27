const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = 'ticket-dev-eya-WebSocketConnections';

exports.handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const params = {
    TableName: tableName,
    Key: {
      connectionId: connectionId,
    },
  };
  try {
    await dynamo.delete(params).promise();
    return { statusCode: 200, body: 'Disconnected.' };
  } catch (error) {
    return { statusCode: 500, body: 'Failed to disconnect: ' + JSON.stringify(error) };
  }
};
