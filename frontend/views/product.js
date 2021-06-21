// CREER URL pour chaque produit (URL+id)
const urlParams = new URLSearchParams(window.location.search);
const cameraId = urlParams.get('id');

// AFFICHER la camera choisie
    function displayOneCamera (value) {
        document.getElementById("main").innerHTML 
            += `<div class="card">
                        <div class="card-body">
                            <h1 class="card-title">${value.name}</h1>
                            <img class="card-img-lg shadow-lg" src="${value.imageUrl}" alt="${value.name}">
                            <p class="card-text">${value.description}</p>

                            <b><p class="price text-center">Prix: ${value.price/100} €</p></b>

                            <p class="card-text text-center"><b>Sélectionnez votre lentille</b> : 
                                <select required id="selectALense">
                                </select>
                            </p>
                                    
                            <p class="card-text text-center"><b>Choisissez votre quantité :</b>
                                <select required id="selectAQuantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value=44de44"5">5</option>
                                </select>
                            </p>
                    
                            </br>
                            <div class="text-center">
                                <button type="submit" id="addToCart" class="button rounded shadow-lg orange">
                                    <a href="cart.html">Sélectionner cet appareil-photo</a>
                                </button>

                            </div>
                        </div>
                    </div>`;
    }



/*CREER le select de la lentille*/     
function selectLense (value) {               
    let lenseSelection = [];
    

    for (lense of value.lenses) {
        lenseSelection += `<option value = "${lense}">${lense}</option>`
    }
    const selectALense = document.getElementById("selectALense");
    selectALense.innerHTML = lenseSelection;
    console.log(lenseSelection)
}


// RECUPERER la SELECTION de la quantité 
function selectQuantity (value) {
let quantity = document.getElementById("selectAQuantity")
    quantity.addEventListener('change', function(event) {
    quantity = event.target.value
    })
}

 // AJOUTER la caméra au local storage
function addToLocalStorage (value) { 
    // RECUPERER la SELECTION de la lentille 
    let lenseSelected = selectALense.value;

    // RECUPERER la SELECTION de la quantité 
    let quantitySelected = selectAQuantity.value; 

    /* RAJOUTER la quantité et la lentille choisie dans l'objet CAMERA*/
    value["lense"] = lenseSelected;
    value["quantity"] = quantitySelected;
            
    /*ACTIVER le bouton pour ENVOYER la camera vers le panier*/
    const buttonAddToCart = document.getElementById('addToCart')
    buttonAddToCart.addEventListener('click', function(e) {
          e.preventDefault();

    // RECUPERER le contenu du panier si déjà existant sinon CREER un tableau vide
    let cartContent = JSON.parse(localStorage.getItem('addToCart')) || [];

    //AJOUTER les produits sélectionnés dans le tableau du localStorage
    cartContent.push(value);
               
    // INITIALISER le localStorage
    localStorage.setItem("addToCart",JSON.stringify(cartContent))
        alert(`Votre appareil-photo ${value.name} a bien été ajouté dans le panier`)   
    })
}


// RECUPERER les données API pour la cameraId choisie
fetch (`http://localhost:3000/api/cameras/${cameraId}`)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        displayOneCamera(value) /*appel fonction AFFICHER la camera choisie*/
        selectLense (value) /*appel fonction SELECTIONNER la lentille*/
        selectQuantity (value) /*appel fonction SELECTIONNER la quantité*/
        addToLocalStorage (value) /*appel fonction SELECTIONNER la quantité*/
    })
    .catch(function(err) {
        console.log("Try again !")
        main.innerHTML 
        += `<div class="card">
            <div class="card-body">
                <h5 class="card-title"> Oups !</h5>
                    <p class="card-text">Une erreur est survenue...</p>
                    <a href="index.html" class="button rounded shadow-lg">Retour à la page d'accueil</a>
                </div>
            </div>`;
    });


// function pageTitle (value) {
//     document.title = `Appareil ${value.name}` 
// }    

// pageTitle (value);

