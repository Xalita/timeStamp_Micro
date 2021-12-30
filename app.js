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


app.get ('/api', (req,res)=> {
    res.json({
        unix: new Date ().getTime(),
        utc: new Date ().toUTCString()
    })
})

app.get ('/api/:date_str', (req,res,next) => {
    
    let {date_str} = req.params;

    let date = new Date (date_str);

    if (date.toString() === 'Invalid Date') {
        date = new Date(parseInt(date_str));
    };

    if (date.toString() === 'Invalid Date') {
        return res.json({
            error: 'Invalid Date'
        })
    } else {
        return res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        })
    }

})






module.exports = app;