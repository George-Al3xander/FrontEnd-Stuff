let getBody = document.body;
(function test() {
	let heading = document.createElement("h1");
	let firstPart = document.createElement("p").innerHTML = "Hello ";
	let secondPart = document.createElement("p").innerHTML = "John";
	firstPart.style.color = "red";
	secondPart.style.color = "green";

	heading.appendChild(firstPart);
	heading.appendChild(secondPart);

	getBody.appendChild(heading);


})();