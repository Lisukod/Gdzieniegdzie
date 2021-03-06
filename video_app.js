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

//Video app

let vid_queue = [];
let queueCounter = 0;
let now_playing;
let loop_counter = 0;

function playVid(video) {
    if (now_playing == undefined) {
        document.getElementById("black_box").classList.add("video-hidden");
    } else {
        now_playing.classList.toggle("video-hidden");
    }
    now_playing = video;
    now_playing.classList.toggle("video-hidden");
    now_playing.currentTime = 0;
    now_playing.play();
}

function pauseVid() {
    document.getElementById("play_button").setAttribute("onclick", "continueVid()");
    now_playing.pause();
}

function continueVid() {
    document.getElementById("play_button").setAttribute("onclick", "playVid()");
    now_playing.play();
}

function stopQueue() {
    now_playing.classList.toggle("video-hidden");
    now_playing.pause();
    now_playing = undefined;
    queueCounter = 0;
    document.getElementById("black_box").classList.remove("video-hidden");
    document.getElementById("play_button").setAttribute("onclick", "playQueue()");
}

function playQueue() {
    if(vid_queue.length == 0)   return;
    if(vid_queue[queueCounter] == undefined){
        now_playing.removeEventListener('ended', playQueue);
        stopQueue();
        return;
    };
    playVid(vid_queue[queueCounter]);
    queueCounter++;
    now_playing.addEventListener('ended', playQueue)
    document.getElementById("play_button").setAttribute("onclick", "none");
}

//KeyDownListener
document.addEventListener('keydown', event => {
    switch (event.key) {
        case '1':
            addVidToBar(vids[0], '01');
            break;
        case '2':
            addVidToBar(vids[1], '02');
            break;
        case '3':
            addVidToBar(vids[2], '03');
            break;
        case '4':
            addVidToBar(vids[3], '04');
            break;
        case '5':
            addVidToBar(vids[4], '05');
            break;
        case '6':
            addVidToBar(vids[5], '06');
            break;
        case '7':
            addVidToBar(vids[6], '07');
            break;
        case '8':
            addVidToBar(vids[7], '08');
            break;
        case '9':
            addVidToBar(vids[8], '09');
            break;
        case 'q':
            addVidToBar(vids[9], '10');
            break;
        case 'w':
            addVidToBar(vids[10], '11');
            break;
        case 'e':
            addVidToBar(vids[11], '12');
            break;
        case 'r':
            addVidToBar(vids[12], '13');
            break;
        case 't':
            addVidToBar(vids[13], '14');
            break;      
    }
})

//Progres bar


function addVidToBar(sent_vid, vid_num) {
    loop_counter++;
    vid_queue.push(sent_vid);
    const progressBar = document.getElementById('point_container')

    const newSongDiv = document.createElement("div");
    newSongDiv.setAttribute('class', 'test-point vid-num-' + vid_num);
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

    newSongSpan.appendChild(backButton);
    newSongSpan.appendChild(deleteButton);
    newSongSpan.appendChild(forwardButton);
}

function removeFromBar(elem) {
    const elem_id = elem.id;
    let next_sibling = elem.nextElementSibling;
    vid_queue.splice(Number(elem.id)-1, 1);
    while (next_sibling != null) {
        next_sibling.id = Number(next_sibling.id) - 1;
        next_sibling = next_sibling.nextElementSibling;
    }
    elem.remove();
    loop_counter--;
    stopQueue();
}

function moveFurther(elem) {
    let next_sibling = elem.nextElementSibling;
    if (next_sibling == null)
        return;
    elem.parentNode.insertBefore(next_sibling, elem);
    [vid_queue[Number(elem.id)-1], vid_queue[Number(next_sibling.id)-1]] = [vid_queue[Number(next_sibling.id)-1], vid_queue[Number(elem.id)-1]];
    [elem.id, next_sibling.id] = [next_sibling.id, elem.id];
    stopQueue();
}

function moveBack(elem) {
    let previous_sibling = elem.previousSibling;
    if (previous_sibling == null)
        return;
    elem.parentNode.insertBefore(elem, previous_sibling);
    [vid_queue[Number(elem.id)-1], vid_queue[Number(previous_sibling.id)-1]] = [vid_queue[Number(previous_sibling.id)-1], vid_queue[Number(elem.id)-1]];
    [elem.id, previous_sibling.id] = [previous_sibling.id, elem.id];
    stopQueue();
}