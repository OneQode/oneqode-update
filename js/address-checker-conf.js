var verifiedContent = document.getElementById("ccc-verified-content");
var unverifiedContent = document.getElementById("ccc-unverified-content");
var warningContent = document.getElementById("ccc-warning-content");

var ccc = {
  // Update this list to include any valid postcodes
  validPostcodes: [4020],

  // Place your google api key here
  googleApiKey: "AIzaSyConSk2Ir_73RtmiwgjhX4vpoqj6Gqr9sM", //OneQode's api key

  // When the user inputs a valid address it can be access on this object
  address: null,

  // Call back to handle a verified address being received
  // By default this updates the DOM to show the verified content div
  onVerified: function (address) {
    unverifiedContent.style.display = "none";
    verifiedContent.style.display = "block";
    warningContent.style.display = "none";
  },

  // As above but for for the unverified div
  onUnverified: function (address) {
    unverifiedContent.style.display = "block";
    verifiedContent.style.display = "none";
    warningContent.style.display = "none";
  },

  // Hides both the verified and unverified content
  onReset: function () {
    unverifiedContent.style.display = "none";
    verifiedContent.style.display = "none";
    warningContent.style.display = "none";
  },

  // A function that validates the input Address
  // If the function returns an error message this is passed to the onWarning function below
  validate: function (address) {
    if (!address.streetNumber) return "A street number is required.";
    return null; //return null if no errors
  },

  // Displays the warning content
  // Render the message wherever you want, in this case the first <p> tag inside the warning content div
  onWarning: function (message) {
    unverifiedContent.style.display = "none";
    verifiedContent.style.display = "none";
    warningContent.style.display = "block";
    warningContent.querySelector("p").innerHTML = message;
  },
};
