import { MomentModel } from "../schema"
import { Moment } from "../../../global"

async function createMoment(moment: Moment) {
  return await new MomentModel(moment).save()
}

export { createMoment }
