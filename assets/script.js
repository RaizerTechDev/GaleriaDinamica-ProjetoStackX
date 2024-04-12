// Função para adicionar imagem na galeria
function addImage(imageSrc) {
  const gallery = document.getElementById("gallery");
  const image = document.createElement("img");
  image.src = imageSrc;
  image.addEventListener("click", () => {
    removeImage(image);
  });
  gallery.appendChild(image);
}

// Função para remover imagem da galeria
function removeImage(imageElement) {
  const gallery = document.getElementById("gallery");
  gallery.removeChild(imageElement);
  updateLocalStorage();
}

// Função para atualizar o LocalStorage
function updateLocalStorage() {
  const gallery = document.getElementById("gallery");
  const images = [];
  gallery.querySelectorAll("img").forEach((img) => {
    images.push(img.src);
  });
  localStorage.setItem("galleryImages", JSON.stringify(images));
}

// Verifica se existem imagens no LocalStorage ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const storedImages = JSON.parse(localStorage.getItem("galleryImages"));
  if (storedImages) {
    storedImages.forEach((imageSrc) => {
      addImage(imageSrc);
    });
  }
});

// Captura o evento de clique no botão Adicionar
document.getElementById("addBtn").addEventListener("click", () => {
  const inputFile = document.getElementById("inputFile");
  const file = inputFile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageSrc = event.target.result;
      addImage(imageSrc);
      updateLocalStorage();
    };
    reader.readAsDataURL(file);
  }
});
