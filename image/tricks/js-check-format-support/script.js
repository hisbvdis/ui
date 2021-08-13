async function supportsImgType(type) {
  let img = document.createElement("img");
  document.createElement("picture").append(
    Object.assign(document.createElement("source"), {
      srcset: "data:,x",  // Валидный url, который не обращается к сети
      type
    }),
    img
  );

  await 0;                 // Даём примениться currentSrc
  return !!img.currentSrc; // Если браузер умеет, заполнит занчение currentSrc
}

for (let type of ["img/png", "image/jpeg", "image/avif"]) {
  supportsImgType(type).then(supported => console.log( `${type}: ${supported}` ));
}