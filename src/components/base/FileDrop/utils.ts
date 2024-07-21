export const mimeTypeMatchesAccept = (mimeType: string, acceptValue?: string) => {
  if (!acceptValue) {
    return true; // No 'accept' attribute means all types are allowed
  }

  const acceptTypes = acceptValue.split(',').map(type => type.trim()); // Split and clean up types

  for (const acceptType of acceptTypes) {
    if (acceptType === mimeType || acceptType === '*') {
      return true; // Exact match or wildcard
    }

    const [acceptTypePrefix, acceptTypeSuffix] = acceptType.split('/'); 
    const [mimeTypePrefix, mimeTypeSuffix] = mimeType.split('/');

    if (acceptTypePrefix === '*' && mimeTypeSuffix === acceptTypeSuffix) {
      return true; // Wildcard subtype match (e.g., "image/*")
    }

    if (acceptTypePrefix === mimeTypePrefix && acceptTypeSuffix === '*') {
      return true; // Wildcard type match (e.g., "*/json")
    }
  }

  return false; // No match found
}

export const capitalize = (text: string) => {
  const [first, ...others] = text
  return `${first.toUpperCase()}${others.join('')}`
}
