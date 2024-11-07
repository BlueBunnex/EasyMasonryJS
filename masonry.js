function updateMasonry(containerId, itemMaxHeight, doDebug = false) {

    if (doDebug) {
        console.log("Entered function 'updateMasonry'");
    }
    
    const container      = document.getElementById(containerId);

    // Have to get width of container without padding. If on less than IE9, won't work...
    const containerStyle = getComputedStyle(element);
    
    if (!containerStyle) {
        alert('Masonry not supported on your device.');
        return;
    } 
    
    const containerWidth = container.clientWidth
                           - (parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight)) // remove padding
                           - 1;                                                                                 // minus one to avoid rounding errors
    
    const items          = container.querySelectorAll(".item");

    if (doDebug) {
        console.log("Container Inner Width: " + containerWidth);
    }

    var i = 0;

    // process rows
    while (i < items.length) {

        // crudely calculate number of items per row from itemMaxHeight parameter
        const itemRowCount = Math.ceil(containerWidth / itemMaxHeight);

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

        if (doDebug) {
            console.log("Current item index: " + i + "; Item/row count: " + itemRowCount + "; Row height: " + height);
        }

        i += itemRowCount;
    }

    if (doDebug) {
        console.log("Exited function 'updateMasonry'");
    }
}
