//Je récupère le paramètre relatif à l'id du produit dans mon url
let getParam = () => {
    let queryString = window.location.search;
    let urlParam = new URLSearchParams (queryString);
    let id = urlParam.get ('id');
    return id
}

let productCard = document.getElementById ('product');

//Création de l'élément image et ajout au parent
let productPic = document.createElement ('img');
productCard.appendChild (productPic);

// Création des éléments relatifs au prix, description et nom et ajout au parent
let productName = document.createElement ('p');
productName.classList.add ('product-name');
let productDescription = document.createElement ('p');
productDescription.classList.add ('product-description');
let productPrice = document.createElement ('p');
productPrice.classList.add ('product-price');
productCard.appendChild (productName);
productCard.appendChild (productDescription);
productCard.appendChild (productPrice);

// Création de la liste déroulante relative aux lentilles
let selectLense = document.createElement ('select');
productCard.appendChild (selectLense);
selectLense.setAttribute ('name', 'lentille');


// Création de la liste déroulante permettant de choisir la quantité
let selectQuantity = document.createElement ('select');
productCard.appendChild (selectQuantity);
selectQuantity.setAttribute ('name', 'quantity');
let quantite = ['--Selectionnez la quantité désirée--',1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let nombre of quantite) {
    let quantityChoice = document.createElement ('option');
    selectQuantity.appendChild (quantityChoice);
    quantityChoice.setAttribute ('value', nombre);
    selectQuantity.firstChild.setAttribute ('value',"");
    quantityChoice.innerHTML += nombre;
}

//Création du bouton permettant l'ajout au panier
let cartButton = document.createElement ('button');
productCard.appendChild (cartButton);
cartButton.innerHTML = 'Ajouter au panier';


//Je récupère les données de mon produit depuis l'api et je les affiche 
let request = new XMLHttpRequest();

let getProductDatas = request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let product = JSON.parse(this.responseText);
        productPic.setAttribute ('src', product.imageUrl);
        productPic.setAttribute ('alt', `Appareil photo modèle ${product.name}`)
        productName.innerHTML += product.name;
        productDescription.innerHTML += product.description;
        productPrice.innerHTML += product.price += ' €';
        // affichage du choix de la lentille
        for (let lense of product.lenses) {
            let lenseChoice = document.createElement ('option');
            selectLense.appendChild (lenseChoice);
            lenseChoice.setAttribute ('value', lense);
            lenseChoice.innerHTML = `${lense}`;
        }
    }
};

request.open("GET", "http://localhost:3000/api/cameras/" + getParam());
request.send();

