// --- CONFIGURAÇÃO DOS PRODUTOS ---
const products = [
    {
        name: "Niztsu <br><span>Venom Green</span>",
        desc: "Domine as ruas com o Venom Green. Design agressivo com tecnologia de ponta para quem tem atitude de sobra.",
        price: "R$ 699,90",
        color: "#155e2d", // Verde
        img: "assets/tenis_1.png" 
    },
    {
        name: "Niztsu <br><span>Royal Brown</span>",
        desc: "Luxo e conforto em cada passo. O acabamento em tons terrosos e dourados redefine o conceito de sneaker premium.",
        price: "R$ 749,90",
        color: "#6d4c41", // Marrom
        img: "assets/tenis_2.png"
    },
    {
        name: "Niztsu <br><span>Classic White</span>",
        desc: "O essencial elevado à perfeição. Detalhes minimalistas e a logo icônica em prata para um visual limpo e futurista.",
        price: "R$ 649,90",
        color: "#b0b0b0", // Cinza/Prata
        img: "assets/tenis_3.png"
    }
];

// --- ELEMENTOS ---
const mainShoe = document.getElementById('main-shoe');
const title = document.getElementById('p-title');
const desc = document.getElementById('p-desc');
const price = document.getElementById('p-price');
const thumbBox = document.querySelector('.thumbs-container');
const bigText = document.getElementById('parallax-text');
const brandDot = document.querySelector('.brand-corner span');

let currentIndex = 0;

// --- INICIA O SITE ---
function init() {
    products.forEach((prod, idx) => {
        const div = document.createElement('div');
        div.className = `thumb ${idx === 0 ? 'active' : ''}`;
        div.innerHTML = `<img src="${prod.img}" onclick="changeShoe(${idx})">`;
        thumbBox.appendChild(div);
    });
    updateShoe(0);
}

// --- TROCA DE TÊNIS ---
function changeShoe(index) {
    if (index === currentIndex) return;
    currentIndex = index;

    // Atualiza miniatura ativa
    document.querySelectorAll('.thumb').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });

    // Animação de SAÍDA (Voa para cima e gira)
    mainShoe.style.transform = "rotate(-45deg) translateY(-100px) scale(0.5)";
    mainShoe.style.opacity = "0";
    
    title.style.opacity = "0";
    title.style.transform = "translateY(20px)";

    setTimeout(() => {
        updateShoe(index);
        
        // Animação de ENTRADA (Volta ao normal)
        mainShoe.style.transform = "rotate(-25deg) translateY(0) scale(1)";
        mainShoe.style.opacity = "1";
        
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
    }, 400);
}

// --- ATUALIZA DADOS ---
function updateShoe(index) {
    const p = products[index];
    
    // Atualiza a cor global do site
    document.documentElement.style.setProperty('--primary', p.color);
    
    title.innerHTML = p.name;
    desc.innerText = p.desc;
    price.innerText = p.price;
    mainShoe.src = p.img;
    brandDot.style.color = p.color;
}

// --- EFEITO PARALLAX 2D (FALSO 3D) ---
document.addEventListener('mousemove', (e) => {
    // Calcula a posição do mouse
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    
    // Move o tênis levemente na direção oposta
    // Mantém a rotação base de -25deg
    mainShoe.style.transform = `rotate(-25deg) translateX(${x}px) translateY(${y}px)`;
    
    // Move o texto do fundo
    bigText.style.transform = `translateY(-50%) translate(${x * 2}px, ${y * 2}px)`;
});

// --- TAMANHOS ---
document.querySelectorAll('.size-box').forEach(box => {
    box.addEventListener('click', function() {
        document.querySelectorAll('.size-box').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// --- BOTÃO COMPRAR ---
window.buyAnimation = function(btn) {
    btn.innerText = "Adicionado!";
    btn.style.backgroundColor = "#27ae60"; // Verde sucesso
    
    setTimeout(() => {
        btn.innerText = "Comprar Agora";
        btn.style.backgroundColor = "#1a1a1a";
    }, 2000);
};

init();