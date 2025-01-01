// remember to put every element inside a div set to style="display: flex; flex-wrap: wrap;"
// if you don't want wrap (multiple lines), set minRowHeight to a small value and don't set flex-wrap

async function initMasonryContainerById(containerId, minRowHeight, doDebug = false) {

    await initMasonryContainerElement(document.getElementById(containerId), minRowHeight, doDebug);
}

async function initMasonryContainerElement(container, minRowHeight, doDebug = false) {

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
         * Otherwise, their sizes won't load and we cannot
         * preserve the image's aspect ratio in the masonry.
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

        // set the flex-grow, flex-basis, and width to the width when the height is minRowHeight
        let flex = width * minRowHeight / height;

        items[i].style.flex  = flex + " 1 " + flex + "px";
        items[i].style.width = flex + "px";
    }

    if (doDebug) {
        console.log("Exited function 'updateMasonryElement'");
    }
}
