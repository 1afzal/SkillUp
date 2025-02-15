const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect("mongodb+srv://Afza1:Afzal123@secret.b5cmo.mongodb.net/SkillUp");

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
});

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true },
    creatorId: { type: String, required: true }
});

const adminSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String }
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};