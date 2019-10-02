function checkOverLapping(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function isOverlap(event, ui) {
  let draggedGroup = ui.helper[0];
  let draggedRect = draggedGroup.getBoundingClientRect();
  let draggedId = draggedGroup.id;
  let allRects = document.getElementsByClassName("group");
  for (let index = 0; index < allRects.length; index++) {
    const id = allRects[index].id;
    if (id == draggedId) continue;
    const rect = allRects[index].getBoundingClientRect();
    if (checkOverLapping(rect, draggedRect)) return true;
  }
  return false;
}
function getGroupHeight(group) {
  return (
    group.find(".card-header").outerHeight() +
    group.find(".timersList").outerHeight()
  );
}

function getGroupWidth(event, ui) {
  // let oldWidth = +ui.originalSize.width;
  let newWidth = +ui.size.width;
  let noOfTimers = Math.floor(newWidth / timerWidth);
  return noOfTimers * timerWidth + 10;
}

function getMaxWidth(event, ui) {
  let childs = $("#" + ui.element[0].id)
    .find(".timersList")
    .children()
    .size();
  let width = childs * timerWidth + 10;
  return width;
}
