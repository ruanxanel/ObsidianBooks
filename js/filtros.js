const campoPesquisa = document.querySelector("#buscar-livro");
const filtroGenero = document.querySelector("#filtrar-genero");
const filtroGratuitos = document.querySelector("#somente-gratuitos");
const mensagemSemResultados = document.querySelector("#mensagem-sem-resultados");

function filtrarLivros() {
    const pesquisa = campoPesquisa.value.toLowerCase().trim();
    const generoSelecionado = filtroGenero.value;
    const somenteGratuitos = filtroGratuitos.checked;
    let quantidadeVisivel = 0;

    const cards = document.querySelectorAll(".livro-card");

    cards.forEach((card) => {
        const titulo = card.querySelector("h3").textContent.toLowerCase();
        const autor = card.querySelector(".autor").textContent.toLowerCase();
        const genero = card.querySelector(".genero").textContent;

        const correspondePesquisa =
            titulo.includes(pesquisa) || autor.includes(pesquisa);

        const correspondeGenero =
            generoSelecionado === "todos" || genero === generoSelecionado;

        const correspondeGratuito =
            !somenteGratuitos || card.dataset.gratuito === "true";

        if (correspondePesquisa && correspondeGenero && correspondeGratuito) {
            card.style.display = "";
            quantidadeVisivel++;
        } else {
            card.style.display = "none";
        }
    });

    mensagemSemResultados.hidden = quantidadeVisivel > 0;
}

if (campoPesquisa && filtroGenero) {
    campoPesquisa.addEventListener("input", filtrarLivros);
    filtroGenero.addEventListener("change", filtrarLivros);
    filtroGratuitos.addEventListener("change", filtrarLivros);
}