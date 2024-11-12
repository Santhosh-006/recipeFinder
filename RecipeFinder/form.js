let ingredientCount = 1;

// Add event listener for the "Add More Ingredients" button
document.getElementById('addIngredient').addEventListener('click', function () {
  ingredientCount++;

  // Create new ingredient input fields dynamically
  const ingredientDiv = document.createElement('div');
  ingredientDiv.classList.add('ingredient-item', 'my-4');

  ingredientDiv.innerHTML = `
    <label for="ingredient${ingredientCount}" class="block">Ingredient ${ingredientCount}:</label>
    <input
      type="text"
      id="ingredient${ingredientCount}"
      name="ingredient${ingredientCount}"
      class="w-full p-2 border rounded mb-2"
      placeholder="Enter ingredient"
    />
    <label for="measure${ingredientCount}" class="block">Measure ${ingredientCount}:</label>
    <input
      type="text"
      id="measure${ingredientCount}"
      name="measure${ingredientCount}"
      class="w-full p-2 border rounded mb-2"
      placeholder="Enter measurement"
    />
  `;

  // Append the new ingredient fields to the container
  document.getElementById('ingredientsContainer').appendChild(ingredientDiv);
});

// Handle form submission and store data in localStorage
document.getElementById('recipeForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Collecting form data
  const formData = {
    strMeal: document.getElementById('strMeal').value,
    strCategory: document.getElementById('strCategory').value,
    strArea: document.getElementById('strArea').value,
    strInstructions: document.getElementById('strInstructions').value,
    ingredients: [],
  };

  // Collecting ingredients and their measures
  for (let i = 1; i <= ingredientCount; i++) {
    const ingredient = document.getElementById(`ingredient${i}`).value;
    const measure = document.getElementById(`measure${i}`).value;
    if (ingredient && measure) {
      formData.ingredients.push({ ingredient, measure });
    }
  }

  // Collect optional data
  formData.strSource = document.getElementById('strSource').value || null;
  formData.strTags = document.getElementById('strTags').value || null;
  formData.strYoutube = document.getElementById('strYoutube').value || null;

  // Store the data in localStorage
  localStorage.setItem('recipeData', JSON.stringify(formData));

  // Display the recipe data in the console (optional)
  console.log('Recipe saved:', formData);

  alert('Recipe saved to localStorage!');
});
