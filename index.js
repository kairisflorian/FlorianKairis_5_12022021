let vitrine = document.getElementById ('vitrine');

let request = new XMLHttpRequest();

let getProductsDatas = request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        // L'API nous renvoie les données sous forme d'un tableau constitué de plusieurs objets
        let products = JSON.parse(this.responseText);
        // Pour chaque produit, je crée une fiche que j'inclue dans ma section 'vitrine'
        for (let product of products) {
            let ficheProduit = document.createElement ('div');
            vitrine.appendChild (ficheProduit);
            // Je lui ajoute une classe afin de pouvoir faire la mise en page facilement
            ficheProduit.classList.add ('fiche-produit');
            // J'importe ensuite les données relatives à chaque produit dans mon html
            ficheProduit.innerHTML = `
                <img src='${product.imageUrl}' alt='image représentant un appareil photo modèle ${product.name}'/>
                <p> ${product.name} </p>
                <p> ${product.price} € </p>
                <a href='./product.html?id=${product._id}'>
                    <i class="fas fa-shopping-cart"></i>
                </a>
            `;
        }
    }
};

request.open("GET", "http://localhost:3000/api/cameras");
request.send();

