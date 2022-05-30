export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function hasProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
