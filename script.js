/**
 * ==================================================
 * ENGINE DE NAVEGAÇÃO, SCROLLSPY & EFEITOS SURREAIS
 * Criado para a Turma 140 - Portfólio Premium
 * ==================================================
 */

(() => {
  // 1. Seletores centralizados
  const DOM = {
    navLinks: document.querySelectorAll(".nav a"),
    sections: document.querySelectorAll(".section[id]"),
    anchorLinks: document.querySelectorAll('a[href^="#"]'),
    heroTextElement: document.querySelector(".hero-text"),
  };

  // 2. Função de Scroll Suave com History API (UX Premium)
  const initSmoothScroll = () => {
    if (!DOM.anchorLinks.length) return;

    DOM.anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          history.pushState(null, null, targetId);
        }
      });
    });
  };

  // 3. ScrollSpy Avançado e Otimizado
  const initScrollSpy = () => {
    if (!DOM.sections.length || !DOM.navLinks.length) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          DOM.navLinks.forEach((link) => {
            const linkHref = link.getAttribute("href");

            if (linkHref === `#${currentId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    DOM.sections.forEach((section) => observer.observe(section));
  };

  // 4. (NOVO) Efeito de Digitação Fluido para o Hero
  const initTypewriter = () => {
    const el = DOM.heroTextElement;
    if (!el) return;

    const originalText = el.textContent.trim();
    el.textContent = ""; // Limpa o texto original para começar a digitar
    el.style.opacity = "1"; // Garante visibilidade

    let index = 0;
    const speed = 35; // Velocidade da digitação (quanto menor, mais rápido)

    const type = () => {
      if (index < originalText.length) {
        el.textContent += originalText.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        // Remove a borda do cursor após terminar a digitação para dar acabamento limpo
        setTimeout(() => {
          el.style.borderRight = "none";
        }, 1000);
      }
    };

    // Pequeno delay inicial para sincronizar com a animação do Título H1
    setTimeout(type, 800);
  };

  // 5. Inicialização Geral
  document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initScrollSpy();
    initTypewriter();
  });
})();
