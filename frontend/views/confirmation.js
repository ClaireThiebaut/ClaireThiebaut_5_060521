//RECUPERATION le contact dans LocalStorage
let contact = JSON.parse(localStorage.getItem("contact"));

//RECUPERER le totalPrice dans LocalStorage
let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

// AFFICHER la confirmation
document.getElementById(
  "customerName"
).innerHTML += `${contact.firstName} ${contact.lastName}... `;

document.getElementById("totalPrice").innerHTML += ` ${totalPrice} €`;

document.getElementById("orderId").innerHTML += ` ${orderId}`;

/*Bouton pour SUPPRIMER les products du panier*/
let buttonClearCart = document.getElementById("clearCart");
buttonClearCart.onclick = () => {
  localStorage.clear();
};