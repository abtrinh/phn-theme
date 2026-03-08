autoSlider()

function autoSlider(){
  setTimeout(nextSlide, 8000);
}

function nextSlide(click=false) {
  
  let currentImage = $('.img.curry');
  let currentImageIndex = $('.img.curry').index();
  let nextImageIndex = currentImageIndex + 1;
  let nextImage = $('.img').eq(nextImageIndex);
  currentImage.fadeOut(0);
  currentImage.removeClass('curry');

  if (nextImageIndex == ($('.img:last').index() + 1)) {
    $('.img').eq(0).fadeIn(0);
    $('.img').eq(0).addClass('curry');
  } else {
    nextImage.fadeIn(0);
    nextImage.addClass('curry');
  }
  if(click==false){
    autoSlider()
  }
}


