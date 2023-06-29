import mongoose from 'mongoose';
var Schema = mongoose.Schema;
const userSchema = new Schema({
    userName:{
        type:String,
        required: true
    },
   fullNames:{
      type:String,
      required: true
  },
    imgUrl:{
        type:String,
        default:""
    },
    email:  {
        type:String,
        required: true,
        unique: true
    },
    bio: {
        type:String,
        required: true
    },
    phone: {
        type:String,
        required: true,
        unique: true
    },
    followers:{
        type: Number,
        default: 0
    },
    following:{
        type: Number,
        default: 0
    },
    posts:[{
      type:Schema.Types.ObjectId,
      ref:'Posts'
  }],
 
});

const User = mongoose.model('User',userSchema);

export default User;