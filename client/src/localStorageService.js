export default class LocalStorageService {
    constructor(prefix = '') {
        this.prefix = prefix + '_'
    }

    _get(name) {
        return localStorage.getItem(this.prefix + name)
    }

    _put(name, value) {
        localStorage.setItem(this.prefix + name, value);
    }

    has(name) {
        return this._get(name) !== null
    }

    remove(name) {
        localStorage.removeItem(this.prefix + name);
    }

    get(name) {
        let obj = JSON.parse(this._get(name));
        return (obj && obj.hasOwnProperty('value')) ? obj.value : null;
    }

    put(name, value) {
        this._put(name, JSON.stringify({time: Date.now(), value: value}));
    }

    time(name) {
        let obj = JSON.parse(this._get(name));
        return obj.time;
    }

    fresh(name, time) {
        console.log(time, this.time(name));
        return this.has(name) && this.time(name) > time
    }
}