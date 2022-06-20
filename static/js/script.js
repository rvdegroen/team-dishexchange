async function deleteDish(dishId) {
  // fetch sends HTTP request to run the method delete
  const response = await fetch("/dishes/delete/" + dishId, {
    method: "DELETE",
  });
  // if response is .ok, it will redirect to the route
  if (response.ok) {
    window.location.href = "/user/overview";
  } else {
    let error = document.getElementById("error");
    // show err.message from server.js
    const errorMessage = await response.text();
    error.textContent = errorMessage;
    console.log(errorMessage);
  }
}
