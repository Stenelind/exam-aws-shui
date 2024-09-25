const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');

exports.handler = async (event) => {
    try {
        const messageId = event.pathParameters.id;
        console.log(`Attempting to delete message with ID: ${messageId}`);

        const messageResult = await db.get({
            TableName: 'shui-db', 
            Key: { id: messageId }
        });

        const messageItem = messageResult.Item;

        if (!messageItem) {
            return sendError(404, { message: 'Message not found.' });
        }

        await db.delete({
            TableName: 'shui-db',
            Key: { id: messageId }
        });

        return sendResponse(200, { message: 'The message has been removed.' });
    } catch (error) {
        console.error('Error deleting message:', error);
        return sendError(500, { message: error.message });
    }
};
