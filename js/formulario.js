const formulario = document.querySelector("#form-preferencias");
const mensagemFormulario = document.querySelector("#mensagem-formulario");
const campoGenero = document.querySelector("#genero");
const campoTrope = document.querySelector("#trope");

if (formulario && mensagemFormulario && campoGenero && campoTrope) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const preferencias = {
            genero: campoGenero.value,
            trope: campoTrope.value.trim()
        };

        try {
            localStorage.setItem(
                "preferencias",
                JSON.stringify(preferencias)
            );

            document.dispatchEvent(new Event("preferenciasAtualizadas"));

            mensagemFormulario.textContent =
                "Suas preferências foram salvas com sucesso!";

            mensagemFormulario.hidden = false;

            formulario.reset();
        } catch (erro) {
            mensagemFormulario.textContent =
                "Não foi possível salvar suas preferências. Tente novamente.";

            mensagemFormulario.hidden = false;

            console.error("Erro ao salvar preferências:", erro);
        }
    });
}