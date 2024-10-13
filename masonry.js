function updateMasonry(containerId, imageMaxHeight) {
        
    const container      = document.getElementById(containerId);
    const containerWidth = container.offsetWidth - 1; // minus one to avoid rounding errors
    const images         = container.querySelectorAll(".item");

    var i = 0;

    // process rows
    while (i < images.length) {
        
        const imageRowCount = Math.ceil(containerWidth / imageMaxHeight); // calculate from imageMaxHeight parameter
        
        var aspectRatioSum = 0;

        for (let j = i; j < i + imageRowCount; j++) {

            if (j < images.length) {

                // store initial dimensions as data
                if (images[j].dataset.initWidth == null) {
                    
                    images[j].dataset.initWidth  = images[j].offsetWidth;
                    images[j].dataset.initHeight = images[j].offsetHeight;
                }
                
                aspectRatioSum += images[j].dataset.initWidth / images[j].dataset.initHeight;
            } else {
                aspectRatioSum += 1;
            }
        }

        const height = containerWidth / aspectRatioSum;

        for (let j = i; j < Math.min(i + imageRowCount, images.length); j++) {
            
            images[j].style.width = height * (images[j].initWidth / images[j].initHeight) + "px";
        }

        i += imageRowCount;
    }
}
