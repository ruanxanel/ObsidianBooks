const catalogoRecomendacoes = document.querySelector("#catalogo-recomendacoes");
const mensagemRecomendacoes = document.querySelector("#mensagem-recomendacoes");

function mostrarRecomendacoes() {
    if (!catalogoRecomendacoes || !mensagemRecomendacoes) {
        return;
    }

    catalogoRecomendacoes.replaceChildren();

    let preferencias;

    try {
        preferencias = JSON.parse(localStorage.getItem("preferencias"));
    } catch (erro) {
        console.error("Erro ao carregar preferências:", erro);
        preferencias = null;
    }

    if (!preferencias || !preferencias.genero) {
        mensagemRecomendacoes.textContent =
            "Salve suas preferências para receber recomendações.";
        mensagemRecomendacoes.hidden = false;
        return;
    }

    const recomendados = livros.filter((livro) => {
        return livro.genero === preferencias.genero;
    });

    if (recomendados.length === 0) {
        mensagemRecomendacoes.textContent =
            "Nenhum livro encontrado para seu gênero preferido.";
        mensagemRecomendacoes.hidden = false;
        return;
    }

    mensagemRecomendacoes.hidden = true;

    recomendados.forEach((livro) => {
        catalogoRecomendacoes.appendChild(criarCardLivro(livro));
    });
}

mostrarRecomendacoes();

document.addEventListener("preferenciasAtualizadas", mostrarRecomendacoes);
