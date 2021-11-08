
/**
 * Clamps given value between min and max.
 * Returns min if value<min, returns max if value>max.
 * Otherwise, returns value
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 */
export function Clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
}