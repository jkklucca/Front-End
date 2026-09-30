function mostrarMensagem() {
    document.getElementById("descricao").innerHTML = 
        "Fundado em 1914 como Palestra Italia, o Palmeiras mudou de nome em 1942 e arranca vitórias sob pressão até hoje, sendo reconhecido como o Maior Campeão do Brasil!";
}

function mudarCor() {
    document.body.style.backgroundColor = "#d0ebd7";
}

function trocarAba(abaId) {
    const conteudos = document.querySelectorAll('.tab-content');
    conteudos.forEach(conteudo => conteudo.classList.remove('active'));
    
    const botoes = document.querySelectorAll('.tab-btn');
    botoes.forEach(botao => botao.classList.remove('active'));
    
    document.getElementById(abaId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Inserção do elenco de 2026 com fotos dinâmicas
document.addEventListener("DOMContentLoaded", function() {
    const jogadores2026 = [
        { nome: "Carlos Miguel", numero: "1", posicao: "Goleiro", destaque: "Pilar defensivo", foto: "miguel.jpg" },
        { nome: "Gustavo Gómez", numero: "15", posicao: "Zagueiro", destaque: "Capitão e Líder", foto: "gomez.jpg" },
        { nome: "Murilo Cerqueira", numero: "26", posicao: "Zagueiro", destaque: "Segurança na zaga", foto: "murilo.jpg" },
        { nome: "Joaquín Piquerez", numero: "22", posicao: "Lateral Esquerdo", destaque: "Consistência internacional", foto: "piquerez.jpg" },
        { nome: "Andreas Pereira", numero: "8", posicao: "Meio-campista", destaque: "Maestro do meio-campo", foto: "andreas.jpg" },
        { nome: "Maurício", numero: "18", posicao: "Meio-campista", destaque: "Destaque e garçom", foto: "mauricio.jpg" },
        { nome: "Jhon Arias", numero: "11", posicao: "Meio-campista / Ponta", destaque: "Velocidade e drible", foto: "arias.jpg" },
        { nome: "Felipe Anderson", numero: "7", posicao: "Atacante / Meia", destaque: "Experiência e refino", foto: "Fa.jpg" },
        { nome: "Flaco López", numero: "42", posicao: "Centroavante", destaque: "Artilheiro da temporada", foto: "flaco.jpg" },
        { nome: "Vitor Roque", numero: "9", posicao: "Atacante", destaque: "Poder de explosão", foto: "roque.jpg" }
    ];

    const container = document.getElementById("jogadores-container");
    
    jogadores2026.forEach(jog => {
        const card = document.createElement("div");
        card.className = "card player-card";
        card.innerHTML = `
            <img src="img/${jog.foto}" alt="${jog.nome}" class="card-img" onerror="this.src='https://placehold.co'">
            <p class="badge">Nº ${jog.numero}</p>
            <h3>${jog.nome}</h3>
            <p><strong>Posição:</strong> ${jog.posicao}</p>
            <p style="font-size: 14px; color: #6c757d; font-style: italic; margin-top: 5px;">${jog.destaque}</p>
        `;
        container.appendChild(card);
    });
});
