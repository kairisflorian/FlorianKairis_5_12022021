//Je récupère le paramètre relatif à l'id dans mon url
let getParam = () => {
    let queryString = window.location.search;
    let urlParam = new URLSearchParams (queryString);
    let id = urlParam.get ('id');
    console.log(id);
    return id
}

console.log(getParam());

let issou = "l'id est " + getParam();
console.log(issou);