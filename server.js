const express = require('express');

// Creates server app
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to my express server!')
})

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
