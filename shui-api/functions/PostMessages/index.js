const { db } = require('../../services/index');
const { sendResponse, sendError } = require('../../responses/index');
const { v4: uuid } = require('uuid');

exports.handler = async (event) => {
    const { username, text } = JSON.parse(event.body);

    try {
        const id = uuid().substring(0, 4);
        const createdAt = new Date().toISOString();
    
        await db.put({
            TableName: 'shui-db',
            Item: {
                id: id,
                username: username,
                text: text,
                createdAt: createdAt  
            }
        });

        return sendResponse(200, {
            message: 'Added to database',
            data: {
                id: id,
                username: username,
                text: text,
                createdAt: createdAt
            }
        });
    } catch (error) {
        console.error('Error occurred:', error); 
        return sendError(500, { message: error.message });
    }
};
