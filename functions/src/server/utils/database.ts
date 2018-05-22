export class Snapshot {
    __data = undefined;
    id = undefined;
    exists = undefined;
    updateTime = new Date();
    createTime = new Date();

    constructor(id, data, exists = true) {
        this.id = id;
        this.__data = data;
        this.exists = exists;
    }

    get ref() {
        return this;
    }

    get() {
        return Promise.resolve(this);
    }

    data() {
        return this.__data
    }

    update(field, data)  {
        if (field.constructor === String) {
            this.__data = Object.assign({}, this.__data, {[field]: data});
        } else {
            this.__data = Object.assign({}, this.__data, field);
        }
        return Promise.resolve(this)
    }
}

export class Database {

    table = {};

    constructor(table) {
        this.table = table;
    }

    orderBy() {return this};
    startAt() {return this};
    endAt() {return this};


    collection(collection) {
        return {
            get: () => {
                const items = Object.keys(this.table).filter(key => new RegExp(collection).test(key)).map(key => this.table[key]);
                return Promise.resolve(items);
            },
            add: (data) => {
                const key = Math.random();
                const snapshot = new Snapshot(key, data);
                this.table[`${collection}/${key}`] = snapshot;
                return Promise.resolve(snapshot);
            }
        }
    }

    doc(id) {
        return this.table[id] || new Snapshot(0, {}, false)
    }

    get tableSize() {
        return Object.keys(this.table).length;
    }
}
