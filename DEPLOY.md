# 🚀 Como fazer Deploy no Vercel

## Opção 1: Deploy via Interface Web (Mais Fácil)

### Passo 1: Criar conta no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Faça login com GitHub, GitLab ou Bitbucket

### Passo 2: Subir o projeto para o GitHub
1. Crie um repositório no GitHub
2. Faça upload de todos os arquivos do projeto
3. Commit e push

### Passo 3: Importar no Vercel
1. No Vercel, clique em "Add New Project"
2. Selecione "Import Git Repository"
3. Escolha seu repositório do GitHub
4. Clique em "Import"
5. **Não precisa configurar nada!** O Vercel detecta automaticamente
6. Clique em "Deploy"

### Pronto! 🎉
Seu site estará online em alguns segundos!

---

## Opção 2: Deploy via CLI (Linha de Comando)

### Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Fazer Login
```bash
vercel login
```

### Passo 3: Deploy
Na pasta do projeto, execute:
```bash
vercel
```

Siga as instruções na tela:
- Set up and deploy? **Y**
- Which scope? Escolha sua conta
- Link to existing project? **N**
- What's your project's name? **inhome** (ou o nome que preferir)
- In which directory is your code located? **./** (deixe em branco)

### Deploy em Produção
```bash
vercel --prod
```

---

## 📝 Notas Importantes

### Estrutura do Projeto
Seu projeto já está pronto para deploy! A estrutura é:
```
/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   └── scripts.js      # JavaScript
├── assets/
│   └── img/
│       └── logo.png    # Logo da empresa
├── vercel.json         # Configuração do Vercel
└── .gitignore          # Arquivos ignorados
```

### Domínio Personalizado
Após o deploy, você pode:
1. Usar o domínio gratuito do Vercel: `seu-projeto.vercel.app`
2. Adicionar domínio personalizado nas configurações do projeto

### Atualizações Automáticas
- Cada push no GitHub faz deploy automático
- Branch `main` = Produção
- Outras branches = Preview

### Configurações do Vercel
O arquivo `vercel.json` já está configurado para:
- Servir arquivos estáticos
- Roteamento correto
- Cache otimizado

---

## 🔧 Solução de Problemas

### Erro: "No index.html found"
- Certifique-se que `index.html` está na raiz do projeto

### Erro: "Build failed"
- Seu projeto não precisa de build! É HTML puro
- Verifique se o `vercel.json` está correto

### Imagens não aparecem
- Verifique os caminhos das imagens
- Use caminhos relativos: `assets/img/logo.png`
- Não use caminhos absolutos: `/assets/img/logo.png`

### CSS/JS não carrega
- Verifique os caminhos no `index.html`
- Devem ser relativos: `css/styles.css` e `js/scripts.js`

---

## 📱 Testando Localmente

Para testar antes do deploy:

### Opção 1: Live Server (VS Code)
1. Instale a extensão "Live Server"
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### Opção 2: Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000`

### Opção 3: Node.js
```bash
npx serve
```

---

## 🎯 Checklist Pré-Deploy

- [ ] Logo da empresa está em `assets/img/logo.png`
- [ ] Todos os links estão funcionando
- [ ] Formulário de contato testado
- [ ] WhatsApp com número correto: (62) 99927-1152
- [ ] E-mail correto: inhomeprestacaodeservicos@gmail.com
- [ ] Instagram: @inhomeprestacao
- [ ] Responsividade testada (mobile, tablet, desktop)
- [ ] Animações funcionando
- [ ] Todas as imagens carregando

---

## 🌐 URLs Importantes

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentação**: https://vercel.com/docs
- **Status**: https://vercel-status.com

---

## 💡 Dicas

1. **Performance**: O Vercel já otimiza automaticamente
2. **HTTPS**: Certificado SSL gratuito e automático
3. **CDN Global**: Seu site será rápido no mundo todo
4. **Analytics**: Ative nas configurações para ver visitantes
5. **Preview**: Cada branch gera uma URL de preview

---

## 📞 Suporte

Se tiver problemas:
1. Verifique a documentação: https://vercel.com/docs
2. Comunidade: https://github.com/vercel/vercel/discussions
3. Twitter: @vercel

---

**Boa sorte com o deploy! 🚀**