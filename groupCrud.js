function createGroupNextTo(groupId) {
  let refGroup = $("#" + groupId);
  let left = refGroup.offset().left + refGroup.width();
  let top = refGroup.offset().top;
  let headerHeight = refGroup.find("card-header").outerHeight();
  let group = {
    id: `g${groups.length}`,
    height: timerHeight + headerHeight,
    width: timerWidth,
    left: left,
    top: top,
    timers: []
  };
  groups.push(group);
  renderSingleGroup(group);
  $("#" + group.id)
    .resizable(groupResizableOptions)
    .draggable(groupDraggableOptions);
  console.log(groups);
}
