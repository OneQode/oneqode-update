async function createCloudUser(event) {
  event.preventDefault();

  // Get and update some HTML Elements
  const submitButton = document.getElementById("cloud-sign-up-form-submit");
  const errorElement = document.getElementById("cloud-sign-up-error");
  const errorMessageElement = document.getElementById(
    "cloud-sign-up-error-message"
  );
  errorElement.style.display = "none";

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

  // Get user's ip data using IPinfo
  let country;
  try {
    const ipInfo = await fetch(`https://ipinfo.io/json?token=9a0c888a083a9e`);
    const ipInfoJson = await ipInfo.json();

    // We only utilize country for our ipinfo data
    country = ipInfoJson.country || "AF";
  } catch (error) {
    console.error(error);
    // Defaults to Afghanistan if ipinfo fails to get the data. Usually its because of adblockers
    country = "AF";
  }

  // Prepare post data parameters
  // Note: cf-turnstile-response field will be available when you installed turnstile on client side properly (https://developers.cloudflare.com/turnstile/get-started/)
  const parameters = {
    firstname: formObj["1_first_name"],
    lastname: formObj["2_last_name"],
    email: formObj["3_email"],
    password2: formObj["4_password"],
    turnstileResponse: formObj["cf-turnstile-response"],
    country: country,
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

      if (data?.result == "success" && data?.redirect_url) {
        // Handle sucesssful registration (redirects us to redirect_url provided by the endpint response)
        submitButton.innerHTML = "Success!";
        window.location.replace(data.redirect_url);
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
