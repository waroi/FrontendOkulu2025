// function getTextFile() {
//   fetch("text.txt")
//     .then((response) => response.text())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// }
// getTextFile();

// function getJsonFile() {
//   fetch("users.json")
//     .then((response) => response.json())
//     .then((data) =>
//       data.map((user) => console.log(user.name, user.department, user.salary))
//     )
//     .catch((error) => console.log(error));
// }
// getJsonFile();

class Request {
  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  static post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  static put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  static delete(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => resolve("Veri silme işlemi başarılı"))
        .catch((error) => reject(error, "Veri silme işlemi başarısız"));
    });
  }
}

// Request.get("https://jsonplaceholder.typicde.com/posts")
//   .then((data) => data.map((post) => console.log(post.title)))
//   .catch((error) => console.log(error));

// Request.post("https://jsonplaceholder.typicode.com/posts", {
//   userId: 435345345,
//   title: "Deneme Başlık",
//   body: "Deneme Body",
// })
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// Request.put("https://jsonplaceholder.typicode.com/posts/1", {
//   userId: 1,
//   title: "Deneme Başlık",
//   body: "Deneme Body",
// })
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// Request.delete("https://jsonplaceholder.typicode.com/posts/1")
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
