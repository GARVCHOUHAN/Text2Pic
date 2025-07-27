import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    plan: { type: String, required: true ,enum: ['Basic', 'Advanced', 'Business'] },
    credits: { type: Number, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    payment:{type:Boolean, default:false}
})

export const transaction = mongoose.models.transaction || mongoose.model("transaction",transactionSchema)