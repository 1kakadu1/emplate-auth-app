import { Entity, Property, Unique } from "@mikro-orm/core";

import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
  @Property()
  name: string;

  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
