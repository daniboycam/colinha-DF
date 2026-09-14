# 🗳️ Colinha DF - Eleições

Uma aplicação web interativa, responsiva e acessível para a criação da **Colinha Eleitoral** para as eleições do Distrito Federal. Desenvolvida para facilitar o dia da votação, permitindo exportar a lista de candidatos finais para uma imagem e compartilhá-la facilmente.

## 🚀 Funcionalidades

- **Teclado Virtual:** Interface familiar simulando uma Urna Eletrônica (com suporte a teclado físico para acessibilidade).
- **Importação de Dados do TSE:** Script incluído para extrair milhares de candidatos diretamente dos dados abertos do governo e importar imagens localmente.
- **Exportação e Compartilhamento:** Salve a colinha final como PNG de alta qualidade ou compartilhe diretamente no WhatsApp e redes sociais usando a Web Share API.
- **Modo Escuro (Dark Mode):** Interface adaptável com layout escuro e alto contraste.
- **Acessibilidade:** Avisos de interface para leitores de tela e regras de contraste rigorosas.
- **PWA Ready:** Meta tags para cores de barra de ferramentas e ícone (Bandeira do DF) configurados.

## 💻 Tecnologias Utilizadas

- **React / Vite:** Renderização ultra rápida e componentes dinâmicos.
- **Tailwind CSS:** Estilização responsiva e Modo Escuro nativo.
- **Lucide React:** Biblioteca de ícones modernos.
- **html-to-image:** Renderização e exportação da colinha como documento (PNG).
- **Vercel:** Plataforma de deploy e hospedagem.

## 🛠️ Como rodar o projeto localmente

Como o código fonte da aplicação está dentro da pasta \colinha-df\, certifique-se de navegar até ela antes de rodar os comandos.

1. Entre na pasta do código fonte:
   `ash
   cd colinha-df
   `
2. Instale as dependências:
   `ash
   npm install
   `
3. Inicie o servidor de desenvolvimento:
   `ash
   npm run dev
   `
4. Acesse no navegador em \http://localhost:5173\.

## 📦 Como importar a base de candidatos do TSE (Opcional)

Para atualizar a base de candidatos e fotos oficiais da eleição:
1. Baixe os arquivos \.csv\ do Portal de Dados Abertos do TSE.
2. Jogue todas as imagens \.jpg\ oficiais dos candidatos na pasta \colinha-df/public/fotos\.
3. Rode o script de parsing de dados via terminal:
   `ash
   node scripts/importar_tse.js
   `

## 👨‍💻 Desenvolvedor

- **Daniel** ([@daniboycam](https://github.com/daniboycam))

> *Nota: Este é um projeto utilitário de código aberto sem fins lucrativos. Não possui qualquer vínculo governamental, institucional ou oficial com a Justiça Eleitoral.*