no-stack-cli
============

Tools for stack generation from templates and an api.

## Getting Started
If you are ever confused about the commands, run `nostack --help`. 
If you want to know the parameters for any command, just run the command with '--help'.
But relax--if you are missing one you will be told.  :) 

The CLI tool is created with goals of both simplicity and flexibility.  You can
use the CLI to perform any action possible with the NoStack API if you need to.

The CLI currently requires that you specify information such as stack and userName 
as parameters via flags.

The four standard steps for creating an app for the first time are the following:
1. create a no-stack-app `nostack newapp -a <appName>`
2. create a new moderator and stack `nostack quickstarter -e <moderatorEmail> -w <password> -l <licenceId>  -u <moderatorName> -s <stackName>`
3. spin up stack (call from the same directory as step 1): `nostack spinstack -u <moderatorName> -t dir/to/template/<templateFile> -s <stackName> -e <emailFor Moderator>`
4. generate code (call from the same directory as step 1): `nostack makecode -a <appName>`

The first step by far takes the most time.  Not only does it call create-react-app,
but it installs every dependency, which can take 10 minutes.  Therefore, it pays to 
perform step (1) one time to create an `appBase`.  Once you have an 
appBase, you can create a new app almost immediately by using the new appBase with 
the `-b` flag: `ns newapp -a app${currentNumber} -b ${appBase}`.

The best practice is usually to create one initially by calling this:
```
appBase=~/path/to/appbase
ns newapp -a ${appBase}
```
Then you can call it as you like.  The drawback of using an appBase is that if any of the
dependencies change you will not benefit from the changes.

There is also a recommended shortcut command to get started:
`nostack quickStarter -e ${email} -w ${password} -l ${license}  -u ${moderator} -s ${stackName} -a${appName} -t ${appTemplate} -b ${appBase}`

That will give you everything you need for your first app.  Note that
you will need to provide a license and a template.  You can apply for a license at www.nostack.net. Documentation for
creating templates is in the pipeline right now.

The test directory contains a few sample templates in /test/testData/.

# A Working Introduction to NoStack
Understanding a few things makes working with NoStack Flows easier.

## Structure of Data
NoStack stores types of data and their instances.  Each instance contains an
  autogenerated id and a value.  
  
  For instance, you might have in your application a type
`restaurant` and it may have 300 instances, each of which has a name and
an autogenerated id.

Each type name must be unique within a given stack.  For instance, you can't have 
two types named `restaurant`.

Types have `dataTypes`.  Currently, the following dataTypes are supported:
* string (the default)
* number
* boolean
* grouping: a type that contains no value, but that groups other types.  For 
instance: a grouping `degree` may group `school`, `department`, `title`, `year`.

## Units
Interfaces for NoStack applications contain "units".  Every unit is stored with 
its own query.

A unit is fundamentally
a hierarchy of types.  For instance, a unit might contain at its
root restaurant, with cuisine and rating as children. Units also support various
types of associations among their types.

Any given type can only appear one time in a given unit.  That said, units can be
combined, so that a user interface, and it's underlying query, may 
contain the same data type used different
ways.

A unit also can include actions that can be performed with data.  Example include
updating a value, sending a message to a user, etc.

##  User Classes
A stack can be accessed by any number of user classes.  For instance,
a marketplace could have two classes: `buyer` and `seller`.  

There is an additional class called `moderator`.  Currently, only one moderator
account is permitted for a stack.  The moderator is automatically registered 
as each of the other user classes as well, so that they can log in as any of them.

Note that user classes are also types.  So for instance `buyer` and `seller` 
can appear in hierarchies of data contained in units.

## Authorization
Auth flow is built into NoStack applications. It is simple to use the CLI to create
 a starter app for any given user class.  Registration, logging in and out and
 sessions are taken care of for you.
 
Access to data is also controlled.  Every unit is owned by a single user class, 
which has access to that unit.  Nobody else does.  The moderator also can have
access to separate units, enabling control.

Data is owned by separate users unless it is specified as for the moderator type.
Nobody but the owner can modify data.  A moderator can also be permitted to 
enter data.  For instance, a moderator might own the standard `categories` for 
items sold in a marketplace, which makes it simple to update them as needed.

## Query details
As stated above, every unit naturally forms a query. 

