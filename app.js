//linking elements
const popularRecipes = document.querySelector(".popularRecipes");
const popTitle = document.querySelector(".popTitle");
const searchResultsDisplay = document.querySelector(".searchResultsDisplay");
const results = document.querySelector(".results");
const form = document.querySelector(".search-container");


//bases for the urls
const base_url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=57661dc6&app_key=b32f8dba88a4c1cf0e2ce35a99409a6f&random=true`;
const random = "&q=popular";

//User Search
function getUserSearch(){
    let userSearchValue = document.querySelector(".userSearch").value;
    
    
    async function fetchSearchResultsAPI(){
    try{
        const response = await fetch(base_url + "&q=" + userSearchValue);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
    async function generateResultsHTML() {
    let recipes = await fetchSearchResultsAPI();
    let html = "";
    recipes.hits.forEach(recipe => {
      let generatedHTML = `
        <div class="item">
        <a href="${recipe.recipe.url}" class="recipe-link">
        <div class="recipe-group">
                <img class="recipe-img" src="${recipe.recipe.image}" alt=${recipe.recipe.label}>
            <h4 class="title">${recipe.recipe.label}</h4>
        </div>
        </a>
        </div>`;
        html += generatedHTML;

    });
    searchResultsDisplay.innerHTML = html;
} 
results.classList.remove("hidden");
popularRecipes.classList.add("hidden");
popTitle.classList.add("hidden");
generateResultsHTML();
}





//fetching API for each section
async function fetchRandomAPI(){
    try{
        const response = await fetch(base_url + random);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

//generating html for the recipe cards
async function generateRandomHTML() {
    let recipes = await fetchRandomAPI();
    let html = "";
    recipes.hits.forEach(recipe => {
      let generatedHTML = `
        <div class="item">
        <a href="${recipe.recipe.url}" class="recipe-link">
          <img class="recipe-img" src="${recipe.recipe.image}" alt=${recipe.recipe.label}>
            <h4 class="title">${recipe.recipe.label}</h4>
        </a>
        </div>`;
        html += generatedHTML;

    });
    popularRecipes.innerHTML = html;
}

generateRandomHTML();


//stop form from refreshing page
function handleForm(e) {e.preventDefault();}
form.addEventListener('submit', handleForm);
