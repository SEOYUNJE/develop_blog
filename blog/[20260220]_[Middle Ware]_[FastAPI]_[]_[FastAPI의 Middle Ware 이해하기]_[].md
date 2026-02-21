## MiddleWare 만들기

- FastAPI는 MiddleWare를 만들 수 있음

- FastAPI의 Middleware의 90%는 Starlette의 Middleware를 상속받아 만든 걸로 따로 특별히 새로 추가된 사항은 없고 문서 또한 짧다 

- `Pure ASGI Middleware`를 구현하는 방법과 `BaseHTTPMiddleware`를 상속받아 구현하는 방법이 있음 

- `BaseHTTPMiddlware` 클래스를 상속받고 dispatch()를 오버라이드 해주는 방법이 훨씬 간단 

- dispatch() 메소드에서 필요한 선처리 작업 수행 후 call_next()를 불러서 API 수행 함수를 수행 후 Response를 반환하다

- 이때 request type를 보면 http request가 아니라 starlette의 cached 객체인데 이는 request를 메모리상에 복사해서 저장해놓기 때문이다. 

```python
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

class DummyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, requset: Request, call_next):
        print("request info:", request.url, request.method)
        print("request type:", type(request))

        response = await call_next(request)
        return response
```

이후 Custom Middleware를 add_middleware()로 등록

```python
app.add_middleware(DummyMiddleware)
```

## HTTP Method Override를 통해 Custom Middleware 구현하기

- 데이터를 새로 생성해서 저장할때: `HTTP METHOD: POST`

- 기존 데이터를 업데이트할 때: `HTTP METHOD: PUT or PATCH`

단, Form()의 경우에는 Post방식의 HTTP Method에서만 지원이 되므로 HTTP METHOD OVERRIDE를 통해
put 방식에서도 form()이 지원되게 Custom Middleware를 진행할 예정이다 

```python
<form action="/blogs/modify/{{ blog.id }}?_method=PUT" method="POST" enctype="multipart/form-data">
```


```python
class MethodOverrideMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        
        if request.method == "POST":
            query = request.query_params
            if query:
                method_override = query["_method"]
                if method_override:
                    method_overide = method_override.upper()  # 대문자
                    if method_override in ("PUT", "DELETE"):
                        request.scope["method"] = method_override # 값을 변경하기 위해서 scope가 필요 

        response = await call_next(request)
        return response

```

middleware가 여러개 존재할 때 작동 순서는 아래 부분부터 먼저 시작된다

```python
app.add_middleware(middleware.DummyMiddleware) # 두번째 작동 
app.add_middleware(middleware.MethodOverrideMiddleware) # 첫번째 작동
```

## CORS(Cross-Origin Resource Sharing) 이해하기

서로 다른 Origin(출처)를 가진 Resource에 대한 접근을 허용할지에 대한 절차 및 정책 

A 사이트에 접속 중인데 해당 사이트 html 내부에 javascript를 이용해서 B 사이트의 API를 호출을 통해 resource를 요청할 때 CORS 정책에 따라 resource를 A사이트에 줄지 안 줄지 결정한다 

Origin(Protocol + Hostname + Port)

ex: https://myshop.com:8080/
(protocol: https, hostname: myshop.com, port: 8080, host: myshop.com:8080)

- 브라우저는 서버 접속시 Header에 Origin 정보를 기재하여 접속  
- 처음에 접속한 서버에서 받은 HTML/Javascript에서 다른 서버로의 리소스 접속을 요청하는 코드가 있을 경우 브라우저는 Header Origin에 처음 접속한 Origin 정보를 담아서 해당 서버로 보냄  
- 리소스 접속을 요청 받은 타 서버에서는 보낸 Origin을 허용할 것인지를 CORS 기반으로 판단하여 허용 가능한 Origin에 대한 리스트를 응답으로 보내고, 브라우저는 이 리스트에 대한 해당 Origin이 있을 경우 Response 출력

FastAPI는 기본적으로 CORSMiddleware 클래스를 제공,

```python

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Cross origin request를 허용할 origin List
    allow_credentials=True, # Cookie를 허용할지 여부, Default는 False
    allow_methods=["*"], # 허용할 Request HTTP 메소드 유형 리스트 
    allow_headers=["*"], # 허용할 Request Header 리스트 
    max_age=-1,
)

```
브라우저는 사전에 Preflight요청으로 확인 후 본 요청을 수행

이때 서버에선 Preflight 요청에 대해 

- `Access-Control-Allow-Headers`: Origin, Content-Type 
- `Access-Control-Allow-Methods`: GET, POST, PUT, DELETE
- `Access-Control-Allow-Origin`: http://www.origin.com

이후 해당 Allow 목록에 해당되면 브라우저가 진짜 request를 보내는 방식이다 
