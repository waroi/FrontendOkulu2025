let value;

// value = document;
// value = document.URL;
// value = document.location;
// value = document.location.hostname;
// value = document.scripts[0].getAttribute("src");
// value = document.links;
// value = document.links[document.links.length - 1].getAttribute("class");
// value = document.links[document.links.length - 1].classList;

// // ID ile element seçimi
// value = document.getElementById("title");
// value = document.getElementById("title").innerText;
// value = document.getElementById("title").classList;

// // Class ile element seçimi
// value = document.getElementsByClassName("link");
// value = document.getElementsByClassName("link")[0];

// // Tag ile element seçimi
// value = document.getElementsByTagName("a");
// value = document.getElementsByTagName("a")[2];
// value = document.getElementsByTagName("a")[2].innerText;

// // Query Selector
// value = document.querySelector("#title");
// value = document.querySelector(".link");
// value = document.querySelector("a");
// value = document.querySelector("a").innerText;

// // Query Selector All
// value = document.querySelectorAll("a");
// value = document.querySelectorAll("a")[2];
// value = document.querySelectorAll("a")[2].innerText;

// Eleman olusturma

const button = document.createElement("a");
button.id = "denemeButton";
button.className = "btn btn-primary";
button.innerText = "Tıkla Beni";
button.href = "https://www.google.com.tr";
button.target = "_blank";
const divSec = document.getElementById("denemeDiv");
divSec.appendChild(button);

document.getElementById(
  "denemeDiv2"
).innerHTML = `<a id="denemeButton2" class="btn btn-danger" href="https://www.google.com.tr" target="_blank">Bana da Tıkla</a>`;

console.log(value);
