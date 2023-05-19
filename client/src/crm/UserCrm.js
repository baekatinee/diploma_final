import { makeAutoObservable } from 'mobx'
export default class UserCrm {
    constructor() {
        this._isAuth =false; ///////эта переменная изменяться не может
        this._user = {}
    
        makeAutoObservable(this)//////будет следить за изменениями этих переменных
    }
    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    get isAuth(){
        return this._isAuth;
    }/////////вызываются только в том случае, если переменная была изменена
    get user(){
        
        return this._user;
    }
}
