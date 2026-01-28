// ============================================
// CONFIGURAÇÕES
// ============================================

// IMPORTANTE: Atualize este número com seu WhatsApp
const WHATSAPP_NUMBER = '5577998454572'; // Formato: 55 + DDD + Número (sem caracteres especiais)

// 🟡 IMPORTANTE: Configure o ID da sua playlist do YouTube
// Como pegar: Acesse sua playlist, copie a URL e procure por: list=ISSO_AQUI_E_O_ID
const YOUTUBE_PLAYLIST_ID = 'PL9IhNkgdzwWEFXDri161mEqyzuail9S7M';
const YOUTUBE_API_KEY = 'AIzaSyCXp4vnEH8nEZLTjpyLeRPl__CSdJsP2DM'; // Veja o arquivo SETUP-YOUTUBE-API.txt

// 🔗 REDES SOCIAIS
const YOUTUBE_CHANNEL = 'https://www.youtube.com/@prod.izanagi';
const INSTAGRAM_PROFILE = 'https://www.instagram.com/prod.izanagi/';
const YOUTUBE_SUBSCRIBERS = 460;
const YOUTUBE_VIEWS = 70000;

// ============================================
// SPLASH SCREEN
// ============================================

window.addEventListener('load', function () {
    const splashScreen = document.getElementById('splash-screen');

    if (splashScreen) {
        // Mensagens/dicas aleatórias para a splash
        const tips = [
            'Use referências de beats na mensagem para um resultado mais preciso.',
            'Já tem letra pronta? Envie junto no briefing do beat.',
            'Fale a vibe, BPM aproximado e referências de artistas que você curte.',
            'Beats exclusivos garantem que só você vai usar aquela base.',
            'Quanto mais detalhes no briefing, mais o beat fica com a sua cara.'
        ];

        const tipElement = document.getElementById('splash-tip');
        if (tipElement) {
            const randomIndex = Math.floor(Math.random() * tips.length);
            tipElement.textContent = tips[randomIndex];
        }

        // Nome da página atual na splash
        const pageLabelElement = document.getElementById('splash-page-label');
        if (pageLabelElement) {
            let pageLabel = 'Carregando início';
            const title = (document.title || '').toLowerCase();

            if (title.includes('beats')) {
                pageLabel = 'Carregando página de beats';
            } else if (title.includes('contato')) {
                pageLabel = 'Carregando página de contato';
            }

            pageLabelElement.textContent = pageLabel;
        }

        // Contador rápido 3-2-1
        const countdownElement = document.getElementById('splash-countdown');
        if (countdownElement) {
            let value = 3;
            countdownElement.textContent = value.toString();

            const interval = setInterval(() => {
                value -= 1;
                if (value <= 0) {
                    clearInterval(interval);
                    countdownElement.textContent = '';
                } else {
                    countdownElement.textContent = value.toString();
                }
            }, 400);
        }

        // Remover splash screen após ~1.6 segundos (0.8s visível + 0.8s fade out)
        setTimeout(function () {
            splashScreen.classList.add('hidden');
        }, 1600);

        // Permitir fechar o splash ao clicar
        splashScreen.addEventListener('click', function () {
            splashScreen.classList.add('hidden');
        });
    }
});

// ============================================
// MENU HAMBÚRGUER RESPONSIVO
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        // Toggle menu quando clicar no hambúrguer
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar menu quando clicar em um link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fechar menu quando clicar fora
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ============================================
// ANIMAÇÃO DE NÚMEROS (COUNTER)
// ============================================

function animateCounter(element, finalValue, duration = 2000) {
    const startValue = 0;
    const startTime = Date.now();

    function updateCounter() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);

        // Formatar número
        if (finalValue > 1000) {
            if (currentValue >= 1000) {
                element.textContent = '+' + (currentValue >= 10000 ? (currentValue / 1000).toFixed(0) + 'K' : currentValue.toLocaleString());
            } else {
                element.textContent = currentValue.toLocaleString();
            }
        } else {
            element.textContent = currentValue.toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}

// ============================================
// INICIALIZAR CONTADORES
// ============================================

