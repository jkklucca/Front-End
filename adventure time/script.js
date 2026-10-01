// Função para alternar o endereço da imagem e a cor de fundo do container da imagem
function mudarFoto(caminhoImagem, corFundo) {
    const foto = document.getElementById('fotoExibida');
    const container = document.querySelector('.galeria-container');
    
    // Altera a foto principal
    foto.src = caminhoImagem;
    
    // Se for a Imagem 1 (Finn), muda o fundo do container normalmente
    if (caminhoImagem.includes('Finn.jpg')) {
        container.style.backgroundColor = corFundo;
        foto.style.filter = 'none'; // Remove efeitos das outras fotos
    } else {
        // Se for a Imagem 2 ou 3, deixa o container invisível e joga a cor APENAS no fundo da foto
        container.style.backgroundColor = '#d1e707'; 
        foto.style.filter = `drop-shadow(0 0 0 500px ${corFundo})`;
    }
}
