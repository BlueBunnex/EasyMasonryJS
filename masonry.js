function updateMasonryId(containerId, itemMaxHeight, doDebug = false) {

    updateMasonryElement(document.getElementById(containerId), itemMaxHeight, doDebug);
}

function updateMasonryElement(container, itemMaxHeight, doDebug = false) {

    if (doDebug) {
        console.log("Entered function 'updateMasonryElement'");
    }

    /*
     * Gotta get information about the container, aka inner width and child items.
     * The width of the container must be without padding. If on less than IE9, won't work...
     */

    const containerStyle = getComputedStyle(container);
    
    if (!containerStyle) {
        alert('Masonry not supported on your device.');
        return;
    } 
    
    const containerWidth = container.clientWidth
                           - (parseFloat(containerStyle.paddingLeft) + parseFloat(containerStyle.paddingRight)) // remove padding
                           - 1;                                                                                 // minus one to avoid rounding errors
    
    const items          = container.querySelectorAll(".item");

    if (doDebug) {
        console.log("Container inner width: " + containerWidth);
        console.log("Item count: " + items.length);
    }

    var i = 0;

    /*
     * Process each row with some math.
     */
    while (i < items.length) {

        // crudely calculate number of items per row from itemMaxHeight parameter
        const itemRowCount = Math.ceil(containerWidth / itemMaxHeight);

        // get sum of all aspect ratios
        var aspectRatioSum = 0;

        for (let j = i; j < i + itemRowCount; j++) {

            if (j < items.length) {

                // store initial dimensions as data if not done already
                if (items[j].dataset.initWidth == null) {

                    // images have natural dimensions, other elements don't
                    if (items[j].naturalWidth != undefined) {

                        items[j].dataset.initWidth  = items[j].naturalWidth;
                        items[j].dataset.initHeight = items[j].naturalHeight;
                    } else {
                        items[j].dataset.initWidth  = items[j].offsetWidth;
                        items[j].dataset.initHeight = items[j].offsetHeight;
                    }
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
        console.log("Exited function 'updateMasonryElement'");
    }
}
