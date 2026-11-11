const formularioQuiz = document.querySelector("#form-quiz");
const resultadoQuiz = document.querySelector("#resultado-quiz");
const livrosRecomendados = document.querySelector("#livros-recomendados");
const mensagemQuiz = document.querySelector("#mensagem-quiz");

if (formularioQuiz && resultadoQuiz && livrosRecomendados && mensagemQuiz) {
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

        livrosRecomendados.replaceChildren();

        recomendados.forEach((livro) => {
            livrosRecomendados.appendChild(criarCardLivro(livro, false));
        });

        mensagemQuiz.hidden = recomendados.length > 0;
        resultadoQuiz.hidden = false;
    });
}