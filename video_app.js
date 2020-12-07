const vid_01 = document.getElementById("video_01");
const vid_02 = document.getElementById("video_02");
const vid_03 = document.getElementById("video_03");
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
            video_id.pause();
            }
    } else {
        now_playing.pause();
        video_id.currentTime = 0
        video_id.play();
        now_playing.classList.toggle("video-hidden")
        video_id.classList.toggle("video-hidden")
        now_playing = video_id
    }
}