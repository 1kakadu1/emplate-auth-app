import { Entity, IdentifiedReference, ManyToOne, Property, Reference, Unique } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';
import { User } from './UserEntity';

@Entity()
export class Token extends BaseEntity {

  @Property()
  refreshToken: string;

  @ManyToOne(() => User, { wrappedReference: true })
  user: IdentifiedReference<User>;

  constructor(refreshToken: string, user: User) {
    super();
    this.refreshToken = refreshToken;
    this.user = Reference.create(user);
  }

}