no-stack-cli
============

[NoStack](https://www.nostack.net/) is a tool that automatically generates a 
secure and stable back end and even generates React code for your front end.

This CLI lets you take advantage of these capabilities. The CLI, as well as NoStack, are only being released in alpha at this point.

Features include:
* A simple language NoStack Flow Specification (NFS) Language for specifying 
the units of a user interface.
* Spinning up virtual stacks from flow specs within seconds
* Support for unlimited types of users sharing the same data
* Built in auth flow and strict access control
* Licenced hosting of virtual stacks
* Ability to pivot a flow quickly (some features pending)
* Planned exporting to files. 
* Generation of starter code on the front end

## Getting Started
To install the CLI, run the following:
```
npm install -g no-stack-cli
```
You can then run any of the commands as an argument to `nostack`.  For instance:
```
nostack callapi ...
```

The CLI is only useful if you have a NoStack licence.  You can apply for one on the [NoStack Website](https://www.nostack.net/), but currently they are
 only being awarded to alpha testers.

## Using the CLI
The CLI tool is created with the two goals of simplicity and flexibility.  You can use the CLI to perform any action possible with the NoStack API, so it is flexible.  But, most users will be able to get by with a few key commands.

Fundamentally, the CLI can do the following:
1. create a back end, called a "stack", using the `spinstack` command
2. create front end code, called an "app", in a specified directory that uses a stack, using the `makecode` command
3. make general NoStack api calls, using the `callapi` command.

In addition to being straightforward, the CLI simplifies things by seamlessly handling token refreshing once a "user" has logged in.  

*WARNING*: the CLI currently stores passwords in the directory `~/secure`, which (despite the name) is accessible by anyone who has access to your computer.  So it is your responsiblity to protect the computer where the CLI is used from anyone who might maliciously use that information. A future version might come up with a better approach, or at least allow you the option not to save a password.


### The quickstarter Command
There is a shortcut command to get started:
```
? nostack quickStarter -e ${email} -w ${password} -l ${license}  -u ${moderator} -s ${stackName} -a${appName} -t ${appFlow} -c ${userClass} -b ${appBase}
```

That will give you everything you need for your first app.  Note that
you will need to provide a licence.
 
The following parameters appear in `quickstarter`, and in other commands:
* -u <moderator>: the user name for the stack moderator 
* -w <password>: the password for the stack moderator
* -e <email>: the email that you want for the stack moderator 
* -l <license>: the licence string entitling you to a new stack  
* -s <stackName>: the name of the stack (note that it needs to be unique)
* -a <appName>: the name of the app.  (note that it must be all lowercase letters without spaces, but does not need to be unique)
* -t <appFlow>: a valid app flow specification file, including the path
* -c <userClass>: the type of user in the appFlow file for which the app will be created.
* -b <appBase> [OPTIONAL]: a directory containing an empty NoStack application.  See below for how to create one.

## Separate Steps for generating an App
The [quickstarter](#the-quickstarter-command) is a way to use the CLI for the first time, but you will probably need to know the commands for the separate steps that it uses.  The reason is that you'll probably want to reset and reuse the stack with a different app flow.

The four standard steps for creating an app for the first time are the following:
1. create a no-stack-app `nostack newapp -a <appName>`
2. create a new moderator and stack `nostack quickstarter -e <moderatorEmail> -w <password> -l <licenceId>  -u <moderatorName> -s <stackName>`
3. spin up stack (call from the same directory as step 1): `nostack spinstack -u <moderatorName> -t dir/to/appFlow/<appFlow> -s <stackName> -e <emailFor Moderator>`
4. generate code (call from the same directory as step 1): `nostack makecode -a <appName>`

The first step, `newapp` takes by far the most time to execute.  Not only does it call create-react-app,
but it installs every dependency, which can take 10 minutes.  Therefore, it pays to perform `newapp` one time to create an `appBase`.  Once you have an 
appBase, you can create a new app almost immediately by using the new appBase with 
the `-b` flag: 
```
? ns newapp -a app${currentNumber} -b ${appBase}`.
```
The best practice is usually to create one initially by calling this:
```
appBase=~/path/to/appbase
ns newapp -a ${appBase}
```
Then you can call it as you like.  The drawback of using an appBase is that if any of the dependencies change you will not benefit from the changes.

The [resources/appFlows](resources/appFlows) directory contains a few sample appFlows.  Currently, there is no repository, but one is planned.

## Getting help
If you are ever confused about the commands, run `nostack --help`. 
If you want to know the parameters for any command, just run the command with '--help'.
But relax--if you are missing one you will be told automatically.  :) 

## Further Reading
Check out the [Introduction to NoStack](resources/Documentation/IntroToNoStack.md)
for an explanation of how data is organized in the stack.

Then you can read about the [NFS Language](resources/Documentation/IntroToNoStack.md) to understand 
app flows and to create your own easily.





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