* The hierarchy shows
how the data is joined.  
* One or more of the types in the unit are selected.  
A selected type  in a unit gets returned to 
   the front end.  It is analogous to a field that shows up in 
   the "SELECT" clause of an SQL query.
* One or more types may be constrained.
   A constraint limits the data returned. A unit and the type
     to be constrained must be specified.  Also, a constraint value
     is required.  That is normally a variable name which can
     then be set in front end code.  There are two types of
     costraints: ID and Value.  Constraining by id returns the
     instance having the id specified.  Constraining by value
     will return any instances that satisfy the condition
     provided.

     There are a few reserved words for constraints.  The main
     one is __currentUser__, which is the id for the current user.
     If you set the constraint value to __currentUser__, then
     the code generated will set it as such.  Otherwise, it's 
     just a string used for a variable name that gets set in
     the code. \[Note: the name that you give for the constraint
     value for an ID contraint is purely for code readability.]
     
 * Two units can be "connected", which will affect frontend
   code generated.  A connecting type must be shared between the
   units.  Usually, a connecting type will be a constrained
    type for the child unit.  When a unit A is connected to parent unit
   B, a component generated for B will contain A as a subcomponent
   with an instance for every instance of the connecting type.


## Creating App Flows

App flows are text files which contain series of declarations
 using the NoStack Flow Specification language (NFS).  Currently, they are
 plain text, but soon NoStack will support a more powerful and intuitive YAML
 file format.

A flow specification file treats each line as a different declaration.
Any line that does not begin with a reserved command word is ignored.

### NFS Commands
The commands are expected to change soon, but currently these are available:
* *resetStack* Resets a stack by removing everything in it.  The moderator remains.
  Warning: currently this also removes all of the users.

* *newUserClass \<class\>*  Specifies the class name.
* *newUnit  \<unit\> \<class\>* Specifies the unit name, and which call accesses it.
Note: a user class declaration also results in a 
type being created for the user class.  In other words, each
user is an instance of their class or classes.

* *newType \<type\> \<unit\> \<parent\> \[\<dataType> ] \[\<association type>]*
A type is declared, along with it's parent, in a given unit.  The string `__Root__`
is reserved to specify that the type is to be the root of the type hierarchy.
The dataType and association type are optional. The dataType by default is 
string, but can currently be number, boolean, or grouping, as described above. 

A type declaration can also optionally 
contain a association type.  Association types can specify whether 
a child is required for the parent (always exists) or not,
and the number of children for a type.  The default is not 
required and multiple.  Currently, the only declarable
association type is `singleRequired`, which is useful for 
declaring properties. `selectable` and `createable` are planned.

* *useType \<type\> \<unit\> \<parent\> \[\<data type> ] \[\<association type>]*
The useType command is the equivalent of newType, but is called for a type
already specified.  Currently, a useType creates a `searchable` association type,
which means that users will not be able to create new instances of the type, but
instead will choose from preexisting ones. 
* *newSelection \<unit> \<selected type>* Indicates a selected type for a unit.
* *newConstraint \<constraint value> \<unit> \<type> ID|Value* Indicates a
constrained type for a unit.  The constrained value is provided, along with
an indication of whether the type is constrained by ID (an exact match) or value
(a comparison match, where the value evaluate to true or false or any given instance
value).  Currently, only ID is supported.
* *connectUnits \<childSource\> \<parentSource\> \<connecting type\>* Shows
a means for connecting two sources, forming in effect one larger hierarchy.
The connecting type must be shared between the two of them currently.




