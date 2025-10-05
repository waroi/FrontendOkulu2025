// Local Storage

// let userName = "Varol";
// localStorage.setItem("userName", userName); // setItem ile veri ekleme

// let localUserName = localStorage.getItem("userName"); // getItem ile veri çekme
// console.log("localUserName:", localUserName);

// let yas = 30;
// localStorage.setItem("yas", yas); // number türündeki veriyi stringe çevirip saklar
// let localYas = Number(localStorage.getItem("yas")); // string olarak gelen veriyi numbera çeviriyoruz
// console.log("localYas:", localYas);
// console.log("type of localYas:", typeof localYas); // number

// let user = {
//   name: "Varol",
//   age: 30,
//   city: "Ankara",
//   lang: ["C++", "Java", "JavaScript"],
// };

// localStorage.setItem("user", JSON.stringify(user)); // object türündeki veriyi JSON.stringify ile stringe çevirip saklar
// let localUser = JSON.parse(localStorage.getItem("user")); // string olarak gelen veriyi JSON.parse ile objecte çeviriyoruz
// console.log("localUser:", localUser);
// console.log("type of localUser:", typeof localUser); // object

// let users = [
//   { name: "Varol", age: 30 },
//   { name: "Ahmet", age: 25 },
//   { name: "Mehmet", age: 35 },
// ];

// localStorage.setItem("users", JSON.stringify(users)); // array türündeki veriyi JSON.stringify ile stringe çevirip saklar
// let localUsers = JSON.parse(localStorage.getItem("users")); // string olarak gelen veriyi JSON.parse ile arraye çeviriyoruz
// console.log("localUsers:", localUsers);
// console.log("type of localUsers:", typeof localUsers); // object
// localUsers.map((user) => document.writeln(`<p>${user.name}</p>`)); // arrayi dolaşıp isimleri yazdırıyoruz

// Session Storage

// let users = [
//   { name: "Varol", age: 30 },
//   { name: "Ahmet", age: 25 },
//   { name: "Mehmet", age: 35 },
// ];

// sessionStorage.setItem("users", JSON.stringify(users)); // array türündeki veriyi JSON.stringify ile stringe çevirip saklar
// let sessionUsers = JSON.parse(sessionStorage.getItem("users")); // string olarak gelen veriyi JSON.parse ile arraye çeviriyoruz
// console.log("sessionUsers:", sessionUsers);
// console.log("type of sessionUsers:", typeof sessionUsers); // object
// sessionUsers.map((user) => document.writeln(`<p>${user.name}</p>`)); // arrayi dolaşıp isimleri yazdırıyoruz

// spread opetor (...)
// const langs = ["C++", "Java", "JavaScript", "Python"];
// const numbers = [1, 2, 3, 4, 5];
// let sonuc;

// sonuc = [...langs, ...numbers]; // iki arrayi birleştirir
// sonuc = [...langs, "C#", "Go"]; // arrayin sonuna eleman ekler

// console.log(sonuc);
// Destructuring

// let user = {
//   name: "Varol",
//   age: 30,
//   city: "Ankara",
//   langs: ["C++", "Java", "JavaScript"],
// };

// let { name, age, ...geriKalanlar } = user; // objectin içindeki verilere değişken olarak erişir

// console.log(name, age, geriKalanlar); // geriKalanlar tanımlı olmadığı için undefined döner
const langs = ["C++", "Java", "JavaScript", "Python"];

let [a, b, ...geriKalanlar] = langs; // arrayin içindeki verilere değişken olarak erişir

console.log(a, b, geriKalanlar); // geriKalanlar tanımlı olmadığı için undefined döner
