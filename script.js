/* ==========================================================================
   1. CANVAS SURREAL 3D (PARTÍCULAS & FLUIDO NO BACKGROUND)
   ========================================================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = window.innerWidth < 600 ? 30 : 70;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateCanvas);
}

animateCanvas();

/* ==========================================================================
   2. QUIZ INTERATIVO COM MUDANÇA DE ESTADO
   ========================================================================== */
const quizQuestions = [
    {
        q: "Qual é o seu maior desafio ao atender clientes no WhatsApp?",
        opts: ["Visualizam o preço e não respondem", "Conversamos muito, mas não fecham", "Demoro muito tempo para atender cada pessoa"]
    },
    {
        q: "Como costuma enviar a sua proposta comercial?",
        opts: ["Envio a tabela/preço imediatamente", "Envio áudio explicativo", "Faço perguntas para entender antes de dar o preço"]
    },
    {
        q: "O que faz quando o cliente diz 'Vou pensar e aviso'?",
        opts: ["Apenas digo 'tudo bem, fico no aguardo'", "Tento insistir e acabo parecendo chato", "Não sei o que responder e perco o contacto"]
    },
    {
        q: "Qual o seu volume médio diário de novas conversas?",
        opts: ["Menos de 10 potenciais clientes", "Entre 10 e 30 potenciais clientes", "Mais de 30 clientes por dia"]
    },
    {
        q: "Qual é o seu objetivo principal com a mentoria?",
        opts: ["Aumentar a taxa de conversão imediata", "Aprender a cobrar mais caro", "Criar um processo automático de vendas"]
    }
];

let currentStep = 0;

function renderQuiz() {
    const quizContent = document.getElementById('quiz-content');
    const counter = document.getElementById('quiz-counter');
    const progress = document.getElementById('quiz-progress');

    if (currentStep < quizQuestions.length) {
        const item = quizQuestions[currentStep];
        counter.innerText = `0${currentStep + 1} / 05`;
        progress.style.width = `${((currentStep + 1) / 5) * 100}%`;

        quizContent.innerHTML = `
            <div class="quiz-question">${item.q}</div>
            <div class="quiz-options-list">
                ${item.opts.map((opt) => `
                    <button class="quiz-opt-btn" onclick="nextQuizStep()">
                        <span>${opt}</span>
                        <span>→</span>
                    </button>
                `).join('')}
            </div>
        `;
    } else {
        counter.innerText = "CONCLUÍDO";
        progress.style.width = "100%";
        quizContent.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <h3 style="font-size: 1.8rem; color: var(--neon-emerald); margin-bottom: 12px;">Diagnóstico Concluído!</h3>
                <p style="color: var(--text-dim); margin-bottom: 24px;">Identificámos gargalos na sua abordagem atual. A Mentoria HN tem o módulo exato para corrigir o seu fluxo de conversão.</p>
                <a href="https://wa.me/258833063485?text=Ol%C3%A1%2C%20fiz%20o%20diagn%C3%B3stico%20no%20site%20e%20quero%20analisar%20meus%20resultados." target="_blank" class="btn-primary-glow">
                    VER MEU PLANO PERSONALIZADO NO WHATSAPP
                </a>
            </div>
        `;
    }
}

function nextQuizStep() {
    currentStep++;
    renderQuiz();
}

renderQuiz();

/* ==========================================================================
   3. GRÁFICO INTERATIVO CHART.JS (ESTÉTIKA NEON SURREAL)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const ctxChart = document.getElementById('growthChart').getContext('2d');

    const gradientChart = ctxChart.createLinearGradient(0, 0, 0, 300);
    gradientChart.addColorStop(0, 'rgba(0, 240, 152, 0.4)');
    gradientChart.addColorStop(1, 'rgba(0, 240, 152, 0)');

    new Chart(ctxChart, {
        type: 'line',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
            datasets: [{
                label: 'Taxa de Conversão de Vendas (%)',
                data: [12, 18, 29, 45, 68, 85],
                borderColor: '#00F098',
                borderWidth: 3,
                backgroundColor: gradientChart,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00E5FF',
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94A3B8' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94A3B8' }
                }
            }
        }
    });
});

/* ==========================================================================
   4. INTERAÇÕES E ACCORDION FAQ
   ========================================================================== */
function toggleFaq(btn) {
    const item = btn.parentElement;
    item.classList.toggle('open');
}

/* Efeito 3D Tilt suave nos cartões para Desktop */
if (window.innerWidth > 900) {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}
