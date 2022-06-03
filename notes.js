let contenedorVideoID = document.getElementById("video-ID");
let video_ID = ""; 
let video_title = ""; 
chrome.storage.sync.get("lastVideo", res=>{
  video_ID=res.lastVideo.video_ID;
  video_title=res.lastVideo.title;
  contenedorVideoID.innerText = video_title;
  // console.log(res.lastVideo);
  chrome.storage.sync.get(res.lastVideo.video_ID, (res)=>{
    if (res[video_ID]) {  //better with dot notation: res.selected

      let annotations = res[video_ID]; 
      // console.log("Data was loaded.");

      annotations.sort((a, b)=>{
        return a.time - b.time;
      }
      );

        for (let i = 0; i < annotations.length; i++) {
          let li = document.createElement("li");
          li.style.borderLeft = "2px solid #"+annotations[i].color;
          // li.style.height = 20+"px";
          li.style.padding = 2.5+"px";
          li.style.marginTop = 2.5+"px";

            let link = document.createElement("a");
            link.href = "https://www.youtube.com/watch?v="+video_ID+"&t="+annotations[i].time+"s";
            link.target = "_blank";
            
            link.addEventListener("mouseover", ()=>{
              li.style.backgroundColor = "#"+annotations[i].color+"33";
            }
            );

            link.addEventListener("mouseout", ()=>{
              li.style.backgroundColor = "transparent";
            }
            );


              let annotationTitle = document.createElement("h1");
              annotationTitle.id = "annotationTitle";
              annotationTitle.style.fontSize = "20px";
              annotationTitle.style.fontWeight = "bold";
              annotationTitle.style.color = "white";
              annotationTitle.style.margin = "0px";
              annotationTitle.style.padding = "0px";
              annotationTitle.style.textAlign = "left";
              annotationTitle.innerText = annotations[i].title;
          
              let annotationDescription = document.createElement("p");
              annotationDescription.id = "annotationDescription";
              annotationDescription.style.fontSize = "14px";
              annotationDescription.style.color = "white";
              annotationDescription.style.margin = "0px";
              annotationDescription.style.padding = "0px";
              annotationDescription.style.textAlign = "left";
              annotationDescription.innerText = annotations[i].description;

              let annotationTime = document.createElement("p");
              annotationTime.id = "annotationTime";
              annotationTime.style.fontSize = "14px";
              annotationTime.style.color = "white";
              annotationTime.style.margin = "0px";
              annotationTime.style.padding = "0px";
              annotationTime.style.textAlign = "left";
              annotationTime.innerText = ( (annotations[i].time/60 < 1) ? "00" : parseInt(annotations[i].time/60)) + " min" + ":" + annotations[i].time%60 + " sec";

            link.appendChild(annotationTitle);
            link.appendChild(annotationDescription);
            link.appendChild(annotationTime);

          li.appendChild(link);

          document.getElementById("ul-notes").appendChild(li);

        }

    }
  }
  );
});
