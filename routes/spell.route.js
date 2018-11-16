const router = require('express').Router();
const Spell = require('../models/spell.model');

router.get('/', (req, res) => {
  Spell.find({}, function(err, result) {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  const spell = new Spell(req.body);

  spell.save(function(err, result) {
    if (err) console.log(err);
    else res.status(201).json(result);
  })
})

router.delete('/', (req, res) => {
  Spell.deleteMany({}, function(err, result) {
    if (err) console.log(err)
    else res.status(201).json(result);
  })
})

module.exports = router;
