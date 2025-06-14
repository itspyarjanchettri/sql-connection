import mongoose, { Schema } from "mongoose";

const signInSchema = new Schema({
    user_name: {
        type:String,
        require: true
    },
    user_password: {
        type:String,
        require: true
    }
})

const SignIn = mongoose.model("SignIn", signInSchema);
export default SignIn; 