import {formTypes} from '../../constants'

const Handlebars = require('handlebars')
const H = require('just-handlebars-helpers');

H.registerHelpers(Handlebars);

export const functionDec = Handlebars.compile(`

// ns__custom_start {{tempDetails}} beforeFunction
// ns__custom_end {{tempDetails}} beforeFunction

// ns__start_section {{tempDetails}} function
{{#if (eq boilerPlateInfo.formType '${formTypes.CREATION}') }}
function {{SingularName}}CreationForm({
  {{SingularParentName}}Id,
  create{{SingularName}}{{SINGLE_CHILDREN_PARAMS}},
  refetchQueries,
  // ns__custom_start {{tempDetails}} addedProps
  // ns__custom_end {{tempDetails}} addedProps
}) {
  const [ {{instance}}Value, update{{SingularName}}Value ] = useState('');
  const [ loading, updateLoading ] = useState(false);
// ns__custom_start {{tempDetails}} beginning
  /* any special declarations etc. */
// ns__custom_end {{tempDetails}} beginning

    // ns__start_section handleChange
  function handleChange(e) {
    update{{SingularName}}Value(e.target.value);
  }
  // ns__end_section handleChange

  // ns__start_section handleSubmit
  async function handleSubmit(e) {
    e.preventDefault();

    if (!{{instance}}Value) {
      return;
    }

    updateLoading(true);

    const create{{SingularName}}Response = await create{{SingularName}}({
      variables: {
        actionId: CREATE_{{typeSpecifier}}_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: {{SingularParentName}}Id,
          value: {{{instance}}}Value,
        }),
        unrestricted: false,
      },
      {{refetchQueriesLine}}
    });

    {{{SINGLE_CHILDREN_CREATION_CODE}}}

    update{{SingularName}}Value('');
    updateLoading(false);
  }
  // ns__end_section handleSubmit

  // ns__start_section handleKeyPress
  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }
  // ns__end_section handleKeyPress


  // ns__custom_start {{tempDetails}} beforeReturn
  // ns__custom_end {{tempDetails}} beforeReturn

  // ns__start_section return
  return (
    < Form>
          <label htmlFor='{{instance}}-value'>
        {{SingularName}}:
        <input
          id='{{instance}}-value'
          type='text'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ {{instance}}Value }
          disabled={loading}
        />
      </label>
      <Button type='submit'  disabled={loading}  onClick={handleSubmit}>
        {loading ? 'Creating {{SingularName}}...' : 'Create {{SingularName}}'}
      </Button>
    </Form>
  );
  // ns__end_section return

}

{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.LIST}') }}
class {{PluralName}} extends Component {
// ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: beginning
  /* any special declarations etc. */
// ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: beginning
  state = {
    selected{{SingularName}}Id: null,
      // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedState
      // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedState
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: componentDidMount
    // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: componentDidMount
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: componentWillUnmount
    // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: componentWillUnmount
  }

  handleClick = (e) => {
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selected{{SingularName}}Id: null });
    }
  };

  handleSelect = (id) => this.setState({ selected{{SingularName}}Id: id });

  render () {
    const { {{SingularParentName}}Id, {{PluralNameLowercase}}, refetchQueries, onUpdate } = this.props;
    const { selected{{SingularName}}Id } = this.state;

    // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: renderBeginning
    // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: renderBeginning

    return (
      <{{PluralName}}StyleWrapper
        ref={this.wrapperRef}
        onClick={this.handleClick}
      >
        <{{SingularName}}CreationForm
          parentId={ {{SingularParentName}}Id }
          refetchQueries={refetchQueries}
          // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedPropsForCreationForm
          // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedPropsForCreationForm
        />

  {/* ns__start_section listElements */}
  { {{PluralNameLowercase}}.map(({{SingularNameLowercase}}) => (
          <{{SingularName}}
            key={v4()}
            {{SingularNameLowercase}}={ {{SingularNameLowercase}} }
            selected={ {{SingularNameLowercase}}.id === selected{{SingularName}}Id }
            onUpdate={onUpdate}
            parentId={ {{SingularParentName}}Id }
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
            // ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: addedPropsForChildren
            // ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: addedPropsForChildren
          />
        )) }
  {/* ns__end_section listElements */}

  {/* ns__custom_start unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}
  {/* ns__custom_end unit: {{Unit}}, comp: {{PluralName}}, loc: renderEnding */}

  </{{PluralName}}StyleWrapper>
  );
  }
}

{{/if}}
{{#if (eq boilerPlateInfo.formType '${formTypes.SINGLE_INSTANCE}') }}
function {{component}}({
  {{instance}},
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  // ns__custom_start {{tempDetails}} addedProps
  // ns__custom_end {{tempDetails}} addedProps
}) {
  const [{{instance}}Value, update{{component}}Value] = useState({{instance}}.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  // ns__custom_start {{tempDetails}} beginning
  // ns__custom_end {{tempDetails}} beginning

  {{{CHILDREN_CONSTANT_DECLARATIONS}}}

  // ns__custom_start {{tempDetails}} beforeReturn
  // ns__custom_end {{tempDetails}} beforeReturn

  // ns__start_section {{tempDetails}} notSelected
  if (!selected) {
    return (
      <{{component}}StyleWrapper onClick={() => onSelect({{instance}}.id)}>
        { {{instance}}Value }
      </{{component}}StyleWrapper>
    );
  }
  // ns__end_section {{tempDetails}} notSelected

  // ns__start_section {{tempDetails}} change
  function handle{{component}}ValueChange(e) {
    update{{component}}Value(e.target.value);
  }
  // ns__end_section {{tempDetails}} change

  // ns__start_section {{tempDetails}} save
  async function handle{{component}}ValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_{{typeSpecifier}}_ACTION_ID,
        executionParameters: JSON.stringify({
          value: {{{instance}}}Value,
          instanceId: {{instance}}.id,
        }),
      },
      refetchQueries,
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }
  // ns__end_section {{tempDetails}} save

  // ns__start_section {{tempDetails}} cancel
  function handleCancelEdit() {
    updateIsEditMode(false);
  }
  // ns__end_section {{tempDetails}} cancel

  // ns__start_section {{tempDetails}} isEdit
  if (isEditMode) {
    return (
      <{{component}}StyleWrapper>
        <EditInstanceForm
          id={ {{instance}}.id }
          label='{{component}} Value:'
          value={ {{instance}}Value }
          onChange={handle{{component}}ValueChange}
          onSave={handle{{component}}ValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </{{component}}StyleWrapper>
    );
  }
  // ns__end_section {{tempDetails}} isEdit

  // ns__start_section {{tempDetails}} delete
  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_{{typeSpecifier}}_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: {{instance}}.id,
          }),
        },
        refetchQueries,
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }
  // ns__end_section {{tempDetails}} delete

  // ns__start_section {{tempDetails}} cancelDelete
  function handleCancelDelete() {
    updateIsDeleteMode(false);
  }
  // ns__end_section {{tempDetails}} cancelDelete

  // ns__start_section {{tempDetails}} isDelete
  if (isDeleteMode) {
    return (
      <{{component}}StyleWrapper selected={selected} isDeleting={isDeleting}>
        { {{instance}}Value }
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </{{component}}StyleWrapper>
    );
  }
  // ns__end_section {{tempDetails}} isDelete

  // ns__start_section {{tempDetails}} functionReturn
  return (
    <{{component}}StyleWrapper selected={selected}>
      { {{instance}}Value }
      <Button type='button'   onClick={() => updateIsEditMode(true)}>
        &#9998;
      </Button>
      <Button type='button'   onClick={() => updateIsDeleteMode(true)}>
        &#128465;
      </Button>

      {{{CHILDREN_BODY_LIST}}}

      {/* ns__custom_start {{tempDetails}} renderEnding */}
      {/* ns__custom_end {{tempDetails}} renderEnding */}

</{{component}}StyleWrapper>
  );
  // ns__end_section {{tempDetails}} functionReturn
}

{{/if}}
// ns__end_section {{tempDetails}} function
`)

