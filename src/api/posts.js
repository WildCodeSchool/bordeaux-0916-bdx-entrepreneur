'use strict'
//All the get, post, put/create Restfull/crud methods.
// Post Model of Mongoose requiring the blog.js file from src/models
let Post = require('../models/blog');


module.exports = (router) => {
    //mounting router method to get crud restFull api
    router.get('/posts', function(req, res) {
        Post.find({}, function(err, posts) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(posts);
        });
    });

    //get post by id
    router.get('/posts/:id', function(req, res) {
        Post.findById(req.params.id, function(err, post) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(post);
        });
    });

    //post method with router prefix
    router.post('/posts/', function(req, res) {
        let post = req.body;
        // post data to database using the Post model
        Post.create(post, function(err, post) {
            if (err) {
                return res.status(500).json({
                    err: err.message
                });
            }
            res.json({
                'post': post,
                message: 'Post Created'
            });
        });
    });

    //TODO: Add PUT route to uodate existng entries

    // add :id params at end of /posts route.
    router.put('/posts/:id', function(req, res) {
        //id variable assigned request.parameters.identification of express modeule
        let id = req.params.id;
        // post variable is locally assigned the requested body
        let post = req.body;
        //
        if (post && post._id !== id) {
            return res.status(500).json({
                err: 'Ids do not match!'
            })
        }
        //Post model of mongoose finds id and update.
        Post.findByIdAndUpdate(id, post, {
            new: true
        }, function(err, post) {
            if (err) {
                return res.status(500).json({
                    err: err.message
                });
            }
            res.json({
                'post': post,
                message: 'Post Updated'
            });
        });
    });

    //TODO: Add DELETE route to create new entries
    router.delete('/posts/:id', function(req, res) {
        Post.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(500).json({
                    err: err.message
                });
            } else {
                res.sendStatus(200);
            }
        })
    })
}
