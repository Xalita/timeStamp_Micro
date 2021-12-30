const express = require ('express');
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose');
var strTime = require ('strftime');

const Person = require ('./model/person');


const app  = express();



mongoose.connect ('mongodb+srv://bruno:sarapita88@cluster0.5jn5b.mongodb.net/freeCode?retryWrites=true&w=majority')
    .then ( ()=> {
        console.log ('connected to database');
    })
    .catch ( (error)=> {
        console.log (error);
    })

app.use ('/style',express.static(__dirname + '/style'))


app.post ('/api/person', (req,res,next)=> {
    const person = new Person ({
        name: 'Bruno',
        age: 33,
        favoriteFoods: ['Batatas','cebolas']
    });

    person.save((err,data)=> {
        if (err) return console.error (err);
        console.log (data);
    })
})    


app.use(bodyParser.urlencoded({extended: false}));
app.use (bodyParser.json());



app.get ('/', (req,res,next)=> {
    // res.sendStatus(200);
    res.sendFile(__dirname + '/views/index.html')
})


let reqObj = {};

app.get ('/api/:date', (req,res,next) => {
    
    let {date} = req.params;


    if (date.includes('-')) {
        reqObj.unix = new Date(date).getTime();
        reqObj.utc = new Date(date).toUTCString();
        console.log (date);
    } else {
        date = parseInt(date);
        console.log (date);
        reqObj.unix = new Date(date).getTime();
        reqObj.utc = new Date(date).toUTCString();
    };

    if (!reqObj.unix || !reqObj.utc){
        res.json({
            error: 'Invalid Date'
        })

    }
    res.json(reqObj);
})


app.get ('/api', (req,res)=> {

    reqObj.unix = new Date ().getTime();
    reqObj.utc = new Date ().toUTCString();

    res.json(reqObj)
})



module.exports = app;