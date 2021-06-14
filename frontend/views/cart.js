// RECUPERER les produits envoyés dans le localstorage
cartContent = JSON.parse(localStorage.getItem('addToCart')) || [];

// CIBLER table récap des achats
const cartDisplay = document.getElementById('cartDisplay')

// INITIALISER le prix total
let totalPrice = 0;

// AFFICHER une nouvelle ligne pour chaque achat
cartContent.forEach((camera, i) => {
    // CALCULER sous-totaux
    let subtotal = camera.price*camera.quantity /100

    //AFFICHER la camera choisie
    cartDisplay.innerHTML += `
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





           