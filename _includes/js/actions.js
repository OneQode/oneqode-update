function createCloudUser(event) {
    event.preventDefault();

    const submitButton = document.getElementById("cloud-sign-up-form-submit")
    const errorElement = document.getElementById("cloud-sign-up-error");
    const errorMessageElement = document.getElementById("cloud-sign-up-error-message");

    errorElement.style.display = "none"

    const formData = new FormData(event.target);
    let formObj = {};
    
    for (const [fieldName] of formData) {
        const fieldValue = formData.getAll(fieldName);
        formObj[fieldName] = fieldValue.length == 1 ? fieldValue.toString() : fieldValue
    }

    const parameters = {
        firstname: formObj['1_first_name'],
        lastname: formObj['2_last_name'],
        email: formObj['3_email'],
        password2: formObj['4_password'],
        turnstileResponse: formObj['cf-turnstile-response']
    }

    const serverUrl = 'https://staging.billing.as140627.net/cloudsignup.php';

    submitButton.disabled = true
    submitButton.innerHTML = "Submitting..."
    fetch(serverUrl, {
        method: 'POST',
        body: JSON.stringify(parameters),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        return res.json()
    }).then(res => {
        const { data } = res
        if(data?.result == 'success' && data?.redirect_url) {
            submitButton.innerHTML = "Success!"
            window.location.replace(data.redirect_url);
        }else if(data?.result == 'error') {
            submitButton.disabled = false
            submitButton.innerHTML = "Let’s go"
            errorElement.style.display = "block"
            errorMessageElement.innerHTML = data.message
        }
    }).catch(error => {
         submitButton.disabled = false
         console.error(error) 
    }).finally(() => {
        turnstile.reset("#cloud-signup-cf-widget")
    })
}