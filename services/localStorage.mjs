import {LocalStorage} from 'node-localstorage';
let localStorage
if (typeof localStorage === "undefined" || localStorage === null) {    
    localStorage = new LocalStorage('./scratch');
}
export {localStorage};