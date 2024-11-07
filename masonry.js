function updateMasonry(containerId, itemMaxHeight, doDebug = false) {
    
    const container      = document.getElementById(containerId);
    const containerWidth = container.offsetWidth - 1; // minus one to avoid rounding errors
    const items          = container.querySelectorAll(".item");

    var i = 0;

    // process rows
    while (i < items.length) {

        // crudely calculate number of items per row from itemMaxHeight parameter
        const itemRowCount = Math.ceil(containerWidth / itemMaxHeight);

        if (doDebug) {
            console.log("Row count: " + itemRowCount);
        }

        // get sum of all aspect ratios
        var aspectRatioSum = 0;

        for (let j = i; j < i + itemRowCount; j++) {

            if (j < items.length) {

                // store initial dimensions as data if not done already
                if (items[j].dataset.initWidth == null) {
                    
                    items[j].dataset.initWidth  = items[j].offsetWidth;
                    items[j].dataset.initHeight = items[j].offsetHeight;
                }
                
                aspectRatioSum += items[j].dataset.initWidth / items[j].dataset.initHeight;
            } else {
                aspectRatioSum += 1;
            }
        }

        // calculate necessary height (I did a bit of math to reach this formula)
        const height = containerWidth / aspectRatioSum;

        // calculate individual widths based on aspect ratios
        for (let j = i; j < Math.min(i + itemRowCount, items.length); j++) {
            
            items[j].style.width  = height * (items[j].dataset.initWidth / items[j].dataset.initHeight) + "px";
            items[j].style.height = height + "px";
        }

        i += itemRowCount;
    }
}
