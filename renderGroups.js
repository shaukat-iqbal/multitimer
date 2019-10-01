function renderGroups(groups, timers) {
  groups.forEach(group => {
    let groupDiv = document.createElement("div");
    groupDiv.classList = "group card ui-widget-content";
    groupDiv.id = group.id;
    groupDiv.setAttribute(
      "style",
      `position:"absolute"; top: "${group.position.top}px";left:"${group.position.left}px"; width: "${group.width}px"; height: "${group.height}px";`
    );
    // groupDiv.style = `position:absolute; top: ${group.position.top}px;left:${group.position.left}px; width: ${group.width}px; height: ${group.height}px;`;

    let groupHeader = document.createElement("div");
    groupHeader.setAttribute("class", "card-header");
    groupHeader.innerHTML = `<h3>${group.label}</h3>`;
    groupDiv.appendChild(groupHeader);

    let timersList = document.createElement("div");
    timersList.classList = "timersList  p-0 d-flex flex-wrap";
    groupDiv.appendChild(timersList);
    group.timers.forEach(timerId => {
      let timerContainer = document.createElement("div");
      timerContainer.classList = "p-0 timerContainer";
      let timerObject = timers.find(t => t.id === timerId);
      timerContainer.innerHTML = `<div class="timer p-5 m-0 border border-dark" id="${timerObject.id}">${timerObject.label}</div>`;
      timersList.appendChild(timerContainer);
    });

    let placeholder = document.createElement("div");
    placeholder.className = "timerContainer";
    placeholder.id = "placeholder";
    placeholder.innerHTML = `<p class=" timer p-3 m-0 border border-dark ">
                <button class="addTimer btn btn-info btn-sm rounded-pill" ><i class="fa fa-plus"></i> Add Timer</button>
              </p>`;
    timersList.appendChild(placeholder);
    $("body").append(groupDiv);
    let newHeight = getGroupHeight($("#" + group.id));

    groupDiv.style = `height:${newHeight};`;
  });
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
  let noOfTimers = Math.floor(newWidth / 150);
  return noOfTimers * 150 + 10 + "px";
}

function getMaxWidth(event, ui) {
  let childs = $("#" + ui.element[0].id)
    .find(".timersList")
    .children()
    .size();
  let width = childs * 150 + 10;
  return width;
}
