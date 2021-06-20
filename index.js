// initial event listener:
document.addEventListener('DOMContentLoaded', function () {
    getDietRecipe()
});

//variables:

// modal variables & onclick start

const shoppingListModal = document.getElementById('shopping-list-modal')

const shoppingListBtn = document.getElementById("shoppinglist-btn")

const shoppingListcloseBtn = document.getElementById('close-btn')

const shoppingListContentBox = document.getElementById('shopping-list-content')

shoppingListBtn.onclick = function() {
    shoppingListModal.style.display = "block";
}

shoppingListcloseBtn.onclick = function() {
    shoppingListModal.style.display = "none";
}

shoppingListcloseBtn.onclick = function(event) {
    if (event.target == shoppingListcloseBtn) {
        shoppingListModal.style.display = "none";
    }
}

// modal variables & onclick end

const apiKey = 'bc377e8b364e4674ae12b9115c888191'

const selectedRecipes = document.getElementById("selectednav")

const d = document.getElementById('diets');

const i = document.getElementById('intolerances')

const n = document.getElementById('number')

const c = document.getElementById('cuisine')

const recipeContainer = document.getElementById('recipe-container')

const recipeUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=&number=100`

var dietObj;

let dietChoice = d.value

let intolerancesChoice = i.value

let numberChoice = n.value

let cuisineChoice = c.value

let clearShoppingList = document.getElementById('clear-shopping-list-btn')

let filterButton = document.getElementById('filter');

//event listeners:

d.addEventListener("change", function () {
    dietChoice = d.value
})

i.addEventListener("change", function () {
    intolerancesChoice = i.value
})

n.addEventListener("change", function () {
    numberChoice = n.value
})

c.addEventListener("change", function () {
    cuisineChoice = c.value
})

filterButton.addEventListener('click', function () {
    getFilterRecipe()
})



//functions:

function renderDietData(diet) {
    
        const dietCard = document.createElement('div')
        dietCard.innerHTML += `
            <div class='card' id='${diet.id}'>
                <h2> ${diet.title} </h2>
                <img src='${diet.image}'>
                
            </div>
            ` 
        recipeContainer.appendChild(dietCard)
    
        dietCard.addEventListener('click', () => showRecipe(diet.id))
  
}


function getFilterRecipe() {
    recipeContainer.innerHTML = ""
    return fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${dietChoice}&intolerances=${intolerancesChoice}&cuisine=${cuisineChoice}&number=${numberChoice}`)
        .then((res) => res.json())
        .then((data) => {
            data.results.forEach(dietFilter => {
                renderDietData(dietFilter)
            })
        })

}


function getDietRecipe() {
    return fetch(recipeUrl)
        .then((res) => res.json())
        .then((dietData) => {
            dietData.results.forEach(diet => {
                renderDietData(diet)
            })

        })



    }
    function showRecipe(id) {
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => dietObj = data)
            .then(() => {
                const recipeSelectedList = document.createElement('ul')
                const shoppingListContent = document.createElement('ul')
                recipeSelectedList.innerHTML += `
        <p class='ingredients-list' id='${dietObj.id}'>
            <p> -${dietObj.title} <p>
        </p>
        `
        clearShoppingList.addEventListener('click', function () {
            recipeSelectedList.innerHTML = ""
            shoppingListContent.innerHTML = ""
            
        })       
        let ingredients = "";
                dietObj.extendedIngredients.forEach(ingredient => {
                    ingredients += `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort}  ${ingredient.name}, `
                    console.log(dietObj.extendedIngredients)
                })

                shoppingListContent.innerHTML += `
                <p> ${ingredients} <p>
                `
                selectedRecipes.appendChild(recipeSelectedList)
                shoppingListContentBox.appendChild(shoppingListContent)
                
            })
            
    }
