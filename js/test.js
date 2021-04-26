window.onload = function () {

    init();

}

function init() {
    // Add drag/drop events

    el = document.getElementById("box1");
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);
    el.addEventListener("dragend", handleDragEnd);

    el = document.getElementById("box2");
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);
    el.addEventListener("dragend", handleDragEnd);

    el = document.getElementById("box3");
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);
    el.addEventListener("dragend", handleDragEnd);

    el = document.getElementById("box4");
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);
    el.addEventListener("dragend", handleDragEnd);

    el = document.getElementById("box5");
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);
    el.addEventListener("dragend", handleDragEnd);

    el = document.getElementById("box6");
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);
    el.addEventListener("dragend", handleDragEnd);

    var srcDragObj;

    
}


function handleDragStart(ev) {
    // ev.dataTransfer.setData("src", ev.target.id);    // setData() doesn't seem to be available for all DnD events. 
    srcDragObj = ev.target;                             // therefore, we use global var, srcDragObj 
    console.log("DragStart() on " + srcDragObj.id);
    ev.target.style.opacity = '0.001';                  // effectively hides the cards being dragged.
    ev.target.classList.add('selected');                // for changing the background color of card.


}
function handleDragEnter(ev) {
    console.log("DragEnter() on " + ev.currentTarget.id);
    // var src = ev.dataTransfer.getData("src");  // src cannot be retrieved in this event due to spec. Use srcDragObj instead.
    if (srcDragObj.id != "") {
        var targ = ev.currentTarget;
        console.log("Dragging src=" + srcDragObj.id + " to target=" + ev.target.id);
        if (srcDragObj.id != null && targ.id != null) {
            playSound("Slide.wav");
            arrangeCards(document.getElementById("container"), srcDragObj, targ);
        }
    }
}
function handleDragOver(ev) {
    console.log("DragOver()");
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}
function handleDragLeave(ev) {
    console.log("DragLeave() on " + ev.target.id);
    ev.target.classList.remove('selected');
}
function handleDrop(ev) {
    ev.preventDefault();
    if (ev.stopPropagation) {
        ev.stopPropagation(); // stops the browser from redirecting.
    }
    // var src = document.getElementById(ev.dataTransfer.getData("src"));
    var targ = ev.currentTarget;
    console.log("Drop() srcDragObj=" + srcDragObj.id + " to target=" + targ.id);
    srcDragObj = null;
}
function handleDragEnd(ev) {

    console.log("DragEnd()")
    //ev.target.style.opacity = '1.0';
    ev.target.removeAttribute("style");
}

function arrangeCards(container, src, dst) {
    if (src == dst) {
        // Source Card = Destination Card, no move needed
    } else {
        var srcIndex = getIndexByElement(container, src);
        var dstIndex = getIndexByElement(container, dst);
        var offset = 10;
        // console.log("srcIndex=" + srcIndex + " dstIndex=" + dstIndex);

        if (srcIndex > dstIndex) {
            // move source card to the left, and other cards to the right
            dst.style.transform = "translateX(" + offset + "px)";
            dst.addEventListener("transitionend", function () {
                this.style.transform = "";
            });
            dst.insertAdjacentElement("beforebegin", src);
        } else {
            // move source card to the right, and other cards to the left
            dst.style.transform = "translateX(-" + offset + "px)";
            dst.addEventListener("transitionend", function () {
                this.style.transform = "";
            });
            dst.insertAdjacentElement("afterend", src);
       }
    }
 }
    
function playSound(soundfile) {
    var sound = document.getElementById("Slide.wav");
    sound.play();
}

function getIndexById(containerId, elementId) {
    // TODO: consider another function to getIndexByElement?
    // what's my goal?

    var c = document.getElementById(containerId);
    var e = document.getElementById(elementId);
    return Array.prototype.indexOf.call(c.children, e);
}

function getIndexByElement(container, element) {
    return Array.prototype.indexOf.call(container.children, element);
}
