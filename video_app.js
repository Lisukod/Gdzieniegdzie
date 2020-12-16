const vid_01 = document.getElementById("video_01");
const vid_02 = document.getElementById("video_02");
const vid_03 = document.getElementById("video_03");
const vid_04 = document.getElementById("video_04");
const vid_05 = document.getElementById("video_05");
const vid_06 = document.getElementById("video_06");
let now_playing

function playVid(video_id) {
    if (typeof(now_playing) == "undefined") {
        document.getElementById("black_box").classList.add("video-hidden")
        now_playing = video_id
        video_id.classList.toggle("video-hidden")
    } 
    
    if (now_playing == video_id) {
        if (video_id.paused){
            video_id.currentTime = 0
            video_id.play();
        } else {
            // video_id.pause();
            }
    } else {
        video_id.currentTime = 0
        video_id.play();
        video_id.volume = 0;
        now_playing.classList.toggle("video-hidden")
        video_id.classList.toggle("video-hidden")
        let vol_down = 10;
        let vol_up = 0;
        let fadeout = setInterval(
            function() {
                now_playing.volume = vol_down / 10;
                video_id.volume = vol_up / 10;
                vol_down --;
                vol_up ++;
                if (vol_down < 0) {
                    clearInterval(fadeout)
                    now_playing.pause();
                    now_playing = video_id
                }
            }, 25);
    }
}

function stopVid() {
    if (typeof(now_playing) == "undefined"){
        return
    } else {
        now_playing.pause()
    }
}

function continueVid() {
    if (typeof(now_playing) == "undefined"){
        return
    } else {
        now_playing.play()
    }
}