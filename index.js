const years = document.querySelector('.year');

document.addEventListener('DOMContentLoaded',() => {

    const date = new Date()
    const year = date.getFullYear()
    years.innerHTML = year
})