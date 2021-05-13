import model from "../models/data.js";

gantt.config.date_grid = "%d %M %Y";
gantt.config.scales = [
  {
    unit: "month",
    step: 1,
    format: "%M %Y"
  },
  {
    unit: "day",
    step: 1,
    format: "%d"
  }
]

gantt.templates.task_class = (start, end, task) => {
  if (task.progress >= 0.75 && task.progress < 0.9) {
    return "red-task";
  } else if(task.progress >= 0.9) {
    return "bolt-task";
  }
}

gantt.templates.rightside_text = (start, end, task) => {
  return task.progress === 1 ? "done" : false;
}

gantt.init("gantt");
gantt.parse({
  data: model
});