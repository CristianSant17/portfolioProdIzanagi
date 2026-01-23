# 🎵 Prod.Izanagi - Portfolio Beatmaker

Um portfólio moderno e profissional para beatmakers especializados em Rap, Trap e Boom Bap.

## ✨ Características

### 1. **Seção de Produções Realizadas**
   - Showcase de beats e produções para artistas
   - Ícones/imagens dos artistas que você trabalhou
   - Players de áudio para cada produção
   - Gêneros musicais destacados

### 2. **Beats à Venda**
   - Grid interativo com seus beats disponíveis
   - Dois modelos de preço: Exclusivo e Não Exclusivo
   - Integração direta com WhatsApp para compra
   - Badge de gênero (Rap, Trap, Boom Bap)
   - Indicação de BPM de cada beat
   - Player de áudio para preview

### 3. **Seção de Demonstração**
   - 6 beats de demo para os visitantes ouvirem
   - Cards bonitos e responsivos
   - Descrição de cada beat

### 4. **Avaliações de Artistas**
   - Testimonials com estrelas
   - Citação e nome do artista
   - Profissão do artista
   - Layout em grid responsivo

### 5. **Seção de Contato**
   - Informações de contato com ícones
   - Formulário de contato integrado com WhatsApp
   - Links para redes sociais (Instagram, YouTube, WhatsApp)

## 🚀 Como Usar

### Configuração Inicial

1. **Atualize o número de WhatsApp:**
   - Abra `script.js`
   - Localize a linha: `const WHATSAPP_NUMBER = '5585987654321';`
   - Substitua pelo seu número: `55 + DDD + Número` (sem caracteres especiais)
   - Exemplo: `const WHATSAPP_NUMBER = '5585999887766';`

### Adicionando seu Conteúdo

#### 🎬 Beats à Venda
1. Localize a seção `id="beats"` no `index.html`
2. Edite os cards `.beat-card`:
   - Nome do beat
   - Gênero (rap, trap, boombap)
   - BPM
   - Arquivo de áudio (substitua `src=""` com o caminho do arquivo)
   - Preços

Exemplo:
```html
<h3>Seu Beat - Nome</h3>
<p class="genre-badge trap">TRAP</p>
<p class="bpm"><i class="fas fa-drum"></i> 140 BPM</p>
<audio controls>
    <source src="assets/seu-beat.mp3" type="audio/mpeg">
</audio>
```

#### 🎤 Produções Realizadas
1. Localize a seção `id="production"` no `index.html`
2. Edite os cards `.production-card`:
   - Nome do artista
   - Gênero da produção
   - Nome da música/projeto
   - Arquivo de áudio

#### 📸 Ícones de Artistas
1. Localize `.artists-icons` no `index.html`
2. Substitua as imagens dos artistas:
   - Coloque as imagens na pasta `recursos/imagens/`
   - Atualize os paths: `src="recursos/imagens/artista1.jpg"`
   - Atualize os nomes: `<p>Nome do Artista</p>`

#### ⭐ Avaliações
1. Localize a seção `id="testimonials"`
2. Edite os cards `.testimonial-card`:
   - Texto do depoimento
   - Nome do artista
   - Profissão/cargo

#### 🎵 Beats Demonstração
1. Localize a seção `id="demo"`
2. Edite os cards `.demo-card`:
   - Nome do beat
   - Gênero
   - BPM
   - Arquivo de áudio
   - Descrição

### Adicionando Redes Sociais

Localize no `index.html` os links de contato e atualize:

```html
<!-- Instagram -->
<a href="https://instagram.com/seu_usuario" class="btn btn-primary">Visitar Perfil</a>

<!-- YouTube -->
<a href="https://youtube.com/seu_canal" class="btn btn-primary">Ver Canal</a>

<!-- WhatsApp (já automático baseado na config) -->
```

## 🎨 Personalização

### Cores
Para mudar as cores, edite as variáveis no `styles.css`:

```css
:root {
    --primary: #1db954;              /* Verde Spotify */
    --accent: #ff006e;               /* Rosa/Pink */
    --secondary: #191414;            /* Preto */
    --tertiary: #282828;             /* Cinza escuro */
}
```

### Tipografia
A fonte padrão é "Segoe UI". Para mudar, edite:
```css
body {
    font-family: 'Sua Font', sans-serif;
}
```

## 📁 Estrutura de Arquivos

```
portifólio-Izanagi/
├── index.html          # HTML principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript (WhatsApp e interatividade)
├── README.md           # Este arquivo
└── recursos/
    ├── imagens/        # Coloque as imagens aqui
    ├── sons/           # Coloque os beats aqui
    └── videos/         # Para futuros vídeos
```

## 🔧 Funcionalidades JavaScript

### Compra via WhatsApp
Clique em qualquer botão "Comprar" e uma janela do WhatsApp abrirá com a mensagem pré-preenchida:
```
Olá! 🎵 Tenho interesse em comprar o beat "Nome" por R$ XX,XX. Qual é o próximo passo?
```

### Formulário de Contato
Ao enviar o formulário, os dados são abertos no WhatsApp de forma formatada.

### Animações
- Cards ganham animação ao scrollar na página
- Efeito hover em botões e cards
- Suavidade no scroll entre seções

### Easter Egg
Use o Konami Code (↑↑↓↓←→←→BA) para ativar um easter egg especial! 🎵

## 📱 Responsividade

O portfólio é totalmente responsivo:
- Desktop (1200px+): Layout completo
- Tablet (768px - 1199px): Grid ajustado
- Mobile (até 767px): Coluna única e otimizado para toque

## 🔐 Privacidade

- Nenhum dado é enviado para servidores
- Tudo é processado no navegador do cliente
- WhatsApp link é oficial e seguro
- Formulário abre WhatsApp com dados preparados

## 🛠️ Dicas Profissionais

1. **Arquivos de Áudio:** Use MP3 de boa qualidade (128-192 kbps é o ideal para preview)
2. **Imagens:** Use imagens otimizadas (JPG/PNG) para carregar rápido
3. **Descrições:** Seja breve mas descritivo nos textos
4. **Preços:** Considere:
   - Não Exclusivo: Permite venda para múltiplos artistas
   - Exclusivo: Apenas você pode usar o beat
5. **Atualizações:** Atualize regularmente com novos beats

## 📧 Suporte

Se encontrar problemas:
1. Verifique se o número de WhatsApp está correto em `script.js`
2. Certifique-se que os caminhos das imagens e áudios estão corretos
3. Teste em diferentes navegadores
4. Verifique o console (F12) para mensagens de erro

## 📈 SEO e Marketing

Para melhorar seu SEO:

1. Atualize a tag `<title>` no `index.html`
2. Adicione keywords relevantes
3. Compartilhe em redes sociais
4. Use palavras-chave no conteúdo (Rap, Trap, Boom Bap, Beatmaker, etc.)

## 🎯 Próximas Melhorias Sugeridas

- [ ] Adicionar página de blog com tutoriais
- [ ] Sistema de avaliações/ratings
- [ ] Chat ao vivo
- [ ] Galeria de vídeos
- [ ] Integração com Spotify/SoundCloud
- [ ] Sistema de carrinho de compras
- [ ] Pagamento online (integração com Stripe/PayPal)

---

**Desenvolvido com 💚 para beatmakers profissionais**

Versão: 1.0.0
Última atualização: Janeiro 2026
