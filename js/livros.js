function criarCardLivro(livro, mostrarFavorito = true) {
    const card = document.createElement("article");
    card.classList.add("livro-card");
    card.dataset.gratuito = String(livro.gratuito);

    const imagem = document.createElement("img");
    imagem.src = livro.imagem;
    imagem.alt = `Capa do livro ${livro.titulo}`;
    imagem.loading = "lazy";

    const titulo = document.createElement("h3");
    titulo.textContent = livro.titulo;

    const autor = document.createElement("p");
    autor.classList.add("autor");
    autor.textContent = livro.autor;

    const genero = document.createElement("p");
    genero.classList.add("genero");
    genero.textContent = livro.genero;

    card.append(imagem, titulo, autor, genero);

    const acoes = document.createElement("div");
    acoes.classList.add("acoes-livro");

    if (mostrarFavorito) {
        const botaoFavorito = document.createElement("button");
        botaoFavorito.type = "button";
        botaoFavorito.classList.add("botao-livro");

        function atualizarBotao() {
            const favoritado = favoritos.includes(livro.id);
            botaoFavorito.textContent = favoritado ? "❤️ Favoritado" : "🤍 Favoritar";
            botaoFavorito.setAttribute("aria-pressed", String(favoritado));
        }

        atualizarBotao();

        botaoFavorito.addEventListener("click", () => {
            alternarFavorito(livro.id);
            atualizarBotao();

            const catalogoFavoritos = document.querySelector("#catalogo-favoritos");
            if (catalogoFavoritos && !favoritos.includes(livro.id)) {
                card.remove();
                const mensagem = document.querySelector("#mensagem-favoritos-vazios");
                if (mensagem) {
                    mensagem.hidden = catalogoFavoritos.children.length > 0;
                }
            }
        });

        acoes.appendChild(botaoFavorito);
    }

    if (livro.linkCompra) {
        const botaoCompra = document.createElement("a");
        botaoCompra.href = livro.linkCompra;
        botaoCompra.textContent = "Comprar livro";
        botaoCompra.target = "_blank";
        botaoCompra.rel = "noopener noreferrer";
        botaoCompra.classList.add("botao-livro");
        acoes.appendChild(botaoCompra);
    }

    if (livro.gratuito && livro.linkGratuito) {
        const botaoGratis = document.createElement("a");
        botaoGratis.href = livro.linkGratuito;
        botaoGratis.textContent = "Ler grátis";
        botaoGratis.target = "_blank";
        botaoGratis.rel = "noopener noreferrer";
        botaoGratis.classList.add("botao-livro", "botao-gratis");
        acoes.appendChild(botaoGratis);
    }

    card.appendChild(acoes);
    return card;
}

const catalogoDestaques = document.querySelector("#catalogo-destaques");
const catalogoGratuitos = document.querySelector("#catalogo-gratuitos");
const catalogoExplorar = document.querySelector("#catalogo-explorar");
const catalogoFavoritos = document.querySelector("#catalogo-favoritos");
const catalogo = catalogoDestaques || catalogoGratuitos || catalogoExplorar || catalogoFavoritos;

if (catalogo) {
    let livrosExibidos = livros;

    if (catalogoGratuitos) {
        livrosExibidos = livros.filter((livro) => livro.gratuito && livro.linkGratuito);
    } else if (catalogoDestaques) {
        livrosExibidos = livros.filter((livro) => livro.destaque);
    } else if (catalogoFavoritos) {
        livrosExibidos = livros.filter((livro) => favoritos.includes(livro.id));
    }

    livrosExibidos.forEach((livro) => catalogo.appendChild(criarCardLivro(livro)));
}

if (catalogoFavoritos) {
    const mensagem = document.querySelector("#mensagem-favoritos-vazios");
    if (mensagem) {
        mensagem.hidden = catalogoFavoritos.children.length > 0;
    }
}