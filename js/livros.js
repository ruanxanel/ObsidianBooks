const catalogoDestaques = document.querySelector("#catalogo-destaques");
const catalogoGratuitos = document.querySelector("#catalogo-gratuitos");
const catalogoExplorar = document.querySelector("#catalogo-explorar");

const catalogo = catalogoDestaques || catalogoGratuitos || catalogoExplorar;

let livrosExibidos = livros;

if (catalogoGratuitos) {
    livrosExibidos = livros.filter((livro) =>
        livro.gratuito && livro.linkGratuito
    );
}

if (catalogoDestaques) {
    livrosExibidos = livros.filter((livro) => livro.destaque);
}

livrosExibidos.forEach((livro) => {
    const card = document.createElement("article");

    card.classList.add("livro-card");
    card.dataset.gratuito = livro.gratuito;

    card.innerHTML = `
        <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}">

        <h3>${livro.titulo}</h3>

        <p class="autor">${livro.autor}</p>

        <p class="genero">${livro.genero}</p>
    `;

    const acoes = document.createElement("div");
    acoes.classList.add("acoes-livro");

    if (livro.linkCompra) {
        const botaoCompra = document.createElement("a");

        botaoCompra.href = livro.linkCompra;
        botaoCompra.textContent = "Comprar físico";
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
    catalogo.appendChild(card);
});