const Comment = require('../models/comment');
const router = require('express').Router();

router.get('/', (req, res) => {
  Comment.find({}, function(err, result) {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const comment = new Comment(req.body);

  comment.save(function(err, result) {
    if (err) console.log(err);
    else res.status(201).json(result);
  })
})

router.delete('/', (req, res) => {
  Comment.deleteMany({}, function(err, result) {
    if (err) console.log(err)
    else res.status(201).json(result);
  })
})

module.exports = router;
