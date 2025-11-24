/**
 * GQX is a utility class intended for use with GlideQuery.
 * It is similar to the base system GQ utility class which
 * you should also check out if you haven’t seen it.
 * @namespace
 */
function GQX() {}

/**
 * Returns the accumulator array after pushing the value.
 * Handy as a reduce function.
 * @example
 * var names = new GlideQuery('sys_user')
 *     .whereNotNull('first_name')
 *     .select('first_name')
 *     .reduce(GQX.toArray, []);
 * @param {array} accumulator
 * @param {any} value
 * @returns {array} accumulator
 */
GQX.toArray = function toArray (accumulator, value) {
  accumulator.push(value);
  return accumulator;
};

/**
 * Returns the accumulator Set after adding the value.
 * Handy as a reduce function.
 * @example
 * var names = new GlideQuery('sys_user')
 *     .whereNotNull('first_name')
 *     .select('first_name')
 *     .reduce(GQX.toSet, new Set());
 * @param {Set} accumulator
 * @param {any} value
 * @returns {Set} accumulator
 */
GQX.toSet = function toSet (accumulator, value) {
  return accumulator.add(value);
};

/**
 * Returns the accumulator object after adding the
 * specified key and value from the record.
 * Handy as a reduce function.
 * @example
 * var names = new GlideQuery('sys_user')
 *     .whereNotNull('first_name')
 *     .select('first_name')
 *     .reduce(GQX.toObject('sys_id', 'first_name'), {});
 * @param {string} key property name
 * @param {string} value property name
 * @param {object} accumulator
 * @param {object} record
 * @returns {object} accumulator
 */
GQX.toObject = GQ.partial(function toObject (key, value, accumulator, record) {
  accumulator[record[key]] = value ? record[value] : record;
  return accumulator;
});

/**
 * Returns the accumulator Map after adding the
 * specified key and value from the record.
 * Handy as a reduce function.
 * @example
 * var names = new GlideQuery('sys_user')
 *     .whereNotNull('first_name')
 *     .select('first_name')
 *     .reduce(GQX.toMap('sys_id', 'first_name'), new Map());
 * @param {string} key property name
 * @param {string} value property name
 * @param {Map} accumulator
 * @param {object} record
 * @returns {Map} accumulator
 */
GQX.toMap = GQ.partial(function toMap (key, value, accumulator, record) {
  return accumulator.set(record[key], value ? record[value] : record);
});