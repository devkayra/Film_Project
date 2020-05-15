const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films")


// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFİlm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    
    cardbody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFİlm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        // Hata
        UI.displayMessages("Tüm Alanları Doldurun...", "danger");
    }
    else{
        // Yeni Film
        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm); // Arayüze Film Ekleme
        Storage.addFilmToStorage(newFilm); // Storage'a Film Ekleme

        UI.displayMessages("Film Başarıyla Eklendi.", "success");

    }

    UI.clearInputs(titleElement, directorElement, urlElement);



    e.preventDefault();
}

function deleteFilm(e){
    // console.log(e.target);

    if (e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);

        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı", "success");
    }
}

function clearAllFilms(){
    if(confirm("Emin Misiniz?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
}