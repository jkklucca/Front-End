// Seleciona o botão de alternar tema pelo ID
const themeToggleBtn = document.getElementById('theme-toggle');

// Adiciona um evento de clique ao botão
themeToggleBtn.addEventListener('click', () => {
    // Verifica qual é o tema ativo no atributo data-theme do elemento html
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        // Se estiver escuro, muda para claro e atualiza o texto do botão
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.textContent = 'Modo Escuro';
    } else {
        // Se estiver claro, define o atributo para "dark" e atualiza o texto
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = 'Modo Claro';
    }
});
