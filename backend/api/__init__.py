from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from bs4 import BeautifulSoup
from backend.api.optimize import minify_html, minify_css, minify_js, optimize_image
from backend.api.access_control import is_access_allowed

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir solicitações do frontend

# Configurações
UPLOAD_FOLDER = "backend/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Endpoint: Otimizar HTML
@app.route('/optimize/html', methods=['POST'])
def optimize_html():
    data = request.json.get("html", "")
    if not data:
        return jsonify({"error": "HTML vazio"}), 400

    optimized_html = minify_html(data)
    return jsonify({"optimized_html": optimized_html})

# Endpoint: Otimizar CSS
@app.route('/optimize/css', methods=['POST'])
def optimize_css():
    data = request.json.get("css", "")
    if not data:
        return jsonify({"error": "CSS vazio"}), 400

    optimized_css = minify_css(data)
    return jsonify({"optimized_css": optimized_css})

# Endpoint: Otimizar JavaScript
@app.route('/optimize/js', methods=['POST'])
def optimize_js():
    data = request.json.get("js", "")
    if not data:
        return jsonify({"error": "JavaScript vazio"}), 400

    optimized_js = minify_js(data)
    return jsonify({"optimized_js": optimized_js})

# Endpoint: Otimizar Imagens
@app.route('/optimize/image', methods=['POST'])
def optimize_image_endpoint():
    try:
        image_url = request.json.get("image_url", "")
        if not image_url:
            return jsonify({"error": "URL da imagem não fornecida"}), 400

        optimized_image = optimize_image(image_url, quality=70)
        optimized_image_path = os.path.join(UPLOAD_FOLDER, "optimized_image.jpg")

        # Salvar imagem otimizada localmente
        with open(optimized_image_path, "wb") as f:
            f.write(optimized_image.read())

        return jsonify({"optimized_image_url": optimized_image_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint: Processar URL do site
@app.route('/process/site', methods=['POST'])
def process_site():
    site_url = request.json.get("site_url", "")
    if not site_url:
        return jsonify({"error": "URL do site não fornecida"}), 400

    if not is_access_allowed(site_url):
        return jsonify({"error": "Acesso ao site não permitido"}), 403

    try:
        # Fazer download do HTML do site
        response = requests.get(site_url)
        soup = BeautifulSoup(response.content, "html.parser")

        # Otimizar HTML do site
        optimized_html = minify_html(soup.prettify())
        return jsonify({"optimized_html": optimized_html})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Iniciar o servidor
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
