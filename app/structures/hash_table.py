import time
class HashTable:
    def __init__(self, size=1000):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        start_time = time.time()
        hash_key = self._hash(key)
        bucket = self.table[hash_key]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                break
        else:
            bucket.append((key, value))
        
        return time.time() - start_time
    
    def search(self, key):
        start_time = time.time()
        hash_key = self._hash(key)
        bucket = self.table[hash_key]
        
        for k, v in bucket:
            if k == key:
                return {
                    'value': v,
                    'time': time.time() - start_time
                }
        
        return {
            'value': None,
            'time': time.time() - start_time
        }