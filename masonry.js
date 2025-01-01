function initMasonryContainerById(containerId, doDebug = false) {

    initMasonryContainerElement(document.getElementById(containerId), doDebug);
}

// remember to put every element inside a div set to style="display: flex;"

// layer system, where each layer is initialized and then items are shifted between them per the updater?

function initMasonryContainerElement(container, doDebug = false) {

    if (doDebug) {
        console.log("Entered function 'updateMasonryElement'");
    }
    
    const items = container.querySelectorAll(".item");

    if (doDebug) {
        console.log("Item count: " + items.length);
    }

    /*
     * Process each item.
     */
    for (let i = 0; i < items.length; i++) {

        // get initial width/height
        let width, height;
        
        if (items[i].naturalWidth != undefined) {

            width  = items[i].naturalWidth;
            height = items[i].naturalHeight;
            
        } else {

            // (images have natural dimensions, other elements don't)
            alert("Non-image masonry elements aren't supported (yet)!");
            return;
        }

        // set the flex and width to the width when the height is a small value
        let flex = width * 50 / height;

        items[i].style.flex  = flex;
        items[i].style.width = flex + "px";
    }

    if (doDebug) {
        console.log("Exited function 'updateMasonryElement'");
    }
}
