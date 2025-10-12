const cardBody = document.querySelectorAll(".card-body")[1];
const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const clear = document.getElementById("clear-films");

// Eventler
eventListeners();
function eventListeners() {
  cardBody.addEventListener("click", deleteFilm);
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", loadAllFilms);
  clear.addEventListener("click", clearAllFilms);
}

function clearAllFilms() {
  UI.clearAllFilmsFromUI();
  UI.displayMessages("Tüm filmler silindi", "danger");
}

function deleteFilm(e) {
  console.log(e);
  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target);
  }
  console.log(e.target);
}
function addFilm(e) {
  e.preventDefault();
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;
  if (title === "" || director === "" || url === "") {
    UI.displayMessages("Tüm alanları doldurun...", "danger");
  } else {
    const newFilm = new Film(title, director, url);
    UI.addFilmToUI(newFilm);
    UI.clearInputs(titleElement, directorElement, urlElement);
    UI.displayMessages("Film başarıyla eklendi...", "success");
  }
}

function loadAllFilms() {
  let films = [
    {
      title: "Film 1",
      director: "Director 1",
      url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVexG4k8hzX9xhBoQLlQvTKi9Zx3P4fcZRsuSk3Uly_3UVv711CsuNPPdBgk_3spvikdinSjrpz81j9f8AxspFAVw2VCaxV6xftrygUj2HMQ",
    },
    {
      title: "Film 2",
      director: "Director 2",
      url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQVexG4k8hzX9xhBoQLlQvTKi9Zx3P4fcZRsuSk3Uly_3UVv711CsuNPPdBgk_3spvikdinSjrpz81j9f8AxspFAVw2VCaxV6xftrygUj2HMQ",
    },
  ];
  UI.loadAllFilms(films);
}
