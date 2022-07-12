import { get } from 'svelte/store';
export class DragDropManager {
    constructor(rowStore) {
        this.handlerMap = {};
        this.register('row', (event) => {
            let elements = document.elementsFromPoint(event.clientX, event.clientY);
            let rowElement = elements.find((element) => !!element.getAttribute('data-row-id'));
            if (rowElement !== undefined) {
                const rowId = rowElement.getAttribute('data-row-id');
                const { entities } = get(rowStore);
                const targetRow = entities[rowId];
                if (targetRow.model.enableDragging) {
                    return targetRow;
                }
            }
            return null;
        });
    }
    register(target, handler) {
        this.handlerMap[target] = handler;
    }
    getTarget(target, event) {
        //const rowCenterX = this.root.refs.mainContainer.getBoundingClientRect().left + this.root.refs.mainContainer.getBoundingClientRect().width / 2;
        var handler = this.handlerMap[target];
        if (handler) {
            return handler(event);
        }
    }
}
//# sourceMappingURL=dragDropManager.js.map