document.addEventListener("DOMContentLoaded", () => {
    /**
     * Handles the hero section's mouse-move parallax effect.
     */
    const initHeroParallax = () => {
        const heroGraphics = document.querySelector(".hero-graphics");
        if (!heroGraphics) return;

        // Don't run on mobile where it's not visible
        if (window.innerWidth < 768) return;

        document.addEventListener("mousemove", (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate movement based on cursor position from center
            // The division by 50 and 30 controls the "intensity" of the effect
            const moveX = (clientX - innerWidth / 2) / 50;
            const moveY = (clientY - innerHeight / 2) / 30;

            heroGraphics.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    };

    /**
     * Handles the hero section's multi-layered 3D parallax effect.
     */
    const initHero3DParallax = () => {
        const heroSection = document.querySelector("#hero");
        const graphicsContainer = document.querySelector(
            ".hero-graphics-container"
        );

        if (!heroSection || !graphicsContainer) return;

        // Don't run on mobile where graphics are hidden
        if (window.innerWidth < 768) return;

        heroSection.addEventListener("mousemove", (e) => {
            // Get cursor position relative to the center of the viewport
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (clientX - centerX) / 20; // Intensity factor
            const moveY = (clientY - centerY) / 20;

            // Apply transform to the whole container for a base movement
            graphicsContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // Apply individual transforms to each graphic element for depth
            const graphicElements =
                graphicsContainer.querySelectorAll(".graphic-element");
            graphicElements.forEach((el) => {
                const depth = parseFloat(el.dataset.depth) || 0;
                const elMoveX = moveX * depth;
                const elMoveY = moveY * depth;
                el.style.transform = `translate(${elMoveX}px, ${elMoveY}px)`;
            });
        });
    };

    /**
     * Handles mobile navigation toggle.
     */
    const initMobileNav = () => {
        const menuToggle = document.getElementById("menu-toggle");
        const navMenuWrapper = document.querySelector(".nav-menu-wrapper");
        const navLinks = document.querySelectorAll(".nav-link");

        if (menuToggle && navMenuWrapper) {
            menuToggle.addEventListener("click", () => {
                menuToggle.classList.toggle("active");
                navMenuWrapper.classList.toggle("active");
                document.body.classList.toggle("menu-open");
            });
        }

        // Close menu when a link is clicked
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (navMenuWrapper.classList.contains("active")) {
                    menuToggle.classList.remove("active");
                    navMenuWrapper.classList.remove("active");
                    document.body.classList.remove("menu-open");
                }
            });
        });
    };

    /**
     * Changes header style on scroll.
     */
    const initHeaderScroll = () => {
        const header = document.querySelector(".main-header");
        if (!header) return;

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    };

    /**
     * Reveals elements on scroll using IntersectionObserver.
     */
    const initScrollReveal = () => {
        const revealItems = document.querySelectorAll(".reveal-item");
        if (revealItems.length === 0) return;

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealItems.forEach((item) => {
            revealObserver.observe(item);
        });
    };

    /**
     * Highlights the active navigation link based on scroll position.
     */
    const initActiveNavHighlighting = () => {
        const sections = document.querySelectorAll(".scroll-section");
        const navLinks = document.querySelectorAll(".nav-link");
        if (sections.length === 0 || navLinks.length === 0) return;

        const highlightObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((link) => {
                            link.classList.remove("active-link");
                            if (
                                link
                                    .getAttribute("href")
                                    .includes(entry.target.id)
                            ) {
                                link.classList.add("active-link");
                            }
                        });
                    }
                });
            },
            { rootMargin: "-40% 0px -60% 0px" }
        ); // Highlights when section is in the middle of the viewport

        sections.forEach((section) => {
            highlightObserver.observe(section);
        });
    };

    /**
     * Handles the interactive features showcase section.
     */
    const initFeatureShowcase = () => {
        const featureItems = document.querySelectorAll(".feature-item");
        const previewItems = document.querySelectorAll(".feature-preview-item");

        if (featureItems.length === 0) return;

        featureItems.forEach((button) => {
            button.addEventListener("click", () => {
                const featureToShow = button.dataset.feature;

                // Update active state on buttons
                featureItems.forEach((item) => item.classList.remove("active"));
                button.classList.add("active");

                // Show the corresponding preview
                previewItems.forEach((preview) => {
                    if (preview.id === `feature-preview-${featureToShow}`) {
                        preview.classList.add("visible");
                    } else {
                        preview.classList.remove("visible");
                    }
                });
            });
        });
    };

    const initPricingToggle = () => {
        const switchInput = document.getElementById("pricing-switch");
        if (!switchInput) return;

        const pricingCards = document.querySelectorAll(".plan-price");

        switchInput.addEventListener("change", () => {
            const isYearly = switchInput.checked;

            pricingCards.forEach((card) => {
                const priceValueEl = card.querySelector(".price-value");
                if (!priceValueEl) return; // Skip the 'Custom' card

                const monthlyPrice = card.dataset.monthly;
                const yearlyPrice = card.dataset.yearly;

                // Add a subtle fade-out effect
                priceValueEl.style.opacity = "0";

                setTimeout(() => {
                    priceValueEl.textContent = isYearly
                        ? yearlyPrice
                        : monthlyPrice;
                    // Fade back in
                    priceValueEl.style.opacity = "1";
                }, 150);
            });
        });
    };

    // Initialize all functionalities
    initHeroParallax();
    initHero3DParallax();
    initMobileNav();
    initHeaderScroll();
    initScrollReveal();
    initActiveNavHighlighting();
    // Add this new function call
    initFeatureShowcase();
    initPricingToggle();
});
