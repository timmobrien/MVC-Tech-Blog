function logout() {

    // Post request to the logout route
    fetch("/user/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
    })
      .then(function () {
        // Send them home
        document.location.replace("/");
      })
      .catch((err) => console.log(err));
  }
  
document.querySelector("#logout-btn").addEventListener("click", logout);
  