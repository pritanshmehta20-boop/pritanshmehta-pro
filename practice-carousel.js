(() => {
  function setupPracticeCarousel() {
    const carousel = document.querySelector('.practice-carousel');
    if (!carousel || carousel.dataset.carouselReady === 'true') return;

    const viewport = carousel.querySelector('.practice-carousel-viewport');
    const track = carousel.querySelector('.practice-carousel-track');
    const count = carousel.querySelector('.carousel-count');
    const slides = track ? Array.from(track.children).filter((slide) => slide.classList.contains('practice-feature')) : [];
    const arrows = Array.from(carousel.querySelectorAll('.carousel-arrow[data-carousel-direction]'));
    if (!viewport || !track || !count || slides.length < 2 || arrows.length < 2) return;

    carousel.dataset.carouselReady = 'true';
    let current = 0;
    let scrollFrame = 0;
    const renderCount = () => {
      count.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    };
    const goToSlide = (index) => {
      current = (index + slides.length) % slides.length;
      viewport.scrollTo({ left: current * viewport.clientWidth, behavior: 'smooth' });
      renderCount();
    };

    arrows.forEach((arrow) => {
      arrow.addEventListener('click', (event) => {
        event.preventDefault();
        goToSlide(current + Number(arrow.dataset.carouselDirection || 1));
      });
    });

    viewport.addEventListener('scroll', () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        current = Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / Math.max(viewport.clientWidth, 1))));
        renderCount();
        scrollFrame = 0;
      });
    }, { passive: true });

    window.addEventListener('resize', () => {
      viewport.scrollTo({ left: current * viewport.clientWidth, behavior: 'auto' });
      renderCount();
    });

    renderCount();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPracticeCarousel, { once: true });
  } else {
    setupPracticeCarousel();
  }
})();
