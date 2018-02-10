'use strict';

function Renderer(imageElements) {
  let imagesPerRow;
  let imageSize;
  let prevScrollTop = 0;
  let lastRenderedScrollTop;

  function resize() {
    let width = window.innerWidth
    if (width <= 375) {
      imagesPerRow = 2;
    } else if (width < 576) {
      imagesPerRow = 3;
    } else if (width < 768) {
      imagesPerRow = 4;
    } else if (width < 992) {
      imagesPerRow = 5;
    } else {
      imagesPerRow = 7;
    }
    imageSize = window.innerWidth / imagesPerRow;

    // Adding a stylesheet seemed faster than changing each element's
    // width "manually"
    // 
    let sheet = document.querySelector('#resizeStyle')
    sheet.innerHTML = `.imageWrapper {width: ${imageSize}px;}`;
  }

  function onAnimationFrame() {
    let scrollTop = document.body.scrollTop;
    if (prevScrollTop === scrollTop) {
      if (lastRenderedScrollTop !== scrollTop) {
        renderMissingImages();
      }
      lastRenderedScrollTop = prevScrollTop;
    }
    prevScrollTop = scrollTop;
    requestAnimationFrame(onAnimationFrame);
  }
  requestAnimationFrame(onAnimationFrame);

  function renderMissingImages() {
    let indexStart = Math.floor(document.body.scrollTop / imageSize) * imagesPerRow;
    let indexEnd = Math.ceil((document.body.scrollTop + window.innerHeight) / imageSize) * imagesPerRow;

    for (let i = indexStart; i < indexEnd; i++) {
      let url = imageElements[i].data.thumbnail.url;
      imageElements[i].element.style.backgroundImage = `url(${url})`;
      imageElements[i].element.parentNode.href = imageElements[i].data.standard_resolution.url;
    }
  }

  window.addEventListener('resize', resize)
  window.addEventListener('resize', renderMissingImages);

  resize();
  renderMissingImages();
}

function createRenderer(imageElements) {
  return new Renderer(imageElements);
}