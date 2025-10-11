document.getElementById("veri").addEventListener("click", getData);

function getData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
  xhr.onload = function () {
    let outputDiv = document.getElementById("output");
    if (this.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      data.forEach((item) => {
        outputDiv.innerHTML += `
      <div>
      <h2 class="bg-secondary-subtle text-danger text-center">${item.title}</h2>
      <p class="text-center text-primary">${item.body}</p>
      </div> <hr>`;
      });
    }
  };
  xhr.send();
}
