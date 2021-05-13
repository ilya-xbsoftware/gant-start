import model from "../models/data.js";

gantt.plugins({
  critical_path: true,
  auto_scheduling: true
});

gantt.addTaskLayer((task) => {
  const slackState = task.slackShow;
  const state = gantt.getState().drag_mode;
 
  if (state === 'resize' || state === 'move' || !slackState) {
    return null;
  }

  return createSlackElement(task);
})

gantt.templates.timeline_cell_class = (task, date) => {
  const isWorkTime = gantt.isWorkTime(date);
  return isWorkTime ? true : "weekend";
}

gantt.attachEvent("onTaskSelected", (id) => changeStatusProperty(id));
gantt.attachEvent("onTaskUnselected", (id) => changeStatusProperty(id, "clear"));

gantt.config.auto_scheduling = true;
gantt.config.work_time = true;
gantt.config.scales = [
  {
    unit: "year",
    step: 1,
    format: "%M %Y"
  },
  {
    unit: "day",
    step: 1,
    format: "%M %d"
  }
]

gantt.init("gantt");
gantt.parse({
  data: model,
  links: [
    { id: "1", source: 2, target: 3, type: 0 },
    { id: "2", source: 3, target: 5, type: 0 },
    { id: "3", source: 7, target: 8, type: 0 },
    { id: "4", source: 9, target: 8, type: 0 },
    { id: "5", source: 4, target: 5, type: 0 },
  ]
});

function createSlackElement(task) {
  const freeSlack = gantt.getFreeSlack(task);
  const slackStart = task.end_date;
  const slackEnd = gantt.calculateEndDate(slackStart, freeSlack);
  const slackSize = gantt.getTaskPosition(task, slackStart, slackEnd)
  const element = document.createElement("span");
  
  element.className = "slack_style";
  element.style.left = `${slackSize.left}px`;
  element.style.top = `${slackSize.top}px`;
  element.style.width = `${slackSize.width}px`;
  element.style.height = `${slackSize.height}px`;
  
  return element;
}

function changeStatusProperty(id, action) {
  const task = gantt.getTask(id);

  if (action) {
    delete task.slackShow;
  } else {
    task.slackShow = true;
  }

  gantt.updateTask(id)
}
