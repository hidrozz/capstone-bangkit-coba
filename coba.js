const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', upload.single('fileField'), (req, res) => {
  console.log(req.body);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})