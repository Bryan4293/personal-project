const {db} = require('../utility/admin')

exports.getAllVidFeeds =  (req,res) =>{
    db
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
                createAt: doc.data().createAt,
                viewerCount: doc.data().viewerCount,
                userVideo : doc.data().userVideo
            });
        });
        return res.json(vidFeeds);
    })
    .catch((err) => console.error(err));
}

exports.postVidFeed = (req, res) =>{
    const newVidFeed = {
        body : req.body.body,
        userHandle : req.user.handle,
        userVideo: req.user.videoUrl,
        createAt : new Date().toISOString(),
        viewerCount:0,
        commentCount:0
    };

    db
        .collection('VidFeeds')
        .add(newVidFeed)
        .then(doc => {
            const resVidFeed = newVidFeed;
            resVidFeed.vidFeedId = doc.id;
            res.json(resVidFeed)
        })
        .catch(err => {
            res.status(500).json({error: 'monkaS Do not panic! Something is wrong!'});
            console.error(err);
        });
}

exports.getVidFeed =(req,res)=>{
    let videoData ={};
    db.doc(`/VidFeeds/${req.params.vidFeedId}`).get()
        .then(doc =>{
            if(!doc.exists){
                res.status(404).json({error: 'VidFeed not found'})
            }
            videoData = doc.data();
            videoData.vidFeedId= doc.id;
            return db.collection('comments').orderBy('createAt', 'desc').where('vidFeedId','==', req.params.vidFeedId).get()
        })
        .then(data =>{
            videoData.comments= [];
            data.forEach(doc =>{
                videoData.comments.push(doc.data())
            })
            return res.json(videoData);
        })
        .catch(err =>{
            console.error(err);
            res.status(500).json({error: err.code})
        });
}

exports.commentOnVid = (req,res) =>{
    if(req.body.body.trim()=== '') return res.status(400).json({comment: 'Must not be empty'})
    const newComment = {
        body: req.body.body,
        createAt: new Date().toISOString(),
        vidFeedId: req.params.vidFeedId,
        userHandle:req.user.handle,
        userVideo: req.user.videoUrl
    }

    db.doc(`/VidFeeds/${req.params.vidFeedId}`).get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({error: 'VidFeed not found'})
            }
            return doc.ref.update({ commentCount: doc.data().commentCount + 1})
        })
        .then(()=>{
            return db.collection('comments').add(newComment)
        })
        .then(() =>{
            res.json(newComment)
        })
        .catch(err =>{
            console.error(err)
            res.status(500).json({error: 'Something is wrong'})
        })
}

exports.viewerVidFeed= (req, res) =>{
    const viewerDocument= db.collection('viewer').where('userHandle', '==', req.user.handle)
        .where('vidFeedId', '==', req.params.vidFeedId).limit(1)

    const vidFeedDoc = db.doc(`/VidFeeds/${req.params.vidFeedId}`)

    let vidFeedData;

    vidFeedDoc.get()
        .then(doc =>{
            if(doc.exists){
                vidFeedData = doc.data();
                vidFeedData.vidFeedId = doc.id;
                return viewerDocument.get();
            } else {
                return res.status(404).json({error: 'VidFeed not found'})
            }
        })
        .then(data =>{
            if(data.empty){
                return db.collection('viewer').add({
                    vidFeedId : req.params.vidFeedId,
                    userHandle: req.user.handle
                })
                .then(() =>{
                    vidFeedData.viewerCount++
                    return vidFeedDoc.update({ viewerCount: vidFeedData.viewerCount })
                })
                .then(()=>{
                    return res.json(vidFeedData)
                })
            } else {
                return res.status(400).json({error : 'VidFeed already viewed'})
            }
        })
        .catch(err =>{
            console.error(err)
            res.status(500).json({ error: err.code})
        })
}

exports.deleteVidFeed = (req,res) =>{
    const document = db.doc(`/VidFeeds/${req.params.vidFeedId}`);
    document.get()
        .then(doc =>{
            if(!doc.exists){
                return res.status(403).json({error: 'VidFeed not found'})
            }
            if(doc.data().userHandle !== req.user.handle){
                return res.status(403).json({ error: 'Unauthorized'})
            } else {
                return document.delete();
            }
        })
        .then(()=>{
            res.json({ message: 'MIND CRASHED'})
        })
        .catch(err =>{
            console.error(err)
            return res.status(500).json({error: err.code})
        })
}