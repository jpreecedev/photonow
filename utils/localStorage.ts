function getItem(key: string) {
  if (localStorage) {
    return localStorage.getItem(key)
  }
  return false
}

function loadState() {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

function saveState(state: object) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch {
    // ignore write errors
  }
}

export { getItem, loadState, saveState }
