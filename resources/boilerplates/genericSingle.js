{{{START_OF_FILE}}}
{{{IMPORTS_SECTION}}}
{{{STYLING_SECTION}}}
{{{BUTTON_SECTION}}}

function {{SingularName}}({
  {{SingularNameLowercase}},
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [{{SingularNameLowercase}}Value, update{{SingularName}}Value] = useState({{SingularNameLowercase}}.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  // ns__custom_start unit: {{Unit}}, comp: {{SingularName}}, loc: beginning
  // ns__custom_end unit: {{Unit}}, comp: {{SingularName}}, loc: beginning

  {{{CHILDREN_CONSTANT_DECLARATIONS}}}

  if (!selected) {
    return (
      <{{SingularName}}StyleWrapper onClick={() => onSelect({{SingularNameLowercase}}.id)}>
        { {{SingularNameLowercase}}Value }
      </{{SingularName}}StyleWrapper>
    );
  }

  function handle{{SingularName}}ValueChange(e) {
    update{{SingularName}}Value(e.target.value);
  }

  async function handle{{SingularName}}ValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_{{SingularForRelationshipAllCaps}}_ACTION_ID,
        executionParameters: JSON.stringify({
          value: {{{SingularNameLowercase}}}Value,
          instanceId: {{SingularNameLowercase}}.id,
        }),
      },
      refetchQueries,
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
  }

  if (isEditMode) {
    return (
      <{{SingularName}}StyleWrapper>
        <EditInstanceForm
          id={ {{SingularNameLowercase}}.id }
          label='{{SingularName}} Value:'
          value={ {{SingularNameLowercase}}Value }
          onChange={handle{{SingularName}}ValueChange}
          onSave={handle{{SingularName}}ValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </{{SingularName}}StyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_{{SingularForRelationshipAllCaps}}_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: {{SingularNameLowercase}}.id,
          }),
        },
        refetchQueries,
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    updateIsDeleteMode(false);
  }

  if (isDeleteMode) {
    return (
      <{{SingularName}}StyleWrapper selected={selected} isDeleting={isDeleting}>
        { {{SingularNameLowercase}}Value }
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </{{SingularName}}StyleWrapper>
    );
  }

  return (
    <{{SingularName}}StyleWrapper selected={selected}>
      { {{SingularNameLowercase}}Value }
      <Button type='button'   onClick={() => updateIsEditMode(true)}>
        &#9998;
      </Button>
      <Button type='button'   onClick={() => updateIsDeleteMode(true)}>
        &#128465;
      </Button>

      {{{CHILDREN_BODY_LIST}}}
    </{{SingularName}}StyleWrapper>
  );
}

{{{COMPOSE_CLAUSE}}}
{{{PROP_TYPES_SECTION}}}
