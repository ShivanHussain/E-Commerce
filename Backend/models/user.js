import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: [true, "User Name is Required!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is Required!"],
        match: [/.+\@.+\..+/, "Please Enter The Valid Email Address!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        trim: true,
        minLength: 8
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    phone: {
        type: String,
        required: [true, "Phone Number is Required!"],
        trim: true,
        unique: true
    },
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        }
    ], 
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Order",

        }
    ]



}, { timestamps: true });



//password hash middleware
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();

});




//Match User entered password with to  hash password
userSchema.methods.matchPassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

}

const User = mongoose.model("User", userSchema);


export default User;