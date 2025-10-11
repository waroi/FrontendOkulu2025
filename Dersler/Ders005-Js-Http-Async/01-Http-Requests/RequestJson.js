document.getElementById("getButton").addEventListener("click", getAllData);

function getAllData() {
  const xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.open("GET", "users.json", true);
  xhr.onload = function () {
    let tableBody = document.getElementById("employees");
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      data.forEach((user) => {
        tableBody.innerHTML += `
          <tr>
            <td>${user.name}</td>
            <td>${user.department}</td>
            <td>${user.salary}</td>
          </tr>
        `;
      });
    } else {
      list.innerHTML = "<tr><td colspan='3'>Veri alınamadı</td></tr>";
      console.error("Data Alınamadı. Status:", xhr.status);
    }
  };
  xhr.send();
}
