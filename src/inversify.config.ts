// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';

import { Container } from 'inversify';
import { Katana, Ninja, Shuriken } from './class/entities';
import { ThrowableWeapon, Warrior, Weapon } from './interfaces/interface';
import { TYPES } from './interfaces/types';
 
const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
 
export { myContainer };
