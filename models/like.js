const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    // this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used to define the type of object liked since this is a dynamic reference
    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;