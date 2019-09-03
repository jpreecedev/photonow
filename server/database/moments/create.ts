import { MomentModel } from "../schema";

async function create(moment: Moment) {
  return await new MomentModel(moment).save();
}

export { create };
