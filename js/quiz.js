const formularioQuiz = document.querySelector("#form-quiz");
const resultadoQuiz = document.querySelector("#resultado-quiz");
const livrosRecomendados = document.querySelector("#livros-recomendados");
const mensagemQuiz = document.querySelector("#mensagem-quiz");

if (formularioQuiz) {
    formularioQuiz.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const genero = document.querySelector("#genero-quiz").value;
        const acesso = document.querySelector("#acesso-quiz").value;

        const recomendados = livros.filter((livro) => {
            const correspondeGenero = livro.genero === genero;

            const correspondeAcesso = acesso === "todos" ||
                (livro.gratuito && livro.linkGratuito);

            return correspondeGenero && correspondeAcesso;
        });

        livrosRecomendados.innerHTML = "";

        recomendados.forEach((livro) => {
            const card = document.createElement("article");
            card.classList.add("livro-card");

            const link = livro.gratuito && livro.linkGratuito
                ? livro.linkGratuito
                : livro.linkCompra;

            card.innerHTML = `
                <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}">
                <h3>${livro.titulo}</h3>
                <p class="autor">${livro.autor}</p>
                <p class="genero">${livro.genero}</p>
            `;

            if (link) {
                const botao = document.createElement("a");

                botao.href = link;
                botao.textContent = livro.gratuito ? "Ler grátis" : "Comprar";
                botao.target = "_blank";
                botao.rel = "noopener noreferrer";
                botao.classList.add("botao-livro");

                if (livro.gratuito && livro.linkGratuito) {
                    botao.classList.add("botao-gratis");
                }

                card.appendChild(botao);
            }

            livrosRecomendados.appendChild(card);
        });

        mensagemQuiz.hidden = recomendados.length > 0;
        resultadoQuiz.hidden = false;
    });
}