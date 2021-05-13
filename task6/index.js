import model from "../models/data.js";



gantt.init("gantt");
gantt.parse({
  data: model,
  links: [
    {id:"2",source:3, target:5, type:1},
  ]
});