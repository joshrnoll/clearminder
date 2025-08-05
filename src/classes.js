  export class Project {
    constructor(name, goal, dueDate, startDate, endDate, nextActions){
      this.name = name;
      this.goal = goal;
      Array.isArray(nextActions) ? this.nextActions = nextActions : this.nextActions = [];
      this.dueDate = dueDate;
      this.startDate = startDate;
      this.endDate = endDate;
      this.complete = false;
    }
  }

  export class NextAction {
    constructor(name, context, dueDate, startDate, endDate, linkedProjects){
      this.name = name;
      this.context = context;
      this.dueDate = dueDate;
      this.startDate = startDate;
      this.endDate = endDate;
      Array.isArray(linkedProjects) ? this.linkedProjects = linkedProjects : this.linkedProjects = [];
      this.complete = false;
    }
  }

  // export class Calendar {

  // }