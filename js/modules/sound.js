const audioPlayerWrapper = document.querySelector("#audio-player");
const audioPlayer = document.querySelector("#audio-player-element");
const musicLabel = document.querySelector("#music-label");
const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");

//class for managing current track index, changing track next/prev and updating the label accordingly
class SoundController {
    #index = null;

    constructor() {
        this.#index = 0;
    }

    composeTrackName() {
        return `res/sound/music/track${this.#index}.mp3`;
    }

    //duplicate code for both next track and prev track
    changeTrack() {
        const trackName = this.composeTrackName();
        console.log(`Setting the track to: ${trackName}`);
        audioPlayer.src = trackName;
        audioPlayer.load();

        this.updateAudioLabel(trackName);
    }

    //revolves index positevly
    nextTrack() {
        this.#index++;
        if (this.#index == 6) {
            this.#index = 1;
        }
        this.changeTrack();
    }

    //revolves index negatively
    previousTrack() {
        if (this.#index <= 1) {
            this.#index = 5;
        } else {
            this.#index--;
        }
        this.changeTrack();
    }

    //updates audio label to match the name of the track
    updateAudioLabel(trackName) {
        trackName = trackName.split("/").pop();
        musicLabel.textContent = trackName;
    }
}

const soundController = new SoundController();
let playingOnHide = false;

// stops the music when website is hidden, also changes document title to grab attention
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "Come back!";
        playingOnHide = !audioPlayer.paused;
        audioPlayer.pause();
    } else {
        document.title = "Battleships";
        if (playingOnHide) {
            audioPlayer.play();
        }
    }
});

nextButton.addEventListener("click", (e) => {
    soundController.nextTrack();
});
prevButton.addEventListener("click", (e) => {
    soundController.previousTrack();
});
