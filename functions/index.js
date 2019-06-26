require('dotenv').config()
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const firebase = require('firebase')
const app = express();
const {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID}=process.env

admin.initializeApp();


  firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
  })


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