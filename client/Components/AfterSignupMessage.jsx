import React from 'react';

const AfterSignupMessage = () => {
  const handleClosePopup = () => {
    window.location.href = 'http://localhost:3000'; 
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-icon" onClick={handleClosePopup}>&times;</span>
        <h2>Thank you for signing up as a volunteer!</h2>
        <p>
          We have received your application. Our team will review it, and we will send you an email within 5 business days to inform you if your application has been approved.
        </p>
        <p>
          In the meantime, if you have any questions or need assistance, please feel free to <a href="mailto:patchcareconseling@gmail.com">contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default AfterSignupMessage;
