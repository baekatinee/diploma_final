import { makeAutoObservable } from 'mobx'
export default class ShipCrm {
    constructor() {
        this._ships = [
        ]
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setTypes(types) {
        this._types = types;
    }
    setShips(ships) {
        this._ships = ships;
    }
    get Ships() {
        return this._ships;
    }
}
