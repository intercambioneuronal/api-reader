import fetch from 'node-fetch';
import { navigate} from './formatter.js';

export async function getContent(urlString){
    let result=""
    try {
        const response = await fetch(urlString)
        .then(res=>res.json()); 
        if (response) {
            result = navigate(response)
        }           
    } catch (error) {
        console.log("fetch fallido: no es una api activa")
        result=""
    }
    return result;
}
