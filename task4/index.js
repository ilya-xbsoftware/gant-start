import model from "../models/data.js";

gantt.attachEvent("onParse", () => refreshProgressInProject())
gantt.attachEvent("onAfterTaskUpdate", () => refreshProgressInProject())
gantt.attachEvent("onTaskDrag", () => refreshProgressInProject());
gantt.attachEvent("onAfterTaskAdd", () => refreshProgressInProject());

gantt.templates.progress_text = function (start, end, task) {
  const progressInInterest = Math.round(task.progress * 100);
  return `<span class='progress_interest'>${progressInInterest}%</span>`;
};

gantt.init("gantt");
gantt.parse({
  data: model,
  links: [
    {
      id: "2",
      source: 3,
      target: 5,
      type: 1
    },
  ]
});

function getTasksProgress() {
  const tasksProgressInProjects = [];

  gantt.eachTask((task) => {
    const lastIndexInArray = tasksProgressInProjects.length - 1
    const isItProject = task.type === "project";
    if (isItProject) {
      tasksProgressInProjects.push({
        projectId: task.id,
        progress: []
      })
    } else {
      tasksProgressInProjects[lastIndexInArray].progress.push(task.progress)
    }
  })

  return tasksProgressInProjects;
}

function getAvarageSummArray() {
  const progressData = gantt.serverList("tasksProgress");
  const summReducer = (acc, currentValue) => acc + currentValue;
  
  const avarageSumm = progressData.map((project) => {
    const summ = project.progress.reduce(summReducer);
    const progressLength = project.progress.length;

    return summ / progressLength;
  });

  return avarageSumm;
}

function setProgressToProject() {
  const progressData = gantt.serverList("tasksProgress");
  const avarageSumm = getAvarageSummArray();

  progressData.forEach((progress, index) => {
    const projectId = progress.projectId;
    const project = gantt.getTask(projectId);

    project.progress = avarageSumm[index];
    gantt.refreshTask(projectId);
  });
}

function refreshProgressInProject() {
  gantt.serverList("tasksProgress", getTasksProgress());
  setProgressToProject();
}