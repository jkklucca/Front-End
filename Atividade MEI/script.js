const presetsMEI = {
  loja: {
    icone: "🎮", corPrimaria: "#6d28d9", nome: "Lucca Games MEI", slogan: "Jogos, Consoles & Acessórios",
    badge: "Loja Gamer & Encomendas", tituloHero: "Os melhores jogos para elevar o nível da sua gameplay.",
    descricaoHero: "Mídias físicas, controles e headsets com pedidos rápidos pelo WhatsApp.",
    subtituloSobre: "Paixão por videogames e preço justo",
    textoSobre1: "Fundada por Lucca, nossa loja MEI vende jogos de PlayStation, Xbox e Nintendo.",
    textoSobre2: "Produtos originais, revisados e com garantia para você jogar tranquilo.",
    metricas: [{ valor: "+500", texto: "Jogos Vendidos" }, { valor: "100%", texto: "Originais" }, { valor: "5.0 ★", texto: "Avaliação" }],
    endereco: "Rua dos Controles, 404 - Centro, SP", horario: "Seg a Sáb: 10h às 19h",
    cnpj: "12.345.678/0001-90", whatsapp: "5511988887777", whatsappFormatado: "(11) 98888-7777",
    catalogo: [
      { nome: "God of War Ragnarök (PS5)", categoria: "PlayStation", descricao: "Mídia física dublada em português.", preco: "R$ 249,00" },
      { nome: "Forza Horizon 5 (Xbox)", categoria: "Xbox", descricao: "Compatível com Xbox Series X|S e One.", preco: "R$ 199,00" },
      { nome: "Zelda: Tears of the Kingdom", categoria: "Nintendo", descricao: "Cartucho original para Nintendo Switch.", preco: "R$ 299,00" },
      { nome: "Controle DualSense PS5", categoria: "Acessórios", descricao: "Controle original Sony sem fio.", preco: "R$ 389,00" }
    ]
  },
  assistencia: {
    icone: "🛠️", corPrimaria: "#0284c7", nome: "Lucca Tech & Consoles MEI", slogan: "Manutenção de Videogames",
    badge: "Assistência Técnica Gamer", tituloHero: "Seu console frio, silencioso e rodando como novo.",
    descricaoHero: "Limpeza interna, troca de pasta térmica e reparo de controles.",
    subtituloSobre: "Cuidado técnico com seu console",
    textoSobre1: "O Lucca realiza manutenção preventiva em PS4, PS5, Xbox e Switch.",
    textoSobre2: "Enviamos fotos do processo e damos 90 dias de garantia.",
    metricas: [{ valor: "+320", texto: "Consoles" }, { valor: "90 dias", texto: "Garantia" }, { valor: "5.0 ★", texto: "Nota" }],
    endereco: "Rua dos Controles, 404 - Centro, SP", horario: "Seg a Sex: 09h às 18h",
    cnpj: "12.345.678/0001-90", whatsapp: "5511988887777", whatsappFormatado: "(11) 98888-7777",
    catalogo: [
      { nome: "Limpeza + Pasta Térmica", categoria: "Manutenção", descricao: "Limpeza interna completa do console.", preco: "R$ 140,00" },
      { nome: "Reparo de Drift Analógico", categoria: "Controles", descricao: "Troca do analógico PS5, PS4 e Xbox.", preco: "R$ 85,00" }
    ]
  }
};

let dados = presetsMEI.loja, cat = "Todos";
const $ = id => document.getElementById(id), zap = t => window.open(`https://wa.me{dados.whatsapp}?text=${encodeURIComponent(t)}`, "_blank");

function aplicar(d) {
  dados = d; cat = "Todos";
  document.documentElement.style.setProperty("--cor-primaria", d.corPrimaria);
  $("seletor-cor").value = d.corPrimaria;
  [["icone-negocio", d.icone], ["nome-negocio", d.nome], ["slogan-negocio", d.slogan], ["badge-categoria", d.badge], ["titulo-hero", d.tituloHero], ["descricao-hero", d.descricaoHero], ["subtitulo-sobre", d.subtituloSobre], ["texto-sobre-1", d.textoSobre1], ["texto-sobre-2", d.textoSobre2], ["rodape-nome", d.nome], ["rodape-endereco", d.endereco], ["rodape-horario", d.horario], ["rodape-cnpj", `CNPJ: ${d.cnpj}`], ["rodape-whatsapp", `WhatsApp: ${d.whatsappFormatado}`]].forEach(([id, v]) => $(id).textContent = v);
  d.metricas.forEach((m, i) => { $(`metrica-${i + 1}-valor`).textContent = m.valor; $(`metrica-${i + 1}-texto`).textContent = m.texto; });
  $("servico-escolhido").innerHTML = d.catalogo.map(i => `<option value="${i.nome} (${i.preco})">${i.nome} - ${i.preco}</option>`).join("") + `<option value="Orçamento personalizado">Orçamento personalizado</option>`;
  render();
}

function render() {
  $("filtros-catalogo").innerHTML = ["Todos", ...new Set(dados.catalogo.map(i => i.categoria))].map(c => `<button type="button" class="btn-filtro ${c === cat ? "ativo" : ""}" data-c="${c}">${c}</button>`).join("");
  $("grid-catalogo").innerHTML = dados.catalogo.filter(i => cat === "Todos" || i.categoria === cat).map(i => `<article class="card-produto"><div><span class="card-categoria-tag">${i.categoria}</span><h3>${i.nome}</h3><p>${i.descricao}</p></div><div class="card-rodape"><span class="card-preco">${i.preco}</span><button type="button" class="btn-pedir-zap" data-i="${i.nome} (${i.preco})">Pedir no WhatsApp</button></div></article>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  aplicar(presetsMEI.loja);
  $("filtros-catalogo").onclick = e => e.target.dataset.c && (cat = e.target.dataset.c, render());
  $("grid-catalogo").onclick = e => e.target.dataset.i && zap(`Olá, *${dados.nome}*! Quero pedir: *${e.target.dataset.i}*`);
  $("btn-menu-mobile").onclick = () => $("menu-navegacao").classList.toggle("ativo");
  $("btn-abrir-painel").onclick = $("btn-fechar-painel").onclick = () => $("painel-aluno").classList.toggle("aberto");
  $("seletor-cor").oninput = e => document.documentElement.style.setProperty("--cor-primaria", e.target.value);
  document.querySelectorAll(".btn-preset").forEach(b => b.onclick = () => aplicar(presetsMEI[b.dataset.preset]));
  $("form-orcamento").onsubmit = e => {
    e.preventDefault();
    const n = $("cliente-nome").value.trim(), t = $("cliente-telefone").value.trim(), m = $("cliente-mensagem").value.trim();
    $("erro-nome").textContent = n.length < 3 ? "Nome obrigatório." : "";
    $("erro-telefone").textContent = t.replace(/\D/g, "").length < 10 ? "WhatsApp inválido." : "";
    $("erro-mensagem").textContent = m.length < 5 ? "Descreva seu pedido." : "";
    if (n.length >= 3 && t.replace(/\D/g, "").length >= 10 && m.length >= 5) zap(`Olá, *${dados.nome}*!\n• *Nome:* ${n}\n• *Contato:* ${t}\n• *Interesse:* ${$("servico-escolhido").value}\n• *Detalhes:* ${m}`);
  };
});
