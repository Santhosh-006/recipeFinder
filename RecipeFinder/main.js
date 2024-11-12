const searchBox = document.querySelector("#searchBox");
const searchBtn = document.querySelector("#searchBtn");
const recipeContainer = document.querySelector("#recipeContainer");
const recipeIngredients = document.querySelector("#recipeIngredients");

const fetchData = async (name) => {
  recipeContainer.innerHTML = `<p class="col-start-2 font-semibold text-2xl my-1 text-center animate-pulse">Fetching Data</p>`
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await data.json();
  // console.log(response.meals[0]);
  if(!response.meals){
    recipeContainer.innerHTML = `<p class="col-start-2 font-semibold text-2xl my-1 text-center animate-pulse">Search results Not Found</p>`
    return
  }
  recipeContainer.innerHTML = ``
  response.meals.forEach((element) => {
    const recipeDiv = `
      <div class="bg-white border border-green-400 rounded-xl shadow px-10 py-5 mx-8 my-9">
        <img src="${element.strMealThumb}" alt="${element.strMeal}" class="w-52 object-contain my-1" />
        <p class="font-bold text-2xl my-1 text-center">${element.strMeal}</p>
        <p class="font-semibold text-xl my-1 text-center">${element.strArea} ${element.strCategory}</p>
        <div class="flex items-center justify-center">
          <button class="viewRecipe bg-green-800 rounded-2xl text-white hover:bg-green-600 px-4 py-2 my-2">
            View Recipe
          </button>
        </div>
      </div>`;
    recipeContainer.innerHTML += recipeDiv;
  });
  
  // Attach event listeners after all recipes have been rendered
  document.querySelectorAll('.viewRecipe').forEach((button, index) => {
    button.addEventListener('click', () => {
      onPopUP(response.meals[index]);
    });
  });
  

};

searchBtn.addEventListener('click', (e) => {
  recipeContainer.innerHTML = "";
  recipeContainer.parentElement.classList.remove("hidden")
  e.preventDefault();
  const name = searchBox.value.trim();
  fetchData(name);
});

const fetchIngredients = (meal) => {
  const recipeList = [];
  for (let i = 1; i <= 20; i++) {
    const ingredients = meal[`strIngredient${i}`];
    if (ingredients) {
      const measure = meal[`strMeasure${i}`];
      recipeList.push(`<li class="font-semibold text-xl  list-disc">${measure} ${ingredients}</li>`);
    } else {
      break;
    }
  }
  return recipeList.join('');
};

const onPopUP = (element) => {
  recipeIngredients.classList.remove('hidden');
  recipeIngredients.classList.add('fixed');
  recipeIngredients.innerHTML = `
    <i class="fa-solid fa-x text-green-400 font-bold p-1 my-2 mx-3 text-right bg-red-600 rounded close"></i>
    <div class="py-3 px-20 mx-20">
      <h1 class="font-bold text-4xl text-center">Ingredients</h1>
      <h1 class="font-bold text-2xl">${element.strMeal}</h1>
      <ul>${fetchIngredients(element)}</ul>
      <p class="font-bold text-2xl my-3"> Instructions </p>
      <p class="text-xl">${element.strInstructions}</p>
      <a href="${element.strYoutube}" target="_blank" class="text-center m-3 font-bold text-green-900 underline cursor-pointer">(Youtube Reference)</a>
    </div>`;

  // Attach the event listener to the close button right after it's rendered
    recipeIngredients.querySelector(".close").addEventListener('click', () => {
    recipeIngredients.classList.remove('fixed');
    recipeIngredients.classList.add('hidden');
  });
};
