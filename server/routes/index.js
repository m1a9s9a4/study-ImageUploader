const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/../public/images'));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  }
});
const upload = multer({storage: storage});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/upload/', upload.single('file'), function(req, res, next) {
  res.send({
    path: `/images/${req.file.filename}`,
    name: `${req.file.filename}`,
  });
});

module.exports = router;