[![Version](https://img.shields.io/npm/v/no-stack-cli.svg)](https://npmjs.org/package/no-stack-cli)
[![Downloads/week](https://img.shields.io/npm/dw/no-stack-cli.svg)](https://npmjs.org/package/no-stack-cli)
[![License](https://img.shields.io/npm/l/no-stack-cli.svg)](https://github.com/YizYah/no-stack-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g no-stack-cli
$ nostack COMMAND
running command...
$ nostack (-v|--version|version)
no-stack-cli/0.2.5 linux-x64 node-v12.11.1
$ nostack --help [COMMAND]
USAGE
  $ nostack COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nostack callapi`](#nostack-callapi)
* [`nostack createstack`](#nostack-createstack)
* [`nostack help [COMMAND]`](#nostack-help-command)
* [`nostack makecode`](#nostack-makecode)
* [`nostack newapp`](#nostack-newapp)
* [`nostack quickstarter`](#nostack-quickstarter)
* [`nostack resetstack`](#nostack-resetstack)
* [`nostack spinstack`](#nostack-spinstack)

## `nostack callapi`

Make a call to the nostack api. Takes care of auth for the user. You need to specify a file with the graphql query and another one with a json of the variables, if anyare used.

```
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

_See code: [src/commands/callapi.ts](https://github.com/YizYah/no-stack-cli/blob/v0.2.5/src/commands/callapi.ts)_

## `nostack createstack`

Creates a new moderator and stack.  Also logs in the moderator locally.

```
USAGE
  $ nostack createstack

OPTIONS
  -e, --email=email          moderator email
  -f, --force
  -h, --help                 show CLI help
  -l, --licenseId=licenseId  license id for the organization of the user
  -s, --stack=stack          stack
  -u, --user=user            moderator to create
  -w, --password=password    moderator password

EXAMPLE
  $ nostack createStack -u franky -s tempstack, -e franky@gmail.com -w franky12$
```

_See code: [src/commands/createstack.ts](https://github.com/YizYah/no-stack-cli/blob/v0.2.5/src/commands/createstack.ts)_

## `nostack help [COMMAND]`

display help for nostack

```
USAGE
  $ nostack help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `nostack makecode`

generates a starter app from a json provided by NoStack

```
USAGE
  $ nostack makecode

OPTIONS
  -a, --appName=appName  application name
  -f, --force
  -h, --help             show CLI help
```

_See code: [src/commands/makecode.ts](https://github.com/YizYah/no-stack-cli/blob/v0.2.5/src/commands/makecode.ts)_

## `nostack newapp`

create an empty new no-stack app.  Effectively combines create-react-app with apollo stuff and the no stack package.

```
USAGE
  $ nostack newapp

OPTIONS
  -a, --appName=appName  name of application
  -b, --baseApp=baseApp  directory of the base app to copy. If it does not exist, it is created.
  -h, --help             show CLI help
```

_See code: [src/commands/newapp.ts](https://github.com/YizYah/no-stack-cli/blob/v0.2.5/src/commands/newapp.ts)_

## `nostack quickstarter`

Creates a new moderator and stack.  Also logs in the moderator locally.

```
USAGE
  $ nostack quickstarter

OPTIONS
  -a, --appName=appName      name of application
  -b, --baseApp=baseApp      directory of the base app to copy. If it does not exist, it is created.
  -e, --email=email          moderator email
  -f, --force
  -h, --help                 show CLI help
  -l, --licenseId=licenseId  license id for the organization of the user
  -s, --stack=stack          stack
  -t, --template=template    template from which to spin up a stack
  -u, --user=user            moderator to create
  -w, --password=password    moderator password

EXAMPLE
  $ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$
```

_See code: [src/commands/quickstarter.ts](https://github.com/YizYah/no-stack-cli/blob/v0.2.5/src/commands/quickstarter.ts)_

## `nostack resetstack`

Resets the stack, meaning that the moderator remains and the stack is completely empty.  Essentially returns the status to before 'spinstack'.  WARNING: this is not reversable and will remove EVERYTHING, including your users!!!!

```
USAGE
  $ nostack resetstack

OPTIONS
  -h, --help         show CLI help
  -s, --stack=stack  stack
  -u, --user=user    moderator for stack
```

_See code: [src/commands/resetstack.ts](https://github.com/YizYah/no-stack-cli/blob/v0.2.5/src/commands/resetstack.ts)_

## `nostack spinstack`

Spins up a fully functional backend from a provided template.  The same template can then be used to generate front end code using the command 'makeCode'.

```
USAGE
  $ nostack spinstack

OPTIONS
  -a, --appName=appName          application name
  -e, --email=email              email to be used by sample users
  -h, --help                     show CLI help
  -s, --stack=stack              stack
  -t, --template=template        template from which to spin up a stack
  -u, --user=user                moderator for stack
  -x, --addedSuffix=addedSuffix  added suffix for sample instances generated
```

_See code: [src/commands/spinstack.ts](https://github.com/YizYah/no-stack-cli/blob/v0.2.5/src/commands/spinstack.ts)_
<!-- commandsstop -->
