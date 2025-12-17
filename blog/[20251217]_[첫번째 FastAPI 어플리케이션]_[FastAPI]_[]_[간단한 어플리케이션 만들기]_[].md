## FastAPI 코드

```python

# import FastAPI
from fastapi import FastAPI

# FastAPI 인스턴스 생성
@app = FastAPI()

"""
path: 도메인명을 제외한 /로 시작하는 부분
ex) https://seoyunje.github.io/develop_blog/ 에서 path는 develop_blog

operation: `GET`, `POST` 등 HTTP Protocol을 의미한다
"""

# Path operation 생성
@app.get("/")
async def root():
    return {'message': "Let's Start FastAPI"}

@app.get("/item")
async def root():
    return {'message': 'Display item}
```

### 출력 예시

> 서버 접속

```bash
uvicorn main:app --port=8081 --reload 
```

> http://127.0.0.1:8081 접속 할 시

![img](/develop_blog/img/app_root.JPG)

> http://127.0.0.1:8081/item 접속 할 시

![img](/develop_blog/img/app_item.JPG)

### 1. Client(Request)

| Columne | Detail |
| ----------- | -------------- |
| Request URL | http://127.0.0.1:8081/ |
| Request Method | GET |
| Status Code | 200 OK |

### 2. Server(Response)

| Columne | Detail |
| ----------- | -------------- |
| Content-Length | 33 |
| Content-Type | application/json |
| Date | Wed, 17 Dec 2025 11:55:53 GMT |
| Server | uvicorn | 