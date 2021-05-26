// constante URL pour retourner un tableau de tous les éléments CAMERA
const url = 'http://localhost:3000/api/cameras/';


// Fonction pour récupérer les data de l'API
async function getCameraInfo() {
    let res = await fetch(url);
    let data = await res.json();
    data.map((camera) => displayAllCameras(camera));
}

// Appel de la fonction API
getCameraInfo();

// Bloc HTML où importer les produits
const main = document.getElementById('main');

// Afficher les 5 caméras sur la page d'accueil
function displayAllCameras(camera) {
    main.innerHTML += `<div class="card">
                            <div class="card-header">
                                <h3>${camera.name}</h3>
                            </div>
                            <div class="card-body text-center">
                                <img class="card-img shadow-lg" src="${camera.imageUrl}" alt="${camera.name}"
                                <p class="price">Prix : <b>${camera.price/100} €</b></p>
                                            <button type="button" class="button rounded shadow-lg">
                                                <a href="../views/product.html?id=${camera._id}">Description de l'appareil-photo</a>
                                            </button>
                                        </p>
                                </div>
                        </div>`
};


  






   




// TENTATIVE 1
// const fetchCamera = fetch("http://localhost:3000/api/cameras/")
//     .then(function(res){
//         if (res.ok) {
//             // console.log(res.json);
//             return res.json();
//         }
//     })
//     .then(function(value){
//         console.log(value) /*récupérer le array du modele camera.js*/
//     })
//     .catch(function(error){
//         main.innerHTML +=` <p>Oups, une erreur s'est produite. Veuillez renouveler votre demande</p>`
//         console.log("Something went wrong");
//     });
