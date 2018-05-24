import {DatabaseTypes} from '../../@types'

export class Snapshot<T extends DatabaseTypes.Unit> {
    __data = undefined;
    id: undefined | string;
    exists = undefined;
    updateTime = new Date();
    createTime = new Date();

    constructor(data: T, exists: boolean = true) {
        this.__data = data;
        this.id = data._id;
        this.exists = exists;
    }

    get ref(): Snapshot<T> {
        return this;
    }

    get(): Promise<Snapshot<T>> {
        return Promise.resolve(this);
    }

    data(): T {
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
                const snapshot = new Snapshot({_id: key, ...data});
                this.table[`${collection}/${key}`] = snapshot;
                return Promise.resolve(snapshot);
            }
        }
    }

    doc(id) {
        return this.table[id] || new Snapshot<any>({}, false)
    }

    get tableSize() {
        return Object.keys(this.table).length;
    }
}
