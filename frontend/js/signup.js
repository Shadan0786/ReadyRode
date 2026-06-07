const signupForm = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Creating Account...";

    const formData = new FormData(signupForm);
    const userData = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Account created successfully! Let's get you logged in.");
            window.location.href = 'login.html';
        } else {
            alert("Registration Failed: " + (result.msg || "Please check your details."));
            submitBtn.disabled = false;
            submitBtn.innerText = "Create Account";
        }

    } catch (error) {
        alert("Server error. Is the backend running?");
        submitBtn.disabled = false;
        submitBtn.innerText = "Create Account";
    }
});
