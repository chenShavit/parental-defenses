var http = require('http');
var express = require('express'),
    app = express();
var path = require('path');
port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var User = require('./users');
var Channel = require('./channel');
var consts = require('./consts');

mongoose.connect(consts.MLAB_KEY, (err => {
    if(err){

    };
    
    app.use('/assets', express.static(`${__dirname}/public`));
    app.all('*', (req, res, next) => {
        console.log('Check login');
        req.next();
    });

    app.get('/', (req,res) =>{
        res.redirect('/api');
    });
    app.get('/api', (req,res) =>{
        res.sendFile(path.join(__dirname + '/public/api.html'));
    });
    app.get('/getAllChannels', (req,res) =>{
        Channel.find()
            .then((doc) => {
                res.json(doc);
            });
    });

    app.post('/getChannelByNumber/:number', (req,res) =>{
        let number = req.params.number;
        Channel.find({
            'details.number_channel': number
        })
            .then((doc) => {
                res.json(doc);
            });
    });

    app.put('/getAllowedChannelByNumber/:number/:pass?', (req,res) =>{
        let number = req.params.number;
        let pass = req.params.pass;
        Channel.findOne({
            'details.number_channel': number,            
        })
            .then((doc) => {
                if(doc.isBlock==true){
                    if(pass==1234){
                        res.json(doc)
                    } else {
                        res.json({
                            status: "failed",
                            error: "channel is block. pass is wrong."
                        })
                    }
                } else{
                    res.json(doc);
                }                
            });
    });

    http.createServer(app).listen(port);
    console.log(`listening on ${port}`);
}));
    
    
