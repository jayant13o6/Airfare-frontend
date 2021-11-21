export const showAlert = (message, type)=>{
    document.getElementById('alerts').innerHTML=`<div class='alert alert-${type}'><strong>${message}</strong></div>`
    document.getElementById('alerts').classList.remove('d-none')
    setTimeout(()=>{
        document.getElementById('alerts').classList.add('d-none')
        document.getElementById('alerts').innerHTML='';
    },3000)
}

