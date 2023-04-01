import * as Faker from "faker";
import { define } from "typeorm-seeding";

import { Auth } from "../../auth/auth.entity";

define(Auth, (faker: typeof Faker) => {
  const user = new Auth();
  const email = faker.internet.email();
  const password = faker.internet.password();
  user.email = email;
  user.password = password
  return user;
});