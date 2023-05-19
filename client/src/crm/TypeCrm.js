import { makeAutoObservable } from 'mobx'
export default class TypeCrm {
    constructor() {
      this._types=[ ]
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setTypes(types) {
        console.log("Setting types:", types);
        this._types = types;
    }
    get types(){
        return this._types;
    }
}
