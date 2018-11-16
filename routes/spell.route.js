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

router.param('spellId', (req, res, next, id) => {
  Spell.findById(id, (err, spell) => {
    if (err) return next(err);
    if (!spell) return next(new Error(`can't find spell`));
    req.spell = spell;
    return next();
  });

});

router.put('/:spellId', (req, res, next) => {
  const spell = req.spell;
  Object.assign(spell, req.body);
  spell.save((err, result) => {
    if (err) return next(err);
    res.status(200).json(result);
  });
})

router.delete('/:spellId', (req, res) => {
  req.spell.remove(function(err, result) {
    if (err) console.log(err)
    else res.status(201).json(result);
  });
})

module.exports = router;
