
async function loginHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('#username-input').value.trim() 
    const password = document.querySelector('#password-input').value.trim()

    if(username && password) {
        const res = await fetch('/user/login/', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers:{'Content-Type': 'application/json'}
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in')
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', loginHandler);