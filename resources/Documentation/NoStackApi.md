The NoStack API
==============
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  

- [API calls](#api-calls)
- [callapi](#callapi)
- [Queries and Variables](#queries-and-variables)
  - [Playground Queries and Variables](#playground-queries-and-variables)
  - [Callapi Files](#callapi-files)
- [Key API Queries](#key-api-queries)
    - [End User Calls](#end-user-calls)
      - [Getting Unit Data.](#getting-unit-data)
      - [Actions](#actions)
        - [CreateAction](#createaction)
        - [ExecuteAction](#executeaction)
    - [Stack Building Mutations](#stack-building-mutations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Everything that NoStack creates for a stack uses the API.  You actually *could* create everything by hand or using your own scripts without using an NFS file and `spinstack`.  That's unlikely to be necessary, but you are likely at some point to want to test some things for a stack or build some things by hand.

Before reading this, it is recommended to read the [Introduction to NoStack Data](./IntroToNoStack.md)
to understand what the commands below are achieving.

# API calls
NoStack uses a [GraphQL](https://graphql.org/learn/) api.  You can become acquainted with the API interactively through the Playground at [https://api.matchlynx.com/]https://api.matchlynx.com/.  

That will let you inspect a lot of options and give you an overview.  But, when it comes to making calls, the Playground requires that you keep your access token updated, and it expires every hour.  So probably the simplest way to get to know the API is through making calls directly using the CLI's [callapi](#callapi) command.

You will probably have to refer to ids.  You can find ids for just about everything in your [stack.json](stack.json.md) file.

# callapi
Try calling
```
nostack callapi -h
``` 
to get help for the command.  You'll get something like this:
```
Make a call to the nostack api. Takes care of auth for the user. You need to specify a file with the graphql query and another one with a json of the variables, if anyare used.

USAGE
  $ nostack callapi

OPTIONS
  -h, --help                         show CLI help
  -q, --queryFile=queryFile          graphql file containing a single query
  -s, --stack=stack                  stack
  -u, --user=user                    moderator for stack
  -v, --variablesFile=variablesFile  json file with query variables

EXAMPLE
  $ nostack callapi -u irnold1y -s TestStack1y -q ~/projects/no-stack-queries/queries/unitData1y.graphql -v 
  ~/projects/no-stack-queries/variables/unitData1y.json
```
The nice thing about `callapi` is that you don't have to worry about updating your access tokens, or even your refresh tokens.  If you log in a user once, the login info and tokens are stored in your `~/secure` directory.  Specifically, for a stack `mystack` and a user `user1`, there will be a json file generated `~/secure/noStackInfo/mystack/user1.json` that will contain all of user1's login info. From that point, you will be able to call commands of the form
> $ nostack callapi -u user1 -s mystack -q <queryFile> -v 
    <variableFile>

with seamless updating of tokens. 

**HUGE WARNING: in the alpha version, there is *NO ENCRYPTION* at all--anyone with access to your computer can access that information.**  

When you log in, you currently must provide the stackId.  You can find that in your stack.json file (generated when you run the CLI command `spinstack`, at the end in the `stack` section).

In general, the stack.json file is invaluable for making API queries, because you can find ids there for just about everything.  The file is organized in a fairly straightforward way.  Best of all, sample data  

# Queries and Variables
As with any graphql api, the NoStack API lets you specify a query and pass in the parameters separately.  

## Playground Queries and Variables
In the [Playground Interface]https://api.matchlynx.com/, you can see that the query gets written in the top left panel, and the bottom left (with the title `QUERY VARIABLES`) lets you insert whatever variables you need.  The variables take the form of a JSON.

## Callapi Files
In the `callapi` command, both the query and the variable are provided as text files:
> $ nostack callapi -u <userName> -s <stackName> -q <queryFile> -v 
    <variableFile>

* The query file shows a graphQl query, possibly with parameters that get provided in the variable file.  The NoStack convention is to use the `.gql` extension with graphql query files.
* The variable file shows a JSON with each parameter as a key.  The NoStack convention is to use the `.gql` extension with parameter files.

 You must specify the path to each.  
 
 ## Sample Files
 You can find samples of both in [resources/queries](../queries).  Specifically:
  * query files are stored in [resources/queries/queryFiles](../queries/queryFiles)
  * variable files are stored in [resources/queries/variables](../queries/variables)
  
In these samples, a single query file may be used with multiple variable files, so the variable files are usually stored in subdirectories with the name of the query that they use.

# Key API Queries
The API is currently very extensive,and in fact the alpha version still has several calls that will probably be phased out.  But there are some that are likely to be relevant to you.

Two types of queries are covered below:
1. [End User Calls](#end-user-calls)
2. [Stack Building Mutations](#stack-building-mutations)

### End User Calls
These calls are likely to end up in your front end apps.

#### Getting Unit Data.
The **unitData** query is the main one returned for a unit.  The generated front end code always calls unitData.

You can call it directly and examine the results for any unit that you create.  Check out the [sample unitData query file](../queries/queryFiles/unitData.gql) and some [sample unitData variable files](../queries/variables/unitData).

#### Actions
Actions are in effect virtual API endpoints for your own stack.  An action allows a type of user to do or request something.  Of course, this is useful for modifying data, but also for other actions.

Actions have specific `actionTypes`.  \[Note: the alpha version doesn't support many actions yet, but a lot of them are planned.\]

Actions are by default restricted to their userTypes.  If you want an action to be unrestricted, meaning that anyone can perform them, then you can specify `"unrestricted":"true` in both the creation and the execution.

You can create and delete actions using the NoStack API, and you can also execute them and view the results.

##### CreateAction
The **CreateAction** mutation allows you to specify a new action.  You have to provide parameters, including:
* "actionType": one of the permitted types. 
* "actionName": a string for humans that specifies what your action will achieve e.g. "Contact Supervisor"
*   "userClassId": the id for the userClass to perform the action.  TIP: find ids in your stack.json file in 'userClasses', which is that the beginning.
*  "actionParameters": a list of relevant parameters for the action type.  The good news is that if you are missing one NoStack will tell you.

A call to `CreateAction` returns an id that can subsequently be used in calls to `ExecuteAction`. 

See the [sample createAction query file](../queries/queryFiles/createAction.gql) and some [sample unitData variable files](../queries/variables/createAction).

##### ExecuteAction
The **ExecuteAction** mutation allows you to run an action as it would be run by an enduser.  

The parameters are as follows:
*  "actionId": the id returned from a createAction call.  Note that the `stack.json` file also contains the id for each action.
*  "executionParameters": a list of relevant parameters for the action type.  As with `CreateAction`, if you are missing one NoStack will tell you.

If you execute an unrestricted action, you must specify `"unrestricted":"true"` as well.

See the [sample executeAction query file](../queries/queryFiles/executeAction.gql) and some [sample unitData variable files](../queries/variables/executeAction).

### Stack Building Mutations
These calls build the core of a stack.  If you do not want to be limited to `nostack spinstack` you can use them directly.

Some major ones include:
* ResetStack: removes everything but the moderator.  The same as a call to `resetStack` in an NFS file.
* CreateUserClass
* AddType
* AddRootType
* AddAssn
* AddUserPlatform
* AddInstance
* RemoveInstance

You can see the documentation for these at the [API Playground](https://api.matchlynx.com/).  Clicking on DOCS will let you examine the parameters needed for each.      	
 


[Return to Main Document](../../README.md)
