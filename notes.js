const video_ID = window.location.href.split("=")[1];
function myCallbackFunction(dataStored) {
    console.log(dataStored);
    if (dataStored[video_ID]) {  //better with dot notation: dataStored.selected

      let annotations = dataStored[video_ID]; 
      console.log("Data was loaded.");

      
      
      
      
      let contenedorInfoAnnotations = document.createElement("div");
      contenedorInfoAnnotations.id = "contenedorInfoAnnotations";
      contenedorInfoAnnotations.style.position = "relative";
      contenedorInfoAnnotations.style.width = "100%";
      contenedorInfoAnnotations.style.display = "inline-block";
      contenedorInfoAnnotations.style.paddingLeft = "8px";
      contenedorInfoAnnotations.style.paddingRight = "8px";
      contenedorInfoAnnotations.style.paddingTop = "8px";
      contenedorInfoAnnotations.style.paddingBottom = "8px";
      
      for (let i = 0; i < annotations[video_ID].length; i++) {
            let annotationTitle = document.createElement("h1");
            annotationTitle.id = "annotationTitle";
            annotationTitle.style.fontSize = "20px";
            annotationTitle.style.fontWeight = "bold";
            annotationTitle.style.color = "white";
            annotationTitle.style.margin = "0px";
            annotationTitle.style.padding = "0px";
            annotationTitle.style.textAlign = "left";
            annotationTitle.style.display = "none";
            annotationTitle.innerText = annotations[video_ID][i].title;
        
            let annotationDescription = document.createElement("p");
            annotationDescription.id = "annotationDescription";
            annotationDescription.style.fontSize = "14px";
            annotationDescription.style.color = "white";
            annotationDescription.style.margin = "0px";
            annotationDescription.style.padding = "0px";
            annotationDescription.style.textAlign = "left";
            annotationDescription.style.display = "none";
            annotationDescription.innerText = annotations[video_ID][i].description;

            let annotationTime = document.createElement("p");
            annotationTime.id = "annotationTime";
            annotationTime.style.fontSize = "14px";
            annotationTime.style.color = "white";
            annotationTime.style.margin = "0px";
            annotationTime.style.padding = "0px";
            annotationTime.style.textAlign = "left";
            annotationTime.style.display = "none";
            annotationTime.innerText = annotations[video_ID][i].time;

        contenedorInfoAnnotations.appendChild(annotationTitle);
        contenedorInfoAnnotations.appendChild(annotationDescription);
        contenedorInfoAnnotations.appendChild(annotationTime);

    }

    document.body.appendChild(contenedorInfoAnnotations);



    }
  }
  
function getValue(callback) { chrome.storage.sync.get([video_ID], callback); }
getValue(myCallbackFunction);
