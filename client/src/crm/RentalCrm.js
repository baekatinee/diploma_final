import { makeAutoObservable } from 'mobx'
export default class RentalCrm {
    constructor() {
      this._rentals=[ ]
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setRentals(rentals) {
        console.log("Setting rentals:", rentals);
        this._rentals = rentals;
    }
    get rentals(){
        return this._rentals;
    }
}
