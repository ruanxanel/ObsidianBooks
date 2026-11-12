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

    const areaAvaliacao = document.createElement("div");
    areaAvaliacao.classList.add("avaliacao-livro");

    const estrelas = document.createElement("div");
    estrelas.classList.add("estrelas");

    const textoAvaliacao = document.createElement("p");
    textoAvaliacao.classList.add("texto-avaliacao");

    function atualizarEstrelas() {
        const notaAtual = obterAvaliacao(livro.id);

        estrelas.replaceChildren();

        for (let nota = 1; nota <= 5; nota++) {
            const estrela = document.createElement("button");

            estrela.type = "button";
            estrela.classList.add("estrela-avaliacao");

            estrela.textContent = nota <= notaAtual ? "★" : "☆";

            estrela.setAttribute(
                "aria-label",
                `Avaliar ${livro.titulo} com ${nota} estrelas`
            );

            estrela.setAttribute(
                "aria-pressed",
                String(nota === notaAtual)
            );

            estrela.addEventListener("click", () => {
                const sucesso = nota === obterAvaliacao(livro.id)
                    ? removerAvaliacao(livro.id)
                    : salvarAvaliacao(livro.id, nota);

                if (sucesso) {
                    atualizarEstrelas();
                } else {
                    alert("Não foi possível salvar sua avaliação.");
                }
            });

            estrelas.appendChild(estrela);
        }

        textoAvaliacao.textContent = notaAtual > 0
            ? `Sua avaliação: ${notaAtual}/5`
            : "Ainda não avaliado";
    }

    atualizarEstrelas();

    areaAvaliacao.append(estrelas, textoAvaliacao);
    card.appendChild(areaAvaliacao);

    const acoes = document.createElement("div");
    acoes.classList.add("acoes-livro");

    // Lista de leitura
    const seletorLeitura = document.createElement("select");
    seletorLeitura.classList.add("seletor-leitura");
    seletorLeitura.setAttribute(
        "aria-label",
        `Estado de leitura de ${livro.titulo}`
    );

    const opcoes = [
        ["", "Adicionar à lista"],
        ["quero-ler", "Quero ler"],
        ["lendo", "Lendo"],
        ["concluido", "Concluído"]
    ];

    opcoes.forEach(([valor, texto]) => {
        const opcao = document.createElement("option");
        opcao.value = valor;
        opcao.textContent = texto;
        seletorLeitura.appendChild(opcao);
    });

    seletorLeitura.value = obterEstadoLeitura(livro.id) || "";

    seletorLeitura.addEventListener("change", () => {
        const estadoAnterior = obterEstadoLeitura(livro.id);
        const novoEstado = seletorLeitura.value;

        let sucesso;

        if (novoEstado) {
            sucesso = salvarEstadoLeitura(livro.id, novoEstado);
        } else if (estadoAnterior === null) {
            sucesso = true;
        } else {
            sucesso = removerDaListaLeitura(livro.id);
        }

        if (!sucesso) {
            seletorLeitura.value = estadoAnterior || "";
            alert("Não foi possível atualizar sua lista de leitura.");
            return;
        }

        document.dispatchEvent(
            new Event("listaLeituraAtualizada")
        );
    });

    acoes.appendChild(seletorLeitura);

    // Botão de detalhes
    const botaoDetalhes = document.createElement("button");
    botaoDetalhes.type = "button";
    botaoDetalhes.classList.add("botao-livro");
    botaoDetalhes.textContent = "Ver detalhes";

    botaoDetalhes.addEventListener("click", () => {
        abrirModalLivro(livro);
    });

    acoes.appendChild(botaoDetalhes);

    // Favoritos
    if (mostrarFavorito) {
        const botaoFavorito = document.createElement("button");
        botaoFavorito.type = "button";
        botaoFavorito.classList.add("botao-livro");

        function atualizarBotao() {
            const favoritado = favoritos.includes(livro.id);

            botaoFavorito.textContent = favoritado
                ? "❤️ Favoritado"
                : "🤍 Favoritar";

            botaoFavorito.setAttribute(
                "aria-pressed",
                String(favoritado)
            );
        }

        atualizarBotao();

        botaoFavorito.addEventListener("click", () => {
            alternarFavorito(livro.id);
            atualizarBotao();

            const catalogoFavoritos = document.querySelector(
                "#catalogo-favoritos"
            );

            if (
                catalogoFavoritos &&
                !favoritos.includes(livro.id)
            ) {
                card.remove();

                const mensagem = document.querySelector(
                    "#mensagem-favoritos-vazios"
                );

                if (mensagem) {
                    mensagem.hidden =
                        catalogoFavoritos.children.length > 0;
                }
            }
        });

        acoes.appendChild(botaoFavorito);
    }

    // Comprar livro
    if (livro.linkCompra) {
        const botaoCompra = document.createElement("a");
        botaoCompra.href = livro.linkCompra;
        botaoCompra.textContent = "Comprar livro";
        botaoCompra.target = "_blank";
        botaoCompra.rel = "noopener noreferrer";
        botaoCompra.classList.add("botao-livro");

        acoes.appendChild(botaoCompra);
    }

    // Ler gratuitamente
    if (livro.gratuito && livro.linkGratuito) {
        const botaoGratis = document.createElement("a");
        botaoGratis.href = livro.linkGratuito;
        botaoGratis.textContent = "Ler grátis";
        botaoGratis.target = "_blank";
        botaoGratis.rel = "noopener noreferrer";
        botaoGratis.classList.add(
            "botao-livro",
            "botao-gratis"
        );

        acoes.appendChild(botaoGratis);
    }

    card.appendChild(acoes);

    return card;
}

// Catálogos
const catalogoDestaques = document.querySelector(
    "#catalogo-destaques"
);

const catalogoGratuitos = document.querySelector(
    "#catalogo-gratuitos"
);

const catalogoExplorar = document.querySelector(
    "#catalogo-explorar"
);

const catalogoFavoritos = document.querySelector(
    "#catalogo-favoritos"
);

const catalogo =
    catalogoDestaques ||
    catalogoGratuitos ||
    catalogoExplorar ||
    catalogoFavoritos;

if (catalogo) {
    let livrosExibidos = livros;

    if (catalogoGratuitos) {
        livrosExibidos = livros.filter(
            (livro) => livro.gratuito && livro.linkGratuito
        );
    } else if (catalogoDestaques) {
        livrosExibidos = livros.filter(
            (livro) => livro.destaque
        );
    } else if (catalogoFavoritos) {
        livrosExibidos = livros.filter(
            (livro) => favoritos.includes(livro.id)
        );
    }

    livrosExibidos.forEach((livro) => {
        catalogo.appendChild(criarCardLivro(livro));
    });
}

if (catalogoFavoritos) {
    const mensagem = document.querySelector(
        "#mensagem-favoritos-vazios"
    );

    if (mensagem) {
        mensagem.hidden =
            catalogoFavoritos.children.length > 0;
    }
}

// Modal de detalhes
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

    sinopse.textContent =
        livro.sinopse || "Sinopse não disponível.";

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
    botaoFecharModal.addEventListener(
        "click",
        fecharModalLivro
    );

    modalLivro.addEventListener("click", (evento) => {
        if (evento.target === modalLivro) {
            fecharModalLivro();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            !modalLivro.hidden
        ) {
            fecharModalLivro();
        }
    });
}