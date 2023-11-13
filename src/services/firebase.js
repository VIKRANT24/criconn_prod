//node imports
import { getAuth } from "@firebase/auth";
import {initializeApp} from "firebase/app"


var firebaseConfig = {
//   apiKey: "AIzaSyCU0lGOmGurXxZUYClkeyU7Ll3AUKiXw0I",
//   authDomain: "tcopen-76bb1.firebaseapp.com",
//   databaseURL: "https://tcopen-76bb1.firebaseio.com",
//   projectId: "tcopen-76bb1",
//   storageBucket: "tcopen-76bb1.appspot.com",
//   messagingSenderId: "727891651221",  
//   appId: "1:727891651221:web:7964c249b06a6f7bfe099c"
    apiKey: "AIzaSyBphAz67pZkq3dk5yOGyDhgn_g9ERSeOas",
    authDomain: "tc-live-score.firebaseapp.com",
    databaseURL: "https://tc-live-score.firebaseio.com",
    projectId: "tc-live-score",
    storageBucket: "tc-live-score.appspot.com",
    messagingSenderId: "102476373342"
  };

  const app = initializeApp(firebaseConfig)

 export const auth = getAuth(app)