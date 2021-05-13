import model from "../models/data.js";

gantt.plugins({
  marker: true
});

gantt.config.scales = [
  {
    unit: "year",
    step: 1,
    format: "%M %Y"
  },
  {
    unit: "day",
    step: 7,
    format: "%M %d"
  }
]

gantt.templates.task_class = function (start, end, task) {
  const markerDate = gantt.getMarker(todayMarker).start_date;
  const isItTaskOverdue = end <= markerDate;
  if (isItTaskOverdue) {
    return "completed-task"
  }
};

const getDate = gantt.date.date_to_str("%M, %d");

const todayMarker = gantt.addMarker({
  start_date: new Date(),
  css: "today",
  text: "Today",
  title: getDate(new Date)
});

gantt.init("gantt");
gantt.parse({
  data: model,
  links: [
    {id:"2",source:3, target:5, type:1},
  ]
});