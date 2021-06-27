// RECUPERER les produits envoyés dans le localstorage
cartContent = JSON.parse(localStorage.getItem("addToCart")) || [];

//INITIALISER le formatter
const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

// INITIALISER le prix total
let totalPrice = 0;

// INITIALISER tableau des id cameras pour envoi vers page confirmation
let collectCameraId = [];

// FONCTION AFFICHER une nouvelle ligne pour chaque achat
cartContent.forEach((camera, i) => {
  // CALCULER sous-totaux
  let subtotal = (camera.price * camera.quantity) / 100;
  // console.log(subtotal)

  //AFFICHER la camera choisie
  document.getElementById("cartDisplay").innerHTML += `
      <tr>
        <td><b>${camera.name}<b></td>  
        <td class="mobile-display-none" class="picture"><a href="../product/product.html?id=${
          camera._id
        }"><img src=${camera.imageUrl} alt="appareil photo" /></a></td>
        <td class="mobile-display-none">${camera.lense}</td>
        <td>${camera.price / 100} €</td>
        <td>${camera.quantity}</td>
        <td>${subtotal} €</td>
      </tr>
    <br>
    `;

  cartTotal(camera, subtotal); /*APPEL fonction calcul prix total*/

  // RECUPERER id de chaque camera pour envoi page confirmation
  for (let i = 0; i < camera.quantity; i++) {
    collectCameraId.push(camera._id);
  }
});

// CALCULER le prix total
function cartTotal(camera, subtotal) {
  totalPrice += subtotal;
  document.getElementById("total").textContent = formatter.format(totalPrice);
  // ENVOYER le prix total dans le localStorage
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
}

/*Bouton pour SUPPRIMER les products du panier*/
let buttonClearCart = document.getElementById("btn_cart");
buttonClearCart.onclick = () => {
  localStorage.removeItem('addToCart');
  localStorage.removeItem('totalPrice');
  window.location.reload();
};

// ***********************************
// Pour envoi vers page CONFIRMATION

// RECUPERER les infos du formulaire (validé par les regex)
const form = document.getElementById("form");
const { firstName, lastName, address, city, email } = form;


// SUBMIT le formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //INITIALISER la variable PRODUCT attendue par API pour la requête POST
  let products = collectCameraId;

  if (products.length>0) { 
  // ENVOYER le contact form + les products avec une requête POST (URL +/order)
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      contact: {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        email: document.getElementById("email").value.trim(),
      },
      products,
    }),
  })
    // ATTENDRE le retour de l'order ID
    .then(function (response) {
      return response.json();
    })
    // TRAITER la réponse JSON
    .then(function (r) {
        // ENVOYER L'ID dans l'adresse URL de la page confirmation.html
        window.location.assign("confirmation.html?orderId=" + r.orderId);
        // SETITEM contacts dans le localStorage pour récup sur page de confirmation
        localStorage.setItem("contact", JSON.stringify(r.contact));
      
    })
    .catch(function (err) {
      alert("Oups, une erreur s'est produite !");
    });
  } else { 
      main.innerHTML += `<div class="alert alert-danger text-center" role="alert"> </br>
      <strong>Oups, une erreur s'est produite ! </strong> </br>
      Avez-vous bien complété le formulaire ? </br> 
      Avez-vous ajouté des produits à votre panier ?" </br> </br>

        <a href="cart.html" class="alert-link">Verifions tout cela ensemble.</a>
      </div>`
  }
});
