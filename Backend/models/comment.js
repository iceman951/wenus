const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    text: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createDate: {type: Date, default: Date.now}
},{
    collection: 'comments'
});
const comment = mongoose.model("Comment", Schema);

module.exports = comment;