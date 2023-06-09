import { makeAutoObservable } from 'mobx'
export default class PaymentCrm {
    constructor() {
        this._payments = []
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setPayments(payments) {
        console.log("Setting payments:", payments);
        this._payments = payments;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }
    setLimit(limit) {
        this._limit = limit;
    }
    get payments() {
        return this._payments;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}