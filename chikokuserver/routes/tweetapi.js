var express = require('express');
var router = express.Router();

// Initialize Twitter
const twitter = require('twitter')
var client = new twitter({
    consumer_key: '8Gj7O5AAYUft8mvmyVhr3Fky4',
    consumer_secret: 'ExrfOkhkXAL2pcwHQ33QZCngZ1MKv95Ips8ONU2FZOHyPwdccJ',
    access_token_key: '1025621173986447360-mOdy8jJmtc0X6zdpKJHCWRu3qNp6KO',
    access_token_secret: 'rBNPKqQduJ3C6dyIxd5cuAIBnZ41ot67DRBrj7u2H0bxr'
});

router.get('/', function(req, res, next) {
  const params = {count: 50}//200件まで取得可能。デフォルトは20
  client.get('statuses/home_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets)
    }
  })
  var param = {"値":'tweet一覧を取得'};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

//イベント設定時
router.get('/post/:acount', function(req, res, next) {
  require('date-utils');
  var date = new Date();
  var dt = date.toFormat("YYYY年MM月DD日HH24時MI分");
  var acount = req.params.acount;
  var s = acount + ' イベントが設定されました。(' + dt + ')';

  //tweet
  client.post('statuses/update',
          {status: s},
          function(error, tweet, response) {
          if (!error) {
              //console.log(tweet);
              console.log("post late");
          }
        });

  var param = {"値":'(tweet)'+s};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});


//遅刻した場合のツイート
router.get('/late/:acount', function(req, res, next) {
  require('date-utils');
  var date = new Date();
  var dt = date.toFormat("YYYY年MM月DD日HH24時MI分");
  var acount = req.params.acount;
  var s = acount + ' 集合時間に遅れました。申し訳ございません。(' + dt + ')';

  //tweet
  client.post('statuses/update',
          {status: s},
          function(error, tweet, response) {
          if (!error) {
              //console.log(tweet);
              console.log("late tweet");
          }
        });

  var param = {"値":'(tweet)'+s};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});





/* サンプルAPI②
 * http://localhost:3000/samples/hello にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。

router.get('/hello', function(req, res, next) {
  var param = {"result":"Hello World !"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});
*/

module.exports = router;
