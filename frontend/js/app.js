// app.js: Script principal para inicializar e gerenciar a otimização do site

// Configuração inicial
const optimizerConfig = {
    backendURL: "https://your-backend-url.com", // Substituir pelo URL do backend
    enableRocketLoader: true, // Ativar ou desativar o Rocket Loader
    rocketLoaderVersion: "v2", // Versão do Rocket Loader: 'v1' ou 'v2'
    enableLazyLoading: true, // Ativar lazy loading
    optimizeImages: true, // Ativar otimização de imagens
};

// Função para inicializar o sistema
function initializeOptimizer() {
    console.log("🚀 Iniciando o sistema de otimização do site...");

    // Ativar Rocket Loader
    if (optimizerConfig.enableRocketLoader) {
        loadRocketLoader(optimizerConfig.rocketLoaderVersion);
    }

    // Ativar Lazy Loading
    if (optimizerConfig.enableLazyLoading) {
        enableLazyLoading();
    }

    // Otimizar Imagens
    if (optimizerConfig.optimizeImages) {
        optimizeImages();
    }
}

// Função para carregar o Rocket Loader
function loadRocketLoader(version) {
    const rocketLoaderScript = document.createElement("script");
    if (version === "v1") {
        rocketLoaderScript.src = "./rocket_loader_v1.js";
    } else if (version === "v2") {
        rocketLoaderScript.src = "./rocket_loader_v2.js";
    } else {
        console.warn("⚠️ Versão do Rocket Loader inválida!");
        return;
    }

    rocketLoaderScript.onload = () => {
        console.log(`✅ Rocket Loader versão ${version} carregado com sucesso.`);
    };

    rocketLoaderScript.onerror = () => {
        console.error(`❌ Falha ao carregar o Rocket Loader versão ${version}.`);
    };

    document.head.appendChild(rocketLoaderScript);
}

// Função para ativar Lazy Loading de imagens
function enableLazyLoading() {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        const originalSrc = img.src;
        img.src = "";
        img.dataset.src = originalSrc;
        img.loading = "lazy";

        img.addEventListener("load", () => {
            console.log(`Imagem carregada: ${originalSrc}`);
        });
    });

    console.log("✅ Lazy Loading ativado para imagens.");
}

// Função para otimizar imagens (requisição ao backend)
async function optimizeImages() {
    const images = document.querySelectorAll("img[data-src]");
    for (const img of images) {
        try {
            const response = await fetch(`${optimizerConfig.backendURL}/optimize_images`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ src: img.dataset.src }),
            });

            if (!response.ok) {
                console.error(`❌ Falha ao otimizar imagem: ${img.dataset.src}`);
                continue;
            }

            const { optimizedSrc } = await response.json();
            img.src = optimizedSrc;
            console.log(`✅ Imagem otimizada: ${img.dataset.src}`);
        } catch (error) {
            console.error(`❌ Erro ao otimizar imagem: ${error.message}`);
        }
    }
}

// Inicializar o sistema assim que o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    initializeOptimizer();
});
