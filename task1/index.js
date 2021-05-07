import model from "./models/data.js";

gantt.init("gantt_here");

gantt.parse({
  data: model,
  links: [
    {id: 1, source: 1, target: 2, type: "1"},
    {id: 2, source: 2, target: 3, type: "0"}
  ]
});