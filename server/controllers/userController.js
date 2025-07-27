// import { user } from "../models/usermodel.js";
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import razorpay from 'razorpay'
// import { transaction } from "../models/transactionModel.js";

// export const registerUser = async(req,res) => {
//     try {
//         const {name, email , password} = req.body
//         if(!name || !email || !password){
//             return res.json({success:false, message:"Missing details"})
//         }
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt)

//         const userData = {
//             name,
//             email,
//             password:hashedPassword
//         }

//         const newUser = new user(userData)
//         const usere = await newUser.save()

//         console.log('JWT_SECRET:', process.env.JWT_SECRET);
//         const token = jwt.sign({id:usere._id.toString()},process.env.JWT_SECRET)

//         res.json({success:true, token , user: {name:usere.name,
//             creditBalance: usere.creditBalance 
//         }})

//     } catch (error) {
//         res.json({success:false,message:error.message})
//     }
// }

// export const loginUser =async (req,res) => {
//     try {
//         const {email,password} = req.body
//         const usere = await user.findOne({email})
//         if(!usere){
//             return res.json({success:false,message:"user has not signed up"})
//         }
//         const isMatch = await bcrypt.compare(password,usere.password) 
//         if(!isMatch){
//             return res.json({success:false,message:"invaid credentials"})
//         }
//         const token =  jwt.sign({id:usere._id},process.env.JWT_SECRET)
//         return res.json({success:true, token , user: {name:usere.name, creditBalance: usere.creditBalance}})
//     } catch (error) {
//         return res.json({success:false,message:error.message})
//     }
// }

// export const userCredits = async (req, res) => {
//     try {
//         const users = await user.findById(req.userId); // Use userId from JWT
//         res.json({ success: true, creditBalance: users.creditBalance, user: { name: users.name } });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export const paymentRazorpay = async (req, res) => {
//     try {
//         const { userId, planId } = req.body;
       
//         const userData = await user.findById(req.body.userId);
//          if (!userId || !planId) {
//             return res.json({ success: false, message: "Missing userId or planId" });
//         }
//         let plan, credits, amount,date;
//         switch (planId) {
//             case "Basic":
//                 // Handle basic plan payment
//                 plan = 'Basic'
//                 credits = 100
//                 amount = 10
//                 break;
//             case "Advanced":
//                 // Handle advanced plan payment
//                 plan = 'Advanced'
//                 credits = 500
//                 amount = 50
//                 break;
//             case "Business":
//                 // Handle business plan payment
//                 plan = 'Business'
//                 credits = 5000
//                 amount = 250
//                 break;
        
//             default:
//                 return res.json({ success: false, message: "Invalid planId" });
//         }
//         date  = Date.now();
//         const transactionData = {
//             userId,plan, credits, amount, date
//         };

//         const newTransaction = await transaction.create(transactionData);
//         const razorpayInstance = new razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET
//         });

//         const options = {
//             amount: amount * 100, // Amount in paise
//             currency: "INR",
//             receipt: newTransaction._id.toString(),
//         };

//         await razorpayInstance.orders.create(options,(error, order) => {
//             if (error) {
//                 return res.json({ success: false, message: "Failed to create order", error: error.message });
//             }
//             res.json({ success: true, order });
//         });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export const verifyPayment = async (req, res) => {
//     try {
//         const { paymentId, orderId, signature, userId } = req.body;

//         const orderInfo = await razorpayInstance.orders.fetch(orderId);
//         if (orderInfo.status == 'paid') {
//             const transactionData = await transaction.findById(orderInfo.receipt);
//             if(transactionData.payment){
//                 return res.json({ success: false, message: "Payment already verified" });
//             }
//             const userData = await user.findById(transactionData.userId);
//             const creditBalance = userData.creditBalance + transactionData.credits;
//             await user.findByIdAndUpdate(userData.id, { creditBalance });

//             await transaction.findByIdAndUpdate(transactionData._id, { payment: true });
//             return res.json({ success: true, message: "Payment verified successfully", creditBalance });
//         }
//         else {
//             return res.json({ success: false, message: "Payment verification failed" });
//         }

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

import { user } from "../models/usermodel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import { transaction } from "../models/transactionModel.js";

export const registerUser = async(req,res) => {
    try {
        const {name, email , password} = req.body
        if(!name || !email || !password){
            return res.json({success:false, message:"Missing details"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = { name, email, password:hashedPassword }
        const newUser = new user(userData)
        const usere = await newUser.save()
        const token = jwt.sign({id:usere._id.toString()},process.env.JWT_SECRET)
        return res.json({success:true, token , user: {name:usere.name, creditBalance: usere.creditBalance }})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export const loginUser =async (req,res) => {
    try {
        const {email,password} = req.body
        const usere = await user.findOne({email})
        if(!usere){
            return res.json({success:false,message:"user has not signed up"})
        }
        const isMatch = await bcrypt.compare(password,usere.password) 
        if(!isMatch){
            return res.json({success:false,message:"invaid credentials"})
        }
        const token =  jwt.sign({id:usere._id},process.env.JWT_SECRET)
        return res.json({success:true, token , user: {name:usere.name, creditBalance: usere.creditBalance}})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export const userCredits = async (req, res) => {
    try {
        console.log(req.userId)
        const users = await user.findById(req.userId); // Use userId from JWT
        if (!users) return res.json({ success: false, message: "User not found" });
        res.json({ success: true, creditBalance: users.creditBalance, user: { name: users.name } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const paymentRazorpay = async (req, res) => {
    try {
        const { planId } = req.body;
        if (!req.userId || !planId) {
            return res.json({ success: false, message: "Missing userId or planId" });
        }
        let plan, credits, amount, date;
        switch (planId.toLowerCase()) {
            case "Basic":
                plan = 'Basic'
                credits = 100
                amount = 10
                break;
            case "Advanced":
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;
            case "Business":
                plan = 'Business'
                credits = 5000
                amount = 250
                break;
            default:
                return res.json({ success: false, message: "Invalid planId" });
        }
        date  = Date.now();
        const transactionData = {
            userId: req.userId, plan, credits, amount, date
        };

        const newTransaction = await transaction.create(transactionData);
        const razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: newTransaction._id.toString(),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                return res.json({ success: false, message: "Failed to create order", error: error.message });
            }
            res.json({ success: true, order });
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { paymentId, orderId, signature } = req.body;
        const razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const orderInfo = await razorpayInstance.orders.fetch(orderId);
        if (orderInfo.status == 'paid') {
            const transactionData = await transaction.findById(orderInfo.receipt);
            if(transactionData.payment){
                return res.json({ success: false, message: "Payment already verified" });
            }
            const userData = await user.findById(transactionData.userId);
            const creditBalance = userData.creditBalance + transactionData.credits;
            await user.findByIdAndUpdate(userData.id, { creditBalance });
            await transaction.findByIdAndUpdate(transactionData._id, { payment: true });
            return res.json({ success: true, message: "Payment verified successfully", creditBalance });
        }
        else {
            return res.json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}