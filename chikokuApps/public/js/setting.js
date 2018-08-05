// Initialize Firebase
var config = {
  apiKey: "AIzaSyA-0vihJnurJF0GU2SGA2yaZTV_69ZCQic",
  authDomain: "chikokudaikounin.firebaseapp.com",
  databaseURL: "https://chikokudaikounin.firebaseio.com",
  projectId: "chikokudaikounin",
  storageBucket: "chikokudaikounin.appspot.com",
  messagingSenderId: "989447977274"
};
firebase.initializeApp(config);
var database = firebase.database();
/*
database.ref().child("events").on("child_added", function(snapshot) {
  alert("add");
});*/

//現在時刻を取得
var date = new Date();
var now = date.getTime(); //UNIX時間
var u_time = Math.floor(now/60000); //updateした時間

//一定時間ごとのアップデート
setInterval(function() {
  //現在時刻を取得
  date = new Date();
  now = date.getTime(); //UNIX時間

  if(Math.floor(now/60000) > Math.floor(u_time/60000)) {
    u_time = now;
    myupdate();
  }
}, 10000);

//一定時間ごとのアップデート
function myupdate() {
  //更新時間を表示
  console.log("Update : " + new Date(u_time));

  //Firebase
  database.ref("events").once("value", function(snapshot) {
    obj = snapshot.val();
    for (var i in obj) {
      //遅刻者を検索
      if(obj[i]["time"] == Math.floor(u_time/60000)*60000) {

        if(obj[i]["user1"] != "") {
          const request = new XMLHttpRequest();
          request.open("GET", "http://localhost:3000/tweetapi/late/" + obj[i]["user1"]);
          request.send();
          console.log("user1が謝罪");
        }
        if(obj[i]["user2"] != "") {
          const request = new XMLHttpRequest();
          request.open("GET", "http://localhost:3000/tweetapi/late/" + obj[i]["user2"]);
          request.send();
          console.log("user2が謝罪");
        }

      }
      //console.log(obj[i]["time"]);
    }
  });

}
