import * as htmlToImage from 'html-to-image';

export const exportAsImage = async (element, imageFileName) => {
  if (!element) return;
  
  try {
    const dataUrl = await htmlToImage.toPng(element, {
      quality: 1.0,
      backgroundColor: '#ffffff',
      pixelRatio: 2
    });
    
    downloadImage(dataUrl, imageFileName);
  } catch (error) {
    console.error("Erro ao gerar a imagem:", error);
    alert("Ocorreu um erro ao gerar a colinha. Tente novamente.");
  }
};

export const exportAndShareImage = async (element, imageFileName) => {
  if (!element) return;
  
  let dataUrl;
  try {
    dataUrl = await htmlToImage.toPng(element, {
      quality: 1.0,
      backgroundColor: '#ffffff',
      pixelRatio: 2
    });
  } catch (error) {
    console.error("Erro na geração da imagem", error);
    alert("Erro ao gerar a imagem.");
    return;
  }
  
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], imageFileName, { type: 'image/png' });

    // Pega o link da página atual para a mensagem (Vercel ou Localhost)
    const siteUrl = window.location.href;
    const shareText = "Já montei minha Colinha para as eleições do DF! Crie a sua também de forma rápida em: " + siteUrl;

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'Minha Colinha DF',
        text: shareText,
        files: [file]
      });
    } else {
      alert("O compartilhamento direto de imagens não é suportado neste navegador. A imagem será salva na sua galeria.");
      downloadImage(dataUrl, imageFileName);
    }
  } catch (error) {
    // AbortError é jogado quando o usuário cancela o menu de share
    if (error.name !== 'AbortError') { 
      console.error("Erro ao compartilhar a imagem:", error);
      alert("Seu dispositivo bloqueou a janela de compartilhamento. A imagem será baixada no seu aparelho.");
      downloadImage(dataUrl, imageFileName);
    }
  }
};

const downloadImage = (dataUrl, fileName) => {
  const fakeLink = window.document.createElement('a');
  fakeLink.style = 'display:none;';
  fakeLink.download = fileName;
  
  fakeLink.href = dataUrl;
  
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  
  fakeLink.remove();
};