import { StripeCsrfTokenModel } from "../schema"
import { StripeCsrfToken } from "../../../global"

async function createCsrfToken(csrfToken: StripeCsrfToken) {
  return await new StripeCsrfTokenModel(csrfToken).save()
}

export { createCsrfToken }
