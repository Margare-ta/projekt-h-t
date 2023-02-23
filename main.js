let autoRefreshCheckbox = document.getElementById("auto_refresh");
let intervalId;
let retryCount = 0;
let oldData = {};

autoRefreshCheckbox.addEventListener("change", () => {
	retryCount = 0;
	autoRefreshData();
});
document.addEventListener("DOMContentLoaded", main);

function autoRefreshData() {
	if (autoRefreshCheckbox.checked) {
		fetchData();
		intervalId = setInterval(fetchData, 10000);
		autoRefreshCheckbox.intervalId = intervalId;
	} else {
		clearInterval(autoRefreshCheckbox.intervalId);
	}
}

function fetchData() {
	fetch("https://guideianangel.herokuapp.com/list")
		.then(response => response.json())
		.then(data => handleData(data))
		.catch(error => retry(error));
}

function handleData(newData) {
	retryCount = 0;
	if (JSON.stringify(oldData) !== JSON.stringify(newData)) {
		oldData = structuredClone(newData);
		displayData(newData);
	}
}

function retry(error) {
	if (retryCount < 5) {
		console.log("Retrying... #" + (retryCount+1));
		retryCount++;
		setTimeout(fetchData, 2000);
	} else {
		autoRefreshCheckbox.checked = false;
		clearInterval(autoRefreshCheckbox.intervalId);
		console.log("Failed to fetch data");
		console.log(error);
	}
}

function displayData(data) {
	// console.log(data);
	let keys = Object.keys(data);
	// console.log("Users: " + keys.length);
	let NoOfWords = 0;
	let lessthan3 = 0;
	let morethan3 = 0;
	let longesteng = 0;
	let longesthun = 0;

	for (let userName in data) {
		// console.log("userName: " + userName);

		for (let packNo in data[userName]) {
			// console.log("packNo: " + packNo);

			let pack = data[userName][packNo];
			// console.log(pack);

			for (let cardNo in data[userName][packNo].words) {
				let card = data[userName][packNo].words[cardNo];

				// console.log("cardNo: " + cardNo);

				// console.log(card);
				// console.log(card.word);
				// console.log(card.definition);
				// console.log(card.definition.length);
				if (card.definition.length <= 4)
				{
					lessthan3++;
				}
				else
				{
					morethan3++;
				}
				NoOfWords++;

				
				if (card.definition.length > longesteng)
				{
					longesteng = card.definition.length;
				}
				if (card.word.length > longesthun)
				{
					longesthun = card.word.length;
				}				
			}
		}
	}
	console.log("Number of users: " + keys.length);
    document.getElementById("stat1").textContent="Number of users: ";
    document.getElementById("stat2").textContent=keys.length;
	console.log("Number of words: " + NoOfWords)
    document.getElementById("stat3").textContent="Number of words: ";
    document.getElementById("stat4").textContent=NoOfWords;
	console.log("3 or less letters: " + lessthan3);
    document.getElementById("stat5").textContent="3 or less letters: ";
    document.getElementById("stat6").textContent=lessthan3;
	console.log("More than 3 letters: "+ morethan3);
    document.getElementById("stat7").textContent="More than 3 letters: ";
    document.getElementById("stat8").textContent=morethan3;
	console.log("Longest word's number of letters in english: " + longesteng);
    document.getElementById("stat9").textContent="Longest word's number of letters in english: ";
    document.getElementById("stat10").textContent=longesteng;
	console.log("Longest word's number of letters in hungarian: " + longesthun);
    document.getElementById("stat11").textContent="Longest word's number of letters in hungarian: " ;
    document.getElementById("stat12").textContent=longesthun;
}

function main() {
	autoRefreshData();
}