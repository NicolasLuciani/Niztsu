/* ==========================================================================
   1. DADOS DOS PRODUTOS
   ========================================================================== */
const products = [
    {
        name: "Niztsu <br><span>Venom Green</span>",
        desc: "Domine as ruas com o Venom Green. Design agressivo com tecnologia de ponta para quem tem atitude de sobra.",
        price: 699.90, // Preço base (numérico)
        color: "#155e2d", 
        img: "assets/tenis_1.png" 
    },
    {
        name: "Niztsu <br><span>Royal Brown</span>",
        desc: "Luxo e conforto em cada passo. O acabamento em tons terrosos e dourados redefine o conceito de sneaker premium.",
        price: 749.90, // Preço base (numérico)
        color: "#6d4c41", 
        img: "assets/tenis_2.png"
    },
    {
        name: "Niztsu <br><span>Classic White</span>",
        desc: "O essencial elevado à perfeição. Detalhes minimalistas e a logo icônica em prata para um visual limpo e futurista.",
        price: 649.90, // Preço base (numérico)
        color: "#b0b0b0", 
        img: "assets/tenis_3.png"
    }
];

/* ==========================================================================
   2. SELETORES E VARIÁVEIS
   ========================================================================== */
const mainShoe = document.getElementById('main-shoe');
const title = document.getElementById('p-title');
const desc = document.getElementById('p-desc');
const priceTag = document.getElementById('p-price'); // Ou .price-box
const thumbBox = document.querySelector('.thumbs-container');
const bigText = document.getElementById('parallax-text');
const brandDot = document.querySelector('.brand-corner span');
const sizeBtns = document.querySelectorAll('.size-box');

// Estado Atual
let currentIndex = 0;
const tamanhoBase = 38; // Tamanho padrão do preço base

/* ==========================================================================
   3. FUNÇÕES DE LÓGICA (CORE)
   ========================================================================== */

// --- INICIALIZA O SITE ---
function init() {
    // 1. Gera as miniaturas dinamicamente
    thumbBox.innerHTML = ""; // Limpa antes de criar
    products.forEach((prod, idx) => {
        const div = document.createElement('div');
        div.className = `thumb ${idx === 0 ? 'active' : ''}`;
        // Cria a imagem com evento de clique passando o índice
        div.innerHTML = `<img src="${prod.img}">`;
        div.addEventListener('click', () => changeShoe(idx));
        thumbBox.appendChild(div);
    });

    // 2. Carrega o primeiro tênis
    updateShoeUI(0);
}

// --- CALCULA E ATUALIZA O PREÇO ---
function updatePrice() {
    // Descobre qual tamanho está selecionado visualmente
    const btnAtivo = document.querySelector('.size-box.active');
    let tamanhoSelecionado = tamanhoBase; // Se nenhum estiver, assume 38

    if (btnAtivo) {
        tamanhoSelecionado = parseInt(btnAtivo.innerText);
    }

    // Pega o preço base do produto que está na tela AGORA
    const precoBaseProduto = products[currentIndex].price;

    // Calcula a diferença (Ex: 40 - 38 = 2 tamanhos a mais)
    let diferenca = tamanhoSelecionado - tamanhoBase;
    if (diferenca < 0) diferenca = 0;

    // Lógica: Preço Base + (Diferença * 15 reais)
    const precoFinal = precoBaseProduto + (diferenca * 15);

    // Atualiza o texto na tela formatado em Reais
    if(priceTag) {
        priceTag.innerText = `R$ ${precoFinal.toFixed(2).replace('.', ',')}`;
    }
}

// --- ATUALIZA A TELA (TEXTOS, CORES E IMAGEM) ---
function updateShoeUI(index) {
    const p = products[index];
    
    // Atualiza variáveis CSS e textos
    document.documentElement.style.setProperty('--primary', p.color);
    if(title) title.innerHTML = p.name;
    if(desc) desc.innerText = p.desc;
    if(mainShoe) mainShoe.src = p.img;
    if(brandDot) brandDot.style.color = p.color;

    // IMPORTANTE: Recalcula o preço imediatamente baseando-se no tamanho que já está selecionado
    updatePrice();
}

// --- GERENCIA A ANIMAÇÃO DE TROCA ---
function changeShoe(index) {
    if (index === currentIndex) return; // Não faz nada se clicar no mesmo
    
    currentIndex = index; // Atualiza o índice global

    // Atualiza a classe 'active' nas miniaturas
    const allThumbs = document.querySelectorAll('.thumb');
    allThumbs.forEach((t, i) => {
        if (i === index) t.classList.add('active');
        else t.classList.remove('active');
    });

    // Animação de SAÍDA
    mainShoe.style.transition = "all 0.4s ease-in";
    mainShoe.style.transform = "rotate(-45deg) translateY(-100px) scale(0.5)";
    mainShoe.style.opacity = "0";
    
    title.style.opacity = "0";
    title.style.transform = "translateY(20px)";

    // Espera a animação de saída terminar para trocar os dados
    setTimeout(() => {
        updateShoeUI(index); // Troca os dados
        
        // Animação de ENTRADA
        mainShoe.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        mainShoe.style.transform = "rotate(-25deg) translateY(0) scale(1)";
        mainShoe.style.opacity = "1";
        
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
    }, 400);
}

/* ==========================================================================
   4. EVENTOS (CLIQUES E MOUSE)
   ========================================================================== */

// --- CLIQUE NOS TAMANHOS ---
sizeBtns.forEach(box => {
    box.addEventListener('click', function() {
        // Remove active dos outros
        sizeBtns.forEach(b => b.classList.remove('active'));
        // Adiciona no clicado
        this.classList.add('active');
        
        // Recalcula o preço imediatamente
        updatePrice();
    });
});

// --- EFEITO PARALLAX (MOUSE MOVE) ---
document.addEventListener('mousemove', (e) => {
    if(!mainShoe) return;
    
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    
    // Mantém a rotação base (-25deg) e adiciona o movimento do mouse
    mainShoe.style.transform = `rotate(-25deg) translateX(${x}px) translateY(${y}px)`;
    
    if(bigText) {
        bigText.style.transform = `translateY(-50%) translate(${x * 2}px, ${y * 2}px)`;
    }
});

// --- BOTÃO COMPRAR (Simulação) ---
window.buyAnimation = function(btn) {
    const originalText = btn.innerText;
    const originalColor = btn.style.backgroundColor;

    btn.innerText = "Adicionado!";
    btn.style.backgroundColor = "#27ae60"; // Verde sucesso
    
    setTimeout(() => {
        btn.innerText = originalText || "Comprar Agora";
        btn.style.backgroundColor = originalColor || "#1a1a1a";
    }, 2000);
};

/* ==========================================================================
   5. INICIALIZAÇÃO
   ========================================================================== */
// Arranca o sistema
init();
// Garante que o tamanho 38 (ou o primeiro active) comece selecionado visualmente se não estiver no HTML
if(!document.querySelector('.size-box.active')) {
    const size38 = Array.from(sizeBtns).find(btn => btn.innerText.trim() === "38");
    if(size38) size38.classList.add('active');
}
// Roda o preço inicial
updatePrice();