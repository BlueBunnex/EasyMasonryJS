function updateMasonryId(containerId, itemMaxHeight, doDebug = false) {

    updateMasonryElement(document.getElementById(containerId), itemMaxHeight, doDebug);
}

// remember to put every element inside a div set to style="display: flex;" and maybe a flex-overflow too

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
    
    const items = container.querySelectorAll(".item");

    if (doDebug) {
        console.log("Container inner width: " + containerWidth);
        console.log("Item count: " + items.length);
    }

    /*
     * TODO Process each row with some math.
     */
    for (let i = 0; i < items.length; i++) {

        // get initial width/height
        // (images have natural dimensions, other elements don't)
        let width, height;
        
        if (items[j].naturalWidth != undefined) {

            width  = items[j].naturalWidth;
            height = items[j].naturalHeight;
        } else {
            width  = items[j].offsetWidth;
            height = items[j].offsetHeight;
        }

        // set the flex and width to the width when the height is 100
        let flex = height * 100 / width;

        items[j].style.flex   = flex;
        items[j].style.height = flex + "px";

        if (doDebug) {
            console.log("Current item index: " + i + "; Item/row count: " + itemRowCount + "; Row height: " + height);
        }
    }

    if (doDebug) {
        console.log("Exited function 'updateMasonryElement'");
    }
}
