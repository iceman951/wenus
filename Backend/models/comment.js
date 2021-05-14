const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createDate: {type: Date, default: Date.now}
},{
    collection: 'comments'
});
const comment = mongoose.model("Comment", schema);

module.exports = comment;