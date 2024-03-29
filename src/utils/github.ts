function tName2GHTName(name: string) {
  return `HF24-${name}`
}

function tName2GHRName(name: string, which?: number) {
  return `HF24-${name}${which ? "-" + which : ""}`
}

export {
  tName2GHTName,
  tName2GHRName
}
