const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema({
    lugar: { type: Types.ObjectId, ref: 'Place'},
    opnião: { type: String, required: true },
    usuário: { type: Types.ObjectId, ref: 'User'},
}, 
{
    timestamps: true,

});


const Review = model('Review', reviewSchema);

module.exports = Review;