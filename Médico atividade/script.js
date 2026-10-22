const CHAVE = "pacientes_local";
const formPaciente = document.getElementById("formPaciente");
const listaPacientes = document.getElementById("listaPacientes");
const mensagem = document.getElementById("mensagem");
const previewFoto = document.getElementById("previewFoto");
const fotoInput = document.getElementById("foto");
const btnLimpar = document.getElementById("btnLimpar");

let fotoSelecionada = "";

// Obtém os pacientes do localStorage
function obterPacientes() {
    const dados = localStorage.getItem(CHAVE);
    return dados ? JSON.parse(dados) : [];
}

// Renderiza a prévia da foto ao selecionar um arquivo
fotoInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            fotoSelecionada = event.target.result;
            previewFoto.src = fotoSelecionada;
            previewFoto.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

// Listener do Evento de Submit do Formulário
formPaciente.addEventListener("submit", function (e) {
    e.preventDefault();

    const paciente = {
        id: Date.now().toString(), // Gera um ID único para exclusão
        nome: document.getElementById("nome").value,
        endereco: document.getElementById("endereco").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        naturalidade: document.getElementById("naturalidade").value,
        foto: fotoSelecionada
    };

    // Validação de campos obrigatórios vazios
    const campos = [paciente.nome, paciente.endereco, paciente.telefone, paciente.email, paciente.naturalidade];
    if (campos.some(campo => campo.trim() === "")) {
        mensagem.textContent = "Preencha todos os campos obrigatórios.";
        return;
    }

    const pacientes = obterPacientes();
    pacientes.push(paciente);

    try {
        localStorage.setItem(CHAVE, JSON.stringify(pacientes));
        mensagem.textContent = "Cadastro salvo com sucesso!";
        formPaciente.reset();
        limparPreviaFoto();
        mostrarPacientes();
    } catch (erro) {
        mensagem.textContent = "Não foi possível salvar. O armazenamento pode estar cheio.";
    }
});

// Exibe os pacientes cadastrados em tela
function mostrarPacientes() {
    listaPacientes.replaceChildren();
    const pacientes = obterPacientes();

    if (pacientes.length === 0) {
        listaPacientes.textContent = "Nenhum paciente cadastrado.";
        return;
    }

    pacientes.forEach(function (paciente) {
        const registro = document.createElement("article");
        registro.className = "registro";

        const titulo = document.createElement("h3");
        titulo.textContent = paciente.nome;
        registro.appendChild(titulo);

        if (paciente.foto) {
            const imagem = document.createElement("img");
            imagem.src = paciente.foto;
            imagem.alt = "Foto de " + paciente.nome;
            registro.appendChild(imagem);
        }

        const dados = [
            ["Endereço", paciente.endereco],
            ["Telefone", paciente.telefone],
            ["E-mail", paciente.email],
            ["Naturalidade", paciente.naturalidade]
        ];

        dados.forEach(function ([rotulo, valor]) {
            const paragrafo = document.createElement("p");
            paragrafo.textContent = rotulo + ": " + valor;
            registro.appendChild(paragrafo);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir cadastro";
        botaoExcluir.className = "excluir";
        botaoExcluir.addEventListener("click", function () {
            if (!confirm("Deseja excluir o cadastro de " + paciente.nome + "?")) {
                return;
            }
            
            // Correção da lógica de exclusão perdida no código original
            const pacientesAtuais = obterPacientes();
            const atualizados = pacientesAtuais.filter(item => item.id !== paciente.id);
            
            localStorage.setItem(CHAVE, JSON.stringify(atualizados));
            mensagem.textContent = "Cadastro excluído.";
            mostrarPacientes();
        });

        registro.appendChild(botaoExcluir);
        listaPacientes.appendChild(registro);
    });
}

function limparPreviaFoto() {
    fotoSelecionada = "";
    previewFoto.src = "";
    previewFoto.style.display = "none";
}

// Limpa o formulário e os estados de aviso
btnLimpar.addEventListener("click", function() {
    limparPreviaFoto();
    mensagem.textContent = "";
});

// Carrega os registros quando a página é aberta
mostrarPacientes();
