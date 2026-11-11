
const formulario = document.querySelector("#form-preferencias");
const mensagemFormulario = document.querySelector("#mensagem-formulario");

if (formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const preferencias = {
            nome: document.querySelector("#nome").value.trim(),
            email: document.querySelector("#email").value.trim(),
            idade: document.querySelector("#idade").value,
            genero: document.querySelector("#genero").value,
            trope: document.querySelector("#trope").value.trim()
        };

        localStorage.setItem(
            "preferencias",
            JSON.stringify(preferencias)
        );

        mensagemFormulario.hidden = false;

        formulario.reset();
    });
}
