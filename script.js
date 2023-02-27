let url = 'https://api.magicthegathering.io/v1/cards/';

let cards = null;

fetch(url)
	.then(function (resp) {
		return resp.json();
	})
	.then(function (resp) {
		cards = resp.cards;
	});

document.querySelector('#enviar').addEventListener('click', function () {
	let text = document.querySelector('#texto');
	text = text.value;
	let filterArray = cards.filter(function (card) {
		return card.name.includes(text);
	});
	document.querySelector('#results').innerHTML = '';
	filterArray.forEach(function (card) {
		let img = card.imageUrl;
		if (img == null) {
			img = 'imagenes/card_back.jpg';
		}
		let id = card.multiverseid;
		if (id == null) {
			id = "'" + card.id + "'";
		}
		document.querySelector('#results').innerHTML += `

		<div class="caja">
	
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
		<button class="like" onclick="saveCard(${id})">Me gusta</button>
		
		</div>
		`;
	});

	if (filterArray.length == 0)
		document.querySelector('#results').innerHTML += `
	<p>No se ha encontrado la carta</p>`;
});

function saveCard(id) {
	let idCards = localStorage.getItem('idCard');
	if (idCards == null) {
		idCards = id;
	} else {
		idCards = idCards + ',' + id;
	}
	localStorage.setItem('idCard', idCards);
}
