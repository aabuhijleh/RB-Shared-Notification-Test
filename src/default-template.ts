const DEFAULT_TEMPLATE = `{
    "id":"web_698b1e17-fc1e-4bbd-b477-245de4be02fd",
    "type":"call",
    "message":"Incoming audio call",
    "origin":"Abd Dev",
    "avatarURL":"https://cdn.openrainbow.net/api/avatar/5ca05c77772bbd3b2f493754?size=256&update=20bb832fdd7e7dab37df77f152622af5",
    "infoTitle":null,
    "infoMessage":null,
    "callSubject":null,
    "delay":150000,
    "delayTimeout":null,
    "autoCloseAction":null,
    "actions":[
       {
          "choiceVisible":false,
          "name":"answer_audio",
          "color":"green",
          "icon":"mic",
          "label":"Accept",
          "choiceCloselabel":null
       },
       {
          "choiceVisible":false,
          "name":"decline",
          "color":"red",
          "label":"Decline",
          "choiceCloselabel":null
       },
       {
          "handler":null,
          "choiceVisible":false,
          "name":"answerIM",
          "label":"Send message",
          "choiceCloselabel":"Close",
          "choice":[
             {
                "id":"imCallYouRightBack",
                "label":"I'll call you right back."
             },
             {
                "id":"imSorryInAMeeting",
                "label":"Sorry, I'm in a meeting right now."
             },
             {
                "id":"answerIM",
                "label":"Send message"
             }
          ]
       }
    ],
    "iconPath":"resources/svg_dist"
}`;

export default DEFAULT_TEMPLATE;
