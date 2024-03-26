function tName2GHTName(name: string) {
  return `team-${name}`
}

function tName2GHRName(name: string, which?: number) {
  return `team-repo-${name}${which ? "-" + which : ""}`
}

function createReadmeContent(teamName: string) {
  const content = `# ${teamName}\nYou are free to change this file.\nRules to be followed\n> Rule 1\n> Rule 2\n> Rule 3\n`
  return btoa(content)
}

export {
  tName2GHTName,
  tName2GHRName,
  createReadmeContent
}