function initializeStats() {
    // YouTube Subscribers
    const subscribersElement = document.getElementById('youtube-subscribers');
    if (subscribersElement) {
        animateCounter(subscribersElement, YOUTUBE_SUBSCRIBERS, 5500);
    }

    // YouTube Views
    const viewsElement = document.getElementById('youtube-views');
    if (viewsElement) {
        animateCounter(viewsElement, YOUTUBE_VIEWS, 5500);
    }

    // Links YouTube
    const youtubeLinks = document.querySelectorAll('[data-youtube-link]');
    youtubeLinks.forEach(link => {
        link.href = YOUTUBE_CHANNEL;
        link.target = '_blank';
    });

    // Links Instagram
    const instagramLinks = document.querySelectorAll('[data-instagram-link]');
    instagramLinks.forEach(link => {
        link.href = INSTAGRAM_PROFILE;
        link.target = '_blank';
    });
}

// ============================================
// CARREGAR BEATS À VENDA AUTOMATICAMENTE
// ============================================
// CARREGAR CONFIGURAÇÕES DE BEATS DO JSON
// ============================================

async function loadBeatsFromConfig() {
    try {
        const response = await fetch('beats-config.json');
        if (response.ok) {
            const config = await response.json();
            return config;
        }
    } catch (error) {
        console.error('Erro ao carregar beats-config.json:', error);
    }
    return null;
}

// ============================================
// CARREGAR BEATS À VENDA
// ============================================

