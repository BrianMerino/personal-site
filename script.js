
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll('.fade-in');
  
    const options = {
      threshold: 0.1,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); 
        }
      });
    }, options);
  
    faders.forEach(fader => {
      observer.observe(fader);
    });
  });


document.querySelectorAll('.clickable-image').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImg');
      modalImg.src = img.src;
      modal.classList.add('show');
    });
  });
  

  document.getElementById('imageModal').addEventListener('click', () => {
    document.getElementById('imageModal').classList.remove('show');
  });


  const images = Array.from(document.querySelectorAll('.clickable-image'));
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevImg');
const nextBtn = document.getElementById('nextImg');

let currentIndex = 0;

function showImage(index) {
  modalImg.src = images[index].src;
  currentIndex = index;
  modal.classList.add('show');
}

images.forEach((img, index) => {
  img.addEventListener('click', () => showImage(index));
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
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

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
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

  