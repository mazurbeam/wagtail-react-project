const isObjEmpty = obj => {
  const values = Object.values(obj)
  if (values.length > 0) {
    return false
  }
  return true
}

export default isObjEmpty
