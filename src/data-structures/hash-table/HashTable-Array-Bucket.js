// This HashTable use array as buckets and use array to store key, value
// The data structure will be looked like this:
// [
// [[key,value],[key,value]],
// [[key,value]],
// ...
// ]
const DEFAULT_HASH_TABLE_SIZE = 10;
export default class HashTable {
  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize = DEFAULT_HASH_TABLE_SIZE) {
    this.buckets = Array.from({ length: hashTableSize }, () => []);
  }

  /**
   * Convert key string to hash number
   * @param {*} key
   * @return {number} index
   */
  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccemulator, keySymbol) => hashAccemulator + keySymbol.charCodeAt(0),
      0,
    );

    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    // Check if collision
    if (bucket.length === 0) {
      bucket.push([key, value]);
    } else {
      const oldValueIndex = bucket.findIndex((entry) => entry[0] === key);

      // Check if the bucket has the key already
      if (oldValueIndex === -1) {
        bucket.push([key, value]);
      } else {
        bucket[oldValueIndex][1] = value;
      }
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    const index = this.hash(key);
    const deleteEntryIndex = this.buckets[index].findIndex((entry) => entry[0] === key);
    if (deleteEntryIndex !== -1) {
      this.buckets[index].splice(deleteEntryIndex, 1);
    }
    return null;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key) {
    const bucket = this.buckets[this.hash(key)];
    const findEntry = bucket.find((entry) => entry[0] === key);
    return findEntry ? findEntry.value : null;
  }

  /**
   * @param {string} key'
   * @return {boolean}
   */
  has(key) {
    const bucket = this.buckets[this.hash(key)];
    const findEntry = bucket.find((entry) => entry[0] === key);
    return !!findEntry;
  }

  /**
   * @return {string[]}
   */
  getKeys() {
    return this.buckets.reduce((keys, bucket) => {
      const bucketKeys = bucket.map((entry) => entry[0]);
      return keys.concat(bucketKeys);
    }, []);
  }

  /**
   * @return {string[]}
   */
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.map((entry) => entry[1]);
      return values.concat(bucketValues);
    }, []);
  }

  print() {
    console.log(this.buckets);
  }
}