async function loadBeatsForSale() {
    const container = document.getElementById('beats-grid');
    if (!container) return;

    try {
        // Tentar carregar do JSON primeiro
        const config = await loadBeatsFromConfig();

        if (config && config.beatsForSale && config.beatsForSale.length > 0) {
            container.innerHTML = '';
            config.beatsForSale.forEach((beat, index) => {
                const genres = Array.isArray(beat.genres) && beat.genres.length > 0
                    ? beat.genres
                    : [beat.genre];
                const customPrice = beat.price ? {
                    nonExclusive: beat.price.nonExclusive,
                    exclusive: beat.price.exclusive
                } : null;
                const card = createBeatCard(
                    beat.name,
                    genres,
                    beat.bpm,
                    beat.key,
                    beat.filename,
                    index,
                    customPrice,
                    beat.mood
                );
                container.appendChild(card);
            });

            // Ativar filtros depois de carregar os beats
            setupBeatsFilters();
            return;
        }

        // Se não houver config, tentar buscar da pasta
        const response = await fetch('recursos/sons/sell/');

        if (!response.ok) {
            loadBeatsForSaleManual(container);
            return;
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a[href$=".mp3"]');

        if (links.length === 0) {
            loadBeatsForSaleManual(container);
            return;
        }

        container.innerHTML = '';

        let beatIndex = 1;
        links.forEach(link => {
            const filename = link.textContent.trim();
            const beatName = filename.replace('.mp3', '').replace(/[-_]/g, ' ');

            const genres = ['trap', 'rap', 'boombap'];
            const genre = genres[beatIndex % genres.length];
            const bpms = [140, 95, 85, 150];
            const bpm = bpms[beatIndex % bpms.length];
            const keys = ['C', 'D', 'E', 'F'];
            const key = keys[beatIndex % keys.length];

            const card = createBeatCard(beatName, [genre], bpm, key, filename, beatIndex);
            container.appendChild(card);
            beatIndex++;
        });

        // Ativar filtros depois de carregar os beats
        setupBeatsFilters();

    } catch (error) {
        console.error('Erro ao carregar beats:', error);
        loadBeatsForSaleManual(container);
    }
}

function toGenreSlug(genre) {
    return (genre || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function createBeatCard(name, genres, bpm, key, filename, index, customPrice = null, mood = '') {
    const card = document.createElement('div');
    card.className = 'beat-card';

    const genresArray = Array.isArray(genres) ? genres : [genres];
    const primaryGenre = genresArray[0] || 'Trap';
    const primarySlug = toGenreSlug(primaryGenre);

    // Guardar informações para filtros
    card.dataset.genres = genresArray.map(toGenreSlug).join(',');
    card.dataset.key = (key || '').toString();
    card.dataset.mood = (mood || '').toString();

    // Preços padrão por gênero
    const defaultPrices = {
        rap: { nonExclusive: 24.90, exclusive: 129.90 },
        trap: { nonExclusive: 29.90, exclusive: 149.90 },
        boombap: { nonExclusive: 34.90, exclusive: 179.90 }
    };

    // Usar preço customizado (do JSON) ou padrão
    const priceKey =
        primarySlug.includes('trap') ? 'trap'
            : primarySlug.includes('boombap') ? 'boombap'
                : 'rap';
    const price = customPrice || defaultPrices[priceKey] || defaultPrices['trap'];

    const badgesHtml = genresArray
        .map(g => {
            const slug = toGenreSlug(g);
            return `<span class="genre-badge ${slug}">${g.toUpperCase()}</span>`;
        })
        .join(' ');

    card.innerHTML = `
        <div class="beat-image"></div>
        <div class="beat-info">
            <h3>${name}</h3>
            ${badgesHtml}
            <p class="bpm"><i class="fas fa-drum"></i> ${bpm} BPM</p>
            <p class="key"><i class="fas fa-music"></i> ${key}</p>
            <audio controls>
                <source src="recursos/sons/sell/${filename}" type="audio/mpeg">
            </audio>
            <div class="beat-pricing">
                <div class="price-option">
                    <p class="option-type">Não Exclusivo</p>
                    <p class="price">R$ ${price.nonExclusive.toFixed(2).replace('.', ',')}</p>
                    <button class="btn btn-buy" onclick="openWhatsAppChat('${name} - Não Exclusivo', ${price.nonExclusive})">
                        <i class="fab fa-whatsapp"></i> Comprar via whatsapp
                    </button>
                </div>
                <div class="price-option">
                    <p class="option-type">Exclusivo</p>
                    <p class="price">R$ ${price.exclusive.toFixed(2).replace('.', ',')}</p>
                    <button class="btn btn-buy exclusive" onclick="openWhatsAppChat('${name} - Exclusivo', ${price.exclusive})">
                        <i class="fab fa-whatsapp"></i> Comprar via whatsapp
                    </button>
                </div>
            </div>
        </div>
    `;

    return card;
}

// ============================================
// FILTROS DE BEATS (PORTFÓLIO)
// ============================================

function setupBeatsFilters() {
    setupFilterGroup('beats-filters-genres', 'genres', true);
    setupFilterGroup('beats-filters-keys', 'key', false);
    setupFilterGroup('beats-filters-moods', 'mood', false);
}

function setupFilterGroup(containerId, dataAttr, isMultiValue) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (container.dataset.initialized === 'true') return;

    const buttons = container.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.beat-card');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {
                const value = (card.dataset[dataAttr] || '').toString();

                let match = false;
                if (!filter || filter === 'all') {
                    match = true;
                } else if (isMultiValue) {
                    const parts = value.split(',').filter(Boolean);
                    match = parts.includes(filter);
                } else {
                    match = value === filter;
                }

                card.style.display = match ? '' : 'none';
            });
        });
    });

    container.dataset.initialized = 'true';
}

