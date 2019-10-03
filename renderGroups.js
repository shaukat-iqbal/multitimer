function renderGroups(groups, timers) {
  groups.forEach(group => {
    let groupDiv = document.createElement("div");
    groupDiv.classList = "group card ui-widget-content";
    groupDiv.id = group.id;

    let groupHeader = document.createElement("div");
    groupHeader.setAttribute("class", "card-header");
    groupHeader.innerHTML = `<h3>${group.label}</h3>`;
    groupDiv.appendChild(groupHeader);

    let timersList = document.createElement("div");
    timersList.classList = "timersList d-flex flex-wrap";
    groupDiv.appendChild(timersList);
    group.timers.forEach(timerId => {
      let timerContainer = document.createElement("div");
      timerContainer.classList = "p-0 timerContainer d-flex";
      let timerObject = timers.find(t => t.id === timerId);
      let timerDiv = getTimerDiv(timerObject);
      timerContainer.append(timerDiv);
      timersList.appendChild(timerContainer);
    });

    timersList.appendChild(getPlaceholderDiv());
    $(".container .row").append(groupDiv);
    // let newHeight = getGroupHeight($("#" + group.id));
    groupDiv.setAttribute(
      "style",
      `position:absolute; top: ${group.top}px;left:${group.left}px; width: ${group.width}px; height: ${group.height}px;`
    );
  });
}

function getPlaceholderDiv() {
  let placeholder = document.createElement("div");
  placeholder.className = "p-0 timerContainer";
  placeholder.id = "placeholder";
  placeholder.innerHTML = `<p class=" timer p-3 m-0 border border-dark ">
                <button class="addTimer btn btn-info btn-sm rounded-pill" ><i class="fa fa-plus"></i> Add Timer</button>
              </p>`;
  return placeholder;
}
function getTimerDiv(timer) {
  let timerDiv = document.createElement("div");
  timerDiv.id = timer.id;
  timerDiv.classList = "timer d-flex m-0 border border-dark";
  let actionButtonSrc = '<i class="fa fa-pause-circle fa-3x" />';
  if (timer.status == "paused")
    actionButtonSrc = '<i class="fa fa-play-circle fa-3x" />';
  let d = new Date();
  let timeForLabel = "00:00:00";
  let totalSecondsInMillis = parseInt(timer.totalSeconds) * 1000;

  if (timer.status === "paused") {
    timeForLabel = parseMillisecondsIntoReadableTime(totalSecondsInMillis);
  } else {
    let elasspedTime = Math.floor(d.getTime() - parseInt(timer.startedAt));

    if (elasspedTime < totalSecondsInMillis) {
      timeForLabel = parseMillisecondsIntoReadableTime(
        totalSecondsInMillis - elasspedTime
      );
    }
  }

  let innerHTML = `<div class='rounded-circle p-0 mr-1 d-flex align-items-center'><img class='rounded-circle p-0' src='./Resources/clock.png' width=50px height=50px/></div>
                <div >
                    <label class='mb-0' style="font-size:12px">${timer.label}</label>
                    <label class="remainingTime font-weight-bold mb-0" id=${timer.status}>${timeForLabel}</label>
                </div>
                <button class='rounded-circle btn p-0 actionBtn'  onClick="play(${timer.id})">${actionButtonSrc}</button>`;
  timerDiv.innerHTML = innerHTML;
  return timerDiv;
}

function play(id) {
  let status = "";
  timers.map(t => {
    if (t.id == id) {
      if (t.status === "paused") {
        let d = new Date();
        t.startedAt = d.getTime();
        t.status = "running";
        $(".group .timersList #" + id)
          .find(".actionBtn i")
          .attr("class", "fa fa-pause-circle fa-3x");
      } else if (t.status === "running") {
        $(".group .timersList #" + id)
          .find(".actionBtn i")
          .attr("class", "fa fa-play-circle fa-3x");
        let remainingTime = $(".group .timersList #" + id).find(
          ".remainingTime"
        )[0].innerHTML;
        let time = convertToSeconds(remainingTime);
        t.totalSeconds = time;
        t.status = "paused";
      }
      console.log(t);
      status = t.status;
    }
    return t;
  });

  function convertToSeconds(time) {
    let timeArr = time.split(":");
    let seconds = parseInt(timeArr[2]);
    let minutes = parseInt(timeArr[1]);
    let hours = parseInt(timeArr[0]);
    return hours * 3600 + minutes * 60 + seconds;
  }

  $(".group .timersList #" + id)
    .find(".remainingTime")
    .attr("id", status);
}
