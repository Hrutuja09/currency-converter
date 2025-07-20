let baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let selectElement = document.querySelectorAll(".dropdown1")
let msg = document.querySelector(".formula")
let button = document.querySelector(".button")
let input = document.querySelector("input")
let fromCurr = document.querySelector(".from-container .dropdown1")
let toCurr = document.querySelector(".to-container .dropdown1")

selectElement.forEach((eachSelect) => {
    for(key in  countryList){
    let countryCode = key
    let options = document.createElement("option")
    options.innerText = countryCode
    options.value = countryCode
    eachSelect.append(options)
    }
    eachSelect.addEventListener("change", (evt)=>{
        updateFlag(evt.target) // select passed

    })
});

let updateFlag = (element)=>{

    let code = countryList[element.value]
    let new_src = `https://flagsapi.com/${code}/flat/64.png`
    //let imgs = element.parentElement.parentElement.lastElementChild.querySelector('img')
    let container = element.closest(".from-container") || element.closest(".to-container");
    let imgs = container.querySelector("img");
    imgs.src = new_src
}

button.addEventListener("click", async (evt)=>{
    evt.preventDefault()
    let amt = input.value
    if(amt==="" || amt <1){
        amt = 1
        input.value = "1"
    }
    let url = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url)
    let jsonData = await response.json()
    let rate = jsonData[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    msg.innerText = `${amt} ${fromCurr.value} = ${(rate*amt).toFixed(2)} ${toCurr.value}`
})








