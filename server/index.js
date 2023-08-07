const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.DB_PORT || 5000

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((_, res, __) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Use api on other routes',
        data: 'Not found',
    })
})

app.use((err, _, res, __) => {
    console.log(err.stack)
    res.status(500).json({
        status: 'fail',
        code: 500,
        message: err.message,
        data: 'Internal Server Error',
    })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});
