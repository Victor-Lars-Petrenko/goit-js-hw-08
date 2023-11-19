import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');

const player = new Player(iframe);

try {
    const currentTime = JSON.parse(localStorage.getItem("videoplayer-current-time")) ?? 0;
    player.setCurrentTime(currentTime);
} catch {}

player.on('timeupdate', throttle(evt => {
        try {
            const timeToSave = JSON.stringify(evt.seconds);
            localStorage.setItem("videoplayer-current-time", timeToSave);
        } catch {}
    }, 1000)
);