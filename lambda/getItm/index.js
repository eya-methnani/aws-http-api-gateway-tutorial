const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'ticket-dev-eya-test'; // Replace with your actual DynamoDB table name

exports.handler = async (event) => {
    try {
        const itemId = event.pathParameters.id; // Extracting the id from the path parameters

        const params = {
            TableName: tableName,
            Key: {
                id: itemId
            }
        };

        const data = await dynamodb.get(params).promise();

        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Item not found' })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
    } catch (error) {
        console.error('Error getting item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not get item' })
        };
    }
};
