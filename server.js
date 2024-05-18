const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 24119;

// 보안
const helmet = require('helmet');
const cors = require('cors');
app.use(cors());
app.use(helmet());

require('dotenv').config();

app.use(express.urlencoded({extended : true}));

const router = require('./src/app');
const router_toy = require('./src/toy');
app.use('/api', router);
app.use('/toy', router_toy);
app.use('/', (req, res) => {
    console.log('Server.js OK');
    res.status(200).json('OK');
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    console.log(req.url);
    error.status = 404;
    next(error);
});
                                                                                                                                                           
app.listen(port, (err) => {
    if(err) console.log(err);
    console.log(`서버가 가동중입니다. 포트 : ${port}`);
});