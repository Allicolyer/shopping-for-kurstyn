// media query for larger picture
let base = document.getElementById("base-picture");

let foodItems = document.getElementsByClassName("food");
for (var i = 0; i < foodItems.length; i++) {
  dragElement(foodItems[i]);
}

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // move image around
  elmnt.ontouchstart = dragMouseDown;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    // get the mouse cursor position at startup:
    if (e.type === "touchstart") {
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      // call a function whenever the cursor moves:
      document.ontouchend = closeDragElement;
      document.ontouchmove = elementDrag;
    } else {
      pos3 = e.clientX;
      pos4 = e.clientY;
      // call a function whenever the cursor moves:
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    if (e.type === "touchmove") {
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    } else {
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    // set the element's new position
    let topPosition = elmnt.offsetTop - pos2;
    let leftPosition = elmnt.offsetLeft - pos1;

    // keep the food in bounds of the base pictures
    let leftBound = base.offsetWidth - elmnt.offsetWidth;
    let bottomBound = base.offsetHeight - elmnt.offsetHeight;

    if (topPosition < 0) {
      topPosition = 0;
    } else if (topPosition > bottomBound) {
      topPosition = bottomBound;
    }
    if (leftPosition < 0) {
      leftPosition = 0;
    } else if (leftPosition > leftBound) {
      leftPosition = leftBound;
    }
    // set the new positions in pixels
    elmnt.style.top = `${topPosition}px`;
    elmnt.style.left = `${leftPosition}px`;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.ontouchend = null;
    document.ontouchcancel = null;
    document.onmouseup = null;
    document.onmousemove = null;

    // convert position of element to a percentage so that it remains in place even if screen resizes. To avoid rounding errors, this is done last instead of as the element moves.
    let topPercentage = (parseFloat(elmnt.style.top) / base.offsetHeight) * 100;
    let leftPercentage =
      (parseFloat(elmnt.style.left) / base.offsetWidth) * 100;
    elmnt.style.top = `${topPercentage}%`;
    elmnt.style.left = `${leftPercentage}%`;
  }
}
