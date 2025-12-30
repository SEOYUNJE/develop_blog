## FastAPI의 Request 객체

해당 객체는 HTTP Request에 대한 정보를 가지고 있는 객체로

```python
from fastapi import Requset

```

| request 내 field 유형 | print 예시 |
| --------------------- | -------- |
|   `request.method`    |   `GET`      |
|   `request.url`    |  `http://127.0.0:8081/items`       |
|   `request.header`    | `accped-encoding`, `accept`, `host`, `connection`        |
|   `request.client.host`    |  `127.0.0.1`    |
|   `request.query_param`    |  `token: 3`       |
|   `request.json`    |  `Request Body`       |
|   `request.form`    |   `Form`      |


아래는 Display 예시입니다

```json
{
    "client_host": "127.0.0.1"
}
```

_**Default Usage**_

```python
from fastapi import Request

@app.get("/items")
async def read_item(request: Request):
    client_host = request.client.host
    headers = request.headers
    query_params = request.query_params
    url = request.url
    path_params = request.path_params
    http_method = request.method

    return {
        "client_host": client_host,
        "headers": headers,
        "query_params": query_params,
        "path_parmas": path_params,
        "url": str(url),
        "http_method": http_method
    }

```

_**Using Parse Json Body**_

```python
from FastAPI import Request

@app.post("/items_json/")
async def create_item_json(request: Request):
    data = await request.json()
    print("recevied_data:", data)
    return {"recevied_data": data}

```

_**Using Parse Form Body**_

```python
from FastAPI import Request

@app.post("/items_forms/")
async def create_item_form(request: Request):
    data = await request.form()
    print("received_data:", data)
    return {"receiveid_data": data}

```