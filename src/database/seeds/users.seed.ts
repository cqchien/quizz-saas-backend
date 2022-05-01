/* eslint-disable import/no-default-export */
import type { Factory, Seeder } from 'typeorm-seeding';

import { User } from '../../modules/user/domain/user.schema';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)({ roles: [] }).createMany(1);
  }
}
