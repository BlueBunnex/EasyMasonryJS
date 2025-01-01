function updateMasonryId(containerId, itemMinHeight, doDebug = false) {

    updateMasonryElement(document.getElementById(containerId), itemMinHeight, doDebug);
}

// remember to put every element inside a div set to style="display: flex;" and maybe a flex-overflow too

function updateMasonryElement(container, itemMinHeight, doDebug = false) {

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
        
        if (items[i].naturalWidth != undefined) {

            width  = items[i].naturalWidth;
            height = items[i].naturalHeight;
        } else {
            width  = items[i].offsetWidth;
            height = items[i].offsetHeight;
        }

        // set the flex and width to the width when the height is itemMinHeight
        let flex = width * itemMinHeight / height;

        items[i].style.flex  = flex;
        items[i].style.width = flex + "px";

        if (items[i].naturalWidth != undefined) {
            
            items[i].style.height = "auto";
            items[i].style.aspectRatio = width / height;
        }

        if (doDebug) {
            console.log("Current item index: " + i + "; Item/row count: " + itemRowCount + "; Row height: " + height);
        }
    }

    if (doDebug) {
        console.log("Exited function 'updateMasonryElement'");
    }
}
