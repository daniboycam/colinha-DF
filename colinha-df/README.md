# 🗳️ Colinha Eleitoral DF

Uma aplicação web interativa, responsiva e acessível para a criação da **Colinha Eleitoral** para as eleições do Distrito Federal. Desenvolvida para facilitar o dia da votação, permitindo exportar a lista de candidatos finais para uma imagem e compartilhá-la facilmente.

## ✨ Funcionalidades

- **Teclado Virtual:** Interface familiar simulando uma Urna Eletrônica (com suporte a teclado físico para acessibilidade).
- **Importação de Dados do TSE:** Script incluído para extrair milhares de candidatos diretamente dos dados abertos do governo e importar imagens localmente (100% offline no dia).
- **Exportação e Compartilhamento:** Salve a colinha final como PNG ou compartilhe diretamente no WhatsApp e redes sociais usando a Web Share API.
- **Modo Escuro (Dark Mode):** Preto absoluto para conforto visual superior.
- **Acessibilidade:** Avisos sonoros para leitores de tela (`aria-live`) e regras de contraste focadas no usuário.

## 🚀 Como rodar o projeto localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse no navegador em `http://localhost:5173`.

## 📦 Como importar a base de candidatos do TSE

Para adicionar os candidatos e fotos oficiais da eleição (ex: 2026):
1. Baixe o arquivo `consulta_cand_2026.zip` no Portal de Dados Abertos do TSE.
2. Descompacte e coloque os arquivos `.csv` correspondentes (ex: `consulta_cand_2026_DF.csv` e `BR.csv`) numa pasta e ajuste o caminho.
3. (Opcional) Baixe o arquivo `.zip` das fotos (ex: `foto_cand2026_DF_div.zip`), descompacte e jogue todas as imagens `.jpg` na pasta `public/fotos`.
4. Rode o script mágico de importação:
   ```bash
   node scripts/importar_tse.js
   ```

## 👥 Autores

Este projeto foi desenvolvido em Pair Programming:
- **Autor Principal:** Daniel ([@daniboycam](https://github.com/daniboycam))
- **Coautoria (IA):** Gisele (Google Antigravity AI)

> *Nota: Este é um projeto utilitário de código aberto. Não possui qualquer vínculo governamental ou oficial com a Justiça Eleitoral brasileira.*
