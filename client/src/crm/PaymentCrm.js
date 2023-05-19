import { makeAutoObservable } from 'mobx'
export default class PaymentCrm {
    constructor() {
      this._payments=[ ]
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setPayments(payments) {
        console.log("Setting payments:", payments);
        this._payments = payments;
    }
    get payments(){
        return this._payments;
    }
}
