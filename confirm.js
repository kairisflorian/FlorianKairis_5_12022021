let texte = document.getElementById('titre');
texte.innerHTML = `Merci ${localStorage.getItem('prenom')}, votre commande n° ${localStorage.getItem('orderId')}  d'un montant de ${localStorage.getItem('montant')}.00€ a bien été prise en compte.`
localStorage.clear();