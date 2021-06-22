// constante URL API
const url = "http://localhost:3000/api/cameras/";

// RECUPERER les data de l'API
async function getCameraInfo() {
  let res = await fetch(url);
  let data = await res.json();
  data.map((camera) => displayAllCameras(camera));
}

// AFFICHER les 5 caméras
const main = document.getElementById("main");

function displayAllCameras(camera) {
  main.innerHTML += `<div class="card">
                            <div class="card-header">
                                <h3>${camera.name}</h3>
                            </div>
                            <div class="card-body text-center">
                                <img class="card-img shadow-lg" src="${
                                  camera.imageUrl
                                }" alt="${camera.name}"
                                <p class="price pt-2">Prix : <b>${
                                  camera.price / 100
                                } €</b></p>
                                            <button type="button" class="button rounded shadow-lg">
                                                <a href="../views/product.html?id=${
                                                  camera._id
                                                }">Description de l'appareil-photo</a>
                                            </button>
                                        </p>
                                </div>
                        </div>`;
}

getCameraInfo();
