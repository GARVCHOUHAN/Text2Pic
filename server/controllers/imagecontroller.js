import { user } from "../models/usermodel.js"
import FormData from 'form-data'
import axios from 'axios'

export const generateImage = async(req, res) => {
    try {

        const userId = req.userId; // or req.user._id
        const { prompt } = req.body;

        const users = await user.findById(userId)

        if(!users || !prompt ){
            return res.json({success:false,message:"Missing details"})
        }

        if(users.creditBalance === 0 || users.creditBalance < 0){
            return res.json({success:false,message:"No credit balance",creditBalance: users.creditBalance})
        }

        const formData = new FormData()
        formData.append('prompt' , prompt)

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
             headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data,'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await user.findByIdAndUpdate(users._id,{creditBalance:users.creditBalance -1})

        res.json({success:true,message:"Image generated", creditBalance: users.creditBalance -1 , resultImage})
        
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}