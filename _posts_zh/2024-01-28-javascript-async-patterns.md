---
layout: post
title: "JavaScript 异步编程模式：从回调到 async/await"
date: 2024-01-28 16:20:00 +0800
category: JavaScript
tags: [JavaScript, 异步编程, Promise, async/await]
excerpt: "全面解析 JavaScript 异步编程的演进历程，从回调函数到 Promise，再到现代的 async/await 语法。"
---

JavaScript 作为单线程语言，异步编程是其核心特性之一。今天我们来深入探讨 JavaScript 异步编程模式的演进过程。

## 回调函数：异步编程的起点

最初，JavaScript 使用回调函数来处理异步操作：

```javascript
function fetchUserData(userId, callback) {
  setTimeout(() => {
    if (userId > 0) {
      callback(null, { id: userId, name: 'John Doe' });
    } else {
      callback(new Error('Invalid user ID'), null);
    }
  }, 1000);
}

// 使用回调函数
fetchUserData(1, (error, user) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('User:', user);
  }
});
```

### 回调地狱问题

当有多个异步操作需要串联时，就会出现臭名昭著的"回调地狱"：

```javascript
fetchUserData(1, (err1, user) => {
  if (err1) {
    console.error(err1);
    return;
  }
  
  fetchUserPosts(user.id, (err2, posts) => {
    if (err2) {
      console.error(err2);
      return;
    }
    
    fetchPostComments(posts[0].id, (err3, comments) => {
      if (err3) {
        console.error(err3);
        return;
      }
      
      // 更多嵌套...
      console.log('Comments:', comments);
    });
  });
});
```

## Promise：解救回调地狱

ES6 引入了 Promise，大大改善了异步编程体验：

```javascript
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: 'John Doe' });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

// 使用 Promise
fetchUserData(1)
  .then(user => {
    console.log('User:', user);
    return fetchUserPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts);
    return fetchPostComments(posts[0].id);
  })
  .then(comments => {
    console.log('Comments:', comments);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

### Promise 的强大之处

```javascript
// 并行执行多个异步操作
Promise.all([
  fetchUserData(1),
  fetchUserData(2),
  fetchUserData(3)
])
.then(users => {
  console.log('All users:', users);
})
.catch(error => {
  console.error('At least one request failed:', error);
});

// 竞速执行，返回最先完成的
Promise.race([
  fetchUserData(1),
  fetchUserData(2)
])
.then(firstUser => {
  console.log('First user:', firstUser);
});
```

## Async/Await：同步般的异步代码

ES2017 引入了 async/await，让异步代码看起来像同步代码：

```javascript
async function getUserWithPosts(userId) {
  try {
    const user = await fetchUserData(userId);
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    
    return {
      user,
      posts,
      comments
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// 使用 async/await
async function main() {
  try {
    const result = await getUserWithPosts(1);
    console.log('Complete data:', result);
  } catch (error) {
    console.error('Failed to get user data:', error);
  }
}

main();
```

### 并行处理优化

```javascript
async function getUsersParallel() {
  try {
    // 并行执行
    const [user1, user2, user3] = await Promise.all([
      fetchUserData(1),
      fetchUserData(2),
      fetchUserData(3)
    ]);
    
    return [user1, user2, user3];
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// 错误示例：串行执行（性能差）
async function getUsersSerial() {
  const user1 = await fetchUserData(1); // 等待 1 秒
  const user2 = await fetchUserData(2); // 再等待 1 秒
  const user3 = await fetchUserData(3); // 再等待 1 秒
  // 总共需要 3 秒
  
  return [user1, user2, user3];
}
```

## 错误处理最佳实践

### 统一错误处理

```javascript
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new APIError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // 网络错误或其他错误
    throw new APIError('Network error or request failed', 0);
  }
}
```

### 重试机制

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchWithErrorHandling(url);
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      console.log(`Attempt ${attempt} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  throw lastError;
}
```

## 异步迭代器和生成器

ES2018 引入了异步迭代器：

```javascript
async function* asyncGenerator() {
  let i = 0;
  while (i < 3) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i++;
  }
}

async function useAsyncGenerator() {
  for await (const value of asyncGenerator()) {
    console.log('Generated:', value);
  }
}

useAsyncGenerator();
```

## 实际应用场景

### API 请求管理

```javascript
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  async get(endpoint) {
    return this.request(endpoint);
  }
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

// 使用示例
const api = new APIClient('https://api.example.com');

async function loadUserDashboard(userId) {
  try {
    const [user, posts, notifications] = await Promise.all([
      api.get(`/users/${userId}`),
      api.get(`/users/${userId}/posts`),
      api.get(`/users/${userId}/notifications`)
    ]);
    
    return { user, posts, notifications };
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    throw error;
  }
}
```

### 限流处理

```javascript
class RateLimiter {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }
  
  async add(asyncFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({ asyncFunction, resolve, reject });
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { asyncFunction, resolve, reject } = this.queue.shift();
    
    try {
      const result = await asyncFunction();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
}

// 使用示例
const rateLimiter = new RateLimiter(2);

async function processUrls(urls) {
  const promises = urls.map(url => 
    rateLimiter.add(() => fetch(url).then(r => r.json()))
  );
  
  return Promise.all(promises);
}
```

## 性能优化技巧

### 避免不必要的等待

```javascript
// 好的做法：并行处理独立的异步操作
async function optimized() {
  const userPromise = fetchUser();
  const settingsPromise = fetchSettings();
  const analyticsPromise = fetchAnalytics();
  
  // 同时执行所有请求
  const [user, settings, analytics] = await Promise.all([
    userPromise,
    settingsPromise,
    analyticsPromise
  ]);
  
  return { user, settings, analytics };
}

// 不好的做法：串行处理
async function unoptimized() {
  const user = await fetchUser();        // 等待 500ms
  const settings = await fetchSettings(); // 等待 300ms
  const analytics = await fetchAnalytics(); // 等待 400ms
  
  // 总共需要 1200ms，而并行只需要 500ms
  return { user, settings, analytics };
}
```

## 总结

JavaScript 异步编程经历了从回调函数到 async/await 的演进：

1. **回调函数** - 最基础的异步处理方式，但容易形成回调地狱
2. **Promise** - 解决了回调地狱问题，提供了更好的错误处理
3. **Async/Await** - 让异步代码看起来像同步代码，提高了可读性

现代 JavaScript 开发中，建议：
- 优先使用 async/await
- 合理利用 Promise.all() 进行并行处理
- 实现完善的错误处理机制
- 注意避免串行等待独立的异步操作

掌握这些异步编程模式，能够帮助我们写出更高效、更可维护的 JavaScript 代码。

你在项目中是如何处理复杂异步逻辑的？欢迎分享你的经验！