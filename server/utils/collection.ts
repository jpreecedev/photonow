function formatCollectionName(name: string) {
  if (!name) {
    return
  }

  return name
    .trim()
    .toLowerCase()
    .replace(/\s/gi, "-")
    .replace(/[^a-zA-Z0-9\s-]/gi, "")
}

export { formatCollectionName }
