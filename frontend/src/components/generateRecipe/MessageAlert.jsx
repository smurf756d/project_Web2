function MessageAlert({ errorMessage, successMessage }) {
  return (
    <>
      {errorMessage && (
        <p className="form-error-message">{errorMessage}</p>
      )}

      {successMessage && (
        <p className="form-success-message">{successMessage}</p>
      )}
    </>
  );
}

export default MessageAlert;