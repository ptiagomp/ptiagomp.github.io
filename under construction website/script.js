document.addEventListener('DOMContentLoaded', (event) => {
    const dragItem = document.querySelector("#draggableBox");
    const container = document.querySelector("#draggableContainer");
  
    let active = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
  
    container.addEventListener("touchstart", dragStart, false);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);
  
    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);
  
    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }
  
      if (e.target === dragItem) {
        active = true;
      }
    }
  
    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;
      active = false;
    }
  
    function drag(e) {
      if (active) {
      
        e.preventDefault();
        
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }
  
        // Constrain the draggable box within the container
        currentX = Math.min(container.offsetWidth - dragItem.offsetWidth, Math.max(0, currentX));
        currentY = Math.min(container.offsetHeight - dragItem.offsetHeight, Math.max(0, currentY));
  
        xOffset = currentX;
        yOffset = currentY;
  
        setTranslate(currentX, currentY, dragItem);
      }
    }
  
    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
  });
  