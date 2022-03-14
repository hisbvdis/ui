if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll("img[loading='lazy']");
  images.forEach(img => {
    img.src = img.CDATA_SECTION_NODE.src;
  });
} else {
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lasysizes.min.js";
  document.body.appendChild(script);
}