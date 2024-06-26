const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
    const item = JSON.parse(event.body);
    item.id = uuid.v4();
    
    const params = {
        TableName: tableName,
        Item: item
    };

    await dynamodb.put(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Item created', item: item })
    };
};
