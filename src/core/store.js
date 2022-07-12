var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { writable, derived } from 'svelte/store';
function createEntityStore() {
    const { subscribe, set, update } = writable({ ids: [], entities: {} });
    return {
        set,
        _update: update,
        subscribe,
        add: (item) => update(({ ids, entities }) => ({
            ids: [...ids, item.model.id],
            entities: Object.assign(Object.assign({}, entities), { [item.model.id]: item })
        })),
        delete: (id) => update(state => {
            const _a = state.entities, _b = id, _ = _a[_b], entities = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return {
                ids: state.ids.filter(i => i !== id),
                entities
            };
        }),
        deleteAll: (ids) => update(state => {
            const entities = Object.assign({}, state.entities);
            const idState = {};
            ids.forEach(id => {
                delete entities[id];
                idState[id] = true;
            });
            return {
                ids: state.ids.filter(i => !idState[i]),
                entities
            };
        }),
        update: (item) => update(({ ids, entities }) => ({
            ids,
            entities: Object.assign(Object.assign({}, entities), { [item.model.id]: item })
        })),
        upsert: (item) => update(({ ids, entities }) => {
            const hasIndex = ids.indexOf(item.model.id) !== -1;
            return {
                ids: hasIndex ? ids : [...ids, item.model.id],
                entities: Object.assign(Object.assign({}, entities), { [item.model.id]: item })
            };
        }),
        upsertAll: (items) => update(state => {
            const entities = Object.assign({}, state.entities);
            const ids = [...state.ids];
            items.forEach(item => {
                if (!entities[item.model.id]) {
                    ids.push(item.model.id);
                }
                entities[item.model.id] = item;
            });
            return {
                ids,
                entities
            };
        }),
        addAll: (items) => {
            const ids = [];
            const entities = {};
            for (const entity of items) {
                ids.push(entity.model.id);
                entities[entity.model.id] = entity;
            }
            set({ ids, entities });
        },
        refresh: () => update(store => (Object.assign({}, store)))
    };
}
export const taskStore = createEntityStore();
export const rowStore = createEntityStore();
export const timeRangeStore = createEntityStore();
export const allTasks = all(taskStore);
export const allRows = all(rowStore);
export const allTimeRanges = all(timeRangeStore);
export const rowTaskCache = derived(allTasks, $allTasks => {
    return $allTasks.reduce((cache, task) => {
        if (!cache[task.model.resourceId])
            cache[task.model.resourceId] = [];
        cache[task.model.resourceId].push(task.model.id);
        return cache;
    }, {});
});
export function all(store) {
    return derived(store, ({ ids, entities }) => ids.map(id => entities[id]));
}
export function where(store, filterFn) {
    return derived(store, ({ ids, entities }) => {
        const result = [];
        for (const id of ids) {
            const entity = entities[id];
            if (filterFn(entity)) {
                result.push(entity);
            }
        }
        return result;
    });
}
//# sourceMappingURL=store.js.map