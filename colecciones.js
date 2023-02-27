let url = 'https://api.magicthegathering.io/v1/cards/';
let idCards = localStorage.getItem('idCard');

if (idCards == null) {
	document.querySelector('#results').innerHTML += `
	<p>No hay ninguna carta guardada en colecciones</p>`;
} else {
	idCards = idCards.split(',');

	idCards.forEach((idCard) => {
		fetch(url + idCard)
			.then(function (resp) {
				return resp.json();
			})
			.then(function (resp) {
				let card = resp.card;
				let img = card.imageUrl;
				if (img == null) {
					img = 'imagenes/card_back.jpg';
				}
				document.querySelector('#results').innerHTML += `

						<div  class="caja">
						<p>${card.name}</p>
						<p>${card.manaCost}</p>
						<p>${card.cmc}</p>
						<p>${card.colors}</p>
						<p>${card.colorIdentity}</p>
						<p>${card.type}</p>
						<p>${card.types}</p>
						<p>${card.subtypes}</p>
						<p>${card.rarity}</p>
						<p>${card.set}</p>
						<p>${card.setName}</p>
						<img src="${img}">
						
						</div>
						`;
			});
	});
}
