chrome.webNavigation["onCompleted"].addListener(function(o) {
        // console.log("onCompleted2");
        // console.log(o);
        if (o.url.includes("watch?v=")) {
            let video_ID = o.url.split("watch?v=")[1];
            if(video_ID.includes("&")){
                video_ID = video_ID.split("&")[0];
            }
            chrome.scripting.executeScript({
                target: { tabId: o.tabId },
                // run_at: 'document_end',
                function: run,
              });
        }
    }, {
        url: [{
        hostSuffix: '.youtube.com',
        pathPrefix: '/watch',
    }]
});
  
function run(){
    const myInterval = setInterval(myTimer, 1000);

    function myTimer() {
        if(document.getElementById("primary-inner")){
            clearInterval(myInterval);
            newPageLoad();
        }
        // console.log("waiting for page to load");
    }
    let videoData = {
        video_ID: "",
        duration: 0
    }
    const newPageLoad = async () => {
        let video_ID = document.URL.split("watch?v=")[1];
        if(video_ID.includes("&")){
            video_ID = video_ID.split("&")[0];
        }
        // console.log(video_ID);

        videoData.video_ID = video_ID;
        videoData.duration = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar").ariaValueMax;
    // console.log(videoData);


        let contenedorDeTodo = document.createElement("div");
        contenedorDeTodo.setAttribute("class","style-scope ytd-watch-flexy")
        contenedorDeTodo.id = "contenedorDeTodo";
        contenedorDeTodo.style.paddingTop = "8px";
        contenedorDeTodo.style.paddingBottom = "8px";

        let contenedorDeAnnotations = document.createElement("div");
        contenedorDeAnnotations.id = "contenedorDeAnnotations";

            let contenedorProgressBar = document.createElement("div");
            contenedorProgressBar.id = "contenedorProgressBar";
            contenedorProgressBar.style.position = "relative";
            contenedorProgressBar.style.width = "100%";
            contenedorProgressBar.style.height = "30px";
            contenedorProgressBar.style.backgroundColor = "#52525230";
            contenedorProgressBar.style.borderRadius = "5px";
            contenedorProgressBar.style.paddingLeft = "8px";
            contenedorProgressBar.style.paddingRight = "8px";
            // contenedorProgressBar.style.cursor = "pointer";
            // contenedorProgressBar.style.opacity = "0.3";

            //     let floatTimer = document.createElement("div");
            //     floatTimer.id = "floatTimer";
            //     floatTimer.style.position = "absolute";
            //     floatTimer.style.top = "0px";
            //     floatTimer.style.left = "0px"; //esto va a ir variando
            //     floatTimer.style.width = "10px";
            //     floatTimer.style.height = "30px";
            //     floatTimer.style.backgroundColor = "grey";
            //     floatTimer.style.opacity = "0.3";


            // contenedorProgressBar.appendChild(floatTimer);

            // contenedorProgressBar.addEventListener("mousemove", function(e){
                // console.log("mouseover", (e.clientX-32));
            //     floatTimer.style.display = "block";
            //     floatTimer.style.left = (e.clientX-16) + "px";
            // });
            // contenedorProgressBar.addEventListener("mouseleave", function(e){
                // console.log("mouseleave");
            //     floatTimer.style.display = "none";
            // });

            let contenedorInfoAnnotations = document.createElement("div");
            contenedorInfoAnnotations.id = "contenedorInfoAnnotations";
            contenedorInfoAnnotations.style.position = "relative";
            contenedorInfoAnnotations.style.width = "100%";
            contenedorInfoAnnotations.style.display = "inline-block";
            contenedorInfoAnnotations.style.paddingLeft = "8px";
            contenedorInfoAnnotations.style.paddingRight = "8px";
            contenedorInfoAnnotations.style.paddingTop = "8px";
            contenedorInfoAnnotations.style.paddingBottom = "8px";
                
                let annotationTitle = document.createElement("h1");
                annotationTitle.id = "annotationTitle";
                annotationTitle.style.fontSize = "20px";
                annotationTitle.style.fontWeight = "bold";
                annotationTitle.style.color = "white";
                annotationTitle.style.margin = "0px";
                annotationTitle.style.padding = "0px";
                annotationTitle.style.textAlign = "left";
                annotationTitle.style.display = "none";
                annotationTitle.innerText = "Select an annotation";
            
                let annotationDescription = document.createElement("p");
                annotationDescription.id = "annotationDescription";
                annotationDescription.style.fontSize = "14px";
                annotationDescription.style.color = "white";
                annotationDescription.style.margin = "0px";
                annotationDescription.style.padding = "0px";
                annotationDescription.style.textAlign = "left";
                annotationDescription.style.display = "none";
                annotationDescription.innerText = "Select an annotation";

                let annotationTime = document.createElement("p");
                annotationTime.id = "annotationTime";
                annotationTime.style.fontSize = "14px";
                annotationTime.style.color = "white";
                annotationTime.style.margin = "0px";
                annotationTime.style.padding = "0px";
                annotationTime.style.textAlign = "left";
                annotationTime.style.display = "none";
                annotationTime.innerText = "00:00";

            contenedorInfoAnnotations.appendChild(annotationTitle);
            contenedorInfoAnnotations.appendChild(annotationDescription);
            contenedorInfoAnnotations.appendChild(annotationTime);

        contenedorDeAnnotations.appendChild(contenedorProgressBar);
        contenedorDeAnnotations.appendChild(contenedorInfoAnnotations);


        let contenedorButtons = document.createElement("div");
        contenedorButtons.id = "contenedorButtons";
        contenedorButtons.style.position = "relative";
        contenedorButtons.style.width = "100%";
        contenedorButtons.style.display = "inline-block";

            let buttonAdd = document.createElement("button");
            buttonAdd.id = "buttonAdd";
            buttonAdd.style.padding = "8px";
            buttonAdd.style.marginRight = "5px";
            buttonAdd.style.backgroundColor = "#525252";
            buttonAdd.style.color = "white";
            buttonAdd.style.border = "0px solid black";
            buttonAdd.style.borderRadius = "5px";
            buttonAdd.style.cursor = "pointer";
            buttonAdd.style.opacity = "0.8";
            buttonAdd.innerText = "Add annotation";

            buttonAdd.addEventListener("click", function(){
                showAddInputs();
            });

            let buttonCreate = document.createElement("button");
            buttonCreate.id = "buttonCreate";
            buttonCreate.style.padding = "8px";
            buttonCreate.style.marginRight = "5px";
            buttonCreate.style.backgroundColor = "#525252";
            buttonCreate.style.color = "white";
            buttonCreate.style.border = "0px solid black";
            buttonCreate.style.borderRadius = "5px";
            buttonCreate.style.opacity = "0.8";
            buttonCreate.style.cursor = "pointer";
            buttonCreate.style.display = "none";
            buttonCreate.innerText = "Create";

            buttonCreate.addEventListener("click", function(){
                let currentTime = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar").ariaValueNow;
                annotationSaver(document.getElementById("inputTitle").value, document.getElementById("inputDescription").value, currentTime);
            });


            let buttonUpdate = document.createElement("button");
            buttonUpdate.id = "buttonUpdate";
            buttonUpdate.style.padding = "8px";
            buttonUpdate.style.marginRight = "5px";
            buttonUpdate.style.backgroundColor = "#525252";
            buttonUpdate.style.color = "white";
            buttonUpdate.style.border = "0px solid black";
            buttonUpdate.style.borderRadius = "5px";
            buttonUpdate.style.opacity = "0.8";
            buttonUpdate.style.display = "none";
            buttonUpdate.style.cursor = "pointer";
            buttonUpdate.innerText = "Update";

            buttonUpdate.addEventListener("click", function(){
                handleUpdate();
            });

            let buttonClose = document.createElement("button");
            buttonClose.id = "buttonClose";
            buttonClose.style.padding = "8px";
            buttonClose.style.marginRight = "5px";
            buttonClose.style.backgroundColor = "#525252";
            buttonClose.style.color = "white";
            buttonClose.style.border = "0px solid black";
            buttonClose.style.borderRadius = "5px";
            buttonClose.style.opacity = "0.8";
            buttonClose.style.display = "none";
            buttonClose.style.cursor = "pointer";
            buttonClose.innerText = "Close";

            buttonClose.addEventListener("click", function(){
                hideInputs();
            });

            let buttonRemove = document.createElement("button");
            buttonRemove.id = "buttonRemove";
            buttonRemove.style.padding = "8px";
            buttonRemove.style.backgroundColor = "#f73e3e";
            buttonRemove.style.color = "white";
            buttonRemove.style.border = "0px solid black";
            buttonRemove.style.borderRadius = "5px";
            buttonRemove.style.opacity = "0.8";
            buttonRemove.style.display = "none";
            buttonRemove.style.cursor = "pointer";
            buttonRemove.innerText = "Remove";

            buttonRemove.addEventListener("click", function(){
                annotationRemover();
            });

        contenedorButtons.appendChild(buttonAdd);
        contenedorButtons.appendChild(buttonCreate);
        contenedorButtons.appendChild(buttonUpdate);
        contenedorButtons.appendChild(buttonClose);
        contenedorButtons.appendChild(buttonRemove);

        let contenedorDeInputs = document.createElement("div");
        contenedorDeInputs.id = "contenedorDeInputs";
        contenedorDeInputs.style.display = "none";
        contenedorDeInputs.style.position = "relative";
        contenedorDeInputs.style.width = "100%";
        contenedorDeInputs.style.marginBottom = "5px";

            let inputTitle = document.createElement("input");
            inputTitle.id = "inputTitle";
            inputTitle.style.width = "100%";
            inputTitle.style.padding = "8px";
            inputTitle.style.margin = "0px";
            inputTitle.style.border = "0px solid black";
            inputTitle.style.borderRadius = "5px";
            inputTitle.style.opacity = "0.8";
            inputTitle.style.marginBottom = "5px";
            inputTitle.placeholder = "Title";

            let inputDescription = document.createElement("textarea");
            inputDescription.id = "inputDescription";
            inputDescription.style.width = "100%";
            inputDescription.style.padding = "8px";
            inputDescription.style.margin = "0px";
            inputDescription.style.border = "0px solid black";
            inputDescription.style.borderRadius = "5px";
            inputDescription.style.opacity = "0.8";
            inputDescription.style.marginBottom = "5px";
            inputDescription.placeholder = "Description";

            let inputTime = document.createElement("input");
            inputTime.id = "inputTime";
            inputTime.style.width = "100%";
            inputTime.style.padding = "8px";
            inputTime.style.margin = "0px";
            inputTime.style.border = "0px solid black";
            inputTime.style.borderRadius = "5px";
            inputTime.style.opacity = "0.8";
            inputTime.placeholder = "00:00";
            inputTime.setAttribute("readonly", "readonly");

            let inputAnnotationID = document.createElement("input");
            inputAnnotationID.id = "inputAnnotationID";
            inputAnnotationID.style.width = "100%";
            inputAnnotationID.style.padding = "8px";
            inputAnnotationID.style.margin = "0px";
            inputAnnotationID.style.border = "0px solid black";
            inputAnnotationID.style.borderRadius = "5px";
            inputAnnotationID.style.opacity = "0.8";
            inputAnnotationID.style.display = "none";
            inputAnnotationID.placeholder = "Annotation ID";

        contenedorDeInputs.appendChild(inputTitle);
        contenedorDeInputs.appendChild(inputDescription);
        contenedorDeInputs.appendChild(inputTime);
        contenedorDeInputs.appendChild(inputAnnotationID);




        contenedorDeTodo.appendChild(contenedorDeAnnotations);
        contenedorDeTodo.appendChild(contenedorDeInputs);
        contenedorDeTodo.appendChild(contenedorButtons);

        var parentControlsInfo = document.querySelector("#info-contents");
        parentControlsInfo.insertBefore(contenedorDeTodo, parentControlsInfo.children[0]);


        //crear botton de anotaciones
        let button = document.createElement("button");
        button.innerHTML = `<div style="width: 100%;height: 100%;"><img src="https://img.icons8.com/ios-filled/30/ffffff/note.png" style="padding:10px;"></div>`;
        button.classList.add("ytp-button");
        button.setAttribute("id", "add-note");
        button.setAttribute("title", "Add a note");

        button.addEventListener("click", () => {
            showAddInputs();
            //get current time
            // let currentTime = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar").ariaValueNow;
            // annotationSaver("TITLE", "DESCRIPTION GO HERE", currentTime);
            }
        );

        var parentControls = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls");
        parentControls.insertBefore(button, parentControls.children[0]);
        
        
        //obtener anotaciones de este video en particular
        let annotations = await chrome.storage.local.get([video_ID]);
        // console.log(annotations);
        
        if ( annotations && annotations[video_ID] && annotations[video_ID].length > 0 ) {
            for (let i = 0; i < annotations[video_ID].length; i++) {
                // agregar anotaciones al video
                annotationRender(annotations[video_ID][i]);
            }
        }else{
            // console.log("no hay anotaciones");
        }
        
    }

    const showAddInputs = () => {
        let currentTime = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar").ariaValueNow;

        let buttonAdd = document.getElementById("buttonAdd");
        let buttonCreate = document.getElementById("buttonCreate");
        let buttonUpdate = document.getElementById("buttonUpdate");
        let buttonClose = document.getElementById("buttonClose");
        let buttonRemove = document.getElementById("buttonRemove");
        
        //vaciar inputs
        let inputTitle = document.getElementById("inputTitle");
        let inputDescription = document.getElementById("inputDescription");
        let inputTime = document.getElementById("inputTime");
        let inputAnnotationID = document.getElementById("inputAnnotationID");

        inputTitle.value = "";
        inputDescription.value = "";
        inputTime.value = currentTime;
        inputAnnotationID.value = "";
        

        let contenedorDeInputs = document.getElementById("contenedorDeInputs");
        let contenedorDeAnnotations = document.getElementById("contenedorDeAnnotations");
        contenedorDeAnnotations.style.display = "none";
        contenedorDeInputs.style.display = "block";
        buttonAdd.style.display = "none";
        buttonCreate.style.display = "inline-block";
        buttonClose.style.display = "inline-block";
        buttonUpdate.style.display = "none";
        buttonRemove.style.display = "none";
    }
    const showUpdateInputs = (data) => {
        let buttonAdd = document.getElementById("buttonAdd");
        let buttonCreate = document.getElementById("buttonCreate");
        let buttonUpdate = document.getElementById("buttonUpdate");
        let buttonClose = document.getElementById("buttonClose");
        let buttonRemove = document.getElementById("buttonRemove");
        
        //vaciar inputs
        let inputTitle = document.getElementById("inputTitle");
        let inputDescription = document.getElementById("inputDescription");
        let inputTime = document.getElementById("inputTime");
        let inputAnnotationID = document.getElementById("inputAnnotationID");

        inputTitle.value = data.title;
        inputDescription.value = data.description;
        inputTime.value = data.time;
        inputAnnotationID.value = data.annotation_ID;

        let contenedorDeInputs = document.getElementById("contenedorDeInputs");
        let contenedorDeAnnotations = document.getElementById("contenedorDeAnnotations");
        
        contenedorDeAnnotations.style.display = "none";
        contenedorDeInputs.style.display = "block";
        buttonAdd.style.display = "none";
        buttonCreate.style.display = "none";
        buttonClose.style.display = "inline-block";
        buttonUpdate.style.display = "inline-block";
        buttonRemove.style.display = "inline-block";
    }
    const hideInputs = () => {
        let buttonAdd = document.getElementById("buttonAdd");
        let buttonCreate = document.getElementById("buttonCreate");
        let buttonUpdate = document.getElementById("buttonUpdate");
        let buttonClose = document.getElementById("buttonClose");
        let buttonRemove = document.getElementById("buttonRemove");
        
                //vaciar inputs
                let inputTitle = document.getElementById("inputTitle");
                let inputDescription = document.getElementById("inputDescription");
                let inputTime = document.getElementById("inputTime");
                let inputAnnotationID = document.getElementById("inputAnnotationID");
        
                inputTitle.value = "";
                inputDescription.value = "";
                inputTime.value = "";
                inputAnnotationID.value = "";

        let contenedorDeInputs = document.getElementById("contenedorDeInputs");
        let contenedorDeAnnotations = document.getElementById("contenedorDeAnnotations");

        contenedorDeAnnotations.style.display = "block";
        contenedorDeInputs.style.display = "none";
        buttonAdd.style.display = "inline-block";
        buttonCreate.style.display = "none";
        buttonClose.style.display = "none";
        buttonUpdate.style.display = "none";
        buttonRemove.style.display = "none";
    }


    const annotationSaver = async (title, description, time) => {
        const video_ID = window.location.href.split("=")[1];
        let annotations = await chrome.storage.local.get([video_ID]);
        // console.log(annotations);
        const annotation_ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const color = Math.floor(Math.random()*16777215).toString(16);
        if ( annotations && annotations[video_ID] && annotations[video_ID].length > 0 ) {
            annotations[video_ID].push({
                title,
                description,
                time,
                annotation_ID,
                color
            });
            chrome.storage.local.set({
                [video_ID]: annotations[video_ID]
            });
            annotationRender({
                title,
                description,
                time,
                annotation_ID,
                color
            });
        } else {
            chrome.storage.local.set({
                [video_ID]: [{
                    title,
                    description,
                    time,
                    annotation_ID,
                    color
                }]
            });
            annotationRender({
                title,
                description,
                time,
                annotation_ID,
                color
            });
        }

        hideInputs();
    }

    const handleUpdate = async () => {
        let title = document.getElementById("inputTitle").value;
        let description = document.getElementById("inputDescription").value;
        let time = document.getElementById("inputTime").value;
        let annotation_ID = document.getElementById("inputAnnotationID").value;

        const video_ID = window.location.href.split("=")[1];
        let annotations = await chrome.storage.local.get([video_ID]);
        // console.log(annotations);
        if ( annotations && annotations[video_ID] && annotations[video_ID].length > 0 ) {
            //update annotation in storage
            annotations[video_ID].forEach( (annotation, index) => {
                if (annotation.annotation_ID === annotation_ID) {
                    annotations[video_ID][index].title = title;
                    annotations[video_ID][index].description = description;
                    annotations[video_ID][index].time = time;
                }
            }
            );
            chrome.storage.local.set({
                [video_ID]: annotations[video_ID]
            });
            //update annotation in DOM
            let annotation = document.getElementById(annotation_ID);
            annotation.dataset.title = title;
            annotation.dataset.description = description;
            annotation.dataset.time = time;
        }

        hideInputs();
    }



    const annotationRemover = async () => {
        let annotation_ID = document.getElementById("inputAnnotationID").value;

        const video_ID = window.location.href.split("=")[1];
        let annotations = await chrome.storage.local.get([video_ID]);
        // console.log(annotations);
        if ( annotations && annotations[video_ID] && annotations[video_ID].length > 0 ) {
            const index = annotations[video_ID].findIndex(annotation => annotation.annotation_ID === annotation_ID );
            annotations[video_ID].splice(index, 1);
            chrome.storage.local.set({
                [video_ID]: annotations[video_ID]
            });
            const element = document.getElementById(annotation_ID);
            const element2 = document.getElementById(annotation_ID+"marcador");
            element.remove();
            element2.remove();
        }

        hideInputs();
    }

    const annotationRender = async (data) => {
        // console.log(data)
        const contenedor = document.createElement("div");
        contenedor.setAttribute("style",`position: absolute;top: -28px;left: ${(data.time/videoData.duration)*100}%;z-index: 20;`)
        contenedor.setAttribute("id", data.annotation_ID);
        contenedor.setAttribute("data-title", data.title);
        contenedor.setAttribute("data-description", data.description);
        contenedor.setAttribute("data-time", data.time);

        contenedor.innerHTML = `
            <div class="ytp-scrubber-button ytp-swatch-background-color" style="background-color:#${data.color};border-radius: 0px 0px 10px 10px;height: 30px;width: 8px;">
                <div class="ytp-scrubber-pull-indicator"></div>
            </div>
        `;

        document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar").appendChild(contenedor);
    
            let marcador = document.createElement("div");
                marcador.id = data.annotation_ID+"marcador";
                marcador.style.position = "absolute";
                marcador.style.top = "0px";
                marcador.style.left = (data.time/videoData.duration)*100+"%"; //esto va a ir variando
                marcador.style.width = "10px";
                marcador.style.height = "30px";
                marcador.style.backgroundColor = `#${data.color}`;
                marcador.style.opacity = "0.5";
                marcador.style.cursor = "pointer";

                marcador.addEventListener("click", () => {
                    showUpdateInputs(data);
                });
                
                marcador.addEventListener("mouseover", () => {
                    marcador.style.opacity = "1";
                    document.getElementById("annotationTitle").style.display = "block";
                    document.getElementById("annotationTitle").style.color = `#${data.color}`;
                    document.getElementById("annotationTitle").innerText =  document.getElementById(data.annotation_ID).dataset.title;
                    document.getElementById("annotationDescription").style.display = "block";
                    document.getElementById("annotationDescription").innerText = document.getElementById(data.annotation_ID).dataset.description;
                    document.getElementById("annotationTime").style.display = "block";
                    document.getElementById("annotationTime").innerText = document.getElementById(data.annotation_ID).dataset.time;
                });

                marcador.addEventListener("mouseout", () => {
                    marcador.style.opacity = "0.5";
                    document.getElementById("annotationTitle").style.display = "none";
                    document.getElementById("annotationDescription").style.display = "none";
                    document.getElementById("annotationTime").style.display = "none";
                });

            document.getElementById("contenedorProgressBar").appendChild(marcador);
    }



}
