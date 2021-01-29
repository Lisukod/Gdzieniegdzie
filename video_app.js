const vids = [
    document.getElementById("video_01"),
    document.getElementById("video_02"),
    document.getElementById("video_03"),
    document.getElementById("video_04"),
    document.getElementById("video_05"),
    document.getElementById("video_06"),
    document.getElementById("video_07"),
    document.getElementById("video_08"),
    document.getElementById("video_09"),
    document.getElementById("video_10"),
    document.getElementById("video_11"),
    document.getElementById("video_12"),
    document.getElementById("video_13"),
    document.getElementById("video_14")
]

let now_playing
let vids_loaded = false

function isLoaded() {
    let videoLoad = setInterval(
        function(){
            for (let i = 0; i < vids.length; i++) {
                if (vids[i] == 4) {
                    continue
                } else {
                    i--
                }
            }
            vids_loaded = true;
        }
    , 250)
    clearInterval(videoLoad)
}

// isLoaded()
function playVid(video_id) {
    if (vids_loaded == false){
        isLoaded()
    }
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

//Progres bar

const vid_in_loop = [];
var loop_counter = 0 

function addVidToBar(sent_vid, vid_num) {
    loop_counter++;
    vid_in_loop.push(sent_vid);
    const progressBar = document.getElementById('point_container') 

    const newSongDiv = document.createElement("div");
    newSongDiv.setAttribute('class','test-point vid-num-' + vid_num);
    newSongDiv.setAttribute('id', loop_counter);
    progressBar.appendChild(newSongDiv);

    const newSongSpan = document.createElement('span');
    newSongSpan.setAttribute('class', 'element-control-buttons')
    newSongDiv.appendChild(newSongSpan);

    const backButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const forwardButton = document.createElement('button');

    backButton.setAttribute('onClick', 'moveBack(this.parentNode.parentNode);')
    deleteButton.setAttribute('onClick', 'removeFromBar(this.parentNode.parentNode);')
    forwardButton.setAttribute('onClick', 'moveFurther(this.parentNode.parentNode);')
    
    backButton.innerHTML = '<';
    deleteButton.innerHTML = 'X';
    forwardButton.innerHTML = '>';
    
    newSongSpan.appendChild(backButton);
    newSongSpan.appendChild(deleteButton);
    newSongSpan.appendChild(forwardButton);
}

function removeFromBar(elem) {
    const elem_id = elem.id;
    let next_sibling = elem.nextElementSibling;
    while(next_sibling != null){
        next_sibling.id = Number(next_sibling.id) -1;
        next_sibling = next_sibling.nextElementSibling;
    }
    elem.remove();
    loop_counter--;
}

function moveFurther(elem) {
    const elem_id = elem.id;
    let next_sibling = elem.nextElementSibling;
    if(next_sibling == null)
        return;
    elem.parentNode.insertBefore(next_sibling, elem);
    elem.id = Number(elem_id)++;
    next_sibling.id = elem_id;
}

function moveBack(elem){
    const elem_id = elem.id;
    let previous_sibling = elem.previousSibling;
    if(previous_sibling == null)
        return;
    elem.parentNode.insertBefore(elem, previous_sibling);
    elem.id = Number(elem_id)--;
    previous_sibling.id = elem_id;
}