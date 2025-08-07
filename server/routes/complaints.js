import { Router } from "express";

const router = Router();

router.post('/submit-complaint', (req,res)=>{
    const body = req.body;
    return res.status(200).json({'msg':'complaint send'})
})

export default router;