import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

import { Auth  } from "../../auth/auth.entity";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users = await factory(Auth)().createMany(15);

    // ...
  }
}