// Fallback: Adicionar manualmente ou via configuração
function loadBeatsForSaleManual(container) {
    container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-secondary);">
            <p>Coloque seus arquivos MP3 na pasta: <strong>recursos/sons/sell/</strong></p>
            <p style="margin-top: 1rem; font-size: 0.9rem;">
                Os beats serão carregados automaticamente!
            </p>
        </div>
    `;
}

// ============================================
// CARREGAR BEATS DEMONSTRAÇÃO
// ============================================

async function loadBeatsDemos() {
    const container = document.getElementById('demo-grid');
    if (!container) return;

    try {
        // Tentar carregar do JSON primeiro
        const config = await loadBeatsFromConfig();

        if (config && config.beatsDemos && config.beatsDemos.length > 0) {
            container.innerHTML = '';
            config.beatsDemos.forEach((beat, index) => {
                const card = createDemoCard(beat.name, beat.genre, beat.bpm, beat.key, beat.filename);
                container.appendChild(card);
            });
            return;
        }

        // Se não houver config, tentar buscar da pasta
        const response = await fetch('recursos/sons/demo/');

        if (!response.ok) {
            loadBeatsdemosManual(container);
            return;
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a[href$=".mp3"]');

        if (links.length === 0) {
            loadBeatsdemosManual(container);
            return;
        }

        container.innerHTML = '';

        let demoIndex = 1;
        links.forEach(link => {
            const filename = link.textContent.trim();
            const beatName = filename.replace('.mp3', '').replace(/[-_]/g, ' ');

            const genres = ['trap', 'boombap', 'rap'];
            const genre = genres[demoIndex % genres.length];
            const bpms = [140, 92, 88, 170, 90, 145];
            const bpm = bpms[demoIndex % bpms.length];
            const keys = ['C', 'D', 'E', 'F'];
            const key = keys[demoIndex % keys.length];

            const card = createDemoCard(beatName, genre, bpm, key, filename);
            container.appendChild(card);
            demoIndex++;
        });

    } catch (error) {
        console.error('Erro ao carregar demos:', error);
        loadBeatsdemosManual(container);
    }
}

function createDemoCard(name, genre, bpm, key, filename, description) {
    const card = document.createElement('div');
    card.className = 'demo-card';

    const genreLower = genre.toLowerCase();
    const genreClass = genreLower === 'boombap' ? 'boombap' : genreLower;

    // Se não houver descrição, criar uma genérica
    const desc = description || `Beat estilo ${genre.toUpperCase()} a ${bpm} BPM. Perfeito para suas produções!`;

    card.innerHTML = `
        <h3>${name}</h3>
        <p class="genre-badge ${genreClass}">${genre.toUpperCase()}</p>
        <p class="bpm"><i class="fas fa-drum"></i> ${bpm} BPM</p>
        <p class="key"><i class="fas fa-music"></i> ${key}</p>
        <audio controls>
            <source src="recursos/sons/demo/${filename}" type="audio/mp3">
        </audio>
        <p class="demo-description">${desc}</p>
    `;

    return card;
}

function loadBeatsdemosManual(container) {
    container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-secondary);">
            <p>Coloque seus arquivos MP3 na pasta: <strong>recursos/sons/demo/</strong></p>
            <p style="margin-top: 1rem; font-size: 0.9rem;">
                Os beats de demonstração serão carregados automaticamente!
            </p>
        </div>
    `;
}


// ============================================
// CARREGAR VÍDEOS DO YOUTUBE AUTOMATICAMENTE
// ============================================

// Fallback: Mostrar a playlist diretamente do YouTube (sem necessidade de API key)


