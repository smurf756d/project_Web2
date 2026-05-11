import { useState } from "react";
import "../styles/GenerateRecipe.css";

import MessageAlert from "../components/generateRecipe/messageAlert";
import IngredientForm from "../components/generateRecipe/ingredientForm";
import RecipePreview from "../components/generateRecipe/recipePreview";

function GenerateRecipe() {
  const [ingredient, setIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);

  const [dietPreference, setDietPreference] = useState("Healthy");
  const [maxCookingTime, setMaxCookingTime] = useState("30 - 60 mins");
  const [cuisineType, setCuisineType] = useState("Any");

  const [recipePreview, setRecipePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refining, setRefining] = useState(false);
 const[isSaved,setIsSaved]=useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [refineMessage, setRefineMessage] = useState("");

  const handleAdd = () => {
    const trimmedIngredient = ingredient.trim();

    if (trimmedIngredient === "") {
      setErrorMessage("Please enter an ingredient.");
      return;
    }

    if (ingredientsList.includes(trimmedIngredient)) {
      setErrorMessage("This ingredient is already added.");
      return;
    }

    setIngredientsList([...ingredientsList, trimmedIngredient]);
    setIngredient("");
    setErrorMessage("");
  };

  const handleRemove = (indexToRemove) => {
    const updatedList = ingredientsList.filter(
      (_, index) => index !== indexToRemove
    );

    setIngredientsList(updatedList);
  };

  const handleGenerateRecipe = async () => {
    if (ingredientsList.length === 0) {
      setErrorMessage("Please add at least one ingredient first.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const res = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredientsList,
          diet: dietPreference,
          cookingTime: maxCookingTime,
          cuisine: cuisineType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate recipe");
      }

      setRecipePreview(data.data);
      setIsSaved(false);
    } catch (err) {
      setErrorMessage(err.message || "Error generating recipe.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!recipePreview) {
      setErrorMessage("No recipe to save.");
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipePreview),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save recipe");
      }

      setSuccessMessage("Recipe saved successfully!");
      setIsSaved(true);
    } catch (err) {
      setErrorMessage(err.message || "Error saving recipe.");
    } finally {
      setSaving(false);
    }
  };

  const handleRefineRecipe = async () => {
    if (!recipePreview) {
      setErrorMessage("Generate a recipe first.");
      return;
    }

    if (refineMessage.trim() === "") {
      setErrorMessage("Please write what you want to change.");
      return;
    }

    try {
      setRefining(true);
      setErrorMessage("");
      setSuccessMessage("");

      const res = await fetch("/api/recipes/refine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe: recipePreview,
          userMessage: refineMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to refine recipe");
      }

      setRecipePreview(data.data);
      setIsSaved(false);
      setRefineMessage("");
      setSuccessMessage("Recipe updated by AI successfully!");
    } catch (err) {
      setErrorMessage(err.message || "Error refining recipe.");
    } finally {
      setRefining(false);
    }
  };

  return (
    <div className="generate-recipe-page">
      <div className="page-header mb-4">
        <h1 className="page-title">Generate Recipe</h1>

        <MessageAlert
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <IngredientForm
            ingredient={ingredient}
            setIngredient={setIngredient}
            ingredientsList={ingredientsList}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            dietPreference={dietPreference}
            setDietPreference={setDietPreference}
            maxCookingTime={maxCookingTime}
            setMaxCookingTime={setMaxCookingTime}
            cuisineType={cuisineType}
            setCuisineType={setCuisineType}
            handleGenerateRecipe={handleGenerateRecipe}
            loading={loading}
          />
        </div>

        <div className="col-lg-6">
          <RecipePreview
            recipePreview={recipePreview}
            refineMessage={refineMessage}
            setRefineMessage={setRefineMessage}
            handleRefineRecipe={handleRefineRecipe}
            refining={refining}
            handleSaveRecipe={handleSaveRecipe}
            saving={saving}
            isSaved={isSaved}
          />
        </div>
      </div>
    </div>
  );
}

export default GenerateRecipe;