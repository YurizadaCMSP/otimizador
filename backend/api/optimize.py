import re
from PIL import Image
from io import BytesIO
import requests

# Função para minificar HTML
def minify_html(html):
    return re.sub(r"\s+", " ", html).strip()

# Função para minificar CSS
def minify_css(css):
    return re.sub(r"\s+", " ", css).strip()

# Função para minificar JavaScript
def minify_js(js):
    return re.sub(r"\s+", " ", js).strip()

# Função para otimizar uma imagem a partir de uma URL
def optimize_image(image_url, quality=70):
    try:
        response = requests.get(image_url)
        response.raise_for_status()

        img = Image.open(BytesIO(response.content))

        # Salvar imagem otimizada em memória
        optimized_image = BytesIO()
        img.save(optimized_image, format="JPEG", quality=quality)
        optimized_image.seek(0)

        return optimized_image
    except Exception as e:
        raise ValueError(f"Erro ao otimizar a imagem: {e}")
