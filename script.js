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
    // set the element's new position relative to the larger picture
    elmnt.style.top =
      ((elmnt.offsetTop - pos2) / base.offsetHeight) * 100 + "%";
    elmnt.style.left =
      ((elmnt.offsetLeft - pos1) / base.offsetWidth) * 100 + "%";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.ontouchend = null;
    document.ontouchcancel = null;
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