// Carrocel Swiper para YouTube (usando API do YouTube)
async function loadYoutubeCarousel() {
    const wrapper = document.getElementById('youtube-slides');
    if (!wrapper) return;

    if (!YOUTUBE_API_KEY) {
        console.error('YOUTUBE_API_KEY não configurada.');
        return;
    }

    let nextPageToken = '';
    let index = 0;
    let announcementVideo = null;

    try {
        do {
            const res = await fetch(
                'https://www.googleapis.com/youtube/v3/playlistItems?' +
                new URLSearchParams({
                    part: 'snippet',
                    maxResults: '50',
                    playlistId: YOUTUBE_PLAYLIST_ID,
                    key: YOUTUBE_API_KEY,
                    pageToken: nextPageToken || ''
                }).toString()
            );

            if (!res.ok) {
                console.error('Erro ao buscar playlist do YouTube:', await res.text());
                break;
            }

            const data = await res.json();
            nextPageToken = data.nextPageToken || '';

            (data.items || []).forEach(item => {
                const videoId = item.snippet?.resourceId?.videoId;
                const title = item.snippet?.title || 'Vídeo sem título';
                const thumb =
                    item.snippet?.thumbnails?.maxres?.url ||
                    item.snippet?.thumbnails?.high?.url ||
                    item.snippet?.thumbnails?.medium?.url ||
                    item.snippet?.thumbnails?.default?.url ||
                    '';

                if (!videoId) return;

                // Guardar o primeiro vídeo da playlist para o anúncio
                if (!announcementVideo) {
                    announcementVideo = { videoId, title, thumb };
                }

                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                    <button 
                        type="button" 
                        class="youtube-slide-link" 
                        data-video-id="${videoId}"
                        data-video-title="${title.replace(/"/g, '&quot;')}"
                    >
                        <div class="youtube-thumb">
                            ${thumb ? `<img src="${thumb}" alt="${title}">` : ''}
                            <div class="youtube-thumb-overlay">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <h3 class="youtube-title">${title}</h3>
                    </button>
                `;
                wrapper.appendChild(slide);

                index++;
            });
        } while (nextPageToken);

        if (index > 0) {
            initSwiper();

            // Ativar modal para cada slide
            document.querySelectorAll('.youtube-slide-link').forEach(btn => {
                btn.addEventListener('click', () => {
                    const videoId = btn.getAttribute('data-video-id');
                    const title = btn.getAttribute('data-video-title') || 'Vídeo';
                    openYoutubeModal(videoId, title);
                });
            });

            // Agendar modal de última produção após alguns segundos
            if (announcementVideo) {
                scheduleLatestProductionModal(announcementVideo);
            }
        }
    } catch (err) {
        console.error('Erro inesperado ao carregar carrossel do YouTube:', err);
    }
}

// Inicializar Carrossel
function initSwiper() {
    new Swiper('.youtube-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        breakpoints: {
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 }
        }
    });
}

// ============================================
// MODAL YOUTUBE PLAYER
// ============================================

function openYoutubeModal(videoId, title) {
    if (!videoId) return;

    let modal = document.getElementById('youtubeModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'youtubeModal';
        modal.className = 'youtube-modal';
        modal.innerHTML = `
            <div class="youtube-modal-content">
                <div class="youtube-modal-player-wrapper">
                    <iframe 
                        id="youtubeModalIframe"
                        src=""
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
                <h3 class="youtube-modal-title" id="youtubeModalTitle"></h3>
            </div>

            <button class="youtube-modal-close" type="button">
                <i class="fas fa-times"></i>
            </button>
        `;
        document.body.appendChild(modal);

        // Fechar ao clicar no X
        modal.querySelector('.youtube-modal-close').addEventListener('click', closeYoutubeModal);

        // Fechar ao clicar fora do conteúdo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeYoutubeModal();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeYoutubeModal();
            }
        });
    }

    const iframe = document.getElementById('youtubeModalIframe');
    const titleEl = document.getElementById('youtubeModalTitle');

    if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (titleEl) {
        titleEl.textContent = title;
    }

    modal.classList.add('active');
}

function closeYoutubeModal() {
    const modal = document.getElementById('youtubeModal');
    const iframe = document.getElementById('youtubeModalIframe');
    if (iframe) {
        // limpar src para parar o vídeo
        iframe.src = '';
    }
    if (modal) {
        modal.classList.remove('active');
    }
}

// ============================================
// MODAL DE ÚLTIMA PRODUÇÃO (ANÚNCIO)
// ============================================

let latestProductionTimeoutSet = false;

function scheduleLatestProductionModal(video) {
    if (latestProductionTimeoutSet) return;
    latestProductionTimeoutSet = true;

    // Mostrar após 15 segundos na página
    setTimeout(() => {
        openLatestProductionModal(video);
    }, 10000);
}

function openLatestProductionModal(video) {
    if (!video || !video.videoId) return;

    let modal = document.getElementById('latestProductionModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'latestProductionModal';
        modal.className = 'latest-production-modal';
        modal.innerHTML = `
            <div class="latest-production-content">
                <button class="latest-production-close" type="button">
                    <i class="fas fa-times"></i>
                </button>
                <div class="latest-production-body">
                    <div class="latest-production-thumb-wrapper">
                        <img id="latestProductionThumb" src="" alt="Última produção">
                    </div>
                    <div class="latest-production-info">
                        <p class="latest-production-label">Última produção feita já disponível no YouTube</p>
                        <h3 id="latestProductionTitle"></h3>
                        <p class="latest-production-text">
                            Dê uma olhada
                        </p>
                        <div class="latest-production-actions">
                            <button type="button" class="btn btn-primary" id="latestProductionWatch">
                                Assistir agora
                            </button>
                            <button type="button" class="btn btn-secondary" id="latestProductionDismiss">
                                Talvez depois
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Fechar no X
        modal.querySelector('.latest-production-close')
            .addEventListener('click', closeLatestProductionModal);

        // Fechar ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeLatestProductionModal();
            }
        });

        // Botão "Talvez depois"
        modal.querySelector('#latestProductionDismiss')
            .addEventListener('click', closeLatestProductionModal);

        // Assistir agora
        modal.querySelector('#latestProductionWatch')
            .addEventListener('click', () => {
                closeLatestProductionModal();
                openYoutubeModal(video.videoId, video.title);
            });
    }

    const thumbEl = document.getElementById('latestProductionThumb');
    const titleEl = document.getElementById('latestProductionTitle');
    if (thumbEl && video.thumb) {
        thumbEl.src = video.thumb;
        thumbEl.alt = video.title;
    }
    if (titleEl) {
        titleEl.textContent = video.title;
    }

    modal.classList.add('active');
}

