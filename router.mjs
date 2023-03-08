import express from 'express';
import retrieve from './controllers/retrieve.js'
const router= express.Router();

router.get('/',(req,res)=>{
    res.render("index");
})
router.post("/",retrieve.postData);
router.get("/link",retrieve.getLink);
router.get("/history",retrieve.getHistory)
export {router};