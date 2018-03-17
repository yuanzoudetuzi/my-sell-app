let express = require('express');
let config = require('./config/index');
const appData = require("./data.json");
let port = process.env.PORT || config.build.port;
let app = express();
let router = express.Router();

const {seller,goods,ratings}=appData;
router.get('/', function (req, res,next) {
  req.url = '/index.html';
  next();
});

router.get('/api/seller', function (req,res) {
  res.json({
    errno:0,
    data:seller
  })
});
router.get('/api/goods',function (req,res) {
  res.json({
    errno:0,
    data:goods
  });
});
router.get('/api/ratings',function (req,res) {
  res.json({
    errno:0,
    data:ratings
  })
});
app.use(router);
app.use(express.static('./dist'));
app.listen (port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listen at http://localhost:' + port);
});
