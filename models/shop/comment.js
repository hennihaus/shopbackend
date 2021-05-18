let mongoose = require('mongoose');


let commentSchema = new mongoose.Schema({
    rating: {type: Number, required: true},
    comment:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    articleId:{type:mongoose.Schema.Types.ObjectId,required:true},
    date:{type:String,required:true}
});

const commentModel = mongoose.model('comment',commentSchema);

module.exports = commentModel;

