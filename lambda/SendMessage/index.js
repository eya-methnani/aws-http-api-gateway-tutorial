const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = 'ticket-dev-eya-WebSocketConnections';
let apigatewaymanagementapi;

exports.handler = async (event) => {
  console.log("Received event: ", JSON.stringify(event));

  // Ensure the requestContext is defined and contains the necessary properties
  if (!event.requestContext || !event.requestContext.domainName || !event.requestContext.stage) {
    console.error("Invalid request context: ", JSON.stringify(event.requestContext));
    return {
      statusCode: 500,
      body: 'Invalid request context',
    };
  }

  // Initialize ApiGatewayManagementApi if not already initialized
  if (!apigatewaymanagementapi) {
    apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
      endpoint: `${event.requestContext.domainName}/${event.requestContext.stage}`,
    });
  }

  const postData = JSON.parse(event.body).data;
  const params = {
    TableName: tableName,
  };

  try {
    const connectionData = await dynamo.scan(params).promise();
    console.log("Connection data: ", JSON.stringify(connectionData));

    const postCalls = connectionData.Items.map(async ({ connectionId }) => {
      try {
        await apigatewaymanagementapi
          .postToConnection({ ConnectionId: connectionId, Data: postData })
          .promise();
      } catch (e) {
        if (e.statusCode === 410) {
          console.log(`Found stale connection, deleting ${connectionId}`);
          await dynamo
            .delete({ TableName: tableName, Key: { connectionId } })
            .promise();
        } else {
          throw e;
        }
      }
    });

    await Promise.all(postCalls);

    console.log("Message sent to all connections");
    return { statusCode: 200, body: 'Data sent.' };
  } catch (error) {
    console.error("Error sending message: ", JSON.stringify(error));
    return { statusCode: 500, body: 'Failed to send message: ' + JSON.stringify(error) };
  }
};
