$(document).ready(function() {
    console.log("Document ready!");
    console.clear();
    
    // Start screen handling
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const body = document.body;
    let hasStarted = false;

    // Prevent scrolling until start
    body.classList.add('no-scroll');

    // Initialize everything but don't start auto-scrolling yet
    $('video').addClass('video-background');
    const video = document.querySelector(".video-background");
    let src = video.currentSrc || video.src;
    
    // Auto-scroll variables
    let isAutoScrolling = false;  // Start as false
    let lastTime = null;
    const targetFPS = 8;
    const msPerFrame = 1000 / targetFPS;
    const speedMultiplier = 4.5;
    let lastScrollPosition = window.pageYOffset;

    // Start button click handler
    startButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        body.classList.remove('no-scroll');
        isAutoScrolling = true;  // Start auto-scrolling
        hasStarted = true;
        
        // Scroll to top to ensure we start from the beginning
        window.scrollTo(0, 0);
        
        // Start the video if needed
        video.play();
        video.pause();
    });

    // Automatically trigger start button after a short delay
    setTimeout(() => {
        startButton.click();
    }, 500);

    // Function to handle auto-scrolling
    function autoScroll(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        
        if (isAutoScrolling && deltaTime >= msPerFrame) {
            const currentScroll = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPerFrame = (maxScroll / (video.duration * targetFPS)) * speedMultiplier;
            
            if (currentScroll < maxScroll) {
                window.scrollTo({
                    top: currentScroll + scrollPerFrame,
                    behavior: 'auto'
                });
            }
            lastTime = currentTime;
        }
        
        requestAnimationFrame(autoScroll);
    }

    // Start auto-scrolling
    requestAnimationFrame(autoScroll);

    // Pause auto-scroll on user interaction
    let userScrollTimeout;
    window.addEventListener('wheel', function(e) {
        if (!hasStarted) return;  // Ignore scroll events before start
        isAutoScrolling = false;
        clearTimeout(userScrollTimeout);
        
        const currentPosition = window.pageYOffset;
        const scrollingDown = currentPosition > lastScrollPosition;
        lastScrollPosition = currentPosition;

        if (scrollingDown) {
            // Resume immediately when scrolling down
            requestAnimationFrame(() => {
                isAutoScrolling = true;
            });
        } else {
            // Add delay when scrolling up
            userScrollTimeout = setTimeout(() => {
                isAutoScrolling = true;
            }, 100);
        }
    }, { passive: true });

    // Also pause on touch for mobile devices
    let touchStartY = 0;
    window.addEventListener('touchstart', function(e) {
        if (!hasStarted) return;  // Ignore touch events before start
        isAutoScrolling = false;
        clearTimeout(userScrollTimeout);
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', function(e) {
        if (!hasStarted) return;  // Ignore touch events before start
        const touchEndY = e.changedTouches[0].clientY;
        const scrollingDown = touchEndY < touchStartY;
        
        clearTimeout(userScrollTimeout);
        if (scrollingDown) {
            // Resume immediately when scrolling down
            requestAnimationFrame(() => {
                isAutoScrolling = true;
            });
        } else {
            // Add delay when scrolling up
            userScrollTimeout = setTimeout(() => {
                isAutoScrolling = true;
            }, 100);
        }
    }, { passive: true });

    /* Make sure the video is 'activated' on iOS */
    function once(el, event, fn, opts) {
        var onceFn = function (e) {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
        };
        el.addEventListener(event, onceFn, opts);
        return onceFn;
    }

    once(document.documentElement, "touchstart", function (e) {
        console.log("Touch start - activating video");
        video.play();
        video.pause();
    });

    console.log("Registering GSAP ScrollTrigger plugin...");
    gsap.registerPlugin(ScrollTrigger);

    video.addEventListener('loadedmetadata', () => {
        console.log("Video metadata loaded! Duration:", video.duration);
        
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                onUpdate: (self) => {
                    console.log("ScrollTrigger progress:", self.progress.toFixed(3));
                },
                onStart: () => {
                    console.log("🎬 ScrollTrigger started!");
                },
                onComplete: () => {
                    console.log("🎬 ScrollTrigger completed!");
                }
            }
        });

        tl.fromTo(
            video,
            {
                currentTime: 0
            },
            {
                currentTime: video.duration || 1,
                ease: "none"
            }
        );
        console.log("Timeline animation added!");

        // Add text box animations
        const text1 = document.getElementById('text1');
        const text2 = document.getElementById('text2');
        const text3 = document.getElementById('text3');

        // Show all text boxes in the last 5% of scroll
        window.addEventListener('scroll', () => {
            if (!hasStarted) return;  // Ignore scroll events before start
            const scrollPercentage = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            if (scrollPercentage >= 0.96) {
                text1.classList.add('visible', 'final-position');
                text2.classList.add('visible', 'final-position');
                text3.classList.add('visible', 'final-position');
            } else {
                text1.classList.remove('final-position');
                text2.classList.remove('final-position');
                text3.classList.remove('final-position');
            }
        });

        // Text 1 appears at 20% of scroll progress, stays visible in last 5%
        gsap.to(text1, {
            scrollTrigger: {
                trigger: "body",
                start: "20% top",
                end: "30% top",
                scrub: 0,
                onEnter: () => hasStarted && text1.classList.add('visible'),
                onLeave: () => {
                    if (!hasStarted) return;
                    if (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) < 0.95) {
                        text1.classList.remove('visible');
                    }
                },
                onEnterBack: () => hasStarted && text1.classList.add('visible'),
                onLeaveBack: () => hasStarted && text1.classList.remove('visible')
            }
        });

        // Text 2 appears at 50% of scroll progress, stays visible in last 5%
        gsap.to(text2, {
            scrollTrigger: {
                trigger: "body",
                start: "50% top",
                end: "60% top",
                scrub: 0,
                onEnter: () => hasStarted && text2.classList.add('visible'),
                onLeave: () => {
                    if (!hasStarted) return;
                    if (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) < 0.95) {
                        text2.classList.remove('visible');
                    }
                },
                onEnterBack: () => hasStarted && text2.classList.add('visible'),
                onLeaveBack: () => hasStarted && text2.classList.remove('visible')
            }
        });

        // Text 3 appears at 80% of scroll progress, stays visible in last 5%
        gsap.to(text3, {
            scrollTrigger: {
                trigger: "body",
                start: "80% top",
                end: "90% top",
                scrub: 0,
                onEnter: () => hasStarted && text3.classList.add('visible'),
                onLeave: () => {
                    if (!hasStarted) return;
                    if (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) < 0.95) {
                        text3.classList.remove('visible');
                    }
                },
                onEnterBack: () => hasStarted && text3.classList.add('visible'),
                onLeaveBack: () => hasStarted && text3.classList.remove('visible')
            }
        });

        // Final header animation
        const finalHeader = document.querySelector('.final-header');
        
        // Show final header in the last 5% of scroll
        window.addEventListener('scroll', () => {
            if (!hasStarted) return;  // Ignore scroll events before start
            const scrollPercentage = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            if (scrollPercentage >= 0.96) {
                finalHeader.classList.add('visible');
            } else {
                finalHeader.classList.remove('visible');
            }
        });

        // Also add GSAP animation for smoother control
        gsap.to(finalHeader, {
            scrollTrigger: {
                trigger: "body",
                start: "95% top",
                end: "bottom bottom",
                scrub: 0.5,
                onEnter: () => hasStarted && finalHeader.classList.add('visible'),
                onLeave: () => hasStarted && finalHeader.classList.remove('visible'),
                onEnterBack: () => hasStarted && finalHeader.classList.add('visible'),
                onLeaveBack: () => hasStarted && finalHeader.classList.remove('visible')
            }
        });
    });

    /*!
     * © This code was written by Nicolai Palmkvist.
     * For more information, visit my Elementor Youtube channel: https://www.youtube.com/@nicopalmkvist
     */

    setTimeout(function () {
        console.log("Starting blob URL conversion...");
        if (window["fetch"]) {
            fetch(src)
                .then((response) => {
                    console.log("Fetch response:", response);
                    return response.blob();
                })
                .then((response) => {
                    console.log("Blob created:", response);
                    var blobURL = URL.createObjectURL(response);

                    var t = video.currentTime;
                    once(document.documentElement, "touchstart", function (e) {
                        video.play();
                        video.pause();
                    });

                    video.setAttribute("src", blobURL);
                    video.currentTime = t + 0.01;
                    console.log("Video source updated to blob URL");
                })
                .catch((error) => {
                    console.error("Error in fetch:", error);
                });
        } else {
            console.log("Fetch not available");
        }
    }, 1000);
}); 