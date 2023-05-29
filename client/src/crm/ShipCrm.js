
import { makeAutoObservable } from 'mobx'
import { fetchShips } from '../http/shipAPI'
export default class ShipCrm {
    constructor() {
        this._ships = [
        ]
        this._types=[]
        this._selectedType={}
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setTypes(types) {
    
        this._types = types;
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type;
    }

    setShips(ships) {
        this._ships = ships;
    }
    setPage(page) {
        this._page = page;
        fetchShips(this._selectedType.id, page, this._limit).then(data => {
          this.setShips(data.rows);
          this.setTotalCount(data.count);
        });
      }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }
    setLimit(limit) {
        this._limit = limit;
        
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
    get types(){
        return this._types;
    }
    get selectedType() {
        return this._selectedType;
     }


}
