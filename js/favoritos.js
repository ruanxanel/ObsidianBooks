let favoritos = [];

try {
    const dadosSalvos = JSON.parse(localStorage.getItem("favoritos"));

    if (Array.isArray(dadosSalvos)) {
        favoritos = dadosSalvos.filter((id) => Number.isInteger(id));
    }
} catch (erro) {
    console.warn("Não foi possível carregar os favoritos salvos.", erro);
}

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter((favorito) => favorito !== id);
    } else {
        favoritos.push(id);
    }

    try {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    } catch (erro) {
        console.warn("Não foi possível salvar os favoritos.", erro);
    }
}