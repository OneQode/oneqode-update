async function createCloudUser(event) {
  event.preventDefault();

  const submitButton = document.getElementById("cloud-sign-up-form-submit");
  const errorElement = document.getElementById("cloud-sign-up-error");
  const errorMessageElement = document.getElementById("cloud-sign-up-error-message");

  errorElement.style.display = "none";

  const formData = new FormData(event.target);
  let formObj = {};

  for (const [fieldName] of formData) {
    const fieldValue = formData.getAll(fieldName);
    formObj[fieldName] = fieldValue.length == 1 ? fieldValue.toString() : fieldValue;
  }

  const serverUrl = "https://billing.oneqode.com/cloudsignup.php";

  submitButton.disabled = true;
  submitButton.classList.add("btn-primary-loading");
  submitButton.innerHTML = "Submitting...";
  const widgetId = "#cf-widget";

  let country;
  try {
    const ipInfo = await fetch(`https://ipinfo.io/json?token=9a0c888a083a9e`);
    const ipInfoJson = await ipInfo.json();

    country = ipInfoJson.country || "AF";
  } catch (error) {
    console.error(error);
    country = "AF";
  }

  const parameters = {
    firstname: formObj["1_first_name"],
    lastname: formObj["2_last_name"],
    email: formObj["3_email"],
    password2: formObj["4_password"],
    turnstileResponse: formObj["cf-turnstile-response"],
    country: country,
  };

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
        submitButton.innerHTML = "Success!";
        window.location.replace(data.redirect_url);
      } else if (data?.result == "error") {
        submitButton.disabled = false;
        submitButton.classList.remove("btn-primary-loading");
        submitButton.innerHTML = "Let’s go";
        errorElement.style.display = "block";
        errorMessageElement.innerHTML = data.message;
        turnstile.reset(widgetId);
      }
    })
    .catch((error) => {
      submitButton.disabled = false;
      submitButton.classList.remove("btn-primary-loading");
      console.error(error);
      turnstile.reset(widgetId);
    });
}
