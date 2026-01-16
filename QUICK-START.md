# 🚀 Guia Rápido - Deploy no Vercel

## Método Mais Fácil (5 minutos)

### 1️⃣ Criar Conta no Vercel
- Acesse: https://vercel.com
- Clique em "Sign Up"
- Faça login com GitHub

### 2️⃣ Subir para o GitHub
```bash
# Na pasta do projeto, execute:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin SEU-REPOSITORIO-GITHUB
git push -u origin main
```

### 3️⃣ Deploy no Vercel
1. Acesse: https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione seu repositório
4. Clique em "Deploy"

**Pronto! Seu site está online! 🎉**

---

## Método Alternativo (Sem GitHub)

### Via Vercel CLI

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Deploy (na pasta do projeto)
vercel

# 4. Deploy em produção
vercel --prod
```

---

## Método Mais Simples (Arrastar e Soltar)

1. Acesse: https://vercel.com/new
2. Clique em "Browse"
3. Selecione a pasta do projeto
4. Arraste e solte
5. Clique em "Deploy"

---

## ✅ Checklist Antes do Deploy

- [ ] Logo da empresa está em `assets/img/logo.png`
- [ ] WhatsApp correto: (62) 99927-1152
- [ ] E-mail correto: inhomeprestacaodeservicos@gmail.com
- [ ] Instagram: @inhomeprestacao
- [ ] Testado localmente

---

## 🌐 Após o Deploy

Seu site estará disponível em:
- URL Vercel: `seu-projeto.vercel.app`
- Você pode adicionar domínio personalizado depois

---

## 🆘 Problemas?

### Site não carrega
- Verifique se `index.html` está na raiz
- Verifique o console do Vercel

### Imagens não aparecem
- Certifique-se que a logo está em `assets/img/logo.png`
- Use caminhos relativos

### CSS/JS não carrega
- Verifique os caminhos no `index.html`
- Devem ser: `css/styles.css` e `js/scripts.js`

---

## 📞 Precisa de Ajuda?

Veja o guia completo em [DEPLOY.md](DEPLOY.md)

---

**Boa sorte! 🚀**