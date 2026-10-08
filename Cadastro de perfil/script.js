const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    mensagem.innerHTML = "Cadastro realizado com sucesso, " + nome + "!";
});

function limparFormulario() {
    document.getElementById("formulario").reset();
    document.getElementById("mensagem").innerHTML = "";
}