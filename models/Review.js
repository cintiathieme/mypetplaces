const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema({
    lugar: { type: Types.ObjectId, ref: 'Place'},
    desc: { type: String, required: true },
    emissor: { type: Types.ObjectId, ref: 'User'},
    nota: { type: Number },
}, 
{
    timestamps: true,

});

    
const Review = model('Review', reviewSchema);

module.exports = Review;