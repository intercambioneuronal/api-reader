function toggleVisible(elementHTML,classCSS){    
    elementHTML.classList.toggle(classCSS);
}
Array.from(document.getElementsByTagName("property")).forEach(item => {
    item.addEventListener('click', event => {                
        let value = event.currentTarget.nextElementSibling;
        toggleVisible(value, "hide")
    })
})   
const copyContent = event =>{    
    let myevent=event
    return async(text)=>{  
            
            try {               
            await navigator.clipboard.writeText(text);
            console.log('Content copied to clipboard');
            myevent.target.textContent="copiado"
            setTimeout(()=>{
                myevent.target.textContent=""
            },5000)

            } catch (err) {
            console.error('Failed to copy: ', err);
            }
    }
  }  