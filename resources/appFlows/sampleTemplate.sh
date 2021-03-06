resetStack

### USER CLASS ###
newUserClass user

### UNITS ###
newUnit  projectSource user
newUnit  toDoSource user

### TYPES ###
useType user projectsForUser __Root__ multiple
newType project projectSource user
newType toDo toDoSource project
newType isCompleted toDoSource toDo boolean singleRequired

### SELECTIONS ###
newSelection projectSource project
newSelection toDoSource toDo
newSelection toDoSource isCompleted

### CONSTRAINTS ###
newConstraint __currentUser__ projectSource user ID
newConstraint currentProjectId toDoSource project ID

connectUnits toDoSource projectSource project


