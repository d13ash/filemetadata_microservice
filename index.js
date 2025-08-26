var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({dest:'uploads/'})

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req,res)=>{

  if(!req.file) return res.json({error:"no file sent"});
  var name = req.file.originalname
  var type = req.file.mimetype
  var size = req.file.size

  return res.json({name,type,size});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
