### USER CLASS ###
newUserClass buyer
newUserClass seller

### UNITS ###
newUnit  offerings seller
newUnit  productSearch buyer

#connectUnits projectInfo projectsForUser project

### TYPES ###
newType product offerings seller
newType toDo projectInfo project
newType team projectInfo project
newType isCompleted projectInfo toDo boolean singleRequired

### SELECTIONS ###
newSelection projectsForUser project
newSelection projectInfo toDo
newSelection projectInfo isCompleted

### CONSTRAINTS ###
newConstraint __currentUser__ projectsForUser user ID
newConstraint currentProjectId projectInfo project ID


