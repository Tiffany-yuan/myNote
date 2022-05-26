class EventEmitter {
    constructor() {
        this.cache = {};
    }
    on(name, fn) {
        if (this.cache[name]) {
            this.cache[name].push(fn);
        } else {
            this.cache[name] = [fn];
        }
    }
    off(name, fn) {
        if(!this.cache[name]) return;
        this.cache[name] = this.cache[name].filter(item => {
            return item !== fn;
        })
    }
    emit(name, once, ...args) {
        if (this.cache[name]) {
            this.cache[name].forEach(item => {
                item.apply(this, args);
            })
        }
        if (once) {
            delete this.cache[name];
        }
    }
}