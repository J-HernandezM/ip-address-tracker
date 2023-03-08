//API DECLARATION
const API = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_xkI7FX8VM66XUixd8yIbWD9LXed7p'
let map
//INFORMATION CONTAINERS TAGS
const ipbox = document.querySelector('.ip')
const locationbox = document.querySelector('.location')
const timezonebox = document.querySelector('.timezone')
const ispbox = document.querySelector('.isp')
//SEARCH FEATURE TAGS
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
//CALLING THE FUNCTION FOR THE FIRST TIME THE WEBSITE IS LOADED
calls(API)
//REQUESTING THE DATA
async function fetchData(urlApi){
    const response = await fetch(urlApi)
    const data = response.json()
    return data
}
//CALLING THE DATA AND THE REPLACE FEATURES
async function calls(urlApi, isDom){
    let informacion = await fetchData(urlApi)
    //REPLACING THE DATA AND EVALUATING IF THE INPUT IS A DOMAIN OR AN IP
    if(isDom){
        ipbox.innerHTML = informacion.as.domain
    }
    else{
        ipbox.innerHTML = informacion.ip
    }

    locationbox.innerHTML = `${informacion.location.city}, ${informacion.location.country} ${informacion.location.postalCode}`
    timezonebox.innerHTML = informacion.location.timezone
    ispbox.innerHTML = informacion.isp
    //MAPA
    map = L.map('map').setView([informacion.location.lat, informacion.location.lng], 13)
}
//SEARCH FEATURE 
btn.addEventListener('click', (event)=>{
    let typeOfParent = event.target.parentElement.type
    let userInput
    let isDomain
    //EVALUATE IF THE BTN WAS CLICKED OR THE ARROW
    if(typeOfParent=='button'){
        userInput=event.target.parentElement.form[0].value
    }
    else{
        userInput=event.target.form[0].value
    }

    //EVALUATE IF THE INPUT IS A DOMAIN OR AN API AND PASS THE INPUT TO THE CALL FUNCTION
    let ipOrDomain = parseInt(userInput[0])
    if(isNaN(ipOrDomain)){
        isDomain=true
        calls(`${API}&domain=${userInput}`, isDomain)
    }
    else{
        isDomain=false
        calls(`${API}&ipAddress=${userInput}`, isDomain)
    }
})
input.addEventListener('keyup', (event)=>{
    if(event.keyCode===13){
        let userInput=event.target.value
        let ipOrDomain = parseInt(userInput[0])
        if(isNaN(ipOrDomain)){
            isDomain=true
            calls(`${API}&domain=${userInput}`, isDomain)
        }
        else{
            isDomain=false
            calls(`${API}&ipAddress=${userInput}`, isDomain)
        }
    }
})