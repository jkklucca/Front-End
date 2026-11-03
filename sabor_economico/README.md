# Sabor Econômico

Site de receitas econômicas com frontend em HTML, CSS e JavaScript e backend em Python/Flask.

## 1. Requisitos
- Python 3.10 ou superior
- Internet apenas para carregar a fonte Google Fonts (o site funciona sem ela)

## 2. Instalação
Abra o terminal dentro da pasta `sabor_economico` e execute:

```bash
python -m venv venv
```

Ative o ambiente virtual:

**Windows**
```bash
venv\Scripts\activate
```

**macOS / Linux**
```bash
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

## 3. Executar
Na pasta do projeto, execute:

```bash
python app.py
```

Abra no navegador: http://127.0.0.1:5000

O arquivo `recipes.json` será criado automaticamente na primeira execução. Ele guarda as receitas cadastradas, então elas continuam disponíveis depois de reiniciar o servidor.

## 4. Funcionalidades
- Listagem de receitas via API Python.
- Pesquisa por nome, descrição ou ingrediente.
- Filtro por categoria.
- Visualização dos ingredientes e do preparo.
- Favoritos salvos no navegador (localStorage).
- Cadastro de receitas, persistido em `recipes.json`.

## 5. Estrutura

```text
sabor_economico/
├── app.py
├── requirements.txt
├── README.md
├── recipes.json       # criado automaticamente
├── templates/
│   └── index.html
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

## 6. Rotas da API
- `GET /api/recipes` — lista todas as receitas.
- `GET /api/recipes?q=arroz` — pesquisa por nome, descrição ou ingrediente.
- `GET /api/recipes?category=Aproveitamento%20integral` — filtra por categoria.
- `GET /api/recipes/1` — retorna uma receita pelo ID.
- `POST /api/recipes` — cadastra uma receita em JSON.
- `DELETE /api/recipes/1` — remove uma receita pelo ID.

**Observação:** este é um projeto didático. Antes de publicar na internet, adicione autenticação, proteção contra abuso e um banco de dados adequado.
