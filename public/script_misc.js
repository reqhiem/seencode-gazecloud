const drawGrid = function(w, h, id, sizeX, sizeY) {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.canvas.width  = w;
    ctx.canvas.height = h;
    
    let data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="grid" width="${sizeX}" height="${sizeY}" patternUnits="userSpaceOnUse"> \
                <path d="M ${sizeX} 0 L 0 0 0 ${sizeY}" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#grid)" /> \
    </svg>`;

    let DOMURL = window.URL || window.webkitURL || window;
    
    let img = new Image();
    let svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    let url = DOMURL.createObjectURL(svg);
    
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    img.src = url;
}

const main = (gridNum) => {
    let windowWidth = window.innerWidth - 20;
    let windowHeight = window.innerHeight - 20;

    let sizeX = windowWidth / gridNum;
    let sizeY = windowHeight / gridNum;

    console.log(windowWidth, windowHeight);
    drawGrid(windowWidth, windowHeight, "grid", sizeX, sizeY);
}

main(3);
