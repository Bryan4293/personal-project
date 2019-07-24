const functions = require('firebase-functions');
const express = require('express');
const app = express();
app.use( express.static( `${__dirname}/../build` ) );
const {getAllVidFeeds, postVidFeed, getVidFeed, commentOnVid, viewerVidFeed, deleteVidFeed} = require('./handlers/vidFeeds');
const {uploadImage, uploadVideo, register, login, addUserDetails, getAuthUser, getUserDetails, markNotificationsRead} = require('./handlers/users');
const FBAuth = require('./utility/FBAuth');

const {db} = require('./utility/admin')


//Video Feed
app.get('/vidFeeds', getAllVidFeeds);
app.post('/vidFeed', FBAuth, postVidFeed);
app.get('/vidFeed/:vidFeedId', getVidFeed)
app.post('/vidFeed/:vidFeedId/comment', FBAuth, commentOnVid)
app.put('/vidFeed/:vidFeedId/viewer', FBAuth, viewerVidFeed)
app.delete('/vidFeed/:vidFeedId', FBAuth, deleteVidFeed)

// User Profile 
app.post('/user/image', FBAuth, uploadImage);
app.post('/user/video', FBAuth, uploadVideo)
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthUser);
app.get('/user/:handle', getUserDetails)
app.post('/notifications', FBAuth, markNotificationsRead)


//AuthUsers route
app.post('/register', register);
app.post('/login', login);


exports.api = functions.https.onRequest(app);

exports.createNotificationOnViewer = functions.region('us-central1').firestore.document('viewer/{id}')
    .onCreate((snapshot)=>{
       return db.doc(`/VidFeeds/${snapshot.data().vidFeedId}`).get()
            .then(doc => {
                if(doc.exists && doc.data(userHandle !== snapshot.data().userHandle)){
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender:snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        vidFeedId: doc.id
                    })
                }
            })
            .catch(err =>{
                console.error(err)
            })
    })

exports.createNotificationOnComment = functions.region('us-central1').firestore.document('comments/{id}')
    .onCreate((snapshot)=>{
       return db.doc(`/VidFeeds/${snapshot.data().vidFeedId}`).get()
            .then(doc => {
                if(doc.exists && doc.data(userHandle !== snapshot.data().userHandle)){
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender:snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        vidFeedId: doc.id
                    })
                }
            })
            .catch(err =>{
                console.error(err)
            })
    })
exports.onVidFeedDelete = functions.region('us-central1')
    .firestore.document('/VidFeeds/{vidFeedId}')
    .onDelete((snapshot, context) =>{
        const vidFeedId = context.params.vidFeedId;
        const batch= db.batch();
        return db.collection('comments').where('vidFeedId', '==', vidFeedId).get()
            .then(data =>{
                data.forEach(doc =>{
                    batch.delete(db.doc(`/comments/${doc.id}`));
                })
                return db.collection('viewer').where('vidFeedId', '==', vidFeedId).get();
            })
            .then(data =>{
                data.forEach(doc =>{
                    batch.delete(db.doc(`/viewer/${doc.id}`));
                })
                return db.collection('notifications').where('vidFeedId', '==', vidFeedId).get();
            })
            .then(data =>{
                data.forEach(doc =>{
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                });
                return batch.commit();
            })
            .catch(err => console.error(err));
    })
