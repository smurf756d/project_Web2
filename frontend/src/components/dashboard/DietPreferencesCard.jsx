import { useState, useEffect } from "react";

const DietPreferencesCard = ({ preferences, onSavePreferences }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(preferences);

  // Update localPreferences when parent preferences change (but not while editing)
  useEffect(() => {
    if (!isEditing) {
      setLocalPreferences(preferences);
    }
  }, [preferences, isEditing]);

  const handleToggle = (key) => {
    setLocalPreferences((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleSave = () => {
    onSavePreferences(localPreferences);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalPreferences(preferences);
    setIsEditing(false);
  };

  return (
    <div className="dashboard-card h-100">
      <h5 className="section-card-title mb-4">Diet Preferences</h5>

      <div className="d-flex flex-column gap-3">
        {localPreferences.map((preference) => (
          <div
            className="d-flex justify-content-between align-items-center"
            key={preference.key}
          >
            <span>{preference.label}</span>

            {isEditing ? (
              <button
                type="button"
                className={`btn btn-sm ${
                  preference.enabled ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => handleToggle(preference.key)}
              >
                {preference.enabled ? "Enabled" : "Disabled"}
              </button>
            ) : (
              <span className="badge bg-light text-dark border">
                {preference.enabled ? "Enabled" : "Disabled"}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {isEditing ? (
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              type="button"
              className="btn btn-light border"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-light border"
            onClick={() => setIsEditing(true)}
          >
            Edit Preferences
          </button>
        )}
      </div>
    </div>
  );
};

export default DietPreferencesCard;