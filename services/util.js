export const isNumber = function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}
/*
export function parseNull(str) {
    let parsed
    try {
        parsed = JSON.parse(str);
    } catch (e) {
        parsed = null;
    }
    return parsed;
}*/
export function isArray(array) {
    return Array.isArray(array)
}
export function isObject(obj) {
    return typeof obj === 'object' && obj !== null && !isArray(obj)
};

function pad2(n) { return n < 10 ? '0' + n : n }
export function getDate(){
    let date = new Date();
    return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds() );    
}
