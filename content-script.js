const newPageLoad = async (video_ID) => {
    console.log(video_ID);
    const videoData = {
        video_ID: video_ID,
        duration: document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar").ariaValueMax,
    }
console.log(videoData);

    //crear la progress bar
    const progressBar = document.createElement("div");
    progressBar.classList.add("ytp-progress-bar");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", videoData.duration);
    progressBar.setAttribute("id", "VIDEO"+videoData.video_ID);

    //agregar la progress bar debajo del video
    document.querySelector("#info-contents").appendChild(progressBar);


    //obtener anotaciones de este video en particular
    const annotations = await getSotagedAnnotations(video_ID);

    if (annotations) {
        console.log(annotations);
        //crear para cada anotacion un elemento en la progress bar con el respectivo tiempo



    }

    //crear botones de anotaciones
    const button = document.createElement("button");
    button.classList.add("ytp-button");

    const buttonIcon = document.createElement("span");
    buttonIcon.classList.add("ytp-button-icon");

    const buttonText = document.createElement("span");
    buttonText.classList.add("ytp-button-content");
    buttonText.innerText = "Anotar";

    button.appendChild(buttonIcon);
    button.appendChild(buttonText);

    document.getElementById("VIDEO"+videoData.video_ID).appendChild(button);

    button.addEventListener("click", () => {
        console.log("click");
        console.log(videoData);
        console.log(annotations);
        chrome.runtime.sendMessage({
            type: "open_popup",
            videoData: videoData,
            annotations: annotations
        });
    }
    );
    
    
}

const getSotagedAnnotations = async (video_ID) => {
    const annotations = await chrome.storage.local.get(video_ID);
    return annotations;
}



newPageLoad(video_ID);