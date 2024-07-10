import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    facebookId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const User = mongoose.model('User', userSchema);
export default User;
