# The NoStack Flow Specification (NFS) Language
App flows are text files which contain series of declarations
 using the NoStack Flow Specification language (NFS).  Currently, they are
 plain text, but soon NoStack will support a more powerful and intuitive YAML
 file format.

Before learning this, it is recommended to read the [Introduction to NoStack](./IntroToNoStack.md)
to understand the commands in NFS.

## Creating App Flows

A flow specification file treats each line as a different declaration.
Any line that does not begin with a reserved command word is ignored.

### NFS Commands
The commands are expected to change soon, but currently these are available. NoStack has built a lot of checks for syntactic errors into the system, so you need not worry too much--if there's a mistake, you'll probably hear about it right away.
```
resetStack
```
Resets a stack by removing everything in it.  The moderator remains.
  Warning: currently this also removes all of the users. A version is planned that will allow you to choose whether to retain the users, and/or the data.

```
newUserClass <class>
```
Specifies a new userClass, e.g. `newUserClass buyer`
NOTE: a user class declaration also results in a 
type being created for the user class.  In other words, each
user is an instance of their class or classes.

```
newUnit  <unit> <class>
```
Specifies the unit name, and which userClass can access it.  Every unit is currently assigned to exactly one userClass.  As explained in the [Introduction to NoStack](./IntroToNoStack.md), a unit supports a portion of the user interface for the given userClass.

```
newType <type> <unit> <parent> [<dataType ] [<association type>] [<source>]
```
This command declares a type, along with it's parent, in the given unit.

The parent must be provided in the declaration.  But the string `__Root__`
is reserved to specify that the type is to be the root of the type hierarchy.

The dataType and association type are optional. The dataType by default is 
`string`, but can currently be `number`, `boolean`, or `grouping`.  A `grouping` has no value, but combines other types together that have values.  For instance, an app that keeps track of employment history may have a `position` grouping, which includes `company`, `title`, `startDate`, and `endDate`.

A type declaration can also optionally 
contain a association type.  Association types currently supported include:
* singleRequired: a property of the parent.  It has no children and only one value.
* multiple (the default assn type): each parent instance can have several child instances.  A user who owns the parent instance can create new child instances, as well as update and delete them.
* selectable: This is the same as multiple, except that the user cannot create new children; rather, the user selects from an existing list.  
[Note that selectable is not yet implemented.] The `<source>` parameter is relevant only to a selectable type, and is another unit.


Calling newType for a type that has been declared already throws an error.
```
useType <type> <unit> <parent>  [<dataType ] [<association type>] [<source>]
```
The useType command is the equivalent of newType, but is called for a type
already specified.  If the type has not been specified, NoStack returns an error.

Currently, a useType creates a `searchable` association type,
which means that users will not be able to create new instances of the type, but
instead will choose from preexisting ones. (See `newType` above). 

```
newSelection <unit> <selected type>
```
Indicates a selected type for a unit.
See [Introduction to NoStack](./IntroToNoStack.md).

```
newConstraint <constraint value> <unit> <type> ID|Value
```
Indicates a constrained type for a unit.  The constrained value is provided, along with an indication of whether the type is constrained by ID (an exact match) or value (a comparison match, where the value evaluate to true or false or any given instance value).  Currently, only ID is supported.

```
connectUnits <childSource> <parentSource> <connecting type>
```
Shows a means for connecting two sources, forming in effect one larger hierarchy.
The connecting type must be shared between the two of them currently.

Connecting units does not affect the stack or the back end, but changes the front end app that gets developed.  Connecting is useful in a number of situations:
* If you want to use the same type more than once in a single query.  Since a single unit can only use a given type once, the way to do this is to combine units that share the type.
* When separate queries would be more efficient.  A common example is when a user is not expected to want to see the children of more than one of a given type of info at once.  For instance, an app that shows events organized by category might create a separate unit to show the specific events, because the user is likely to seek only events of a desired category.

## Creating the files
The best place to start is to check out some of the samples in the [resources/appFlows](resources/appFlows) directory of this package. You can copy one, use it with `spinstack`, and then modify it as you like.

Remember that these are just text files.  You can easily create templates and use string replacement to generate one that works for your needs.

NoStack plans on creating a repository soon, with both samples and templates. If you have ideas, samples or requests, please send them to info@nostack.net.

[Return to Main Document](../../README.md)
