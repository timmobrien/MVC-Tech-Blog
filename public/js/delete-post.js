async function deleteHandler(event) {
    event.preventDefault();

    const postId = document.getElementById('delete-btn').getAttribute('data-id')

    const response = await fetch(`/delete/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deleteHandler);