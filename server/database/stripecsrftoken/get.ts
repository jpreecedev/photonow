import { StripeCsrfTokenModel } from "../schema"

async function verifyCsrfToken(state: String): Promise<boolean> {
  const result = await StripeCsrfTokenModel.findOne({ state }).exec()
  return result !== null
}

export { verifyCsrfToken }
