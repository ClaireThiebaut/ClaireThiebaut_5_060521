// CREER URL pour chaque produit (URL+id)
const urlParams = new URLSearchParams(window.location.search);
const cameraId = urlParams.get('id');
console.log(cameraId)


// AFFICHER la carte CAMERA cliquée depuis l'index sur page product
function displayOneCamera() { 
    
    // RECUPERER les données API pour la cameraId choisie
    fetch (`http://localhost:3000/api/cameras/${cameraId}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
            console.log(res.json)
        })
        .then(function(value) {
            main.innerHTML 
                += `<div class="card col-7 ">
                        <div class="card-body">
                            <h1 class="card-title">${value.name}</h1>
                            <img class="card-img col-6 shadow-lg" src="${value.imageUrl}" alt="${value.name}">
                            <p class="card-text">${value.description}</p>

                            <p class="card-text">Sélectionnez votre lentille : 
                                <select required id="selectALense">
                                </select>
                            </p>
                                        
                            <p class="price">Prix: <b>${value.price/100} €</b></p>

                            <p class="card-text">Choisissez votre quantité : 
                                <select required id="quantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </p>
                    
                            <button type="button" id="addToCart" class="button rounded shadow-lg">
                                <a href="#">Acheter</a>
                            </button>

                            <button type="button" id="clearCart" class="button rounded shadow-lg">
                                <a href="#">Supprimer</a>
                            </button>
                        </div>
                    </div>`;
                
            /*CREER le select de la lentille avec let = lenseSelection avec une boucle for of*/                    
            const selectALense = document.getElementById("selectALense");
            let lenseSelection = [];
                console.log(lenseSelection)

            for (lense of value.lenses) {
                lenseSelection += `<option value = "${lense}">${lense}</option>`
            }
            selectALense.innerHTML = lenseSelection;

            // SELECTION de la lentille 
            let lenseSelected = selectALense.addEventListener('change', function(event) {
                lenseSelected = event.target.value
            })
        
        
             // SELECTION de la quantité 
            let quantity = document.getElementById("quantity")
                quantity = quantity.addEventListener('change', function(event) {
                quantity = event.target.value
            })


//  ******************************************************                   
            /* CREER un objet JS avec la camera + lentille choisie + qué */
            let cameraSelected = {
                name : value.name,
                price : value.price/100,
                lense : lenseSelected,
                id : value._id,
                quantity : quantity,
            }

            /*ENVOYER la camera vers la panier*/
            const buttonAddToCart = document.getElementById('addToCart')
                buttonAddToCart.addEventListener('click', function(e) {
                    e.preventDefault();
            
                let cartContent = JSON.parse(localStorage.getItem('addedToCart')) || [];
                
                cartContent.push(cameraSelected);
                
                localStorage.setItem("addedToCart",JSON.stringify(cartContent))
                alert(`Votre appareil-photo ${value.name} a bien été ajouté dans le panier`)   

                })
                
        

            

            /*AJOUTER plusieurs produits au panier*/
            // let cartcontent = [];
            //     cartcontent.push(cart);
                
    
            /*ACCEDER au contenu du panier*/
            

            /*bouton pour VIDER le panier*/
            let buttonClearCart = document.getElementById('clearCart')
                buttonClearCart.onclick = () => {
                localStorage.clear()
            }

        })/*fermeture du .then*/
        .catch(function(err) {
            console.log("Héé ben non ! C'est une erreur !")
            main.innerHTML 
            += `<div class="card">
                    <div class="card-body">
                        <h5 class="card-title"> Oups !</h5>
                            <p class="card-text">Une erreur est survenue...</p>
                            <a href="index.html" class="button rounded shadow-lg">Retour à la page d'accueil</a>
                    </div>
                </div>`;
            })/*fermeture du .catch*/
        }/*fermeture du displayOneCamera*/

displayOneCamera();





// TENTATIVE pour séparer les fonctions Fetch et display
// RECUPERER données de chaque cameraID
// let cameraData = fetch (`http://localhost:3000/api/cameras/${cameraId}`)
//             .then(function(res) {
//                 if (res.ok) {
//                     return res.json();
//                 }
//                 console.log(res.json)
//             })
//             .then(function(value) {
//                 console.log(value)
//             })
//             .catch(function(err) {
//                                 console.log("Héé ben non ! C'est une erreur !")
//                                 main.innerHTML += `<div class="card">
//                                                         <div class="card-body">
//                                                         <h5 class="card-title"> Oups !</h5>
//                                                         <p class="card-text">Une erreur est survenue...</p>
//                                                             <a href="index.html" class="button rounded shadow-lg">Retour à la page d'accueil</a>
//                                                         </div>
//                                                     </div>`;
          
//                             });

                    

//             console.log(cameraData);

// // AFFICHER les données récupérées
// function displayOneCamera() {      
//     document.getElementById('main').innerHTML += 
//                     `<div class="card col-7 ">
//                         <div class="card-body">
//                             <h1 class="card-title">${cameraData.name}</h1>
//                             <img class="card-img col-6 shadow-lg" src="${cameraData.imageUrl}" alt="${cameraData.name}">
//                             <p class="card-text">${cameraData.description}</p>
            
//                             <p class="card-text">Sélectionnez votre lentille : 
//                                 <select id="selectALense">
//                                 </select>
//                             </p>
                                                        
            
//                             <p class="price">Prix: <b>${cameraData.price/100} €</b></p>
//                             <button type="button" class="button rounded shadow-lg">
//                                 <a href="#">Acheter</a>
//                             </button>
//                         </div>
//                     </div>`; 
// };

// displayOneCamera(cameraData);




