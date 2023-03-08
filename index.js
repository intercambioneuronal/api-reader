import fetch from 'node-fetch';
import { navigate,toggleVisible } from './services/formatter.js';
import { app } from './app.mjs';

/*
const urlString=document.getElementById("urlapi")?.textContent
const btnMostrar=document.getElementById("mostrar")
// https://pokeapi.co/api/v2/pokemon/ditto


window.addEventListener("load", async function (event) {
    const response = await fetch(urlString)
    .then(res=>res.json());    
    btnMostrar.addEventListener("click",()=>{
        let parsed = parseNull(response)
        if (parsed) {
            document.getElementById("contentApi").innerHTML = navigate(parsed)
        }
        Array.from(document.getElementsByTagName("property")).forEach(item => {
            item.addEventListener('click', event => {                
                let value = event.currentTarget.nextElementSibling;
                toggleVisible(value, "hide")
            })
        })        
    })
});
*/