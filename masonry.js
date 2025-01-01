async function initMasonryContainerById(containerId, doDebug = false) {

    await initMasonryContainerElement(document.getElementById(containerId), doDebug);
}

// remember to put every element inside a div set to style="display: flex;"

// layer system, where each layer is initialized and then items are shifted between them per the updater?

async function initMasonryContainerElement(container, doDebug = false) {

    if (doDebug) {
        console.log("Entered function 'updateMasonryElement'");
    }
    
    const items = container.children;

    if (doDebug) {
        console.log("Item count: " + items.length);
    }

    /*
     * Process each item.
     */
    for (let i = 0; i < items.length; i++) {

        /*
         * Wait for image to load (or fail to) before continuing.
         * Otherwise, their sizes won't load and we cannot update
         * the masonry properly.
         */
        if (items[i].tagName === "IMG") {
            
            await new Promise(res => {
                if (items[i].complete) { return res(); }
                items[i].onload  = () => res();
                items[i].onerror = () => res();
            });
        }

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
