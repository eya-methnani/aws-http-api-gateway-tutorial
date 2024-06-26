const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'ticket-dev-eya-test'; // Replace with your actual DynamoDB table name

exports.handler = async (event) => {
    try {
        const item = JSON.parse(event.body); // Parsing the JSON input
        const params = {
            TableName: tableName,
            Item: item
        };

        await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item created', item: item })
        };
    } catch (error) {
        console.error('Error creating item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create item' })
        };
    }
};
