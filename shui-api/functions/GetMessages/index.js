const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/index');
const { format } = require('date-fns'); 

exports.handler = async (event) => {
    try {
        const result = await db.scan({
            TableName: 'shui-db',
        });  

        const messages = result.Items || [];

        const messagesOverview = messages.map(message => ({
            id: message.id,
            username: message.username,
            text: message.text,
            createdAt: format(new Date(message.createdAt), 'dd MMMM yyyy HH:mm:ss')
        }));

        return sendResponse(200, messagesOverview);

    } catch (error) {
        console.error('Error fetching messages:', error);
        return sendError(500, { message: error.message });
    }
};
