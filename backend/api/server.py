from backend.api import app

if __name__ == "__main__":
    # Inicializa o servidor Flask
    app.run(host="0.0.0.0", port=5000, debug=True)