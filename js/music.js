const music = document.getElementById("bgMusic");

function playMusic() {

    music.volume = 0;

    music.play();

    let volume = 0;

    const fade = setInterval(() => {

        if (volume < 0.4) {

            volume += 0.02;

            music.volume = volume;

        } else {

            clearInterval(fade);

        }

    }, 120);

}