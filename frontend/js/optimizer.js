// optimizer.js: Script para otimizações específicas no frontend

// Função para minificar HTML, CSS e JS
function minifyResources() {
    console.log("🔧 Minificando recursos...");

    // Minificar CSS inline
    const styleElements = document.querySelectorAll("style");
    styleElements.forEach((style) => {
        style.innerHTML = style.innerHTML.replace(/\s+/g, " ").trim();
        console.log("✅ CSS inline minificado.");
    });

    // Minificar JavaScript inline
    const scriptElements = document.querySelectorAll("script:not([src])");
    scriptElements.forEach((script) => {
        script.innerHTML = script.innerHTML.replace(/\s+/g, " ").trim();
        console.log("✅ JavaScript inline minificado.");
    });

    // Minificar HTML
    document.body.innerHTML = document.body.innerHTML.replace(/\s+/g, " ").trim();
    console.log("✅ HTML minificado.");
}

// Função para priorizar o carregamento de recursos essenciais
function prioritizeResources() {
    console.log("📦 Priorizando recursos essenciais...");

    const criticalCSS = document.querySelector('link[rel="stylesheet"]');
    if (criticalCSS) {
        criticalCSS.rel = "preload";
        criticalCSS.as = "style";
        console.log("✅ CSS crítico priorizado.");
    }

    const criticalJS = document.querySelector('script[src]');
    if (criticalJS) {
        criticalJS.async = true;
        console.log("✅ JavaScript crítico carregado de forma assíncrona.");
    }
}

// Função para remover CSS e JS não utilizados
function removeUnusedResources() {
    console.log("🧹 Removendo recursos não utilizados...");

    // Remover arquivos CSS não críticos
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-non-critical="true"]');
    nonCriticalCSS.forEach((css) => {
        css.parentNode.removeChild(css);
        console.log(`🗑️ CSS removido: ${css.href}`);
    });

    // Remover scripts não críticos
    const nonCriticalJS = document.querySelectorAll('script[data-non-critical="true"]');
    nonCriticalJS.forEach((js) => {
        js.parentNode.removeChild(js);
        console.log(`🗑️ JS removido: ${js.src || "inline script"}`);
    });
}

// Função para aplicar compressão e cache no cliente
function applyClientCache() {
    console.log("📂 Configurando cache no cliente...");

    const resources = document.querySelectorAll("img, link[rel='stylesheet'], script[src]");
    resources.forEach((resource) => {
        const url = new URL(resource.src || resource.href);
        url.searchParams.append("cache", "true");
        if (resource.tagName === "IMG") {
            resource.src = url.toString();
        } else if (resource.tagName === "LINK") {
            resource.href = url.toString();
        } else if (resource.tagName === "SCRIPT") {
            resource.src = url.toString();
        }
        console.log(`✅ Cache configurado para: ${url.toString()}`);
    });
}

// Inicializar otimizações
function runOptimizations() {
    console.log("🚀 Executando otimizações no frontend...");

    // Ordem das otimizações
    minifyResources();
    prioritizeResources();
    removeUnusedResources();
    applyClientCache();

    console.log("✅ Otimizações concluídas.");
}

// Executar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    runOptimizations();
});
