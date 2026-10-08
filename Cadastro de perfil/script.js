// 1. Recuperando os cadastros existentes ou iniciando array vazio
let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

// 2. Elementos da página
const formulario = document.getElementById("formulario");
const fotoInput = document.getElementById("foto");
const previewFoto = document.getElementById("previewFoto");
const listaCadastros = document.getElementById("listaCadastros");
const mensagem = document.getElementById("mensagem");

// Guarda o caminho da foto padrão como valor inicial
let fotoSelecionada = "img/raphael.jpeg"; 

// 3. Seleção e pré-visualização da foto
fotoInput.addEventListener("change", function() {
    const arquivo = fotoInput.files[0];
    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(evento) {
            fotoSelecionada = evento.target.result;
            previewFoto.src = fotoSelecionada;
        };
        leitor.readAsDataURL(arquivo);
    }
});

// 4. Evento de envio de cadastro
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    // Capturando os dados
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const nacionalidade = document.getElementById("nacionalidade").value;
    const naturalidade = document.getElementById("naturalidade").value;

    // 5. Criando o objeto pessoa
    const pessoa = {
        id: Date.now(),
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        email: email,
        nacionalidade: nacionalidade,
        naturalidade: naturalidade,
        foto: fotoSelecionada
    };

    // 6. Salvando no LocalStorage
    cadastros.push(pessoa);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    // Feedback e Atualização da Tela
    mensagem.innerHTML = "Cadastro realizado com sucesso, " + nome + "!";
    mensagem.style.color = "#111";
    
    exibirCadastros();
    limparFormulario();
});

// 7. Função para listar os cadastros na tela
function exibirCadastros() {
    listaCadastros.innerHTML = "";

    cadastros.forEach(function(pessoa) {
        const divCadastro = document.createElement("div");
        divCadastro.className = "cadastro";

        divCadastro.innerHTML = `
            <img src="${pessoa.foto}" alt="Foto de ${pessoa.nome}">
            <p><strong>Nome:</strong> ${pessoa.nome}</p>
            <p><strong>Endereço:</strong> ${pessoa.endereco}</p>
            <p><strong>Telefone:</strong> ${pessoa.telefone}</p>
            <p><strong>E-mail:</strong> ${pessoa.email}</p>
            <p><strong>Nacionalidade:</strong> ${pessoa.nacionalidade}</p>
            <p><strong>Naturalidade:</strong> ${pessoa.naturalidade}</p>
            <button onclick="excluirCadastro(${pessoa.id})">Excluir</button>
        `;
        listaCadastros.appendChild(divCadastro);
    });
}

// 8. Função para deletar um cadastro do LocalStorage
function excluirCadastro(id) {
    cadastros = cadastros.filter(pessoa => pessoa.id !== id);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));
    exibirCadastros();
}

// 9. Resetar campos do formulário
function limparFormulario() {
    formulario.reset();
    fotoSelecionada = "img/raphael.jpeg";
    previewFoto.src = "img/raphael.jpeg";
    mensagem.innerHTML = "";
}

// Executa automaticamente ao carregar a página para exibir registros salvos anteriormente
exibirCadastros();
