from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
DATA_FILE = 'receitas_sugeridas.txt'

@app.route('/api/receitas', methods=['POST'])
def receber_receita():
    try:
        dados = request.get_json()
        if not dados or 'title' not in dados or 'ingredients' not in dados:
            return jsonify({"status": "erro", "message": "Dados incompletos"}), 400
        
        bloco_receita = (
            f"=== NOVA RECEITA SUGERIDA ===\n"
            f"Título: {dados['title']}\n"
            f"Ingredientes:\n{dados['ingredients']}\n"
            f"Modo de Preparo:\n{dados['instructions']}\n"
            f"=============================\n\n"
        )
        
        with open(DATA_FILE, 'a', encoding='utf-8') as f:
            f.write(bloco_receita)
            
        return jsonify({"status": "sucesso", "message": "Receita enviada com sucesso!"}), 201
    except Exception as e:
        return jsonify({"status": "erro", "message": str(e)}), 500

@app.route('/api/historico', methods=['GET'])
def obter_historico():
    try:
        if not os.path.exists(DATA_FILE):
            return jsonify([])

        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            conteudo = f.read()

        # Separa o arquivo pelos blocos de receita
        blocos = conteudo.split("=== NOVA RECEITA SUGERIDA ===")
        receitas = []

        for bloco in blocos:
            if not bloco.strip():
                continue
            
            linhas = bloco.strip().split('\n')
            titulo = ""
            ingredientes = []
            modo_preparo = []
            fase = "" # Controla se estamos lendo ingredientes ou preparo

            for linha in linhas:
                if linha.startswith("Título:"):
                    titulo = linha.replace("Título:", "").strip()
                elif linha.startswith("Ingredientes:"):
                    fase = "ingredientes"
                elif linha.startswith("Modo de Preparo:"):
                    fase = "preparo"
                elif linha.startswith("======="):
                    break
                else:
                    if fase == "ingredientes" and linha.strip():
                        ingredientes.append(linha.strip())
                    elif fase == "preparo" and linha.strip():
                        modo_preparo.append(linha.strip())

            if titulo:
                receitas.append({
                    "title": titulo,
                    "ingredients": ingredientes,
                    "instructions": modo_preparo
                })

        return jsonify(receitas), 200
    except Exception as e:
        return jsonify({"status": "erro", "message": str(e)}), 500

if __name__ == '__main__':
    print("Servidor ativo!")
    print("Acesse o site em: http://127.0.0")
    app.run(debug=True, port=5000)
