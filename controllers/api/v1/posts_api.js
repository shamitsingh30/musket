const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        options: { sort: { 'createdAt': -1 } }
    });

    // let users = await User.find({});

    return res.status(200).json({
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        // console.log(post.user);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.status(200).json({
                message: "Post and associated comments deleted successfully!"
            })

        }else{
            return res.status(401).json({
                message: "You cannot delete this post"
            });
        }
        
    }catch(err){
        return res.json(500, {
            message: "internal server error"
        });
    }
        
};