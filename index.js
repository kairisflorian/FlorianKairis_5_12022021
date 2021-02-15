class Product {
    constructor(pic, name, price) {
        this.pic = pic;
        this.name = name;
        this.price = price;
    }
}

let img1 = document.getElementById('product1_img');
let name1 = document.getElementById('product1_name');
let price1 = document.getElementById('product1_price');

let img2 = document.getElementById('product2_img');
let name2 = document.getElementById('product2_name');
let price2 = document.getElementById('product2_price');

let img3 = document.getElementById('product3_img');
let name3 = document.getElementById('product3_name');
let price3 = document.getElementById('product3_price');

let img4 = document.getElementById('product4_img');
let name4 = document.getElementById('product4_name');
let price4 = document.getElementById('product4_price');

let img5 = document.getElementById('product5_img');
let name5 = document.getElementById('product5_name');
let price5 = document.getElementById('product5_price');

fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => img1.src = data[0].imageUrl)
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => name1.innerHTML = data[0].name);
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => price1.innerHTML = `${data[0].price}€`);

fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => img2.src = data[1].imageUrl)
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => name2.innerHTML = data[1].name);
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => price2.innerHTML = `${data[1].price}€`);

fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => img3.src = data[2].imageUrl)
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => name3.innerHTML = data[2].name);
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => price3.innerHTML = `${data[2].price}€`);

fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => img4.src = data[3].imageUrl)
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => name4.innerHTML = data[3].name);
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => price4.innerHTML = `${data[3].price}€`);

fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => img5.src = data[4].imageUrl)
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => name5.innerHTML = data[4].name);
fetch('http://localhost:3000/api/cameras').then(res => res.json()).then(data => price5.innerHTML = `${data[4].price}€`);

let firstProduct = new Product (img1, name1, price1);
let secondProduct = new Product (img2, name2, price2);
let thirdProduct = new Product (img3, name3, price3);
let fourthProduct = new Product (img4, name4, price4);
let fifthProduct = new Product (img5, name5, price5);

let products = [];
products.push(firstProduct, secondProduct, thirdProduct, fourthProduct, fifthProduct);
console.log(products);


