// CREER URL pour chaque produit (URL+id)
const urlParams = new URLSearchParams(window.location.search);
const cameraId = urlParams.get("id");

// AFFICHER la camera choisie
function displayOneCamera(value) {
  document.getElementById("main").innerHTML += `<div class="card product">
                        <div class="card-body">
                            <h1 class="card-title">${value.name}</h1>
                            <img class="card-img-lg shadow-lg" src="${
                              value.imageUrl
                            }" alt="${value.name}">
                            <p class="card-text">${value.description}</p>

                            <b><p class="price text-center">Prix: ${
                              value.price / 100
                            } €</p></b>

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
                                    <option value="5">5</option>
                                </select>
                            </p>
                    
                            </br>
                            
                            <div class="text-center">
                              <a href="cart.html">
                                <button id="addToCart" class="bouton" type="submit">
                                  Sélectionnez cet appareil-photo
                                </button>
                              </a>
                        </div>
                        </div>
                    </div>
                    
                    <div class="button-center text-center p-5">
              <div class="text-center p-2">  
              <a href="index.html"><button type="submit" class="bouton">Continuez vos achats
                </button></a>
              </div>

              <div class="text-center p-2">  
                <a href="cart.html"><button type="submit" id="goToCart" class="bouton">
                  Voir votre panier
                </button></a>
              </div>
            </div>`;
}

/*CREER le select de la lentille*/
function selectLense(value) {
  let lenseSelection = [];

  for (lense of value.lenses) {
    lenseSelection += `<option value = "${lense}">${lense}</option>`;
  }
  const selectALense = document.getElementById("selectALense");
  selectALense.innerHTML = lenseSelection;
  console.log(selectALense);
}

// CREEER le select de la quantité et RECUPERER la valeur
function selectQuantity() {
  let quantity = document.getElementById("selectAQuantity");
  quantity.addEventListener("click", function (event) {
    quantity = event.target.value;
  });
//   console.log(quantity)
}

// AJOUTER la caméra au local storage
function addToLocalStorage(value) {
  /*ACTIVER le bouton pour ENVOYER la camera vers le panier*/
  const buttonAddToCart = document.getElementById("addToCart");
  buttonAddToCart.addEventListener("click", function (e) {
    e.preventDefault();

    // RECUPERER la SELECTION de la lentille
    let lenseSelected = selectALense.value;
    // console.log(lenseSelected);

    // RECUPERER la SELECTION de la quantité
    let quantitySelected = selectAQuantity.value;
    // console.log(quantitySelected);

    /* RAJOUTER la quantité et la lentille choisie dans l'objet CAMERA*/
    value["lense"] = lenseSelected;
    value["quantity"] = quantitySelected;

    // RECUPERER le contenu du panier si déjà existant sinon CREER un tableau vide
    let cartContent = JSON.parse(localStorage.getItem("addToCart")) || [];

    //AJOUTER les produits sélectionnés dans le tableau du localStorage
    cartContent.push(value);

    // INITIALISER le localStorage
    localStorage.setItem("addToCart", JSON.stringify(cartContent));
    alert(
      `Votre appareil-photo ${value.name} a bien été ajouté dans le panier`
    );
  });
}

// RECUPERER les données API pour la cameraId choisie
fetch(`http://localhost:3000/api/cameras/${cameraId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res)
  })
  .then(function (value) {
    displayOneCamera(value); /*appel fonction AFFICHER la camera choisie*/
    selectLense(value); /*appel fonction SELECTIONNER la lentille*/
    selectQuantity(value); /*appel fonction SELECTIONNER la quantité*/
    addToLocalStorage(value); /*appel fonction SELECTIONNER la quantité*/
  })
  .catch(function (err) {
    // console.log("Try again !");
    main.innerHTML += `<div class="alert alert-danger text-center" role="alert"> </br>
    <strong>Oups, une erreur s'est produite ! </strong> <br/>
    <br/>
    <a href="index.html"><button class="bouton p-3">Recommençons au début !</button></a>
    </div>`         
  });
