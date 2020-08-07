export function flattenChildData(element) {
  const flatData = {
    typeId: element.typeId,
    instances: [],
  };

  if (element.instances && element.instances.length > 0) {
    flatData.instances = element.instances.filter((child) => Boolean(child)).map(
      instance => flattenData(instance),
    );
  }

  return flatData;
}

export function flattenData(element) {
  const flatData = {
    ...element.instance,
    children: [],
  };

  if (element.children && element.children.length > 0) {
    flatData.children = element.children.filter((child) => Boolean(child)).map(
      (child) => flattenChildData(child),
    );
  }

  return flatData;
}
