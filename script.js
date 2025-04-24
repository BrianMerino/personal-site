
document.addEventListener("DOMContentLoaded", () => {
  // Fade-ins
  const faders = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(fader => observer.observe(fader));

  let scrollY = 0;

  const images = Array.from(document.querySelectorAll('.clickable-image'));
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeModal = document.getElementById('closeModal');
  const prevBtn = document.getElementById('prevImg');
  const nextBtn = document.getElementById('nextImg');

  let currentIndex = 0;

  function showImage(index) {
    scrollY = window.scrollY;
    document.body.classList.add('modal-open');
    document.body.style.top = `-${scrollY}px`;

    modalImg.src = images[index].src;
    currentIndex = index;
    modal.classList.add('show');
  }

  function closeModalFunc() {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
  }

  closeModal.addEventListener('click', closeModalFunc);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFunc();
  });

  images.forEach((img, index) => {
    img.addEventListener('click', () => showImage(index));
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  let startX = 0;

  modal.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  modal.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      } else {
        currentIndex = (currentIndex + 1) % images.length;
      }
      showImage(currentIndex);
    }
  });
});
