document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ELEMENT
    ====================================== */

    const startButton = document.getElementById("startButton");
    const opening = document.getElementById("opening");
    const bgMusic = document.getElementById("bgMusic");
    const memoryCover = document.getElementById("memoryCover");

    const book = document.getElementById("book");
    const cover = document.getElementById("cover");
    const openBook = document.getElementById("openBook");

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const navigation = document.getElementById("navigation");
    const endingPage = document.getElementById("endingPage");
    const continueBtn = document.getElementById("continueBtn");
    
    const countdownSection = document.getElementById("countdownSection");
    const countdownCard = document.querySelector(".countdown-card");
    const secondNumber = document.getElementById("seconds");
    const photoPopup = document.getElementById("photoPopup");
    const photoFrame = document.getElementById("photoFrame");
    const videoBtn = document.getElementById("videoBtn");

    const videoSection = document.getElementById("videoSection");
    const memoryVideo = document.getElementById("memoryVideo");

    const endingBtn = document.getElementById("endingBtn");
    const endingSection = document.getElementById("endingSection");

    const claimGiftBtn = document.getElementById("claimGiftBtn");
    const closeGiftBtn = document.getElementById("closeGiftBtn");
    const giftOverlay = document.getElementById("giftOverlay");

    videoBtn.style.display = "none";

    const sheets = document.querySelectorAll(".sheet");

    let currentPage = 0;
    let opened = false;

    function playMusic() {
        bgMusic.play();
    }

    function pauseMusic() {
        bgMusic.pause();
    }

    /* ======================================
       OPENING SCREEN
    ====================================== */

    startButton.addEventListener("click", () => {

        startButton.disabled = true;

        if (typeof playMusic === "function") {
            playMusic();
        }

        opening.classList.add("transition-out");

        setTimeout(() => {

            opening.classList.remove("active");
            memoryCover.classList.add("active");

        }, 1400);

    });

    /* ======================================
       OPEN BOOK
    ====================================== */

    openBook.addEventListener("click", () => {

        if (opened) return;

        opened = true;

        book.classList.add("open");

        setTimeout(() => {
            navigation.classList.add("show");
        }, 1900);

        // tombol hati menghilang
        openBook.style.opacity = "0";
        openBook.style.pointerEvents = "none";

        // tulisan klik hati ikut hilang
        const text = document.querySelector(".cover-content p");

        if (text) {
            text.style.opacity = "0";
        }

        // setelah cover selesai membuka
        setTimeout(() => {

            cover.style.pointerEvents = "none";

        }, 1600);

    });

    /* ======================================
       NEXT PAGE
    ====================================== */

    nextBtn.addEventListener("click", () => {

        if (!opened) return;

        if(currentPage === sheets.length - 1){

            navigation.style.opacity = "0";
            navigation.style.pointerEvents = "none";

            continueBtn.classList.add("show");

            return;

        }

        sheets[currentPage].classList.add("flipped");

        currentPage++;

        updateZIndex();

    });

    /* ======================================
       PREVIOUS PAGE
    ====================================== */

    prevBtn.addEventListener("click", () => {

        if (!opened) return;

        if (currentPage <= 0)
            return;

        currentPage--;

        sheets[currentPage].classList.remove("flipped");

        updateZIndex();

    });

    continueBtn.addEventListener("click", () => {

        document.body.classList.add("page-leave");

        setTimeout(() => {

            memoryCover.classList.remove("active");
            countdownSection.classList.add("active");

            document.body.classList.remove("page-leave");

            startCountdown();

        }, 800);

    });

    window.addEventListener("load",()=>{

        document.body.classList.add("show");

    });

    /* ======================================
       UPDATE Z INDEX
    ====================================== */

    function updateZIndex() {

        sheets.forEach((sheet, index) => {

            if (index < currentPage) {

                sheet.style.zIndex = index + 1;

            } else {

                sheet.style.zIndex = sheets.length - index;

            }

        });

    }

    updateZIndex();

    function startCountdown(){

        let time = 10;

        secondNumber.textContent = "10";

        // Tombol benar-benar disembunyikan
        videoBtn.style.display = "none";

        const countdown = setInterval(() => {

            secondNumber.textContent =
                String(time).padStart(2, "0");

            if(time === 0){

                clearInterval(countdown);

                showSurprise();

                return;
            }

            time--;

        }, 1000);

    }

    function showSurprise(){

        countdownCard.classList.add("hide");

        currentPhoto = 0;

        photoFrame.src = photos[currentPhoto];

        // Tetap sembunyikan tombol
        videoBtn.style.display = "none";

        setTimeout(() => {

            launchConfetti();

            photoPopup.classList.add("show");

            startSlideshow();

            // Tunggu 5 detik SETELAH foto muncul
            setTimeout(() => {

                videoBtn.style.display = "block";

            }, 5000);

        }, 700);

    }

    function startSlideshow(){

        setInterval(()=>{

            // Fade Out
            photoFrame.classList.add("fade");

            setTimeout(()=>{

                currentPhoto++;

                if(currentPhoto >= photos.length){

                    currentPhoto = 0;

                }

                photoFrame.src = photos[currentPhoto];

                // Fade In
                photoFrame.classList.remove("fade");

            },500);

        },2000);

    }

    const myConfetti = confetti.create(
        document.getElementById("confetti-canvas"),
        {
            resize:true,
            useWorker:true
        }
    );

    function launchConfetti(){

        myConfetti({
            particleCount: 120,
            angle: 60,
            spread: 70,
            origin: {
                x: 0,
                y: 0.7
            }
        });

        myConfetti({
            particleCount: 120,
            angle: 120,
            spread: 70,
            origin: {
                x: 1,
                y: 0.7
            }
        });

    }

    videoBtn.addEventListener("click", () => {

        console.log("Tombol Lanjut diklik");

        videoBtn.style.display = "none";

        countdownSection.classList.remove("active");

        videoSection.classList.add("active");

        memoryVideo.style.display = "block";

        memoryVideo.currentTime = 0;

        pauseMusic();

        memoryVideo.play();

    });

    const photos = [

        "assets/images/0.jpeg",
        "assets/images/1.jpeg",
        "assets/images/2.jpeg",
        "assets/images/3.jpeg",
        "assets/images/4.jpeg",
        "assets/images/5.jpeg",
        "assets/images/6.jpeg",
        "assets/images/7.jpeg",
        "assets/images/8.jpeg",
        "assets/images/9.jpeg"

    ];

    let currentPhoto = 0;

});

endingBtn.addEventListener("click", () => {

    videoSection.classList.remove("active");

    endingSection.classList.add("active");

    memoryVideo.pause();

    playMusic();

});

claimGiftBtn.addEventListener("click", () => {

    giftOverlay.classList.add("show");

});

closeGiftBtn.addEventListener("click", () => {

    giftOverlay.classList.remove("show");

});