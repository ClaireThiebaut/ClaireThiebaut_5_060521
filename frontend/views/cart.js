// RECUPERER les produits envoyés dans le localstorage
cartContent = JSON.parse(localStorage.getItem('addToCart')) || [];


// INITIALISER le prix total
let totalPrice = 0;


// INITIALISER tableau des id cameras pour envoi vers page confirmation
let collectCameraId =[];


// FONCTION AFFICHER une nouvelle ligne pour chaque achat
cartContent.forEach((camera, i) => {
    // CALCULER sous-totaux
    let subtotal = camera.price*camera.quantity /100

    //AFFICHER la camera choisie
    document.getElementById('cartDisplay').innerHTML += `
      <tr>
        <td><b>${camera.name}<b></td>  
        <td class="picture"><a href="../product/product.html?id=${camera._id}"><img src=${camera.imageUrl} alt="appareil photo" /></a></td>
        <td>${camera.lense}</td>
        <td>${camera.price/100} €</td>
        <td>${camera.quantity}</td>
        <td>${subtotal} €</td>
      </tr>
    <br>
    `;

    cartTotal(camera, subtotal) /*APPEL fonction calcul prix total*/

    // RECUPERER id de chaque camera pour envoi page confirmation
    for (let i = 0; i<camera.quantity; i++) {
      collectCameraId.push(camera._id);
    }
});

// CALCULER le prix total
function cartTotal (camera, subtotal) {
    totalPrice += subtotal;
    document.getElementById('total').textContent=totalPrice
}   

// // RAJOUTER le prix total dans le localStorage
// localStorage.setItem("addToCart",JSON.stringify(totalPrice))

/*bouton pour VIDER le panier*/
let buttonClearCart = document.getElementById('clearCart')
buttonClearCart.onclick = () => {
localStorage.clear()
}


// ***********************************
// Pour envoi page CONFIRMATION 

// COLLECTER les infos du formulaire 
// Puis les POST
function postInfo () {
  const form = document.getElementById('form')
  if (form.reportValidity() == true && collectCameraId.length > 0) {
    let contact = { 
      'firstName':document.getElementById("firstName").value,
      'lastName':document.getElementById("lastName").value,
      'address':document.getElementById("address").value,
      'city':document.getElementById("city").value,
      'email':document.getElementById("email").value,
    }
    let userOrder = JSON.stringify ({
      contact,
      collectCameraId,
    })
    
    // REQUETE POST
    fetch('http://localhost:3000/api/cameras/order', {
      method: 'POST',
      headers: {
        'accept': "application/json",
        'content-type': "application/json"
      },
      mode: "cors",
      body: userOrder
    })
    .then(function(response) {
      return response.json()
    })
    .then(function (r) {
      localStorage.setItem("contact", JSON.stringify(r.contact));
      window.location.assign("confirmation.html?orderId=" + r.orderId);
    })
}
else{
  alert("Oups, une erreur est survenue !")
};
}

// ENVOYER le formulaire
let sendButton = document.getElementById("sendButton");
  sendButton.addEventListener('click', function (event) {
    event.preventDefault();
    postInfo();
  });





