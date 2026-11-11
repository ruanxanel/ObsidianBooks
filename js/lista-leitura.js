let listaLeitura = {};

try {
    const dadosSalvos = localStorage.getItem("listaLeitura");

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        if (dados && typeof dados === "object" && !Array.isArray(dados)) {
            listaLeitura = dados;
        }
    }
} catch (erro) {
    console.error("Erro ao carregar lista de leitura:", erro);
}

function salvarListaLeitura() {
    try {
        localStorage.setItem(
            "listaLeitura",
            JSON.stringify(listaLeitura)
        );

        return true;
    } catch (erro) {
        console.error("Erro ao salvar lista de leitura:", erro);
        return false;
    }
}

function salvarEstadoLeitura(id, estado) {
    const estadosValidos = ["quero-ler", "lendo", "concluido"];

    if (!estadosValidos.includes(estado)) {
        return false;
    }

    const estadoAnterior = listaLeitura[id];

    listaLeitura[id] = estado;

    if (!salvarListaLeitura()) {
        if (estadoAnterior === undefined) {
            delete listaLeitura[id];
        } else {
            listaLeitura[id] = estadoAnterior;
        }

        return false;
    }

    return true;
}

function obterEstadoLeitura(id) {
    return listaLeitura[id] || null;
}

function removerDaListaLeitura(id) {
    const estadoAnterior = listaLeitura[id];

    if (estadoAnterior === undefined) {
        return false;
    }

    delete listaLeitura[id];

    if (!salvarListaLeitura()) {
        listaLeitura[id] = estadoAnterior;
        return false;
    }

    return true;
}