const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'ticket-dev-eya-test'; // Replace with your actual DynamoDB table name

exports.handler = async (event) => {
    try {
        const itemId = event.pathParameters.id; // Extracting the id from the path parameters

        const params = {
            TableName: tableName,
            Key: { id: itemId }
        };

        await dynamodb.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item deleted' })
        };
    } catch (error) {
        console.error('Error deleting item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete item' })
        };
    }
};
