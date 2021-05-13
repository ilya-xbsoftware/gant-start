import model from "../models/data.js";

gantt.templates.task_text = function (start, end, task) {
  const getStartDate = gantt.date.date_to_str("%M, %d");
  const getEndDate = gantt.date.date_to_str("%M, %d");
  return `${getStartDate(start)} - ${getEndDate(end)} ${task.text}`;
};

gantt.addTaskLayer({
  renderer: {
    render: (task) => {
      const size = gantt.getTaskPosition(task);
      const icon = document.createElement("i");
      const deleteIconSize = 20;
      const iconLeftIndent = size.left + size.width - deleteIconSize;
      
      icon.className = "fas fa-trash-alt delete-button";
      icon.style.left = `${iconLeftIndent}px`;
      icon.style.top = `${size.top}px`;

      icon.onclick = () => gantt.deleteTask(task.id);
      
      return icon;
    }
  }
})

gantt.init("gantt");
gantt.parse({
  data: model
});