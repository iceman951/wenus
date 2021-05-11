const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    createDate: {type: Date, default: Date.now},
    text: { type: String },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
},{
    collection: 'comments'
});
const comment = mongoose.model("Comment", Schema);

module.exports = comment;