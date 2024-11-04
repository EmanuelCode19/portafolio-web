const years = document.querySelector('.year');
const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#mail');
const inputTel = document.querySelector('#tel');
const inputMatter = document.querySelector('#matter');
const inputMsg = document.querySelector('#msg');
const spinner = document.querySelector('.spinner')
const btn = document.querySelector('#btnSubmit');

document.addEventListener('DOMContentLoaded',() => {

    const date = new Date()
    const year = date.getFullYear()
    years.innerHTML = year

    inputName.addEventListener('blur',testInput)
    inputEmail.addEventListener('blur',testInput)
    inputTel.addEventListener('blur',testInput)
    inputMatter.addEventListener('blur',testInput)
    inputMsg.addEventListener('blur',testInput)
    form.addEventListener('submit',testForm)
})

function testInput(e){
    if(e.target.value === ""){
        showError(`El campo ${e.target.name} es obligatorio`,e.target.parentElement)
        return
    }
    if(e.target.id === "mail" && !testEmail(e.target.value)){
        showError('email no valido',e.target.parentElement)
        return
    }

    removeAlert(e.target.parentElement)

}

function testForm(e){
    e.preventDefault()
    if(inputEmail.value === "" || inputName.value === "" || inputMatter.value === "" || inputTel.value === "" || inputMsg.value === ""){
        showError('Todos los campos son obligatorios',form)
        setTimeout(() => {
            const error = form.querySelector('.error');
            if(error){
                error.remove()
            }
        }, 3000);
        return
    }
    spinner.classList.remove('hidden')
    spinner.classList.add('flex')
    // codigo de envio de email
    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_ylw6cap';
 
    emailjs.sendForm(serviceID, templateID, this)
     .then(() => {
       btn.value = 'Send Email';
       spinner.classList.add('hidden')
       form.reset()
       window.alert('Mensaje Enviado')
     }, (err) => {
       btn.value = 'Send Email';
       alert(JSON.stringify(err));
     });

    // fin de codigo envio de email
    
    
}

function showError(msg,refer){
    const error = refer.querySelector('.error');
    if(error){
        error.remove()
    }
    const alert = document.createElement('p')
    alert.textContent = msg;
    alert.classList.add('alerta','error')
    refer.appendChild(alert)

}

function testEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const result = regex.test(email)
    return result
}

function removeAlert(refer){
    const error = refer.querySelector('.error');
    if(error){
        error.remove()
    }
}

