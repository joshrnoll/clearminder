function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

export class Project {
  constructor(name, goal, dueDate, nextActions){
    this.id = getRandomNumber(100000);
    this.name = name;
    this.goal = goal;
    this.nextActions = nextActions;
    this.dueDate = dueDate;
    this.complete = false;
  }
}

export class NextAction {
  constructor(name, context, dueDate, linkedProjects){
    this.id = getRandomNumber(100000);
    this.name = name;
    this.context = context;
    this.dueDate = dueDate;
    this.linkedProjects = linkedProjects;
    this.complete = false;
  }
}

export class SomedayMaybe {
  constructor(name){
    this.name = name
  }
}


export class Stupf {
  constructor(stupf){
    this.stupf = stupf;
  }
}