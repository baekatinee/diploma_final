import { makeAutoObservable } from 'mobx'
export default class ClientCrm {
    constructor() {
        this._status = [
            {
                id: 1, name: "Оплачено", definition:true
            },
            {
                id: 2, name: "Долг", definition:false
            },

        ]
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        this._selectedStatus = {}
        this._clients = []
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setStatus(status) {
        this._status = status;
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
    setClients(clients) {
        console.log("Setting clients:", clients);
        this._clients = clients;
    }
    setSelectedStatus(status) {
        this._selectedStatus = status;
    }
    get selectedStatus() {
        return this._selectedStatus;
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
    get status() {
        return this._status;
    }
    get clients() {
        return this._clients;
    }
}
