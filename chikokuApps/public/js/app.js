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


//イベントを設置
function writeEvent() {
  //現在時刻を取得
  var date = new Date();
  var now = date.getTime(); //UNIX時間

  //テキストを取得
  acount1 = document.getElementById("ac1").value;
  acount2 = document.getElementById("ac2").value;
  acount3 = document.getElementById("ac3").value;
  acount4 = document.getElementById("ac4").value;
  var content = document.getElementById("content").value;

  date = new Date(
    document.getElementById("year").value,
    document.getElementById("month").value-1,
    document.getElementById("date").value,
    document.getElementById("hour").value,
    document.getElementById("minute").value
  )
  time = date.getTime(); //UNIX時間

  //データベースに格納
  firebase.database().ref('/events').push({
    time: time,
    user1: acount1,
    user2: acount2,
    user3: acount3,
    user4: acount4,
    content : content
  });


  //tweetAPI
  if(acount1 != "") {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/tweetapi/post/" + acount1);
    request.send();
  }
  if(acount2 != "") {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/tweetapi/post/" + acount2);
    request.send();
  }
  if(acount3 != "") {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/tweetapi/post/" + acount3);
    request.send();
  }
  if(acount4 != "") {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/tweetapi/post/" + acount4);
    request.send();
  }

  alert('イベントを設定しました');
}
