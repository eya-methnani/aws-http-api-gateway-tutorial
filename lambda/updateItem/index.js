const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'ticket-dev-eya-test'; // Replace with your actual DynamoDB table name

exports.handler = async (event) => {
    try {
        const itemId = event.pathParameters.id; // Extracting the id from the path parameters
        const updateData = JSON.parse(event.body); // Parsing the JSON input

        const params = {
            TableName: tableName,
            Key: { id: itemId },
            UpdateExpression: 'set #data = :data',
            ExpressionAttributeNames: {
                '#data': 'data'
            },
            ExpressionAttributeValues: {
                ':data': updateData.data
            },
            ReturnValues: 'ALL_NEW'
        };

        const data = await dynamodb.update(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(data.Attributes)
        };
    } catch (error) {
        console.error('Error updating item:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update item' })
        };
    }
};
