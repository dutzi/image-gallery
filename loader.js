'use strict';

function addImage(imageData, container) {
  let imageWrapper = document.createElement('a');
  imageWrapper.target = '_blank';
  imageWrapper.classList.add('imageWrapper');

  let image = document.createElement('div');
  image.classList.add('image');
  image.style.backgroundColor = imageData.prominentColor;

  imageWrapper.appendChild(image);
  container.appendChild(imageWrapper);

  return image;
}

function createInitializer(dataUrl) {
  return fetch(dataUrl).then(res => res.json()).then((gallery) => {
    let row;
    let imageElements = [];

    gallery.forEach(imageData => {
      imageElements.push({
        element: addImage(imageData, document.body),
        data: imageData
      });
    });

    return imageElements;
  })
}