$(document).ready(function() {
    console.log("Document ready!");
    console.clear();
    $('video').addClass('video-background');

    const video = document.querySelector(".video-background");
    let src = video.currentSrc || video.src;
    console.log("Video element:", video);
    console.log("Video source:", src);

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

        // Text 1 appears at 20% of scroll progress
        gsap.to(text1, {
            scrollTrigger: {
                trigger: "body",
                start: "20% top",
                end: "30% top",
                scrub: 0,
                onEnter: () => text1.classList.add('visible'),
                onLeave: () => text1.classList.remove('visible'),
                onEnterBack: () => text1.classList.add('visible'),
                onLeaveBack: () => text1.classList.remove('visible')
            }
        });

        // Text 2 appears at 50% of scroll progress
        gsap.to(text2, {
            scrollTrigger: {
                trigger: "body",
                start: "50% top",
                end: "60% top",
                scrub: 0,
                onEnter: () => text2.classList.add('visible'),
                onLeave: () => text2.classList.remove('visible'),
                onEnterBack: () => text2.classList.add('visible'),
                onLeaveBack: () => text2.classList.remove('visible')
            }
        });

        // Text 3 appears at 80% of scroll progress
        gsap.to(text3, {
            scrollTrigger: {
                trigger: "body",
                start: "80% top",
                end: "90% top",
                scrub: 0,
                onEnter: () => text3.classList.add('visible'),
                onLeave: () => text3.classList.remove('visible'),
                onEnterBack: () => text3.classList.add('visible'),
                onLeaveBack: () => text3.classList.remove('visible')
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