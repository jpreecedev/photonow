import { MomentModel } from "../schema"

async function createMoment(moment: Moment) {
  return await new MomentModel(moment).save()
}

export { createMoment }