function closeLatestProductionModal() {
    const modal = document.getElementById('latestProductionModal');
    if (modal) {
        modal.classList.remove('active');
    }
}



// ============================================
// FUNÇÃO DE COMPRA VIA WHATSAPP
// ============================================

function openWhatsAppChat(beatName, price) {
    // Criar a mensagem
    const message = `Olá! Tenho interesse em comprar o beat *"${beatName}" por R$ ${price.toFixed(2).replace('.', ',')}*. Qual é o próximo passo?`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Criar o link do WhatsApp
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abrir em uma nova aba
    window.open(whatsappLink, '_blank');
}

// ============================================
// FUNÇÃO DE CONTATO GERAL VIA WHATSAPP
// ============================================

function openGeneralWhatsApp() {
    const message = `Olá! 👋 Gostaria de saber mais sobre seus beats e produções. Qual é a melhor forma de trabalharmos juntos?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
}

// ============================================
// FUNÇÃO DE PACOTES VIA WHATSAPP
// ============================================

function openPackageWhatsApp(packageName) {
    const message = `Olá! Tenho interesse no *${packageName}*. Podemos conversar sobre detalhes, estilo e valores?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
}

// ============================================
// CARREGAR AVALIAÇÕES
// ============================================

async function loadTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;

    try {
        const config = await loadBeatsFromConfig();

        if (config && config.testimonials && config.testimonials.length > 0) {
            container.innerHTML = '';
            config.testimonials.forEach((testimonial, index) => {
                const card = createTestimonialCard(
                    testimonial.text,
                    testimonial.author,
                    testimonial.role,
                    testimonial.stars
                );
                container.appendChild(card);
            });
            return;
        }

        // Fallback se não houver avaliações no JSON
        loadTestimonialsManual(container);

    } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        loadTestimonialsManual(container);
    }
}

function createTestimonialCard(text, author, role, stars = 5) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';

    let starsHTML = '';
    for (let i = 0; i < stars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    card.innerHTML = `
        <div class="stars">
            ${starsHTML}
        </div>
        <p class="testimonial-text">"${text}"</p>
        <p class="testimonial-author">- ${author}</p>
        <p class="testimonial-role">${role}</p>
    `;

    return card;
}

