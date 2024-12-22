# Lista de URLs permitidas (isso pode ser integrado a um banco de dados futuramente)
ALLOWED_SITES = [
    "example.com",
    "testsite.com",
    "mysite.com",
]

# Função para verificar se o acesso ao site é permitido
def is_access_allowed(site_url):
    for allowed_site in ALLOWED_SITES:
        if allowed_site in site_url:
            return True
    return False

# Adicionar site à lista de permitidos
def add_allowed_site(site_url):
    if site_url not in ALLOWED_SITES:
        ALLOWED_SITES.append(site_url)
        return True
    return False

# Remover site da lista de permitidos
def remove_allowed_site(site_url):
    if site_url in ALLOWED_SITES:
        ALLOWED_SITES.remove(site_url)
        return True
    return False
