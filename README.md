no-stack-cli
============

Tools for stack generation from templates and an api.

## Getting Started
If you are ever confused about the commands, run `nostack --help`. 
If you want to know the parameters for any command, just run the command with '--help'.
But relax--if you are missing one you will be told.  :) 

The four standard steps for creating an app are the following:
1. create a no-stack-app `nostack newapp -a <appName>`
2. create a new moderator and stack `nostack quickstarter -e <moderatorEmail> -w <password> -l <licenceId>  -u <moderatorName> -s <stackName>`
3. spin up stack (call from the same directory as step 1): `nostack spinstack -u <moderatorName> -t dir/to/template/<templateFile> -s <stackName> -e <emailFor Moderator>`
4. generate code (call from the same directory as step 1): `nostack makecode -a <appName>`

There is also a recommended shortcut command to get started:
`nostack quickStarter -e ${email} -w ${password} -l ${license}  -u ${moderator} -s ${stackName} -a${appName} -t ${appTemplate}`

That will give you everything you need for your first app.  Note that
you will need to provide a license and a template.  You can apply for a license at www.nostack.net. Documentation for
creating templates is in the pipeline right now.

The test directory contains a few sample templates in /test/testData/.

## NoStack Concepts
It is useful to understand two things:
1. NoStack stores types of data and their instances.  Instances contain an
  autogenerated id and a value.  For instance, you might have in your application a type
`restaurant` and it may have 300 instances, each of which has a name and
an autogenerated id.
2. types are declared and used in "sources".  A source is fundamentally
a hierarchy of types.  For instance, a source might contain at its
root restaurant, with cuisine and rating as children.

Also, every source is assigned to a given user class, and a generated
server has auth built in.

More details are given in the "Creating Templates" section below.

## Creating Templates

The templates are text files which contain series of declarations
 using the NoStack Flow Specification language (NFS).  

An template file treats each line as a different declaration.
Any line that does not begin with a reserved command word is ignored.

### NFS Commands
The commands are expected to change soon, but currently these are available:
* newUserClass \<class\>
* newSource  \<source\> \<class\>
* newType \<type\> \<source\> \<parent\> \[\<data type> ] \[\<association type>] 
* newSelection \<source> \<selected type>
* newConstraint \<constraint value> \<source> \<type> ID|Value
* connectSources \<childSource\> \<parentSource\> \<connecting type\>

## Command Explanations
*newUserClass* A user class is a type of user.  A source is an interface unit that
is permitted to a user class.  A source contains a hierarchy of
types, starting from some root type.  A source also can include
actions that can be performed with data.

Types are loosely data entities and/or properties.  A type
declaration contains the name of the type and a parent type.
\[Important note: a user class declaration also results in a 
type being created for the user class.  In other words, each
user is an instance of their class or classes.] By default,
a type is a string.  But optionally a type can be set.  
Currently, only booleans and strings are supported, but that
will change soon.  

A type declaration can also optionally 
contain a association type.  Association types can specify whether 
a child is required for the parent (always exists) or not,
and the number of children for a type.  The default is not 
required and multiple.  Currently, the only declarable
association type is singleRequired, which is useful for 
declaring properties.

A selection means a type in a source that gets returned to 
the front end.  It is analagous to a field that shows up in 
the "SELECT" clause of an SQL query.

A constraint limits the data returned. A source and the type
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
  
Two sources can be "connected", which will affect frontend
code generated.  A connecting type must be shared between the
sources.  Usually, a connecting type will be a constrained
 type for the child source.  When a source A is connected to parent source
B, a component generated for B will contain A as a subcomponent
with an instance for every instance of the connecting type.


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
no-stack-cli/0.0.7 linux-x64 node-v12.10.0
$ nostack --help [COMMAND]
USAGE
  $ nostack COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nostack create`](#nostack-create)
* [`nostack createStack [FILE]`](#nostack-createstack-file)
* [`nostack help [COMMAND]`](#nostack-help-command)
* [`nostack makecode`](#nostack-makecode)
* [`nostack newapp`](#nostack-newapp)
* [`nostack quickstarter [FILE]`](#nostack-quickstarter-file)
* [`nostack spinstack`](#nostack-spinstack)

## `nostack create`

A general command for creating stack elements.  Warning: not yet maintained.  The bash version was developed and this is planned for the near future...

```
USAGE
  $ nostack create

OPTIONS
  -h, --help           show CLI help
  -l, --level=level    level to create
  -p, --parent=parent  the item in the level above for which we will create something on this level
  -s, --stack=stack    stack
  -u, --user=user      user making request
  -v, --value=value    value to create
```

_See code: [src/commands/create.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.7/src/commands/create.ts)_

## `nostack createStack [FILE]`

Creates a new moderator and stack.  Also logs in the moderator locally.

```
USAGE
  $ nostack createStack [FILE]

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

_See code: [src/commands/createStack.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.7/src/commands/createStack.ts)_

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

_See code: [src/commands/makecode.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.7/src/commands/makecode.ts)_

## `nostack newapp`

create an empty new no-stack app.  Effectively combines create-react-app with apollo stuff and the no stack package.

```
USAGE
  $ nostack newapp

OPTIONS
  -a, --appName=appName  name of application
  -h, --help             show CLI help
```

_See code: [src/commands/newapp.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.7/src/commands/newapp.ts)_

## `nostack quickstarter [FILE]`

Creates a new moderator and stack.  Also logs in the moderator locally.

```
USAGE
  $ nostack quickstarter [FILE]

OPTIONS
  -a, --appName=appName      name of application
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

_See code: [src/commands/quickstarter.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.7/src/commands/quickstarter.ts)_

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

_See code: [src/commands/spinstack.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.7/src/commands/spinstack.ts)_
<!-- commandsstop -->
