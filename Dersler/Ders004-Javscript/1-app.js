// Javascript Başlangıç

// Tek satır yorum
// console.log("Merhaba AcademyClub");

// Çoklu satır yorum
/*
console.log("Merhaba AcademyClub");
console.log("Merhaba AcademyClub");
console.log("Merhaba AcademyClub");
console.log("Merhaba AcademyClub");
*/

// Değişkenler

// a = 10;
// console.log(a);

// var a = 10;
// console.log(a);

// let b = 20;
// b = 25;
// console.log(b);

// const c = 30;
// c = 35; // Hata verir, değiştiremeyiz.
// console.log(c);

// Veri Tipleri

// String
// var userName = "Varol Maksuoğlu";
// console.log(userName);
// console.log(typeof userName);

// Number
// var age = 36;
// console.log(age);
// console.log(typeof age);

// otomatik tip dönüşümü
// var firstNumber = 20;
// var secondNumber = "30";
// var result = firstNumber + secondNumber;
// var result = firstNumber - secondNumber;
// console.log(result);
// console.log(typeof result);

// hoisting
// var firstNumber;
// console.log(firstNumber);
// firstNumber = 20;
// deneme();
// function deneme() {
//   console.log("Deneme fonksiyonu çalıştı.");
// }

// Boolean
// var isActive = true;
// console.log(isActive);
// console.log(typeof isActive);
// console.log(2 === "2");

// Undefined - değeri atanmamış
// var userName;
// console.log(userName);
// console.log(typeof userName);

// Null - değeri boş
// var userName = null;
// console.log(userName);
// console.log(typeof userName);

// Object
// var user = {
//   name: "Varol Maksuoğlu",
//   age: 30,
//   isActive: true,
//   notlar: { math: 70, fizik: 80, kimya: 90 },
//   favoriteColors: ["Kırmızı", "Mavi", "Yeşil"],
//   verileriGoster: function () {
//     console.log("Fonksiyon çalıştı.");
//   },
// };

// console.log(user);
// console.log(typeof user);
// console.log(user.name);
// console.log(user.age);
// user.verileriGoster();

// Array
// var names = ["Ahmet", "Mehmet", "Ayşe", "Fatma"];
// console.log(names);
// console.log(typeof names);
// console.log(names[0]);
// console.log(names.length);

// Fonksiyonlar
// function merhaba() {
//   console.log("Merhaba AcademyClub");
// }
// merhaba();
// console.log(merhaba);
// console.log(typeof merhaba);

// Date objesi
// var date = new Date();
// console.log(date);
// console.log(typeof date);
// console.log(date.getDate());
// console.log(date.getDay());

// var a = 10;
// var b = a;
// console.log("1-", a, b);
// a = 20;
// console.log("2-", a, b);

// var a = [10];
// var b = a;
// console.log("1-", a, b);
// a = [20];
// console.log("2-", a, b);
// console.log("3-", a * b);

// var a = [10, 20, 30, 40, 50];
// var b = a;
// console.log("1- ", a, b);
// a[0] = 60;
// a.push(60);
// console.log("2- ", a, b);

// Scope - Kapsam
// var a = 10; // Global Scope
// function deneme() {
//   var b = 20; // Function Scope
//   c = 30; // Global Scope
//   console.log(a);
//   console.log(b);
// }
// deneme();
// console.log(a);
// // console.log(b);
// console.log(c);

// if (true) {
//   var a = 10; // Function Scope
//   let b = 20; // Block Scope
//   const c = 30; // Block Scope
//   console.log(a);
//   console.log(b);
//   console.log(c);
// }
// console.log(a);
// // console.log(b);
// // console.log(c);

// Tip Dönüşümleri
// var a = 10;
// console.log(a, typeof a);
// var b = "20";
// console.log(b, typeof b);
// // b = "Varol10";
// // var sonuc = String(a);
// var sonuc = Number(b);

// console.log(sonuc, typeof sonuc);

// var a = 5 + "2";
// console.log(a, typeof a);
// var a = 5 - "2";
// console.log(a, typeof a);

// Operatörler
// Atama Operatörleri (=)
// var a = 10;

// Aritmetik Operatörler (+, -, *, /, %, **)
// console.log(5 + 2); // Toplama
// console.log(5 - 2); // Çıkarma
// console.log(5 * 2); // Çarpma
// console.log(5 / 2); // Bölme
// console.log(5 % 2); // Mod alma
// console.log(5 ** 2); // Üslü

// Karşılaştırma Operatörleri (==, ===, !=, !==, >, <, >=, <=)
// console.log(2 == "2"); // Değer karşılaştırması
// console.log(2 === "2"); // Hem değer hem de tip karşılaştırması
// console.log(2 != "2"); // Değer karşılaştırması - Eşit değil
// console.log(2 !== "2"); // Hem değer hem de tip karşılaştırması - Eşit değil
// console.log(5 > 2); // Büyük
// console.log(5 < 2); // Küçük
// console.log(5 >= 2); // Büyük eşit
// console.log(5 <= 2); // Küçük eşit

// Math Fonksiyonu
// let sonuc;
// sonuc = Math.PI;
// sonuc = Math.round(3.6);
// sonuc = Math.ceil(3.2);
// sonuc = Math.floor(3.8);
// sonuc = Math.sqrt(16);
// sonuc = Math.floor(Math.random() * 100 + 1); // 1-100 arası rastgele sayı
// sonuc = Math.random();
// console.log(sonuc);

// String Metotları
// let value;
// const firstName = "Varol";
// const lastName = "Maksuoğlu";
// const city = "İstanbul";
// const age = 36;

// value = firstName + " " + lastName;
// value = firstName;
// value += " " + lastName;
// value = firstName.length;
// value = firstName.toLocaleLowerCase();
// value = firstName.toLocaleUpperCase();
// value = firstName[0];
// value = firstName[firstName.length - 1];
// value = firstName.indexOf("a");
// value = firstName.includes("a");
// value = firstName.concat(" ", lastName, " ", city);
// value = firstName.slice(0, 3);

// value =
//   "İsim: " +
//   firstName +
//   "\nSoyisim: " +
//   lastName +
//   "\nŞehir: " +
//   city +
//   "\nYaş: " +
//   age;

// Template Literals
// value = `İsim: ${firstName}
// Soyisim: ${lastName}
// Şehir: ${city}
// Yaş: ${age}
// `;

// console.log(value);

// Array Metotları
// const langs = ["Python", "Java", "C++", "JavaScript"];
// const numbers = [3, 5, 2, 10, 15, 7];

// let value;

// value = langs.length; // Eleman sayısı
// value = langs[0]; // İlk eleman
// value = langs[langs.length - 1]; // Son eleman
// value = langs.indexOf("Java"); // Elemanın indeksi
// value = langs.includes("Python"); // Eleman var mı?
// value = langs.push("C#"); // Sona eleman ekler
// value = langs.unshift("Ruby"); // Başa eleman ekler
// value = langs.pop(); // Sondaki elemanı siler
// value = langs.shift(); // Baştaki elemanı siler
// value = langs.reverse(); // Diziyi ters çevirir
// value = langs.sort(); // Diziyi alfabetik sıralar
// value = numbers.sort(); // Diziyi alfabetik sıralar
// value = numbers.sort(function (a, b) {
//   return a - b; // Küçükten büyüğe sıralar
// });
// value = numbers.sort(function (a, b) {
//   return b - a; // Küçükten büyüğe sıralar
// });
// // console.log(langs);
// console.log(value);
