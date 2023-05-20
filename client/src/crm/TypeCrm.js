import { makeAutoObservable } from 'mobx'
export default class TypeCrm {
    constructor() {
      this._types=[ ]
        this._selectedType={}
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setTypes(types) {
        console.log("Setting types:", types);
        this._types = types;
    }
    setSelectedType(type) {
        this._selectedType = type;
    }
    get types(){
        return this._types;
    }
    get selectedType() {
        return this._selectedType;
     }
}
