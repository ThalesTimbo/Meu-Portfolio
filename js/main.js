// tela de carregamento 
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
        }, 500);
    });
    
    // efeito de scroll 
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // efeito de digitação no subtitulo
    const typingTextElement = document.getElementById('typing-text');
    const phrases = [
        '<Seja Bem-Vindo ao meu portfólio!>',
        '<Estudante de Programação>',
        '<Entusiasta por tecnologia e inovação>',
        '<Desenvolvedor Front-End>',
        '<Futuro Desenvolvedor Full Stack>',
        '<Futuro Engenheiro de Software!>'
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new phrase
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    setTimeout(typeText, 1000);
    
    // Animar elementos ao entrar (efeito recorrente)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.15 });
    animateElements.forEach(el => observer.observe(el));
    
    // Portfolio card interações 
    const portfolioCards = document.querySelectorAll('.portfolio__card');
    
    portfolioCards.forEach(card => {
        const actions = card.querySelectorAll('.portfolio__action');
        
        actions.forEach(action => {
            action.addEventListener('click', function() {
                const projectData = JSON.parse(card.dataset.project);
                const tooltip = this.getAttribute('data-tooltip');
                
                switch(tooltip) {
                    case 'Ver Demo':

                        console.log('View demo for:', projectData.title);
                        break;
                    case 'Ver Código':
                        
                        console.log('View code for:', projectData.title);
                        break;
                    case 'Case Study':
                        
                        console.log('View case study for:', projectData.title);
                        break;
                }
            });
        });
    });
    
    // Skills grafico
    const skillsChart = document.getElementById('skills-chart');
    if (skillsChart) {
        const ctx = skillsChart.getContext('2d');
        
        // Dados das habilidades
        const data = {
            labels: [
                'HTML', 'CSS', 'JavaScript', 'React Native', 
                'GDScript', 'Figma', 'Python',
                'Portugol', 'Canva', 'Audiovisual'
            ],
            datasets: [{
                label: 'Nível de Habilidade',
                data: [90, 85, 75, 50, 60, 70, 75, 60, 80, 85],
                backgroundColor: 'rgba(0, 102, 255, 0.1)',
                borderColor: 'rgba(0, 102, 255, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 102, 255, 0.8)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 102, 255, 0.8)'
            }]
        };
        
        //  pq está olhando o meu codigo? deixa meu js
        
        const config = {
            type: 'radar',
            data: data,
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            color: '#fff',
                            font: {
                                family: 'var(--font-primary)',
                                size: 11,
                                weight: '500'
                            }
                        },
                        ticks: {
                            display: false,
                            backdropColor: 'transparent'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                maintainAspectRatio: false
            }
        };
        
        new Chart(ctx, config);
    }

    // Efeito de expansão da barra do título das seções
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observerBar = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const title = entry.target;
            if (entry.isIntersecting) {
                title.style.setProperty('--bar-width', '100%');
            } else {
                title.style.setProperty('--bar-width', '60px');
            }
        });
    }, observerOptions);
    
    sectionTitles.forEach(title => {
        observerBar.observe(title);
    });

    // Destacar link do header conforme a seção visível
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.header__nav-link');

    function onScrollHighlightSection() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', onScrollHighlightSection);
    onScrollHighlightSection();
});
// formulario de contato
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Desabilita o botão durante o envio
    submitButton.disabled = true;
    submitButton.innerHTML = 'Enviando...';
    
    try {
        const response = await fetch('https://formsubmit.co/ajax/thales.fernandes1@aluno.ce.gov.br', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                message: form.message.value,
                _subject: 'Nova mensagem do portfólio!',
                _captcha: 'false',
                _template: 'table'
            })
        });

        const result = await response.json();

        if (result.success === "true") {
            formStatus.innerHTML = '<div class="alert alert-success">Mensagem enviada com sucesso!</div>';
            form.reset();
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (error) {
        console.error('Erro:', error);
        formStatus.innerHTML = '<div class="alert alert-danger">Erro ao enviar mensagem. Por favor, tente novamente.</div>';
    } finally {
        // Reabilita o botão
        submitButton.disabled = false;
        submitButton.innerHTML = 'Enviar Mensagem';
        formStatus.style.display = 'block';
    }
});