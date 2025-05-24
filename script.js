const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages(imageList) {
  output.innerHTML = "";
  errorDiv.innerText = "";
  loadingDiv.style.display = "block";

  const imagePromises = imageList.map(img => downloadImage(img.url));

  Promise.all(imagePromises)
    .then(images => {
      loadingDiv.style.display = "none";
      images.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = "none";
      errorDiv.innerText = error.message;
    });
}

btn.addEventListener("click", () => {
  downloadImages(images);
});
