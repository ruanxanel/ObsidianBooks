let avaliacoes = {};

try {
    const dadosSalvos = localStorage.getItem("avaliacoes");

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        if (dados && typeof dados === "object" && !Array.isArray(dados)) {
            avaliacoes = dados;
        }
    }
} catch (erro) {
    console.error("Erro ao carregar avaliações:", erro);
}

function salvarAvaliacao(id, nota) {
    if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
        return false;
    }

    const notaAnterior = avaliacoes[id];
    avaliacoes[id] = nota;

    try {
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
        return true;
    } catch (erro) {
        if (notaAnterior === undefined) {
            delete avaliacoes[id];
        } else {
            avaliacoes[id] = notaAnterior;
        }

        console.error("Erro ao salvar avaliação:", erro);
        return false;
    }
}

function obterAvaliacao(id) {
    const nota = avaliacoes[id];

    return Number.isInteger(nota) && nota >= 1 && nota <= 5
        ? nota
        : 0;
}

function removerAvaliacao(id) {
    if (avaliacoes[id] === undefined) {
        return false;
    }

    const notaAnterior = avaliacoes[id];
    delete avaliacoes[id];

    try {
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
        return true;
    } catch (erro) {
        avaliacoes[id] = notaAnterior;
        console.error("Erro ao remover avaliação:", erro);
        return false;
    }
}