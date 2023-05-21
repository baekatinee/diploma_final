import { makeAutoObservable } from 'mobx'
export default class ShipCrm {
    constructor() {
        this._ships = [
        ]
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        this._selectedType={}
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setTypes(types) {
        this._types = types;
    }
    setShips(ships) {
        this._ships = ships;
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
    setSelectedType(type) {
        this._type = type;
    }
    get Ships() {
        return this._ships;
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
    get selectedType() {
        return this._selectedType;
    }
       
}
