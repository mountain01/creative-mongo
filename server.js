const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const db = require('./db/db');

db.once('open', () => {
    console.log(`connection open`);
});

const CommentRoute = require('./routes/comment');
const SpellRoute = require('./routes/spell.route');

app.use(express.json());
app.use('/comments', CommentRoute);
app.use('/spells', SpellRoute);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(path.join(__dirname, 'node_modules/angular')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
