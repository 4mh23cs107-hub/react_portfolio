// Execute all code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // Mobile Menu Toggle
    // =====================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle Hamburger Icon (Bars to Times)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // =====================================
    // Sticky Navbar & Active Link Update on Scroll
    // =====================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar logic
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update logic
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Subtracting navbar height so active state triggers at correct time
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(a => {
            a.classList.remove('active');
            if (current !== '' && a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // =====================================
    // Scroll Reveal Animation (Intersection Observer)
    // =====================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed to only animate once
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // =====================================
    // Form Submission (Prevent default for demo)
    // =====================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Simulate sending
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                btn.style.background = '#10b981'; // Success Green
                btn.style.opacity = '1';
                contactForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

});
