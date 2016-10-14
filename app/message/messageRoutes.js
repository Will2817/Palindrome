var MessageService = require('./messageService.js');
var Message = require('./message.js')

function getMessageResponse(req, res) {
	// use mongoose to get all messages in the database
	MessageService.getMessages(function (err, messages) {

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			res.send(err)
		}
		res.json(messages); // return all messages in JSON format
	});
}

module.exports = function (app) {

	// api ---------------------------------------------------------------------
	// get all messages
	app.get('/api/messages', getMessageResponse);

	// get message by id
	app.get('/api/messages/:message_id',function(req,res){
		MessageService.getMessage(req.params.message_id,function(err,message){
			if (err) {
				res.sendStatus(500);
			}
			else if (!message) {
				res.status(404).send("Message cannot be found.");
			}
			res.json(message)
		})
	});

	// create a message and send back all messages after creation
	app.post('/api/messages', function (req, res) {
		// create a message, information comes from AJAX request from Angular
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

	app.post('api/messages/:message_id',function(req,res){
		MessageService.updateMessage(req.params.message_id,req.params.text,function(err,message){
			if (err) {
				res.send(err);
			}
			getMessageResponse(req, res);
		})
	});

	// delete a message
	app.delete('/api/messages/:message_id', function (req, res) {
		MessageService.removeMessage(req.params.message_id, function (err, message) {
			if (err) {
				res.send(err);
			}
			getMessageResponse(req, res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function (req, res) {
		res.sendfile('../../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};