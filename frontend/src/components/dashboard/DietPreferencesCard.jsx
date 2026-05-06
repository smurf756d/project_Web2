const DietPreferencesCard = ({ preferences }) => {
  return (
    <div className="dashboard-card h-100">
      <h5 className="section-card-title mb-3">Diet Preferences</h5>

      <ul className="list-unstyled mb-3">
        {preferences.map((preference) => (
          <li
            className="d-flex justify-content-between align-items-center mb-2"
            key={preference.id}
          >
            <span>{preference.label}</span>
            <span
              className={
                preference.enabled
                  ? "badge text-bg-success"
                  : "badge text-bg-light border text-dark"
              }
            >
              {preference.enabled ? "Enabled" : "Disabled"}
            </span>
          </li>
        ))}
      </ul>

      <button type="button" className="btn btn-light border rounded-3">
        Edit Preferences
      </button>
    </div>
  );
};

export default DietPreferencesCard;