function loadTestimonialsManual(container) {
    container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-secondary);">
            <p>Adicione suas avaliações no arquivo: <strong>beats-config.json</strong></p>
            <p style="margin-top: 1rem; font-size: 0.9rem;">
                Veja o guia GUIA-JSON.txt para instruções!
            </p>
        </div>
    `;
}

// ============================================


document.addEventListener('DOMContentLoaded', function () {
    // Inicializar estatísticas com animações
    initializeStats();

    // Carregar beats à venda automaticamente
    loadBeatsForSale();

    // Carregar as funções do carrossel do YouTube
    loadYoutubeCarousel();

    // Carregar beats de demonstração automaticamente
    loadBeatsDemos();

    // Carregar avaliações automaticamente
    loadTestimonials();

    // Atualizar o botão de contato WhatsApp
    const contactWhatsAppBtn = document.getElementById('contact-whatsapp');
    if (contactWhatsAppBtn) {
        contactWhatsAppBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openGeneralWhatsApp();
        });
    }

    // Envio do formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scroll para links de navegação
    setupSmoothScroll();

    // Animações ao carregar
    animateOnScroll();
});

// ============================================
// TRATAMENTO DO FORMULÁRIO DE CONTATO
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('brief-name')?.value || '';
    const email = document.getElementById('brief-email')?.value || '';
    const style = document.getElementById('brief-style')?.value || '';
    const bpm = document.getElementById('brief-bpm')?.value || '';
    const budget = document.getElementById('brief-budget')?.value || '';
    const deadline = document.getElementById('brief-deadline')?.value || '';
    const reference = document.getElementById('brief-reference')?.value || '';
    const details = document.getElementById('brief-message')?.value || '';

    // Criar mensagem formatada focada em briefing de encomenda
    let fullMessage = 'Briefing de Encomenda de Beat:\n\n';
    if (name) fullMessage += `Nome: ${name}\n`;
    if (email) fullMessage += `Email: ${email}\n`;
    if (style) fullMessage += `Estilo desejado: ${style}\n`;
    if (bpm) fullMessage += `BPM aproximado: ${bpm}\n`;
    if (budget) fullMessage += `Orçamento aproximado: ${budget}\n`;
    if (deadline) fullMessage += `Prazo desejado: ${deadline}\n`;
    if (reference) fullMessage += `Referências: ${reference}\n`;

    fullMessage += '\nDetalhes adicionais:\n';
    fullMessage += details || '(sem detalhes adicionais)';
    const encodedMessage = encodeURIComponent(fullMessage);

    // Abrir WhatsApp com a mensagem
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');

    // Limpar formulário
    e.target.reset();

    // Mostrar mensagem de sucesso
    showSuccessMessage('Mensagem preparada! WhatsApp será aberto agora.');
}

// ============================================
// ANIMAÇÕES AO SCROLL
// ============================================

function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cards
    document.querySelectorAll(
        '.production-card, .beat-card, .demo-card, .testimonial-card, .contact-item'
    ).forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL PERSONALIZADO
// ============================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// MENSAGEM DE SUCESSO
// ============================================

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 10);

    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// FUNCIONALIDADES ADICIONAIS
// ============================================

// Contador de scroll para efeitos especiais
let scrollPosition = 0;

window.addEventListener('scroll', function () {
    scrollPosition = window.pageYOffset;

    // Efeito no header
    const header = document.querySelector('.header');
    if (scrollPosition > 100) {
        header.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    }
});

// ============================================
// INTERATIVIDADE DOS CARDS
// ============================================

document.querySelectorAll('.beat-card, .demo-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const audio = this.querySelector('audio');
        if (audio) {
            // Efeito visual pode ser adicionado aqui
        }
    });
});

// ============================================
// EASTER EGG - KONAMI CODE
// ============================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function (e) {
    const key = e.key;
    const matchesKey = key === konamiCode[konamiIndex] || e.code === konamiCode[konamiIndex];

    if (matchesKey) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    console.log('🎵 EASTER EGG ATIVADO! 🎵');
    document.body.style.animation = 'pulse 0.3s ease-in-out 3';

    // Criar partículas de notas musicais
    for (let i = 0; i < 20; i++) {
        createMusicNote();
    }

    showSuccessMessage('🎵 Você encontrou um easter egg! 🎵');
}

function createMusicNote() {
    const note = document.createElement('div');
    note.innerHTML = '♪';
    note.style.position = 'fixed';
    note.style.left = Math.random() * window.innerWidth + 'px';
    note.style.top = '-30px';
    note.style.color = '#1db954';
    note.style.fontSize = '2rem';
    note.style.pointerEvents = 'none';
    note.style.zIndex = '9999';
    note.style.animation = 'float 3s ease-out forwards';

    document.body.appendChild(note);

    setTimeout(() => note.remove(), 3000);
}

// ============================================
// ESTILOS DE ANIMAÇÃO (adicionar ao CSS)
// ============================================

const style = document.createElement('style');
style.innerHTML = `
    @keyframes float {
        to {
            transform: translateY(window.innerHeight + 50px) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }

    .success-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #1db954;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(29, 185, 84, 0.4);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
    }

    .success-notification.show {
        transform: translateX(0);
    }

    .success-notification i {
        font-size: 1.3rem;
    }

    @media (max-width: 768px) {
        .success-notification {
            top: auto;
            bottom: 20px;
            right: 10px;
            left: 10px;
            transform: translateY(150px);
        }

        .success-notification.show {
            transform: translateY(0);
        }
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);

