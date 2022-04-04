const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req, res){
    try{
        // likes/toggle/?id=abcdeef&type=Post
        let likeable;
        let deleted = false;
        
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else if(req.query.type == 'Comment'){
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if a like already exists
        let existingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        })

        // if like already exist then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }else{
            let newLike= await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.status(200).json({
            message: "Request Successful",
            data: {
                deleted: deleted
            }
        })

        // return res.redirect('back');

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
        // return res.redirect('back');
    }
}