const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const firebase = require('firebase')
const app = express();

admin.initializeApp();


const firebaseConfig = {
    apiKey: "AIzaSyCDunNMgpnDpJSya8G1UX4viiYddOJm17Q",
    authDomain: "peasonal-project.firebaseapp.com",
    databaseURL: "https://peasonal-project.firebaseio.com",
    projectId: "peasonal-project",
    storageBucket: "peasonal-project.appspot.com",
    messagingSenderId: "862816420045",
    appId: "1:862816420045:web:abce19922bdea87f"
  };

  firebase.initializeApp(firebaseConfig)


  app.get('/vidFeeds', (req,res) =>{
    admin.firestore()
    .collection('VidFeeds')
    .orderBy('createAt', 'desc')
    .get()
    .then(data =>{
        let vidFeeds =[]
        data.forEach(doc =>{
            vidFeeds.push({
                vidFeedId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createAt: doc.data().createAt
            });
        });
        return res.json(vidFeeds);
    })
    .catch((err) => console.error(err));
});

app.post('/vidFeed',(req, res) =>{
    const newVidFeed = {
        body : req.body.body,
        userHandle : req.body.userHandle,
        createAt : new Date().toISOString()
    };

    admin.firestore()
        .collection('VidFeeds')
        .add(newVidFeed)
        .then(doc => {
            res.json({message : `document ${doc.id} created successfully`})
        })
        .catch(err => {
            res.status(500).json({error: 'monkaS Do not panic! Something is wrong!'});
            console.error(err);
        });
});

exports.api = functions.https.onRequest(app);