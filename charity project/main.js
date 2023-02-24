    let container = document.querySelector(".video-link");
    let isVideoShown = false;
    let addVideo = function(link) {
    
    if (isVideoShown == false) {
    let newVideo = document.createElement("video");
    let newSrc = document.createElement("source");
    newVideo.appendChild(newSrc);       
    container.appendChild(newVideo);
    newVideo.setAttribute("width","500px");
    newVideo.setAttribute("id","createdVideo");
    newVideo.setAttribute("controls","");
    newSrc.setAttribute("src",link);    
    isVideoShown = true;    
    }   else if(isVideoShown == true) {
    let removeWhat = document.getElementById('createdVideo');
    removeWhat.remove();
    isVideoShown = false;       
    }
} 