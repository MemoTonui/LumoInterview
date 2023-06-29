import mongoose from 'mongoose';
var Schema = mongoose.Schema;
const postSchema = new Schema({
    postTitle:{
        type:String,
        required: true
    },
   postContent:{
      type:String,
      required: true
  },
    imgUrl:{
        type:String,
        default:""
    },
    user:  {
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    comments:[{
      type:Schema.Types.ObjectId,
      ref:'Comments'
  }],
    created_at: {
    type:Date,
    default:Date.now
    },
  
 
});

const Post = mongoose.model('Posts',postSchema);

export default Post;