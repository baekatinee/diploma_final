import { makeAutoObservable } from 'mobx'
export default class ClientCrm {
    constructor() {
      this._status=[
        {
            id:1, name:"Оплачено"
        },
        {
            id:2, name:"Долг"
        },

      ]
      this._selectedStatus={}
      this._clients=[]
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setStatus(status) {
        this._status = status;
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
    get status(){
        return this._status;
    }/////////вызываются только в том случае, если переменная была изменена
    get clients(){
        return this._clients;
    }
}
