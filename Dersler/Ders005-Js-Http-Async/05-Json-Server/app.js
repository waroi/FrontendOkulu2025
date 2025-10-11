function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        console.log(item.title, item.author);
      });
    });
}

getData("http://localhost:3000/posts");
