const ratings = [
  {
    content_type: "text",
    title: "1",
    payload: "one"
  },
  {
    content_type: "text",
    title: "2",
    payload: "two"
  },
  {
    content_type: "text",
    title: "3",
    payload: "three"
  },
  {
    content_type: "text",
    title: "4",
    payload: "four"
  },
  {
    content_type: "text",
    title: "5",
    payload: "five"
  }
];

const info = [
  {
    content_type: "text",
    title: "Add more info",
    payload: "add_review"
  },
  {
    content_type: "text",
    title: "Skip to next question",
    payload: "skip_question"
  }
];

const skip = [info[1]];

const start = [
  {
    content_type: "text",
    title: "Start another review",
    payload: "review"
  }
];

function getQuestionData(questionKey, place, overallRating) {
  const questionsData = {
    "hello": {
      text: "Hello! Thanks for clicking get started. Would you like to leave a review or chat to us?",
      quick_replies: [
        {
          content_type: "text",
          title: "Review!",
          payload: "review"
        },
        {
          content_type: "text",
          title: "Chat!",
          payload: "chat"
        }
      ]
    },
    "account": {
      text: "Thanks for choosing to share your experience with us, this shouldn't take too long!\n" +
      "You can abandon the review at any time by typing STOP.\n" +
      "Please can you start by telling us if you have a Euan's Guide account",
      quick_replies: [
        {
          content_type: "text",
          title: "Yes, I have an account on EuansGuide.com",
          payload: "yes"
        },
        {
          content_type: "text",
          title: "No, I do not have an account",
          payload: "no"
        }
      ]
    },
    "username": {text: "Please enter your username or the associated email address so we can add this to your existing reviews."},
    "new-user": {text: "Please can you give us a username you would like us to associate with this review so that you can make changes to the review or add additional reviews at a later date from the same account. If the username is already taken we will try to assign you something similar to your request."},
    "visited": {text: "Thank you, now back to your review. Please can you tell us the name of place that you visited?"},
    "city": {text: "Ok, great! Can you confirm which town or city " + place + " is in?"},
    "image": {
      text: "Do you have any photos or images you'd like to upload with your review?\n" +
      "By uploading images you agree that you are the creator and owner of the content you upload and that you are happy for the images to be used by Euan’s Guide.",
      quick_replies: [
        {
          content_type: "text",
          title: "Upload Photos Now",
          payload: "yes"
        },
        {
          content_type: "text",
          title: "No Photos to Upload",
          payload: "no"
        }
      ]
    },
    "image2": {
      text: "Do you have any more photos or images you'd like to upload?",
      quick_replies: [
        {
          content_type: "text",
          title: "Yes!",
          payload: "yes"
        },
        {
          content_type: "text",
          title: "No!",
          payload: "no"
        }
      ]
    },
    "upload-image": {text: "Great, to select an image to attach, click on the picture icon in the bottom left corner of the messenger and send it."},
    "title": {text: "Thanks! Now, what would you like to title your review? This will be the first thing people will see. \n " +
    "An example might be \"Accessible Museum in the heart of London\" or \"Great accessible cafe with delicious cakes!\""},
    "disabled-rating": {
      text: "Great title! \n" +
      "\n" +
      "Now for a rating... Out of 5, where 5 is great and 1 is bad, how would you rate the disabled access overall?",
      quick_replies: ratings
    },
    "disabled-summary": {text: "People are going to love reading about  " + place + "! Now could you summarise your experience? \n" +
    "\n" +
    "Some things you might want to talk about include:\n" +
    "What did you do there?\n" +
    "What did you like about the place? \n" +
    "What wasn't quite right? \n" +
    "What made it special?"},
    "continue-or-finish": {
      text: "That's your review nearly complete! \n" +
      "\n" +
      "Some of our users do like to know some additional information before they visit.This focuses on 4 main areas:\n" +
      "\n" +
      "1) Getting there \n" +
      "2) Getting in and getting around\n" +
      "3) Toilets\n" +
      "4) Staff\n" +
      "\n" +
      "These are all optional questions so if you don't have anything else to add then no problem! Would you like to finish and submit your review or add more information?\n" +
      "\n" +
      "(You can submit your review at any time simply by typing SUBMIT.)",
      quick_replies: [
        {
          content_type: "text",
          title: "Add more information",
          payload: "continue_option_question"
        },
        {
          content_type: "text",
          title: "Finish and submit",
          payload: "finish_option_question"
        }
      ]
    },
    "transport": {
      text: "We'll start with getting there. Would you like to add any information on parking or transport?",
      quick_replies: info
    },
    "transport-rating": {
      text: "How would you rate the parking and transport options? (Where 5 is great and 1 is bad.)",
      quick_replies: ratings
    },
    "transport-summary": {
      text: "Could you give us some more information? Did you drive? If so, where did you park? If you travelled using public transport where was the nearest bus stop or train station?\n" +
      "What information would help others most?",
      quick_replies: skip
    },
    "access": {
      text: "Thank You! Now onto getting in and around " + place + ". Is there anything specific about Disabled Access you would like to add?",
      quick_replies: info
    },
    "access-rating": {
      text: "Ok, great! Let's start with a rating, again out of 5.",
      quick_replies: ratings
    },
    "access-summary": {
      text: "Would you be able to give any more detail on what you noticed?\n" +
      "\n" +
      "For example, do you have any comments on doors or ramps? Were there any lifts? What was the signage like? Were there any steps? Could you see everything you wanted to? Was there an induction loop? Was there any seating so you could stop and take a rest? Were there any alternative formats available such as braille, large print, easy read or BSL?",
      quick_replies: skip
    },
    "toilet": {
      text: "Thank you for taking the time to provide additional information on the disabled access at " + place + "!\n" + "Now, onto toilets. Our users consistently tell us how important both accessible toilets and information about toilets is. Are you able to tell us anything about the toilets at " + place + "?",
      quick_replies: info
    },
    "toilet-rating": {
      text: "Brilliant! We'd love to know more…\n Let's start with a rating…",
      quick_replies: ratings
    },
    "toilet-summary": {
      text: "Would you be able to provide some more detail? Things to mention might include: Was there an accessible loo? How easy was it to find? Was there enough space to manoeuvre? Did it have grab rails? Was it clean and tidy? Was there space for a carer? Do you know if it was a certified Changing Places toilet?",
      quick_replies: skip
    },
    "staff": {
      text: "Thank you - that's such important information to share with people.\n" +
      "\n" +
      "Now we come to staff. Would you like to add any further information about the people you came across at " + place + "?",
      quick_replies: info
    },
    "staff-rating":  {
      text: "	Thank you! This will be the last time we ask you for a rating…",
      quick_replies: ratings
    },
    "staff-summary": {
      text: "	That's great to know!" + "Would you be able to tell us a bit more about the welcome you received?\n" +
      "Was there anyone who particularly who stood out? If so, what did they do to make it a memorable experience?",
      quick_replies: skip
    },
    "end": {
      text: "Thank you for your review - it's great. We'll send you a message when it has gone live! :)",
      quick_replies: start
    },
    "stop": {
      text: "Review stopped",
      quick_replies: start
    },
    "delete": {text: "Uh oh. Something's went wrong. Try deleting the chat and starting again. Sorry!"}
  };
  return questionsData[questionKey];
}

module.exports = getQuestionData;
