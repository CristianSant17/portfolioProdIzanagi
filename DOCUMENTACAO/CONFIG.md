# Configuração Rápida - Prod.Izanagi Portfolio

## 🔴 ALTERAR URGENTE

### 1. Seu número de WhatsApp
**Arquivo:** `script.js` - Linha 5

```javascript
const WHATSAPP_NUMBER = 'SEU_NUMERO_AQUI'; // Formato: 55 + DDD + Número
```

**Como fazer:**
- Copie seu número: `5585987654321` (ex: 55 + 85 + 98765-4321)
- Cole na variável acima

---

## 📝 CAMPOS PARA PREENCHER

### Seção: Beats à Venda (index.html)
Procure por `id="beats"` e edite cada `.beat-card`:

- [ ] Beat 1 - Nome, gênero, BPM, arquivo MP3, preços
- [ ] Beat 2 - Nome, gênero, BPM, arquivo MP3, preços
- [ ] Beat 3 - Nome, gênero, BPM, arquivo MP3, preços
- [ ] Beat 4 - Nome, gênero, BPM, arquivo MP3, preços

### Seção: Produções Realizadas (index.html)
Procure por `id="production"`:

- [ ] Adicionar 3+ produção cards com artistas e áudios
- [ ] Adicionar ícones/fotos dos artistas (pasta: `recursos/imagens/`)

### Seção: Beats Demonstração (index.html)
Procure por `id="demo"`:

- [ ] Adicionar 6 beats de demo com áudio e descrição

### Seção: Avaliações (index.html)
Procure por `id="testimonials"`:

- [ ] Editar 4 depoimentos de artistas

### Seção: Contato (index.html)
Procure por `id="contact"`:

- [ ] Adicionar links do Instagram
- [ ] Adicionar links do YouTube
- [ ] Confirmar número de WhatsApp

---

## 🎨 PERSONALIZAÇÃO

### Mudar Cores (styles.css)
```css
--primary: #1db954;              /* Verde principal */
--accent: #ff006e;               /* Rosa/destaque */
--secondary: #191414;            /* Preto de fundo */
--tertiary: #282828;             /* Cinza escuro */
```

### Mudar Fontes (styles.css)
```css
body {
    font-family: 'Sua Font', sans-serif;
}
```

---

## 📱 TESTANDO

1. Abra o arquivo `index.html` no navegador
2. Clique em qualquer botão "Comprar"
3. Deve abrir WhatsApp com mensagem pré-preenchida
4. Teste em mobile também

---

## 📂 ESTRUTURA DE PASTAS

```
portifólio-Izanagi/
├── index.html          ✅ Arquivo principal (EDITADO)
├── styles.css          ✅ Estilos (CRIADO)
├── script.js           ✅ JavaScript (CRIADO)
├── README.md           ✅ Documentação (CRIADO)
├── CONFIG.md           ✅ Este arquivo
└── recursos/
    ├── imagens/        📁 Coloque AQUI as fotos dos artistas
    ├── sons/           📁 Coloque AQUI os MP3 dos beats
    └── videos/         📁 Para futuros vídeos
```

---

## 🔗 LINKS ÚTEIS

- **Font Awesome (ícones):** https://fontawesome.com/
- **Converter cores HEX:** https://htmlcolorcodes.com/
- **Otimizar áudio:** https://www.freeconvert.com/

---

## ✅ CHECKLIST FINAL

- [ ] WhatsApp número atualizado
- [ ] Todos os beats adicionados com áudio
- [ ] Ícones de artistas adicionados
- [ ] Depoimentos preenchidos
- [ ] Links de redes sociais configurados
- [ ] Testado em Desktop
- [ ] Testado em Mobile
- [ ] Testado os botões de compra

---

**Pronto para vender seus beats! 🚀🎵**
