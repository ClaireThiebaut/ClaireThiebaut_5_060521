// CREER URL pour chaque produit (URL+id)
const urlParams = new URLSearchParams(window.location.search);
const cameraId = urlParams.get('id');
console.log(cameraId)

const main = document.getElementById('main');

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
                console.log(value);
                console.log(value.lenses);
                main.innerHTML += `<div class="card col-7 ">
                                        <div class="card-body">
                                            <h1 class="card-title">${value.name}</h1>
                                            <img class="card-img col-6 shadow-lg" src="${value.imageUrl}" alt="${value.name}">
                                            <p class="card-text">${value.description}</p>

                                            <p class="card-text">Sélectionnez votre lentille : 
                                            <select id="selectALense">
                                            </select>
                                            </p>
                                            

                                            <p class="price">Prix: <b>${value.price/100} €</b></p>
                                            <button type="button" class="button rounded shadow-lg">
                                                <a href="#">Acheter</a>
                                            </button>
                                        </div>
                                    </div>`;
                
                    /*SELECTIONNER la lentille du <select>*/                    
                    const selectALense = document.getElementById("selectALense");
                    let lenseSelected = []; /*on crée variable LET avec un tableau  pour clé/valeur de la lentille sélectionnée*/

                    for (lense of value.lenses) {
                        lenseSelected += `<option value = "${lense}">${lense}</option>`
                    }
                    selectALense.innerHTML = lenseSelected;
            })
            .catch(function(err) {
                console.log("Héé ben non ! C'est une erreur !")
                main.innerHTML += `<div class="card">
                                        <div class="card-body">
                                        <h5 class="card-title"> Oups !</h5>
                                        <p class="card-text">Une erreur est survenue...</p>
                                            <a href="index.html" class="button rounded shadow-lg">Retour à la page d'accueil</a>
                                        </div>
                                    </div>`;
            })
        }

displayOneCamera();



// // LOCALSTORAGE
// ENVOYER la camera vers le panier
// let button = document.querySelector('button');
// button.onclick.setItem(cameraId, value);

// button.addEventListener('click', addToCart());

// };







