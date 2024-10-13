function updateMasonry(containerId, itemMaxHeight) {
        
    const container      = document.getElementById(containerId);
    const containerWidth = container.offsetWidth - 1; // minus one to avoid rounding errors
    const items          = container.querySelectorAll(".item");

    var i = 0;

    // process rows
    while (i < items.length) {
        
        const imageRowCount = Math.ceil(containerWidth / itemMaxHeight); // calculate from itemMaxHeight parameter
        
        var aspectRatioSum = 0;

        for (let j = i; j < i + imageRowCount; j++) {

            if (j < items.length) {

                // store initial dimensions as data
                if (items[j].dataset.initWidth == null) {
                    
                    items[j].dataset.initWidth  = items[j].offsetWidth;
                    items[j].dataset.initHeight = items[j].offsetHeight;
                }
                
                aspectRatioSum += items[j].dataset.initWidth / items[j].dataset.initHeight;
            } else {
                aspectRatioSum += 1;
            }
        }

        const height = containerWidth / aspectRatioSum;

        console.log(containerWidth + "; " + aspectRatioSum);

        for (let j = i; j < Math.min(i + imageRowCount, items.length); j++) {
            
            items[j].style.width  = height * (items[j].dataset.initWidth / items[j].dataset.initHeight) + "px";
            items[j].style.height = height;
        }

        i += imageRowCount;
    }
}
