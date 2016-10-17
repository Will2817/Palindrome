var MessageService = require('./messageService.js');
var Message = require('./message.js')

/* apidoc defines */

/**
 * @apiDefine MessagesSuccess
 * 
 * @apiSuccess {Array} response List of messages
 * @apiSuccess {String} response._id Id of Message
 * @apiSuccess {String} response.text Message text
 * @apiSuccess {boolean} response.isPalindrome True/false value if message is a palindrome
 * 
 * @apiSuccessExample {json} Success-Response
 * HTTP/1.1 200 OK
 *[
 *    {
 *        "_id": "57fc093380c6d85ea393b2b4",
 *        "text": "deed",
 *        "isPalindrome": true
 *    },
 *    {
 *        "_id": "57fc093980c6d85ea393b2b5",
 *        "text": "deeds",
 *        "isPalindrome": false
 *    }
 *]
 */

/**
 * @apiDefine MessageNotFoundError
 * 
 * @apiError MessageNotFound The <code>messageId</code> of the Message was not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     "Message cannot be found"
 */

/**
 * @apiDefine MessageEmptyError
 * 
 * @apiError EmptyMessage Message text cannot be empty 
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     "Message cannot be empty"
 */

function getMessageResponse(req, res) {
	// use mongoose to get all messages in the database
	MessageService.getMessages(function (err, messages) {

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			res.send(err);
		}
		res.json(messages); // return all messages in JSON format
	});
}

module.exports = function (app) {

	/**
	 * @api {get} api/messages/ 1. Request all messages
	 * @apiName GetMessages
	 * @apiGroup Messages
	 *
	 * @apiUse MessagesSuccess
	 */
	app.get('/api/messages', getMessageResponse);

	/**
	 * @api {get} /api/messages/:messageId 2. Request a Message
	 * @apiGroup Messages
	 * @apiParam {id} messageId Message id
	 *
	 * @apiSuccessExample {json} Success-Response
	 * HTTP/1.1 200 OK
	 *{
	 *    "_id": "57fc093380c6d85ea393b2b4",
	 *    "text": "deed",
	 *    "isPalindrome": true
	 *}
	 *
	 * @apiUse MessageNotFoundError
	 */
	app.get('/api/messages/:messageId', function (req, res) {
		MessageService.getMessage(req.params.messageId, function (err, message) {
			if (err) {
				res.sendStatus(500);
			}
			else if (!message) {
				res.status(404).send("Message cannot be found.");
			}
			else {
				res.json(message);
			}
		})
	});

	/**
	 * @api {post} /api/messages 3. Insert a Message
	 * @apiGroup Messages
	 * @apiParam {String} text Message text
	 *
	 * @apiUse MessagesSuccess
	 * 
	 * @apiUse MessageEmptyError
	 */
	app.post('/api/messages', function (req, res) {
		if (req.body.text) {
			MessageService.createMessage(req.body.text, function (err, message) {
				if (err) {
					res.send(err);
				}
				getMessageResponse(req, res);
			});
		}
		else {
			res.status(400).send("Message cannot be empty.");
		}

	});

	/**
	 * @api {post} /api/messages/:messageId 4. Update a Message
	 * @apiGroup Messages
	 * @apiParam {String} messageId  Message id
	 * @apiParam {String} text       Message text
	 * 
	 * @apiUse MessagesSuccess
	 * 
	 * @apiUse MessageEmptyError
	 * 
	 * @apiUse MessageNotFoundError
	 */
	app.post('/api/messages/:messageId', function (req, res) {
		if (req.body.text) {
			MessageService.updateMessage(req.params.messageId, req.body.text, function (err, message) {
				if (err) {
					res.send(err);
				}
				else if (!message) {
					res.status(404).send("Message cannot be found.");
				}
				getMessageResponse(req, res);
			})
		}
		else {
			res.status(400).send("Message cannot be empty.");
		}
	});

	/**
	 * @api {delete} /api/messages/:messageId 5. Delete a Message
	 * @apiGroup Messages
	 * @apiParam {String} messageId  Message id
	 * 
	 * @apiUse MessagesSuccess
	 * 
	 * @apiUse MessageNotFoundError
	 */
	app.delete('/api/messages/:messageId', function (req, res) {
		MessageService.removeMessage(req.params.messageId, function (err, message) {
			if (err) {
				res.send(err);
			}
			else if (!message) {
				res.status(404).send("Message cannot be found.");
			}
			getMessageResponse(req, res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function (req, res) {
		res.sendfile('../../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};