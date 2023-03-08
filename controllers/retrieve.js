import { getContent } from "../services/converter.js";
import { navigate } from "../services/formatter.js";
import { localStorage } from "../services/localStorage.mjs";
import { saveLocal } from "../services/store.js";

const postData=async (req,res)=>{
    const url=req.body.url;
   
    let results=await getContent(url)
    if(results){
        res.render('results',{results:results,message:""});  
        await saveLocal(url);     
    }
    else{
        res.render('results',{results:results,message:"Api no disponible"});
    }    
}
const getLink=async (req,res)=>{
    const url=req.query.url;
  
    let results=await getContent(url)
    if(results){
        res.render('results',{results:results,message:""});
        await saveLocal(url);
    }
    else{
        res.redirect(url);
    }    
}
const getHistory=async (req,res)=>{
    try {      
        
    const historyString = localStorage.getItem('history');
    
    let history
    let results

    if(historyString){     
        history=JSON.parse(historyString);
        results=await navigate(history);
    }    

    if(results){
        res.render('results',{results:results,message:""});        
    }    
    else{
        res.render('results',{results:results,message:"Historial vacío"});
    }       
    } catch (error) {
        console.log("history",error);
    }
    
}
export default {postData,getLink,getHistory}