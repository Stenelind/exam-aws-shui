const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async (event) => {
    try {
        const { text } = JSON.parse(event.body); 
        const messageId = event.pathParameters.id;

        if (!text) {
            return sendError(400, { message: 'Text field must be filled.' });
        }

        const getMessageResult = await db.get({
            TableName: 'shui-db',
            Key: { id: messageId }
        });

        if (!getMessageResult.Item) {
            return sendError(404, { message: 'Message not found.' });
        }

        const updateResult = await db.update({
            TableName: 'shui-db',
            Key: { id: messageId },
            UpdateExpression: 'set #text = :text',
            ExpressionAttributeValues: {
                ':text': text
            },
            ExpressionAttributeNames: {
                '#text': 'text'
            },
            ConditionExpression: 'attribute_exists(id)' 
        });

        return sendResponse(200, { message: 'Message updated successfully.' });
    } catch (error) {
        console.error('Error during update:', error);
        return sendError(500, { message: error.message });
    }
};

