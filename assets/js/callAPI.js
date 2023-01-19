const url = "https://rickandmortyapi.com/api/character"

let pointerNumber = 1
let pointerNext = null
let pointerPrev = null

async function callAPI (url) {
    try {
        let apiResponse = await fetch(url)
        let {results, info} = await apiResponse.json()
        pointerNext = info.next
        pointerPrev = info.prev 
        printCards( results )
    } catch {
        printCards( "noResult" )
    }  
}

function printCards ( results ) {

    let displayError = document.querySelector("#displayError")
    let gridCard = document.querySelector(".grid-card")
    let sectionCharacters = document.querySelector("#characterSection")
    let sectionPagination = document.querySelector("#paginationSection")

    if( results !== "noResult" ) {
        gridCard.innerHTML = ""
        displayError.classList.replace("error-view","error-hidden")
        sectionCharacters.classList.remove("hidde")
        sectionPagination.classList.remove("hidde")
        results.forEach( element => {
            let {name, status, species, image} = element 
            let iconImageStatus 
            let iconImagespecies
            if( status === "Alive")
                iconImageStatus = "assets/images/alive-icon.png"
            else if( status === "Dead") 
                iconImageStatus = "assets/images/dead-icon.png"
            else 
                iconImageStatus = "assets/images/unknow-icon.png"
            if( species === "Human")
                iconImagespecies = "assets/images/human-icon.png"
            else 
                iconImagespecies = "assets/images/alien-icon.png"

            let card = document.createElement("section")
            card.setAttribute("class","card")
            card.innerHTML =  `  
                <div class="card__header">
                    <img src="${image}" alt="card-img">
                </div>
                <div class="card__body">
                    <p class="character-name">${name}</p>
                    <div class="character-info">
                        <span class="character-status">
                            <img src="${iconImageStatus}" alt="" class="status-img">
                            <p class="status-text">${status}</p>   
                        </span>
                        <span class="character-status">
                            <img src="${iconImagespecies}" alt="" class="status-img">
                            <p class="status-text">${species}</p>
                        </span>
                    </div>
                </div>
            `;
            gridCard.appendChild( card )  
            
        })
    } else {
        displayError.classList.replace("error-hidden","error-view")
        sectionCharacters.classList.add("hidde")
        sectionPagination.classList.add("hidde")
    }
    
}


callAPI( url )


/* pagination of characters */

let prevPag = document.querySelector("#prev")
let nextPag = document.querySelector("#next")
let numberText = document.querySelector(".page")

prevPag.addEventListener("click", toPrevPag )
nextPag.addEventListener("click", toNextPag )


function toPrevPag() {
    if(pointerPrev !== null) {
        pointerNumber -= 1
        numberText.textContent = pointerNumber
        callAPI( pointerPrev )
    }
}

function toNextPag() {
    if(pointerNext !== null) {
        pointerNumber += 1
        numberText.textContent = pointerNumber
        callAPI( pointerNext )
    }
}


/* search by name in input */

let inputSearch = document.querySelector("#search")
inputSearch.addEventListener("keyup", search)

function search() {
    let textSearch = inputSearch.value
    callAPI(`${url}/?name=${textSearch}`)
} 