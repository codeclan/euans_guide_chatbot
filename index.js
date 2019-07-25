'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

let currentQuestion;
let handleResponse;
// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      } else if (webhook_event.quick_replies) {
        handleQuickReply(sender_psid, webhook_event.quick_replies)
      }

    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {

  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;


  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// function setCurrentQuestion(text){
//    currentQuestion = text;
// }

function handleMessage(sender_psid, received_message) {

  // Checks if the message contains text
  if ((received_message.text !== currentQuestion) && (currentQuestion === "Can you confirm the name of the place you visited?")) {
    handleResponse = {
      "text": `Ok, great! Can you confirm which town or city ` + received_message.text + ` is in?`
      // "text": `Ok, great! Can you confirm which town or city that is in?`
    }
    currentQuestion = handleResponse["text"]

  } else if ((received_message.text !== currentQuestion) && (currentQuestion === handleResponse["text"])) {
    handleResponse = {
      "text": `Do you have any photos or images you'd like to upload?`,
      "quick_replies": [
        {
          "content_type": "text",
          "title": "Yes, now!",
          "payload": "yes now"
        },
        {
          "content_type": "text",
          "title": "Yes, later!",
          "payload": "yes later"
        },
        {
          "content_type": "text",
          "title": "No!",
          "payload": "no photos"
        }
      ]
    }
    currentQuestion = handleResponse["text"]
  } 

  // Send the response message
  callSendAPI(sender_psid, handleResponse);

}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
  let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload

  if (payload === 'GET_STARTED') {
    response = { "text": "Can you confirm the name of the place you visited?" }
    currentQuestion = response["text"]
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  // setCurrentQuestion(response);
  callSendAPI(sender_psid, response);
}

function handleQuickReply(sender_psid, received_quick_reply) {
  console.log("HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLO")
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

// curl -X POST -H "Content-Type: application/json" -d '{
//   "get_started": {"payload": "GET_STARTED"}
// }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAEZBxZBsDMYYBAJPLwYYBncuKhIZCnAVq9GrZAhkD9EwKbISZBS30D2xmmqMqKzMnFx6UE80KFFmnZAkWuy832RoWAOLCHJnivAjcggKZAO3JYmjg9Va4nng6mi0Coz8ZCyW0W8qWN4DrCFtgrjB1PxjdZC0nURiBnZBFcOcfwDOeJBvZAsqzEMFbFBWiE7MAuVP0ZD"


// curl -X POST -H "Content-Type: application/json" -d '{
//   "greeting": [
//     {
//       "locale":"default",
//       "text":"Hello {{user_first_name}}! Click on Get Started to leave your review"
//     }
//   ]
// }' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAEZBxZBsDMYYBAJPLwYYBncuKhIZCnAVq9GrZAhkD9EwKbISZBS30D2xmmqMqKzMnFx6UE80KFFmnZAkWuy832RoWAOLCHJnivAjcggKZAO3JYmjg9Va4nng6mi0Coz8ZCyW0W8qWN4DrCFtgrjB1PxjdZC0nURiBnZBFcOcfwDOeJBvZAsqzEMFbFBWiE7MAuVP0ZD"