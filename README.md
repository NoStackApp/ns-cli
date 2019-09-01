no-stack-cli
============

Tools for stack generation from templates and an api.

The standard steps for creating an app are the following:
1. create the no-stack-app `ns2 newapp -a app275`
2. create a new moderator and stack `ns2 quickstarter -e rlj613@gmail.com -w letMeIn1! -l <licencId>  -u irnold275 -s TestStack275`
3. spin up stack: `ns2 spinstack -u irnold275 -t /home/yisrael/projects/ns-cli/test/testData/websiteTemplate.txt -s TestStack275 -e sampleEmail@gmail.com`
4. generate code: `ns2 makecode -a app275`

To do this, you'll need a licence.  You can apply for one at www.nostack.net.


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
no-stack-cli/0.0.0 linux-x64 node-v12.8.1
$ nostack --help [COMMAND]
USAGE
  $ nostack COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nostack create`](#nostack-create)
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

_See code: [src/commands/create.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.0/src/commands/create.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

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

_See code: [src/commands/makecode.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.0/src/commands/makecode.ts)_

## `nostack newapp`

create an empty new no-stack app.  Effectively combines create-react-app with apollo stuff and the no stack package.

```
USAGE
  $ nostack newapp

OPTIONS
  -a, --appName=appName  name of application
  -h, --help             show CLI help
```

_See code: [src/commands/newapp.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.0/src/commands/newapp.ts)_

## `nostack quickstarter [FILE]`

Creates a new moderator and stack.  Also logs in the moderator locally.

```
USAGE
  $ nostack quickstarter [FILE]

OPTIONS
  -e, --email=email          moderator email
  -f, --force
  -h, --help                 show CLI help
  -l, --licenseId=licenseId  license id for the organization of the user
  -s, --stack=stack          stack
  -u, --user=user            moderator to create
  -w, --password=password    moderator password

EXAMPLE
  $ nostack quickstarter -u franky -s tempstack, -e franky@gmail.com -w franky12$
```

_See code: [src/commands/quickstarter.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.0/src/commands/quickstarter.ts)_

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

_See code: [src/commands/spinstack.ts](https://github.com/YizYah/no-stack-cli/blob/v0.0.0/src/commands/spinstack.ts)_
<!-- commandsstop -->
