/**
 * ==================================================
 * ENGINE DE NAVEGAÇÃO & SCROLLSPY
 * Criado para a Turma 140 - Portfólio Premium
 * ==================================================
 */

(() => {
  // 1. Seletores centralizados (fácil manutenção)
  const DOM = {
    navLinks: document.querySelectorAll(".nav a"),
    sections: document.querySelectorAll(".section[id]"),
    anchorLinks: document.querySelectorAll('a[href^="#"]'),
  };

  // 2. Função de Scroll Suave com History API (UX Premium)
  const initSmoothScroll = () => {
    if (!DOM.anchorLinks.length) return;

    DOM.anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        // Ignora se for apenas "#" sem destino
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          // Rola suavemente até o elemento
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Mágica Premium: Atualiza a URL sem dar o "pulo" chato na tela
          history.pushState(null, null, targetId);
        }
      });
    });
  };

  // 3. ScrollSpy Avançado e Otimizado
  const initScrollSpy = () => {
    if (!DOM.sections.length || !DOM.navLinks.length) return;

    // Ajuste fino das margens para ativar o menu na hora exata
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

            // Adiciona a classe ativa apenas no link correto
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

    // Inicia a observação das seções
    DOM.sections.forEach((section) => observer.observe(section));
  };

  // 4. Inicializa tudo apenas quando o DOM estiver 100% carregado
  document.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initScrollSpy();
  });
})();
