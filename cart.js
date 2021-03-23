let tableBody = document.getElementById ('table-body');
let prixTotalCommande = document.getElementById ('montant-total');
ammountArray = [];


//Créer une nouvelle ligne dans la tableau à chaque ajout d'un article au panier
for (let i = 0; i < localStorage.length; i++){
    let productLine = document.createElement ('tr');
    tableBody.appendChild (productLine);
    let productName = document.createElement ('td');
    let productPicLine = document.createElement ('td');
    let productPic = document.createElement ('img');
    let productLense = document.createElement ('td');
    let productPrice = document.createElement ('td');
    let productQuantity = document.createElement ('td');
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
    let productDatasJson = JSON.parse (productDatas);
    // On affiche les données
    productPic.setAttribute ("src", productDatasJson.pic);
    productPic.classList.add ("table-img");
    productName.innerHTML = productDatasJson.name;
    productLense.innerHTML = productDatasJson.lense;
    productPrice.innerHTML = `${productDatasJson.price}.00 €`;
    // Retourner un nombre plutôt qu'une chaine de caractère pour la quantité
    let quantityInNumber = parseInt(productDatasJson.quantity);
    productQuantity.innerHTML = quantityInNumber;
    // prix total = prix unitaire * quantité
    productTotalPrice.innerHTML = productDatasJson.price*quantityInNumber+".00 €";
    productTotalPrice = productDatasJson.price * quantityInNumber;
    // Chaque prix total est ajouté à un tableau, la somme des valeurs de ce tableau donnera le montant de la commande
    ammountArray.push(productTotalPrice);
    let montantCommande = 0;
    for (let price of ammountArray){
        montantCommande += price;
    }
    prixTotalCommande.innerHTML = "Montant total de la commande: " + montantCommande + ".00 €";
}

console.log(ammountArray);

//Bouton permettant de supprimer un article du panier

