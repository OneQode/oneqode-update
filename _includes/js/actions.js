// document
//   .getElementById("cloud-signup-email")
//   .addEventListener("input", function () {
//     clearTimeout(this.delay);
//     this.delay = setTimeout(() => {
//       verifyEmail(this.value);
//     }, 2000);
//   });

// function verifyEmail(email) {
//   const apiKey = "RMT2UUD6C20KI91LI9R3";
//   const url = `https://api.mailboxvalidator.com/v1/validation/single?key=${apiKey}&email=${email}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.is_verified === "True") {
//         document.getElementById("emailResult").innerText =
//           "Valid email address.";
//       } else {
//         document.getElementById("emailResult").innerText =
//           "Invalid email address.";
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

async function createCloudUser(event) {
  event.preventDefault();

  // Get and update some HTML Elements

  const formContent = document.getElementById("cloud-signup-content");
  const submitButton = document.getElementById("cloud-sign-up-form-submit");
  const errorElement = document.getElementById("cloud-sign-up-error");
  const errorMessageElement = document.getElementById(
    "cloud-sign-up-error-message"
  );
  const successElement = document.getElementById("cloud-sign-up-success");
  const successMessageElement = document.getElementById(
    "cloud-sign-up-success-message"
  );
  errorElement.style.display = "none";
  successElement.style.display = "none";

  // Prepare form values and use as an object
  const formData = new FormData(event.target);
  let formObj = {};
  for (const [fieldName] of formData) {
    const fieldValue = formData.getAll(fieldName);
    formObj[fieldName] =
      fieldValue.length == 1 ? fieldValue.toString() : fieldValue;
  }

  // Our form's submission endpoint
  const serverUrl = "https://staging.billing.as140627.net/cloudsignup.php";

  // Display loading buttton as process of form submission is starting
  submitButton.disabled = true;
  submitButton.classList.add("btn-primary-loading");
  submitButton.innerHTML = "Submitting...";

  // Prepare post data parameters
  // Note: cf-turnstile-response field will be available when you installed turnstile on client side properly (https://developers.cloudflare.com/turnstile/get-started/)
  const parameters = {
    firstname: formObj["1_first_name"],
    lastname: formObj["2_last_name"],
    email: formObj["3_email"],
    password2: formObj["4_password"],
    turnstileResponse: formObj["cf-turnstile-response"],
  };

  // Get our turnstile widget ID
  const widgetId = "#cf-widget";

  // Submit post data to endpoint
  fetch(serverUrl, {
    method: "POST",
    body: JSON.stringify(parameters),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const { data } = res;

      if (data?.result == "success") {
        // Handle sucesssful registration
        formContent.style.display = "none";
        successElement.style.display = "block";
        successMessageElement.innerHTML = `We've sent you a link to verify your email address. Once verified, your OneQode Cloud service will activate. Please check your inbox at ${formObj["3_email"]}`;
      } else if (data?.result == "error") {
        // Reset UI states for a failed registration response due to registration errors
        submitButton.disabled = false;
        submitButton.classList.remove("btn-primary-loading");
        submitButton.innerHTML = "Let’s go";
        errorElement.style.display = "block";
        errorMessageElement.innerHTML = data.message;

        // Resets the turnstile widget. We need to generate a new `cf-turnstile-response, as we can only use it once in the server.
        turnstile.reset(widgetId);
      }
    })
    .catch((error) => {
      // Reset UI states for a failed registration response due to unknown errors
      submitButton.disabled = false;
      submitButton.classList.remove("btn-primary-loading");
      console.error(error);
      turnstile.reset(widgetId);
    });
}
