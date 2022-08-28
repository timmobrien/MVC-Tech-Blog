async function editFormHandler(event) {
    event.preventDefault();

    const postId = document.getElementById('edit-btn').getAttribute('data-id')


    const title = document.querySelector('#title').value.trim() 
    const content = document.querySelector('#body').value.trim()

    const response = await fetch(`/update/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);