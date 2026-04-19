// 1. CARREGAR DADOS AO ABRIR A PÁGINA (CORRIGIDO)
window.addEventListener("load", function () {
    const params = new URLSearchParams(window.location.search);

    const titulo = document.getElementById('titulo-dinamico');
    const preco = document.getElementById('preco-dinamico');
    const img = document.getElementById('img-dinamica');

    if (params.get('nome') && titulo) titulo.innerText = params.get('nome');
    if (params.get('preco') && preco) preco.innerText = params.get('preco');
    if (params.get('img') && img) img.src = params.get('img');
});

// 2. MOSTRAR CAMPOS E ALTERAR PREÇO (CORRIGIDO)
function toggleCustomizacao() {
    const check = document.getElementById('check-customizar');
    const campos = document.getElementById('campos-custom');
    const precoElemento = document.getElementById('preco-dinamico');

    const params = new URLSearchParams(window.location.search);
    const precoBaseStr = params.get('preco') || "160,00";
    const precoBase = parseFloat(precoBaseStr.replace(',', '.'));

    if (check.checked) {
        campos.classList.add('visivel');

        let valorComExtra = precoBase + 20;
        precoElemento.innerText = valorComExtra.toFixed(2).replace('.', ',');
    } else {
        campos.classList.remove('visivel');
        precoElemento.innerText = precoBaseStr;
    }
}

// 3. SELEÇÃO DE TAMANHO
const botoes = document.querySelectorAll('.btn-tam');
botoes.forEach(btn => {
    btn.onclick = () => {
        botoes.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
    };
});

// 4. FUNÇÃO DO WHATSAPP
function enviarWhatsApp() {
    const meuNumero = "553299758046";
    const nomeProd = document.getElementById('titulo-dinamico').innerText;
    const tamSelecionado = document.querySelector('.btn-tam.ativo');
    const endereco = document.getElementById('endereco-input').value.trim();
    const check = document.getElementById('check-customizar');
    const precoFinal = document.getElementById('preco-dinamico').innerText;

    if (!tamSelecionado) {
        alert("⚠️ Selecione o tamanho!");
        return;
    }
    if (endereco === "") {
        alert("⚠️ Digite o endereço de entrega!");
        return;
    }

    let msg = `*⚽ NOVO PEDIDO - PEITAS DE TIME*%0A`;
    msg += `------------------------------------------%0A%0A`;
    msg += `*👕 PRODUTO:* ${nomeProd}%0A`;
    msg += `*📏 TAMANHO:* ${tamSelecionado.innerText}%0A`;
    msg += `*📍 ENTREGA:* ${endereco}%0A%0A`;

    if (check.checked) {
        const nomeP = document.getElementById('nome-personalizado').value.trim();
        const numP = document.getElementById('numero-personalizado').value.trim();

        if (!nomeP || !numP) {
            alert("⚠️ Preencha o Nome e o Número para a personalização!");
            return;
        }

        msg += `*✍️ PERSONALIZAÇÃO (+ R$ 20,00)*%0A`;
        msg += `• Nome na Camisa: ${nomeP.toUpperCase()}%0A`;
        msg += `• Número: ${numP}%0A%0A`;
    }

    msg += `*💰 TOTAL: R$ ${precoFinal}*%0A%0A`;
    msg += `------------------------------------------%0A`;
    msg += `_Pedido realizado pelo site_`;

    window.open(`https://wa.me/${meuNumero}?text=${msg}`, '_blank');
}

// 5. MENU CELULAR
const btnMenu = document.querySelector('.menu-toggle');
const menuNav = document.querySelector('.menu-navegacao');
if (btnMenu) {
    btnMenu.onclick = () => {
        btnMenu.classList.toggle('active');
        menuNav.classList.toggle('active');
    };
}

// --- CONTROLE UNIFICADO DO PRELOADER ---

// Função para esconder o loader
function esconderLoader() {
    const loader = document.getElementById("preloader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("loader-hidden");
        }, 800);
    }
}

// Esconde o loader assim que a página carregar
window.addEventListener("load", esconderLoader);

// Faz o loader APARECER quando você clica em qualquer link para outra página
document.addEventListener('click', function (e) {
    const link = e.target.closest('a'); // Verifica se o que foi clicado é um link ou está dentro de um
    
    if (link) {
        const href = link.getAttribute('href');
        
        // Só ativa o loader se for um link de verdade (não for âncora # nem vazio)
        if (href && !href.startsWith('#') && link.target !== '_blank') {
            const loader = document.getElementById('preloader');
            if (loader) {
                loader.classList.remove('loader-hidden');
            }
        }
    }
});

// --- ATIVAÇÃO DAS ANIMAÇÕES (AOS) ---
// Verifica se a biblioteca AOS existe antes de rodar para não dar erro no console
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000, // Velocidade da animação (1 segundo)
        once: true,     // Anima apenas uma vez ao descer a página
        offset: 100     // Começa a animar 100px antes do item aparecer
    });
}