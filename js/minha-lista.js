function atualizarMinhaLista() {
    const categorias = ["quero-ler", "lendo", "concluido"];

    categorias.forEach((estado) => {
        const catalogo = document.querySelector(
            `#lista-${estado}`
        );

        const mensagem = document.querySelector(
            `#vazio-${estado}`
        );

        if (!catalogo || !mensagem) {
            return;
        }

        catalogo.replaceChildren();

        const livrosFiltrados = livros.filter(
            (livro) => obterEstadoLeitura(livro.id) === estado
        );

        livrosFiltrados.forEach((livro) => {
            const card = criarCardLivro(livro);
            catalogo.appendChild(card);
        });

        mensagem.hidden = livrosFiltrados.length > 0;
    });
}

atualizarMinhaLista();

document.addEventListener(
    "listaLeituraAtualizada",
    atualizarMinhaLista
);