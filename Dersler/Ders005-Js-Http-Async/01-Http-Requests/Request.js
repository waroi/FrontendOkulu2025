document.getElementById("veri").addEventListener("click", function () {
  // XMLHttpRequest nesnesi oluşturma
  const xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onreadystatechange = function () {
    console.log(xhr.readyState);
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("İstek Başarılı Data Geldi - ", xhr.responseText);
    }
  };

  // İsteği oluşturma-açma
  xhr.open("GET", "text.txt", true); // true -> asenkron
  // İstek gönderme
  xhr.send();
});
