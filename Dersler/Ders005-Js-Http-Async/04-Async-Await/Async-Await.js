class Request {
  static async get(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  static async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  }
  static async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }
  static async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }
}

// Request.get("https://jsonplaceholder.typicode.com/posts").then((data) =>
//   data.map((post) => console.log(post.title))
// );

// Request.post("https://jsonplaceholder.typicode.com/posts", {
//   userId: 435345345,
//   title: "Deneme Başlık",
//   body: "Deneme İçerik",
// })
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// Request.put("https://jsonplaceholder.typicode.com/posts/1", {
//   userId: 10,
//   title: "Deneme Başlık",
//   body: "Deneme İçerik",
// })
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

Request.delete("https://jsonplaceholder.typicode.com/posts/1")
  .then((data) => console.log("Veri silme işlemi başarılı"))
  .catch((error) => console.log(error, "Veri silme işlemi başarısız"));