// ============================================
// ============================================
// FAQ - TOGGLE QUESTIONS
// ============================================

function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Fechar todos os outros FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Toggle do FAQ clicado
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Mostrar/esconder botão baseado no scroll
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll suave ao topo
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ============================================
// MODAL PREVIEW BEATS
// ============================================

function openBeatModal(beatName, genre, bpm, key, price, description) {
    // Se o modal não existe, criar
    let modal = document.getElementById('beatModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'beatModal';
        modal.className = 'beat-modal';
        modal.innerHTML = `
            <div class="beat-modal-content">
                <button class="beat-modal-close" onclick="closeBeatModal()">
                    <i class="fas fa-times"></i>
                </button>
                <h3 class="modal-beat-title" id="modalBeatTitle">Beat</h3>
                <span class="modal-beat-genre" id="modalBeatGenre">Rap</span>
                <p class="modal-beat-bpm" id="modalBeatBPM">120 BPM</p>
                <p class="modal-beat-key" id="modalBeatKey">C</p>
                <audio controls class="modal-beat-player" id="modalBeatPlayer"></audio>
                <p class="modal-beat-description" id="modalBeatDescription"></p>
                <div class="modal-beat-price">
                    <h4>Preço</h4>
                    <p id="modalBeatPrice">R$ 0,00</p>
                </div>
                <div class="modal-beat-actions">
                    <button class="btn btn-primary" onclick="goToWhatsApp()">Comprar Agora</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Preencher conteúdo
    document.getElementById('modalBeatTitle').textContent = beatName;
    document.getElementById('modalBeatGenre').textContent = genre.toUpperCase();
    document.getElementById('modalBeatBPM').textContent = bpm + ' BPM';
    document.getElementById('modalBeatKey').textContent = key;
    const audioPlayer = document.getElementById('modalBeatPlayer');
    audioPlayer.innerHTML = `<source src="recursos/sons/sell/${beatName.replace(/ /g, '_')}.mp3" type="audio/mpeg">`;
    document.getElementById('modalBeatDescription').textContent = description || 'Beat produzido com qualidade profissional.';
    document.getElementById('modalBeatPrice').textContent = 'R$ ' + price;

    // Mostrar modal
    modal.classList.add('active');
}

function closeBeatModal() {
    const modal = document.getElementById('beatModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Fechar modal ao clicar fora
document.addEventListener('click', function (event) {
    const modal = document.getElementById('beatModal');
    if (modal && event.target === modal) {
        closeBeatModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeBeatModal();
    }
});

// LOG DE INICIALIZAÇÃO
// ============================================

console.log('%c🎵 Prod.Izanagi - Portfolio Carregado! 🎵', 'color: #1db954; font-size: 16px; font-weight: bold;');
console.log('%cBeatmaker profissional em Rap, Trap e Boom Bap', 'color: #b3b3b3; font-size: 12px;');
console.log('%cWhatsApp configurado para:', `color: #1db954; font-size: 11px;`);
console.log(`+${WHATSAPP_NUMBER.slice(0, 2)} (${WHATSAPP_NUMBER.slice(2, 4)}) ${WHATSAPP_NUMBER.slice(4, 9)}-${WHATSAPP_NUMBER.slice(9)}`);
