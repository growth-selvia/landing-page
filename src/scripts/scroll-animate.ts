/**
 * src/scripts/scroll-animate.ts
 *
 * Anima entrada das seções no viewport (fade-in + stagger) e faz parallax
 * sutil dos blobs decorativos no scroll.
 *
 * 1:1 com _legacy/index.html (linhas 3189-3260):
 *   1) IntersectionObserver adiciona .is-visible em todas as .scroll-animate
 *   2) Hero ganha .is-visible no load (sempre já tá na tela)
 *   3) Parallax sutil nos blobs (apenas desktop)
 *   4) Respeita prefers-reduced-motion
 *
 * Importado em BaseLayout.astro como módulo (Astro processa, tree-shake, e
 * injeta como <script> defer no <head>).
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Marca tudo como visível direto, sem animação
  document.querySelectorAll('.scroll-animate').forEach((s) => s.classList.add('is-visible'));
  document.querySelector('.hero')?.classList.add('is-visible');
} else {
  // ===== 1) FADE-IN ao entrar no viewport (uma vez só) =====
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px', // dispara um pouco antes da seção entrar 100%
      },
    );

    document.querySelectorAll('.scroll-animate').forEach((s) => fadeObserver.observe(s));

    // Hero: já está na tela no load, mas precisa de .is-visible pra animar a curva
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      // pequeno delay (2x requestAnimationFrame) pra dar tempo da página carregar
      // e a transição ser visível
      requestAnimationFrame(() =>
        requestAnimationFrame(() => heroEl.classList.add('is-visible')),
      );
    }
  } else {
    // Fallback pra browsers antigos sem IntersectionObserver
    document.querySelectorAll('.scroll-animate').forEach((s) => s.classList.add('is-visible'));
    document.querySelector('.hero')?.classList.add('is-visible');
  }

  // ===== 2) PARALLAX sutil nos blobs decorativos (apenas desktop) =====
  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  if (!isMobile) {
    const parallaxSections = document.querySelectorAll<HTMLElement>('[data-parallax]');
    let ticking = false;

    const updateParallax = () => {
      parallaxSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowH = window.innerHeight;

        // Só atualiza se a seção está visível na tela
        if (rect.bottom < 0 || rect.top > windowH) return;

        // Calcula offset baseado na posição relativa da seção no viewport
        // (de -1 a 1, onde 0 é o meio da tela)
        const progress = (rect.top + rect.height / 2 - windowH / 2) / windowH;
        const parallaxY = Math.round(progress * 30); // 30px de range total

        section.style.setProperty('--parallax-y', `${parallaxY}px`);
      });
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true },
    );

    updateParallax(); // inicializa
  }
}
