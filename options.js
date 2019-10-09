let groupDraggableOptions = {
  cursor: "move",
  stop: function(event, ui) {
    if (isOverlap(event, ui)) {
      $(this).animate(ui.originalPosition, "slow");
      return;
    }
    let id = $(this).attr("id");
    let group = groups.find(g => g.id == id);
    let position = $(this).position();
    group.top = position["top"];
    group.left = position["left"];
  }
};
var groupResizableOptions = {
  handles: "se,e",
  ghost: true,
  autoHide: true,
  minWidth: timerWidth,
  stop: function(event, ui) {
    let groupId = $(this).attr("id");
    let group = groups.find(g => g.id == groupId);
    group.height = getGroupHeight($(ui.element));
    group.width = getGroupWidth(event, ui);
    $(this).css("height", group.height + "px");
    $(this).css("max-width", getMaxWidth(event, ui) + "px");
    $(this).css("width", group.width + "px");
    console.log(groups);
  }
};
function clearFields() {
  $("form")
    .find("input")
    .val("");
}
