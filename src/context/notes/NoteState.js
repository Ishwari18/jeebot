import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
   const chatinitial = [
    {
      "_id": "64d41a2f651679eae2af1dfa",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "Who is great Gatsby?",
          "_id": "64d41a2f651679eae2af1dfb",
          "timestamp": "2023-08-09T22:58:55.024Z"
        },
        {
          "sender": "AI",
          "content": " Great Gatsby is the title character of the novel The Great Gatsby by F. Scott Fitzgerald.",
          "_id": "64d41a33651679eae2af1dfd",
          "timestamp": "2023-08-09T22:58:59.754Z"
        }
      ],
      "__v": 1
    },
    {
      "_id": "64d41a5d651679eae2af1dff",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "Who is great Gatsby?",
          "_id": "64d41a5d651679eae2af1e00",
          "timestamp": "2023-08-09T22:59:41.807Z"
        },
        {
          "sender": "AI",
          "content": " Great Gatsby is a novel by F. Scott Fitzgerald about Jay Gatsby, a man who comes from a humble background and tries to attain the American Dream of wealth and status.",
          "_id": "64d41a61651679eae2af1e02",
          "timestamp": "2023-08-09T22:59:45.692Z"
        }
      ],
      "__v": 1
    },
    {
      "_id": "64d41fdc6d3a4a61c3b2bd1f",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "Who is great Gatsby?",
          "_id": "64d41fdc6d3a4a61c3b2bd20",
          "timestamp": "2023-08-09T23:23:08.731Z"
        },
        {
          "sender": "AI",
          "content": " The Great Gatsby is a novel by F. Scott Fitzgerald.",
          "_id": "64d41fdc6d3a4a61c3b2bd21",
          "timestamp": "2023-08-09T23:23:08.731Z"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64d4203e6d3a4a61c3b2bd26",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "is he a great person?",
          "_id": "64d4203e6d3a4a61c3b2bd27",
          "timestamp": "2023-08-09T23:24:46.307Z"
        },
        {
          "sender": "AI",
          "content": " The author of the text has a mixed opinion of Jay Gatsby. He admires Gatsby's gift for hope and sensitivity to life, but also has an unaffected scorn for him. He also recognizes Gatsby's wealth and the fact that he was raised from nothing, but is still unsure and suspicious of him at the end. Ultimately, it's up to the reader to decide if they think Jay Gatsby is a great person.",
          "_id": "64d4203e6d3a4a61c3b2bd28",
          "timestamp": "2023-08-09T23:24:46.308Z"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64d4223fbbd32007768fe967",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "Who is great Gatsby?",
          "_id": "64d4223fbbd32007768fe968",
          "timestamp": "2023-08-09T23:33:19.100Z"
        },
        {
          "sender": "AI",
          "content": " Great Gatsby is the title character and protagonist of F. Scott Fitzgerald's 1925 novel of the same name. He is a wealthy, mysterious man who throws lavish parties at his mansion in West Egg on Long Island.",
          "_id": "64d4223fbbd32007768fe969",
          "timestamp": "2023-08-09T23:33:19.100Z"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64d422bd3ee861176d6ea9b0",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "Who is great Gatsby?",
          "_id": "64d422bd3ee861176d6ea9b1",
          "timestamp": "2023-08-09T23:35:25.216Z"
        },
        {
          "sender": "AI",
          "content": " Great Gatsby is a novel by F. Scott Fitzgerald. The main character is Jay Gatsby, a wealthy man living in West Egg, Long Island. He is known for throwing lavish parties and is notorious for his mysterious past.",
          "_id": "64d422bd3ee861176d6ea9b2",
          "timestamp": "2023-08-09T23:35:25.217Z"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64d422d73ee861176d6ea9b7",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "Who is great Gatsby?",
          "_id": "64d422d73ee861176d6ea9b8",
          "timestamp": "2023-08-09T23:35:51.167Z"
        },
        {
          "sender": "AI",
          "content": " Great Gatsby is the title character of the novel The Great Gatsby by F. Scott Fitzgerald.",
          "_id": "64d422d73ee861176d6ea9b9",
          "timestamp": "2023-08-09T23:35:51.167Z"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64d422e92477302090fcf8f2",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "Who is great Gatsby?",
          "_id": "64d422e92477302090fcf8f3",
          "timestamp": "2023-08-09T23:36:09.502Z"
        },
        {
          "sender": "AI",
          "content": " Great Gatsby is the title character in F. Scott Fitzgerald's novel of the same name. He is an enigmatic figure who is known for his wealth and mysterious past.",
          "_id": "64d422e92477302090fcf8f4",
          "timestamp": "2023-08-09T23:36:09.502Z"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64d423032477302090fcf8f9",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "is a good person and how rich is he?",
          "_id": "64d423032477302090fcf8fa",
          "timestamp": "2023-08-09T23:36:35.653Z"
        },
        {
          "sender": "AI",
          "content": " From the context, it is not clear if Gatsby is a good person or not. It is also not clear how wealthy he is.",
          "_id": "64d423032477302090fcf8fb",
          "timestamp": "2023-08-09T23:36:35.653Z"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64d423162477302090fcf900",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "is a good person?",
          "_id": "64d423162477302090fcf901",
          "timestamp": "2023-08-09T23:36:54.398Z"
        },
        {
          "sender": "AI",
          "content": " It seems that the character is generally honest and values honesty in others.",
          "_id": "64d423162477302090fcf902",
          "timestamp": "2023-08-09T23:36:54.398Z"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64d4233e2477302090fcf907",
      "user": "64d40cfca780a29ca0a51ac0",
      "messages": [
        {
          "sender": "user",
          "content": "what kind of person is he?",
          "_id": "64d4233e2477302090fcf908",
          "timestamp": "2023-08-09T23:37:34.065Z"
        },
        {
          "sender": "AI",
          "content": " Tom Buchanan is a wealthy, arrogant man with an aggressive manner and a gruff speaking voice. He is also physically strong and has a cruel body.",
          "_id": "64d4233e2477302090fcf909",
          "timestamp": "2023-08-09T23:37:34.065Z"
        }
      ],
      "__v": 0
    }
  ]
  const [chat, setchat] = useState(chatinitial)
    return (
        <NoteContext.Provider value={{chat}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;