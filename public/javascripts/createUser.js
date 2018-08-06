// window.onload = function() {
//
// }
//
// const apiUrl = 'http://localhost:3000';
// const usersUrl = apiUrl + '/users';
//
// function createUser(event){
//   event.preventDefault();
//
//   let email = document.getElementById('').value;
//   let password = document.getElementById('').value;
//   let first_name = document.getElementById('').value;
//   let last_name = document.getElementById('').value;
//   let phone_number = document.getElementById('').value;
//   let address_one = document.getElementById('').value;
//   let address_two = document.getElementById('').value;
//   let zip = document.getElementById('').value;
//   // <<< come back TO HASH PASSWORD!!! >>>
//
//   fetch(usersUrl, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       username: username,
//       email: email,
//       password: password
//     })
//   })
//   .then(response => {
//     if (!response.ok){
//       throw new Error('request failed')
//     }
//     return response.json()
//   })
//   .then(() => {
//     swal({
//       title: "User created",
//       text: "Welcome to CheapTix!",
//       icon: "success",
//       button: "Aww yiss!"
//     })
//     .then((value) => {
//       window.location.href = '/login';
//       document.getElementById("create_user_form").reset();
//     });
//   })
//   .catch((error) => {
//     console.log(error)
//     swal({
//       title: "This email already exists",
//       icon: "warning",
//       button: "ok"
//     })
//   })
// }
