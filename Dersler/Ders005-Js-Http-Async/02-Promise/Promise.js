function getData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof data === "number") {
        let result = `Sonuç: ${data * 2}`;
        resolve(result);
      } else {
        reject("Lütfen bir sayı girin");
      }
    }, 2000);
  });
}

getData(20)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
