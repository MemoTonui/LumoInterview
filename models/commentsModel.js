import mongoose from 'mongoose';
var Schema = mongoose.Schema;
const commentsSchema = new Schema({
    comment:{
        type:String,
        required: true
    },
    user:  {
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    post:  {
      type:Schema.Types.ObjectId,
      ref:'Posts'
    },
    created_at: {
    type:Date,
    default:Date.now
    },
  
 
});

const Comments = mongoose.model('Comments',commentsSchema);

export default Comments;