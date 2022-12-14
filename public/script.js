function PlotGaze(GazeData) {
    /*
    GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
    GazeData.docX // gaze x in document coordinates
    GazeData.docY // gaze y in document cordinates
    GazeData.time // timestamp
    */

    document.getElementById("GazeData").innerHTML = "GazeX: " + GazeData.GazeX + " GazeY: " + GazeData.GazeY;
    document.getElementById("HeadPhoseData").innerHTML = " HeadX: " + GazeData.HeadX + " HeadY: " + GazeData.HeadY + " HeadZ: " + GazeData.HeadZ;
    document.getElementById("HeadRotData").innerHTML = " Yaw: " + GazeData.HeadYaw + " Pitch: " + GazeData.HeadPitch + " Roll: " + GazeData.HeadRoll;
    
    var x = GazeData.docX;
    var y = GazeData.docY;
    
    var gaze = document.getElementById("gaze");
    x -= gaze.clientWidth/2;

    y -= gaze.clientHeight/2;
    gaze.style.left = x + "px";
    gaze.style.top = y + "px";

    
    if(GazeData.state != 0)
    {
        if (gaze.style.display  == 'block')
            gaze.style.display = 'none';
    }
    else
    {
        if (gaze.style.display  == 'none')
            gaze.style.display = 'block';
    }
    
}
    
// Draw Grid
const drawGrid = (gridNum) => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let boxesHtml = ``;
    for (let i = 0; i < gridNum * gridNum; i++) {
        boxesHtml += `<div class="box"> <p class="text-num">${i+1}</p> </div>`;
    }

    let draw = document.getElementById("draw");
    draw.innerHTML = boxesHtml ;

    let sizeX = windowWidth / gridNum;
    let sizeY = windowHeight / gridNum;

    let body = document.querySelector("body");
    // body.style.backgroundSize = `${sizeX}px ${sizeY}px`;

    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.width = `${sizeX - 3}px`;
        box.style.height = `${sizeY- 3}px`;
    });
}


//////set callbacks/////////
window.addEventListener("load", function() {
    GazeCloudAPI.OnCalibrationComplete =function(){
        console.log('gaze Calibration Complete');
        drawGrid(3);
    }
    GazeCloudAPI.OnCamDenied =  function(){ console.log('camera  access denied')  }
    GazeCloudAPI.OnError =  function(msg){ console.log('err: ' + msg)  }
    GazeCloudAPI.UseClickRecalibration = true;
    GazeCloudAPI.OnResult = PlotGaze; 
});

drawGrid(3);

