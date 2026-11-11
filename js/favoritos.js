
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter((favorito) => favorito !== id);
    } else {
        favoritos.push(id);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}
