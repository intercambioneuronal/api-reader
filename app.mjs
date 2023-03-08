import express from 'express';
import { PORT } from './config.js';
import { router } from './router.mjs'; 

const app= express()
app.set('view engine','ejs')
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express("json"))
app.use('/',router);

app.listen(PORT,()=>{
    console.log("server corriendo")
})

export {app};