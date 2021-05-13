import model from "../models/data.js";

gantt.locale.labels["section_owner"] = "Owner";

gantt.serverList("ownerList", [
  {
    key: 1,
    label: "John"
  },
  {
    key: 2,
    label: "Adam"
  },
  {
    key: 3,
    label: "Diane"
  }
]);

gantt.config.columns = [
  {
    name: "text",
    label: "Task name",
    tree: true,
    width: '*'
  },
  {
    name: "owner",
    label: "Owner",
    align: "center",
    template: (item) => getName(item)
  }
];

gantt.templates.task_class = (start, end, task) => {
  const ownerId = task.owner_id;
  return `owner-style_${ownerId}`;
}

gantt.templates.rightside_text = (start, end, task) => {
  const name = getName(task);
  return name;
}

gantt.config.lightbox.sections = [
  {
    name: "description",
    height: 38,
    map_to: "text",
    type: "textarea",
    focus: true
  },
  {
    name: "owner",
    height: 22,
    map_to: "owner_id",
    type: "select",
    options: gantt.serverList("ownerList")
  },
  {
    name: "time",
    type: "duration",
    map_to: "auto"
  }
];



gantt.init("gantt");
gantt.parse({
  data: model
});

function getName(data) {
  const ownerData = gantt.serverList("ownerList");
  const ownerId = data.owner_id;
  const name = ownerData[ownerId - 1].label;
  return name;
}