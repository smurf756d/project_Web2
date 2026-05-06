import "../styles/recipesPages.css";

function HelpTips() {
  const tips = [
    {
      icon: "bi-lightbulb",
      title: "How to Generate a Recipe",
      text: "Enter the ingredients you have, choose your diet preference, cooking time, and cuisine type, then click Generate Recipe.",
    },
    {
      icon: "bi-heart",
      title: "Saving Favorites",
      text: "Click the heart icon on any recipe card to save it to your Favorites page.",
    },
    {
      icon: "bi-pencil-square",
      title: "Editing Recipes",
      text: "Use the edit button to update recipe name, ingredients, cooking time, or calories.",
    },
    {
      icon: "bi-trash",
      title: "Deleting Recipes",
      text: "Use the delete button to remove a recipe. A confirmation message will appear before deleting.",
    },
    {
      icon: "bi-egg-fried",
      title: "Healthy Cooking Tip",
      text: "Try replacing fried ingredients with grilled or baked options to make meals lighter.",
    },
    {
      icon: "bi-clock",
      title: "Save Time",
      text: "Choose quick recipes when you have limited time, and save your favorite ones for later.",
    },
  ];

  return (
    <div className="my-recipes-page">
      <section className="my-recipes-main">
        <header className="my-topbar">
          <div>
            <h2>Help & Tips</h2>
            <p>Learn how to use Smart Kitchen Hub easily</p>
          </div>

          <div className="topbar-actions">
            <button className="icon-btn">
              <i className="bi bi-question-circle"></i>
            </button>
          </div>
        </header>

        <section className="help-hero">
          <div>
            <h3>Need help?</h3>
            <p>
              Here are simple tips to help you generate, save, edit, and manage
              your recipes.
            </p>
          </div>
          <i className="bi bi-stars"></i>
        </section>

        <section className="help-grid">
          {tips.map((tip, index) => (
            <div className="help-card" key={index}>
              <div className="help-icon">
                <i className={`bi ${tip.icon}`}></i>
              </div>
              <h4>{tip.title}</h4>
              <p>{tip.text}</p>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default HelpTips;