export class GanttUtils {
    constructor() {
    }
    /**
     * Returns position of date on a line if from and to represent length of width
     * @param {*} date
     */
    getPositionByDate(date) {
        return getPositionByDate(date, this.from, this.from + this.totalColumnDuration, this.totalColumnWidth);
    }
    getDateByPosition(x) {
        return getDateByPosition(x, this.from, this.from + this.totalColumnDuration, this.totalColumnWidth);
    }
    roundTo(date) {
        let value = Math.round(date / this.magnetDuration) * this.magnetDuration;
        return value;
    }
}
export function getPositionByDate(date, from, to, width) {
    if (!date) {
        return undefined;
    }
    let durationTo = date - from;
    let durationToEnd = to - from;
    return durationTo / durationToEnd * width;
}
export function getDateByPosition(x, from, to, width) {
    let durationTo = (x / width) * (to - from);
    let dateAtPosition = from + durationTo;
    return dateAtPosition;
}
// Returns the object on the left and right in an array using the given cmp function.
// The compare function defined which property of the value to compare (e.g.: c => c.left)
export function getIndicesOnly(input, value, comparer, strict) {
    let lo = -1;
    let hi = input.length;
    while (hi - lo > 1) {
        let mid = Math.floor((lo + hi) / 2);
        if (strict ? comparer(input[mid]) < value : comparer(input[mid]) <= value) {
            lo = mid;
        }
        else {
            hi = mid;
        }
    }
    if (!strict && input[lo] !== undefined && comparer(input[lo]) === value) {
        hi = lo;
    }
    return [lo, hi];
}
export function get(input, value, comparer, strict) {
    let res = getIndicesOnly(input, value, comparer, strict);
    return [input[res[0]], input[res[1]]];
}
//# sourceMappingURL=utils.js.map