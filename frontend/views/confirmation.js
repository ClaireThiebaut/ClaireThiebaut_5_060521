//RECUPERATION DES DONNEES DE L URL
let contact = JSON.parse(localStorage.getItem('contact'))

let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))



document.getElementById("customerName").innerHTML 
+= `Bonjour ${contact.firstName} ${contact.lastName} ! `

// ${contact.firstName} ${contact.lastName}


document.getElementById("totalPrice").innerHTML 
+= ` ${totalPrice} €`