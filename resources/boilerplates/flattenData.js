export default function flattenChildData(element) {
  const flatData ={
    type: element.type,
    instances: element.instances,
  };
  if (element.instances) flatData.instances = element.instances.map(instance => flattenData(instance));

  return flatData;
};

export default function flattenData(element) {
  const flatData ={
    ...element.instance,
    children: element.children,
  };
  if (element.children) flatData.children = element.children.map(child => flattenChildData(child));

  return flatData;
};
