const vid_01 = document.getElementById("video_01");
const vid_02 = document.getElementById("video_02");
const vid_03 = document.getElementById("video_03");
let now_playing

// let fadeout = setInterval(
//     function() {
//         if (now_playing.volume > 0) {
//             now_playing.volume -= vol;
//             video_id.volume += vol
//         }
//         else {
//             clearInterval(fadeout);
//         }
//     }, interval);

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
            video_id.pause();
            }
    } else {
        // video_id.currentTime = 0
        video_id.play();
        video_id.volume = 0;
        now_playing.classList.toggle("video-hidden")
        video_id.classList.toggle("video-hidden")
        let vol_down = 10;
        let vol_up = 0;
        let fadeout = setInterval(
            function() {
                console.log(vol_down)
                now_playing.volume = vol_down / 10;
                video_id.volume = vol_up / 10;
                vol_down --;
                vol_up ++;
                if (vol_down < 0) {
                    console.log("clear")
                    clearInterval(fadeout)
                    now_playing.pause();
                    now_playing = video_id
                }
            }, 25);
        console.log("zatrzymany")
        
    }
}
