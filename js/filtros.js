const campoPesquisa = document.querySelector("#buscar-livro");
const filtroGenero = document.querySelector("#filtrar-genero");
const filtroGratuitos = document.querySelector("#somente-gratuitos");
const mensagemSemResultados = document.querySelector("#mensagem-sem-resultados");

function filtrarLivros() {
    if (!campoPesquisa || !filtroGenero || !filtroGratuitos || !mensagemSemResultados) {
        return;
    }

    const pesquisa = campoPesquisa.value.toLocaleLowerCase("pt-BR").trim();
    const generoSelecionado = filtroGenero.value;
    const somenteGratuitos = filtroGratuitos.checked;
    let quantidadeVisivel = 0;

    const cards = document.querySelectorAll("#catalogo-explorar .livro-card");

    cards.forEach((card) => {
        const titulo = card.querySelector("h3").textContent.toLocaleLowerCase("pt-BR");
        const autor = card.querySelector(".autor").textContent.toLocaleLowerCase("pt-BR");
        const genero = card.querySelector(".genero").textContent;

        const correspondePesquisa = titulo.includes(pesquisa) || autor.includes(pesquisa);
        const correspondeGenero = generoSelecionado === "todos" || genero === generoSelecionado;
        const correspondeGratuito = !somenteGratuitos || card.dataset.gratuito === "true";
        const visivel = correspondePesquisa && correspondeGenero && correspondeGratuito;

        card.hidden = !visivel;
        // A classe .livro-card usa display:flex; por isso garantimos que hidden prevaleça.
        card.style.display = visivel ? "" : "none";
        if (visivel) quantidadeVisivel++;
    });

    mensagemSemResultados.hidden = quantidadeVisivel > 0;
}

if (campoPesquisa && filtroGenero && filtroGratuitos && mensagemSemResultados) {
    campoPesquisa.addEventListener("input", filtrarLivros);
    filtroGenero.addEventListener("change", filtrarLivros);
    filtroGratuitos.addEventListener("change", filtrarLivros);
}