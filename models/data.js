const model = [
  { id: 1, text: "Project #1", type: "project", start_date: "01-04-2021", duration: 18, open: true, owner_id:1 },
	{ id: 2, text: "Task #1", start_date: "02-04-2021", duration: 8, progress: 0.75, parent: 1, owner_id:2},
  { id: 3, text: "Task #2", start_date: "15-05-2021", duration: 8, progress: 0.91, parent: 1, owner_id: 3 },
  { id: 4, text: "Task #3", start_date: "10-05-2021", duration: 5, progress: 0.8, parent: 1, owner_id: 2 },
  { id: 5, text: "Task #4", start_date: "13-05-2021", duration: 4, progress: 1, parent: 1, owner_id: 1 },
  { id: 6, text: "Project #2", type: "project", start_date: "01-04-2021", duration: 18, open: true, owner_id: 4 },
  { id: 7, text: "Task #2.1", start_date: "02-04-2021", duration: 8, progress: 0.4, parent: 6, owner_id:2},
  { id: 8, text: "Task #2.2", start_date: "9-04-2021", duration: 8, progress: 0.1, parent: 6, owner_id: 3 },
  { id: 9, text: "Task #2.3", start_date: "10-04-2021", duration: 5, progress: 1, parent: 6, owner_id: 2 },
]

export default model; 