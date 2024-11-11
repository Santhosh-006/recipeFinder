const searchBox = document.querySelector("#searchBox");
const searchBtn = document.querySelector("#searchBtn");
const recipeContainer = document.querySelector("#recipeContainer");
const recipeIngredients = document.querySelector("#recipeIngredients");

const fetchData = async (name) => {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const response = await data.json();
  console.log(response.meals[0]);
  response.meals.forEach((element, index) => {
    const recipeDiv = `
      <div class="bg-white border border-green-400 rounded-xl shadow px-10 py-5 mx-8 my-9">
        <img src="${element.strMealThumb}" alt="${element.strMeal}" class="w-52 object-contain my-1" />
        <p class="font-bold text-2xl my-1 text-center">${element.strMeal}</p>
        <p class="font-semibold text-xl my-1 text-center">${element.strArea} ${element.strCategory}</p>
        <div class="flex items-center justify-center">
          <button class="viewRecipe bg-green-800 rounded-2xl text-white hover:bg-green-600 px-4 py-2 my-2" data-index="${index}">
            View Recipe
          </button>
        </div>
      </div>`;
    recipeContainer.innerHTML += recipeDiv;
  });

  // Attach event listeners to all View Recipe buttons
  document.querySelectorAll('.viewRecipe').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      onPopUP(response.meals[index]);
    });
  });
};

searchBtn.addEventListener('click', (e) => {
  recipeContainer.innerHTML = "";
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
      <h1 class="font-bold text-3xl text-center">Ingredients</h1>
      <h1 class="font-bold text-2xl">${element.strMeal}</h1>
      <ul>${fetchIngredients(element)}</ul>
      <p class="font-bold text-2xl my-3"> Instructions </p>
      <p class="text-xl">${element.strInstructions}</p>
      <a href="${element.strYoutube}" target="_blank" class="text-center m-3 font-bold text-green-900 underline cursor-pointer">(Youtube Reference)</a>
    </div>`;

  // Re-attach the event listener for the close button
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener('click', () => {
    recipeIngredients.classList.remove('fixed');
    recipeIngredients.classList.add('hidden');
  });
};

