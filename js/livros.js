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

    
    const botaoDetalhes = document.createElement("button");
    botaoDetalhes.type = "button";
    botaoDetalhes.classList.add("botao-livro");
    botaoDetalhes.textContent = "Ver detalhes";

    botaoDetalhes.addEventListener("click", () => {
        abrirModalLivro(livro);
    });

    acoes.appendChild(botaoDetalhes);


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


function abrirModalLivro(livro) {
    const modal = document.querySelector("#modal-livro");

    if (!modal) {
        return;
    }

    const imagem = document.querySelector("#modal-imagem");
    const titulo = document.querySelector("#modal-titulo");
    const autor = document.querySelector("#modal-autor");
    const genero = document.querySelector("#modal-genero");
    const sinopse = document.querySelector("#modal-sinopse");
    const link = document.querySelector("#modal-link");

    imagem.src = livro.imagem;
    imagem.alt = `Capa do livro ${livro.titulo}`;

    titulo.textContent = livro.titulo;
    autor.textContent = `Autor: ${livro.autor}`;
    genero.textContent = `Gênero: ${livro.genero}`;
    sinopse.textContent = livro.sinopse || "Sinopse não disponível.";

    const endereco = livro.gratuito
        ? livro.linkGratuito
        : livro.linkCompra;

    if (endereco) {
        link.href = endereco;
        link.textContent = livro.gratuito
            ? "Ler gratuitamente"
            : "Comprar livro";
        link.hidden = false;
    } else {
        link.hidden = true;
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";
}


const modalLivro = document.querySelector("#modal-livro");
const botaoFecharModal = document.querySelector("#fechar-modal");

function fecharModalLivro() {
    if (!modalLivro) {
        return;
    }

    modalLivro.hidden = true;
    document.body.style.overflow = "";
}

if (modalLivro && botaoFecharModal) {
    botaoFecharModal.addEventListener("click", fecharModalLivro);

    modalLivro.addEventListener("click", (evento) => {
        if (evento.target === modalLivro) {
            fecharModalLivro();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && !modalLivro.hidden) {
            fecharModalLivro();
        }
    });
}