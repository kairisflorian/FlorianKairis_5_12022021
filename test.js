// fonction d'envoi de la requete 
sendDatas = (objetRequest) => {
    return new Promise ((resolve) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                sessionStorage.setItem ("order", this.responseText);
                document.forms["cartForm"].action = './order-confirm.html';
                document.forms["cartForm"].submit();
                resolve (JSON.parse (this.responseText));
            }
        }
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(objetRequest);
    });
};

// fonction permettant d'envoyer la requete au click sur le bouton de validation 
validationForm = () => {
    let btnForm = document.getElementById ('envoiPost');
    btnForm.addEventListener ("click", function() {
        let objet = {contact, product_id};
        let objetRequest = JSON.stringify (objet);
        sendDatas(objetRequest);
    });
};

validationForm();