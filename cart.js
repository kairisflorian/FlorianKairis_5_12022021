let tableBody = document.getElementById ('table-body');
let prixTotalCommande = document.getElementById ('montant-total');
ammountArray = [];
let products = [];
let montantCommande;
let commande;

//Créer une nouvelle ligne dans la tableau à chaque ajout d'un article au panier
for (let i = 0; i < localStorage.length; i++){
    let productLine = document.createElement ('tr');
    tableBody.appendChild (productLine);
    let productName = document.createElement ('td');
    let productPicLine = document.createElement ('td');
    let productPic = document.createElement ('img');
    let productLense = document.createElement ('td');
    let productPrice = document.createElement ('td');
    let productQuantity = document.createElement ('select');
    let productTotalPrice = document.createElement ('td');
    productLine.appendChild (productPicLine);
    productPicLine.appendChild (productPic);
    productLine.appendChild (productName);
    productLine.appendChild (productLense);
    productLine.appendChild (productPrice);
    productLine.appendChild (productQuantity);
    productLine.appendChild (productTotalPrice);
   // On récupère la clé de nos produits mis au panier
    let productId = localStorage.key(i);
    // On recupère les données de ces produits en JSON
    let productDatas = localStorage.getItem (productId);
    // On parse pour pouvoir utiliser les données
    let productDatasJson = JSON.parse(productDatas);
    // Creation d'un bouton pour supprimer un article du panier 
    let deleteProduct = document.createElement ('button');
    deleteProduct.innerHTML = 'Supprimer du panier';
    productPicLine.appendChild (deleteProduct);
    deleteProduct.addEventListener('click', function(event){
        localStorage.removeItem(productId);
        location.reload(true);
    })
    // On affiche les données
    productPic.setAttribute ("src", productDatasJson.pic);
    productPic.classList.add ("table-img");
    productName.innerHTML = productDatasJson.name;
    productLense.innerHTML = productDatasJson.lense;
    productPrice.innerHTML = `${productDatasJson.price}.00 €`;
    // Retourner un nombre plutôt qu'une chaine de caractère pour la quantité
    let quantityInNumber = parseInt(productDatasJson.quantity);
    // Modifier la quantitée souhaitée directement dans le panier
    let quantiteDeBase = document.createElement ('option');
    productQuantity.appendChild (quantiteDeBase);
    //productQuantity.innerHTML = quantityInNumber;
    // prix total = prix unitaire * quantité
    productTotalPrice.innerHTML = productDatasJson.price*quantityInNumber+".00 €";
    productTotalPrice = productDatasJson.price * quantityInNumber;
    // Chaque prix total est ajouté à un tableau, la somme des valeurs de ce tableau donnera le montant de la commande
    ammountArray.push(productTotalPrice);
    montantCommande = 0;
    for (let price of ammountArray){
        montantCommande += price;
    }
    prixTotalCommande.innerHTML = "Montant total de la commande: " + montantCommande + ".00 €";
    //Créer un tableau de strings product_id qu'on enverra au serveur
    products.push(productDatasJson.id);
}

console.log(ammountArray);
console.log(products);


//Requete
let request = new XMLHttpRequest();
let cartForm = document.getElementById('cartForm');
let btnEnvoi = document.getElementById('btnEnvoi');
btnEnvoi.addEventListener ('click', function(event){
    event.preventDefault();
    let contact = {
        firstName: document.getElementById('prenom').value,
        lastName: document.getElementById('nom').value,
        address: document.getElementById('adresse').value,
        city: document.getElementById('ville').value,
        email: document.getElementById('email').value
    };
    let objet = {contact, products};
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(objet));
    let sendDatas = request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            commande = JSON.parse(this.responseText);
            console.log(commande);
            localStorage.setItem('orderId', commande.orderId);
            localStorage.setItem('prenom', contact.firstName);
            localStorage.setItem('montant', montantCommande);
            window.location = 'confirm.html'
        }
    }
})

