import { getRelativePos } from "../../utils/domUtils";
import { Draggable } from "../../core/drag";
const defaults = {
    enabled: true,
    elementContent: () => {
        const element = document.createElement('div');
        element.innerHTML = 'New Task';
        Object.assign(element.style, {
            position: 'absolute',
            background: '#eee',
            padding: '0.5em 1em',
            fontSize: '12px',
            pointerEvents: 'none',
        });
        return element;
    }
};
export class SvelteGanttExternal {
    constructor(node, options) {
        this.options = Object.assign({}, defaults, options);
        this.draggable = new Draggable(node, {
            onDrag: this.onDrag.bind(this),
            dragAllowed: () => this.options.enabled,
            resizeAllowed: false,
            onDrop: this.onDrop.bind(this),
            container: document.body,
            getX: (event) => event.pageX,
            getY: (event) => event.pageY,
            getWidth: () => 0
        });
    }
    onDrag({ x, y }) {
        if (!this.element) {
            this.element = this.options.elementContent();
            document.body.appendChild(this.element);
            this.options.dragging = true;
        }
        this.element.style.top = y + 'px';
        this.element.style.left = x + 'px';
    }
    onDrop(event) {
        var _a, _b, _c, _d;
        const gantt = this.options.gantt;
        const targetRow = gantt.dndManager.getTarget('row', event.mouseEvent);
        if (targetRow) {
            const mousePos = getRelativePos(gantt.getRowContainer(), event.mouseEvent);
            const date = gantt.utils.getDateByPosition(mousePos.x);
            (_b = (_a = this.options).onsuccess) === null || _b === void 0 ? void 0 : _b.call(_a, targetRow, date, gantt);
        }
        else {
            (_d = (_c = this.options).onfail) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
        document.body.removeChild(this.element);
        this.options.dragging = false;
        this.element = null;
    }
}
//# sourceMappingURL=external.js.map