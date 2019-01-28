import { inject, injectable } from 'inversify';
import { TYPES } from '../interfaces/types';

import { ThrowableWeapon , Warrior , Weapon } from '../interfaces/interface';

@injectable()
class Katana implements Weapon {
    public hit() {
        return 'cut!';
    }
}

@injectable()
class Shuriken implements ThrowableWeapon {
    // tslint:disable-next-line:no-reserved-keywords
    public throw() {
        return 'hit!';
    }
}

@injectable()
class Ninja implements Warrior {

    private katana: Weapon;
    private shuriken: ThrowableWeapon;

    public constructor(
        @inject(TYPES.Weapon) katana: Weapon,
        @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon,
    ) {
        this.katana = katana;
        this.shuriken = shuriken;
    }

    public fight() { return this.katana.hit(); }
    public sneak() { return this.shuriken.throw(); }

}

export { Ninja, Katana, Shuriken };
