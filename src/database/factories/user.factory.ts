import { define } from 'typeorm-seeding';

import { RoleType } from '../../constants';
import { User } from '../../modules/user/domain/user.schema';

define(User, (faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(firstName, lastName);
  const phone = faker.phone.phoneNumber();

  const user = new User();
  user.name = firstName;
  user.email = email;
  user.role = RoleType.USER;
  user.password = '111111';
  user.phone = phone;

  return user;
});
