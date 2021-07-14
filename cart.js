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
    let deleteProduct = document.createElement ('i');
    let productPic = document.createElement ('img');
    let productLense = document.createElement ('td');
    let productPrice = document.createElement ('td');
    let productQuantity = document.createElement ('td');
    let productTotalPrice = document.createElement ('td');
    productLine.appendChild (productPicLine);
    productPicLine.appendChild (deleteProduct);
    productPicLine.appendChild (productPic);
    productPicLine.classList.add ('productPicLine');
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
    deleteProduct.classList.add ('fas');
    deleteProduct.classList.add ('fa-trash');
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
    // Affichage et modification des quantités
    let btnMoins = document.createElement ('button');
    let imputQuantity = document.createElement ('imput');
    let btnPlus = document.createElement ('button');
    let valueCount = quantityInNumber;
    let total;
    productTotalPrice.innerHTML = quantityInNumber*productDatasJson.price + ".00€";
    function priceTotal() {
        total = valueCount*productDatasJson.price + ".00€";
        productTotalPrice.innerHTML = total;
    }
    let totalNumber = parseInt(total);
    productQuantity.appendChild (btnMoins);
    productQuantity.appendChild (imputQuantity);
    productQuantity.appendChild (btnPlus);
    btnMoins.innerHTML = "-";
    if(quantityInNumber==1){
       btnMoins.setAttribute ("disabled", "disabled"); 
    }
    btnPlus.innerHTML = "+";
    imputQuantity.setAttribute ("type", "text");
    imputQuantity.setAttribute ("value", quantityInNumber);
    imputQuantity.innerHTML = quantityInNumber;
    // Chaque prix total est ajouté à un tableau, la somme des valeurs de ce tableau donnera le montant de la commande
    ammountArray.push(productDatasJson.price*imputQuantity.innerText);
        montantCommande = 0;
        for (let price of ammountArray){
            montantCommande += price;
            prixTotalCommande.innerHTML = "Montant total de la commande: " + montantCommande + ".00 €";
        }    
    // Logiques pour modifier qté    
    btnPlus.addEventListener("click", function() {
        valueCount++
        imputQuantity.innerHTML = valueCount;
        if (valueCount > 1) {
            btnMoins.removeAttribute("disabled");
        }
        priceTotal();
        ammountArray.push(productDatasJson.price);
        var sum = 0
        for (let i = 0; i < ammountArray.length; i++){
            sum+=ammountArray[i];
        }
        prixTotalCommande.innerHTML = "Montant total de la commande: " + sum + ".00 €";
        montantCommande = sum;
    })
    btnMoins.addEventListener("click", function() {
        valueCount--
        imputQuantity.innerHTML = valueCount;
        if (valueCount == 1) {
            btnMoins.setAttribute("disabled", "disabled");
        }
        priceTotal();
        ammountArray.push(-1*productDatasJson.price);
        var sum = 0
        for (let i = 0; i < ammountArray.length; i++){
            sum+=ammountArray[i];
        }
        prixTotalCommande.innerHTML = "Montant total de la commande: " + sum + ".00 €";
        montantCommande = sum;    
    })
    console.log(valueCount);
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
    let contact = {
        firstName: document.getElementById('prenom').value,
        lastName: document.getElementById('nom').value,
        address: document.getElementById('adresse').value,
        city: document.getElementById('ville').value,
        email: document.getElementById('email').value
    };
    let objet = {contact, products};
    if(cartForm.checkValidity()){
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
                window.location = "confirm.html";
            }
        }
    }    
})

