class HashMap {
  constructor(size) {
    this.map = Array.from({ length: size}, () => []);
    this.size = size;
    this.loadTreshold = size * 0.8;
    this.totalItems = 0;
  }

  bucket(key) {
    const index = hash(key) % this.map.length;
    if (index < 0 || index >= this.map.length) throw new Error('Trying to access an index that is out of bounds');
    else return index;
  }

  get(key) {
    const bucket = this.map[this.bucket(key)];
    if (bucket) {
      for (let item of bucket) {
        if (item.key === key) return item;
      }
      return false;
    }
    else return false;
  }

  has(key) {
    if (this.get(key)) return true;
    else return false;
  }

  set(key, value) {
    const entry = this.get(key);
    if (entry) {
      entry.value = value;
      return;
    } else {
      const bucket = this.map[this.bucket(key)];
      bucket.push({key, value});
      ++this.totalItems;
      if (this.totalItems > this.loadTreshold) {
        this.size = this.size + 3;
        this.loadTreshold = this.size * 0.8;
        this.map.push([], [], []);
      }
      return;
    }
  } 

  remove(key) {
    const bucket = this.map[this.bucket(key)];
    const item = this.get(key);
    if (!item) return false;
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === item) {
        bucket.splice(i, 1);
        this.totalItems--;
        return;
      }
    }
  }

  clear() {
    this.map = Array.from({ length: this.size}, () => []);
    this.totalItems = 0;
  }

  keys() {
    let keys = []
    for (let bucket of this.map) {
      for (let item of bucket) {
        keys.push(item.key)
      }
    }
    return keys;
  }

  values() {
    let values = []
    for (let bucket of this.map) {
      for (let item of bucket) {
        values.push(item.value)
      }
    }
    return values;
  }

  entries() {
    let entries = []
    for (let bucket of this.map) {
      for (let item of bucket) {
        entries.push([item.key, item.value])
      }
    }
    return entries;
  }
}

function hash(key) {

  let hash = 0;
  const primeNumber = 31;

  for (let i = 0; i < key.length; i++) {
    hash = hash * primeNumber + key.charCodeAt(i);
  }

  return hash;
}
