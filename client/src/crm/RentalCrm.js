import { makeAutoObservable } from 'mobx'
export default class RentalCrm {
    constructor() {
        this._rentals = []
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setRentals(rentals) {
        console.log("Setting rentals:", rentals);
        this._rentals = rentals;
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
    get rentals() {
        return this._rentals;
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