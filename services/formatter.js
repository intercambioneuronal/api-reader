import { emptyTags, conversiones } from "../settings.js";
import { isArray,isNumber,isObject } from "./util.js";

function tag(tagName) {
    let isEmpty = emptyTags.find(tag => tag == tagName) ? true : false
    if (isEmpty) {
        return `<${tagName} />`;
    }
    else {
        return `<${tagName}> </${tagName}>`;
    }
}
function addTagContent(tagString, content) {
    let tags = tagString.split(" ")
    let position = tags.length > 0 ? tags.length - 1 : 0;
    tags.splice(position, 0, content)
    return tags.join(" ");
}
function stringTagProperties(properties) {
    let result = ""
    for (let index = 0; index < properties.length; index++) {
        const property = properties[index];
        const key = Object.keys(property)[0]
        const value = Object.values(property)[0]
        const valueProp = isNumber(value) ? `${value}` : `"${value}"`
        result += ` ${key}=${valueProp}`
    }
    return result;
}
function addTagProperty(tagString, properties) {
    let result = ""
    let index = tagString.indexOf(" />")
    if (index == -1) {
        index = tagString.indexOf(">")
    }
    const end = tagString.length > 0 ? tagString.length - 1 : 0;
    result += tagString.substring(0, index)
    result += " " + stringTagProperties(properties)
    result += tagString.substring(index, end + 1)
    return result;
}
function getLengthContent(data) {
    let result = ""
    let content = ""
    const { etiqueta: etiqCont, clase: claseCont } =
        conversiones.find(eq => eq.tipo == "contador")
    let tagCont = tag(etiqCont)
    tagCont = addTagProperty(tagCont, [{ class: claseCont }])
    if (isArray(data)) {
        content = `[${data.length} items]`;
    }
    if (isObject(data)) {
        content = `{${Object.keys(data).length} keys}`;
    }
    if(content){
        result = addTagContent(tagCont, content)
    }    
    return result;
}
function hasList(value){
    if(typeof value!=="string"){
        return false;
    }
    return value.indexOf("</ul>")!=-1 || value.indexOf("</ol>")!=-1; 
}
function validateAPIURI(valor){
    let link=tag("a")
    let result=valor
    if(valor.indexOf("http")!==-1 && isImageURL(valor)){
      
        let spanImage=tag("span")
        let image=tag("img")
        image=addTagProperty(image,[{src:valor}])
        spanImage=addTagContent(spanImage,image)
        link=addTagProperty(link,[{href:valor},{target:"_blank"},
        {class:"thumbnail"}])
        link=addTagContent(link,valor+spanImage)
        result=link
    } 
    else if(valor.indexOf("http")!==-1 && valor.indexOf("/api/")!==-1){
        let querystring=encodeURI("/link/?url="+valor)
        link=addTagProperty(link,[{href:querystring},{target:"_blank"}])
        link=addTagContent(link,valor)
        result=link
    }  
    return result;
}
function isImageURL(url){
   
    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/); 
    if (url == null) {
        return false;
    }
    if (regex.test(url) == true) {   
        return true;
    }
    else {
        return false;
    }
}
function refillText(source,dest){
    
    let lengthSource=0
    let lengthDest=0    
    let sourceTemp=source===null?"":source.toString()
    let destTemp=dest===null?"":validateAPIURI(dest.toString())
    let nueva=destTemp
    if(sourceTemp){
        lengthSource= sourceTemp.length;
    }
    if(destTemp){
        lengthDest= destTemp.length;
    }
    //let copyhalf
    let ws="&nbsp;"
    if(lengthSource>lengthDest){        
        let half=Math.round((lengthSource-lengthDest)/2)
        //copyhalf=half
        let secondHalf=lengthSource-lengthDest-half
        secondHalf=secondHalf>0?secondHalf:0
        nueva=ws.repeat(2*secondHalf)+destTemp+ws.repeat(2*half)
    }
    return nueva;
}
function createTagClass(tipo,nueva){
    const { etiqueta, clase} = conversiones.find(eq => eq.tipo == tipo);
    let tagEtiq = tag(etiqueta)

    nueva =nueva?nueva:clase;
    tagEtiq=addTagProperty(tagEtiq, [{ class:nueva  }])    
    return tagEtiq;
}
function accessProperties(obj) {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    let tagProps = createTagClass("propiedades")
    let tagProp = createTagClass("propiedad")
    let tagDetails=tag("details")
    let tagSummary=tag("summary")
    let tagValProp = createTagClass("valorPropiedad")
    let tagNomProp = createTagClass("nombrePropiedad")   
    let tagKeys = ""
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = values[index];
        let lengthContent = getLengthContent(value);
        let valueFilled = navigate(value);
        let tagValPropFilled = tagValProp
        let newKey=key
        let newValue=valueFilled
        let btnCopiar=""
        if(!hasList(valueFilled)){
            newKey=refillText(valueFilled,key)  
            newValue=refillText(key,valueFilled)    
            tagValPropFilled = createTagClass("valorPropiedad","hoja")
            btnCopiar= tag("i")          
            btnCopiar= addTagProperty(btnCopiar,[
                {class:"copiar"},{onclick:"copyContent(event).apply(this,['"+valueFilled+"'])"}
            ])           
        }
        tagValPropFilled = addTagContent(tagValPropFilled, newValue+btnCopiar)
        let tagNomPropFilled = addTagContent(tagNomProp, newKey)
        let tagSummaryFilled= addTagContent(tagSummary,tagNomPropFilled +lengthContent )
        let keyValuePair =  tagSummaryFilled + tagValPropFilled
        let tagDetailsFilled=tagDetails
        if(lengthContent===""){           
            tagDetailsFilled=addTagProperty(tagDetails,[{open:""}])
        }
        tagDetailsFilled=addTagContent(tagDetailsFilled,keyValuePair)
        let tagPropFilled = addTagContent(tagProp, tagDetailsFilled)
        tagKeys += tagPropFilled
    }
    return addTagContent(tagProps, tagKeys);
}
function accessElements(obj) {
    let tagItems = createTagClass("elementos")
    let tagItem = createTagClass("elemento")
    let tagDetails=tag("details")
    let tagSummary=tag("summary")
    let tagIndElem = createTagClass("indiceElemento")
    let tagValElem = createTagClass("valorElemento")
    let tagsitems = ""
    for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        let lengthContent = getLengthContent(element);
        let valueFilled = navigate(element);
        let tagValElemFilled = tagValElem
        let newKey=index
        let newValue=valueFilled
        if(!hasList(valueFilled)){
            newKey=refillText(valueFilled,index)  
            newValue=refillText(index,valueFilled) 
            tagValElemFilled=createTagClass("valorElemento","hoja")
        }
        tagValElemFilled = addTagContent(tagValElemFilled, newValue)
        let tagIndElemFilled = addTagContent(tagIndElem, newKey)
        let tagSummaryFilled= addTagContent(tagSummary,tagIndElemFilled + lengthContent)
        let keyValuePair = tagSummaryFilled + tagValElemFilled
        let tagDetailsFilled=tagDetails
        if(lengthContent===""){
            tagDetailsFilled=addTagProperty(tagDetails,[{open:""}])
        }
        tagDetailsFilled=addTagContent(tagDetailsFilled,keyValuePair)
        let tagItemFilled = addTagContent(tagItem, tagDetailsFilled)
        tagsitems += tagItemFilled
    }
    return addTagContent(tagItems, tagsitems);
}

export function toggleVisible(elementHTML, classCSS) {
    elementHTML.classList.toggle(classCSS);
}
export function navigate(data) {
    if (isArray(data)) {
        return accessElements(data);
    }
    if (isObject(data)) {
        return accessProperties(data);
    }
    return data;
}