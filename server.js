const express = require('express');
const app = express();
const cors = require('cors');
const bp = require('body-parser');
const fs = require('fs');
const path = require('path');
const connectionString = 'mongodb+srv://admin:firstapp@cluster0.paqpn.mongodb.net/test?retryWrites=true&w=majority';

const MongoClient = require('mongodb').MongoClient

//set this before any post, get or use. this sets the view engine
app.set('views', path.join(__dirname + '/public/views'))

app.set('view engine', 'ejs');

app.use(cors());
app.use(bp.urlencoded({
    extended : false
}));

app.use(bp.json());

app.use(express.static('./public/'))


//read, get is the read part of crud
// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + '/public/index.html');
// });

app.get('/about', (req,res)=>{
    res.sendFile(__dirname + '/public/views/about.html');
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/public/views/login.html')
});

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/public/views/register.html')
});

//post is create in CRUD

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  })
  .then( client =>{

    console.log('Connected to Database');

    //this sets the db name
    const db = client.db('firstapp');

    //creates a collection
    const usersCollection = db.collection('users');

    //app.use();

    //read
    app.get('/', (req,res)=>{
        
        db.collection('users').find().toArray()
            .then(results=> {
                res.render('index.ejs', { users: results});
            })
            .catch(err=> console.log(err));
           
    });

    //create
    app.post('/signin', (req,res)=>{
        usersCollection.insertOne(req.body)
        .then(result=>res.redirect('/'))
            .catch(err=>console.log(err));
    });
    //app.listen();

    //put udate
    app.put('/signin', (req, res)=>{
        usersCollection.findOneAndUpdate(
            {email: 'ajlaston@gmail.com'},
            {
                $set : {
                    email: req.body.email,
                    password: req.body.password
                }
            },
            {
                upsert: true
            }
        )
        .then(result=>{
            res.json('Success')
        })
        .catch(error=>console.error(error))
      });
    
    //delete
    app.delete('/signin', (req,res)=>{
        usersCollection.deleteOne(
            {email : req.body.email}
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
              }
            res.json(`Deleted`)
          })
          .catch(error => console.error(error))
    });

  })
  .catch(err=>console.error(err));
  

app.listen(3000, ()=>console.log('listening on port 3000 using CORS'));

