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
    submitButton.classList.add('btn-primary-loading')
    submitButton.innerHTML = "Submitting..."
    // const widgetId = '#cf-widget'
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
            submitButton.classList.remove('btn-primary-loading')
            submitButton.innerHTML = "Let’s go"
            errorElement.style.display = "block"
            errorMessageElement.innerHTML = data.message
            // turnstile.reset(widgetId)
        }
    }).catch(error => {
         submitButton.disabled = false
         submitButton.classList.remove('btn-primary-loading')
         console.error(error)
        //  turnstile.reset(widgetId)
    })
}

// function handleTurnstileToken(token) {
//     document.getElementById('cf-turnstile-response').value = token;
// }

document.addEventListener('DOMContentLoaded', function() {
    // document.querySelector('.cf-turnstile').setAttribute('data-callback', 'handleTurnstileToken');

    const form = document.querySelector('.cf-turnstile'); // Select the form by class name
    const widgetId = '#cf-widget'

    if (form) {
        form.onsubmit = function(event) {
            turnstile.reset(widgetId)
        };
    }
});