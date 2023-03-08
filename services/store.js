import { localStorage } from './localStorage.mjs';
import {getDate} from './util.js'
export function getDomainURL(urlString){
    let result=""
    try {
        const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/i;
        const found = urlString.match(regex);  
        if(found){
            result= found[0];
        }  
    } catch (error) {
        console.log("getDomainURL fallido",error)
        result=null;
    }
    return result;
}
export async function saveLocal(url){
    let result=""
    try {
        const history = localStorage.getItem('history');
        let listHistory=[]
        if(history){
            listHistory=JSON.parse(history);
        }
        const domain=getDomainURL(url);
        const indexHistory=listHistory.findIndex(x=>x.domain===domain);
        let domainHistory=indexHistory!==-1?listHistory[indexHistory]:null;
        let listURLs=[]
        if(domainHistory){
            listURLs=domainHistory.urls;  
        }
        listURLs.push({
            url,
            accesed:getDate()
        });          
        domainHistory={
            domain,
            urls:listURLs
        }; 
        if(indexHistory!==-1){
            listHistory[indexHistory]=domainHistory;
        }
        else{
            listHistory.push(domainHistory);
        }   
        localStorage.setItem('history',JSON.stringify(listHistory));
                
    } catch (error) {
        console.log("saveLocal fallido",error)
        result=null;
    }
    return result;
}