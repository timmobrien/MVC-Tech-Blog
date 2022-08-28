
async function postHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim() 
    const content = document.querySelector('#body').value.trim()

    if(title && body) {
        const res = await fetch('/post/', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers:{'Content-Type': 'application/json'}
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed create post')
        }
    }
}

document.querySelector('#create-post').addEventListener('submit', postHandler);