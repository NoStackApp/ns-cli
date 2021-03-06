The stack.json File
===============
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  

- [File Location](#file-location)
- [Useful Info](#useful-info)
- [File Elements](#file-elements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

A pivotal file, and very useful resource, is the `stack.json` file, generated by a call to `nostack spinstack`.  

Before learning this, it is recommended to read the [Introduction to NoStack Data](./IntroToNoStack.md)
to understand the elements of the `stack.json` file.


# File Location
This file gets inserted into the directory with the name specified for the app using the `-a` parameter in `spinstack`.  

The normal approach is call `spinstack` from the parent directory of a folder generated using the `nostack newapp` command.  You could call `spinstack` from anywhere you like, but if the directory specified in `-a` does not exist then it will be generated.

You can call `spinstack` as many times as you like--each time it will replace the `stack.json` file.  Note that this is useful if you begin your NFS file with a call to `resetstack`, which will allow you to generate from the same file many times.  That lets you pivot your stack easily.

# Useful Info
The file shows:
 * all of the userClasses, types, units, and their ids.
 * metadata about the stack and its moderator
 * sample data generated for testing purposes.
 
 The file is in fact used to generate front end apps using `nostack makecode`.

# File Elements
The file is a json, of the following format:

*  "userClasses": a list of userClasses.
*  "sources": a list of units.
*  "types": a list of types.  The types have a section "sources" that shows information about the assn for a given typeName in each of its units.
*  "actions": a list of actions.  Actions are grouped by action typeName.  See [Actions](NoStackApi.md#Actions). 
*  "stack": a list of stack metadata.

[Note: the alpha version calls units "sources" in the `stack.json` file.  The plan is to change that to "units" in a future release.]

Each section contains structured information that gives you everything you need to know to make [API calls](NoStackApi.md).  In particular, just about everything in the JSON has an "id" key, useful for api calls. Sample instances are brought for types and userClasses under "samples".

There is a lot more in the file, much of which is not critical to understand.  But the topdown JSON format makes it easy to find what you need.

[Return to Main Document](../../README.md)
