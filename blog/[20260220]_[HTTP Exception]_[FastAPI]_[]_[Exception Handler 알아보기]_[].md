## FastAPI HTTPException 가이드
FastAPI의 HTTPException은 클라이언트에게 에러 상태 코드와 메시지를 전달하기 위한 가장 표준적인 방법입니다. 내부적으로는 Starlette의 HTTPException을 상속받아 FastAPI의 데이터 구조에 최적화되어 있습니다.

1. 주요 특징
- Target: 주로 4xx (Client Error) 범주의 에러를 처리하는 데 사용되지만, 필요에 따라 5xx (Server Error)를 수동으로 발생시킬 때도 사용합니다.

- Response Format: detail 인자에 넣은 데이터는 자동으로 JSON 형식의 Response Body로 변환됩니다.

- Flexibility: 단순 문자열뿐만 아니라 Dict, List 등 JSON 직렬화가 가능한 모든 객체를 detail에 담을 수 있습니다.

2. 코드 완성 및 리팩토링
작성해주신 예제에 status 임포트와 예외 처리 로직을 보완하여 완성한 코드입니다.

```python
from fastapi import FastAPI, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI()

@app.get("/blogs/{item_id}")
async def read_item(item_id: str):
    try:
        # 데이터베이스 조회 로직 (가정)
        # item = db.query(Blog).filter(Blog.id == item_id).first()
        # if not item:
        #     raise HTTPException(status_code=404, detail="Blog not found")
        pass
        
    except SQLAlchemyError as e:
        # 서버 로그에는 상세한 에러를 남기지만
        print(f"Database Error: {e}") 
        
        # 클라이언트에게는 보안과 가독성을 위해 정제된 에러를 보냅니다.
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "message": "Service is temporarily unavailable due to database error.",
                "code": "DB_CONNECTION_ERROR"
            },
            headers={"X-Error": "DatabaseError"} # 선택사항: 커스텀 헤더 추가
        )
```
3. Argument 상세 설명

### 📝 FastAPI HTTPException Arguments

| Argument | Type | Description |
| :--- | :--- | :--- |
| **`status_code`** | `int` | **HTTP 상태 코드** (예: `400`, `404`, `500`). `fastapi.status` 모듈의 상수 사용 권장. |
| **`detail`** | `Any` | **에러 메시지 내용**. 클라이언트에게 전달될 데이터이며 `string`, `dict`, `list` 등을 지원합니다. |
| **`headers`** | `dict` | **응답 헤더**. 클라이언트에게 추가적인 메타데이터(예: 보안 인증, 커스텀 에러 태그 등)를 전송할 때 사용합니다. |

## Default Exception Hanlder Override

- FastAPI는 `HTTPException`, `RequestValidationException`에 대해서 JSON 기반의 에러 메시지를 Response로 출력하는 기본 Exception Handler가 등록되어 있음

아래는 코드는 FastAPI 내장용 Exception Handler 함수이다

```python
async def http_exception_handler(request: Reqeust, exc: HTTPException):
    headers = getattr(exc, "headers", None)
    if not is_body_allowed_for_status_Code(exc.status_code):
        return Response(status_code=exc.status_code, headers=headers)
    return JSONResponse(
        {"detail": exc.detail}, status_code=exc.status_code, headers=headers
    )
```

아래는 exception_handler 데코레이터를 이용한 custom http_exception_handler이다(JsonResponse 방식)

```python
@app.exception_handler(HTTPException)
async def custom_http_exception_hanlder(request: Request, exc: HTTPException):
    headers=getattr(exc, "headers", None)
    return JSONResponse(
        status_code=exc.statud_code,
        content = {
            "error": "처리 중 에러가 발생하였습니다",
            "detail": exc.detail,
            "code": exc.status_code,
        },
        headers=headers
    )

```
```python

templates = Jinja2Templates(directory="templates)

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    headers=getattr(exc, "headers", None)
    return templates.TemplateResponse(
        request=request,
        name="http_error.html",
        context={
            "status_code": exc.status_code,
            "title_message": "불편을 드려 죄송합니다",
            "detail": exc.detail
        },
        headers=headers

    )
     
```

### Add_exception_handler [Custom handler]

먼저, Custom 하지 않고 FastAPI의 내장된 Exception Handler를 사용할 경우에는 FastAPI의 HTTP Exection을 쓰는게 낫지만, `add_exception_handler` 또는 `app.exception_handler`을 사용할 경우에는 Starlette의 HTTPExcpetion을 사용하는 것을 권장한다

```python
from fastapi.exceptions import HTTPException 
from starlette.exceptions import HTTPException as StarletteHTTPException

@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_hanlder(request: Request, exc: StarletteHTTPException):
    headers=getattr(exc, "headers", None)
    return JSONResponse(
        status_code=exc.statud_code,
        content = {
            "error": "처리 중 에러가 발생하였습니다",
            "detail": exc.detail,
            "code": exc.status_code,
        },
        headers=headers
    )

```

따로 utils 폴더 안에 exc_handelr.py를 만든다

```python
from fastapi import Request, status
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.templating import Jinja2Templates
from fastapi.excpetions import RequestValidationError

templates = Jinja2Templates(directory="templates")

# @app.exception_handler(HTTPException)
async def custom_http_exception_handler(requset: Request, exc: StarletteException):
    return templates.TemplateResponse(
        request=requset,
        name="http_error.html",
        context={
            "status_code": exc.status_code,
            "title_message": 불편을 드려 죄송합니다 
            "detail": exc.detail
        },
        status_code=exc.status_code
    )
# @app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return templates.TemplateResponse(
        request=request,
        name="validation_error.html",
        context={
            "status_code": status.HTTP_422_UNPROCESSABLE_ENTITIY,
            "title_message": "잘못된 값을 입력하였습니다.",
            "detail": exc.errors()
        },
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
    )

```

그리고 나서 main.py에서 아래와 같이 진행하면 된다

```python

app.add_exception_handler(StarletteHTTPException, exc_handler.custom_http_exception_handler)

app.add_exception_handler(RequestValidationError, exc_handler.validation _exception_handler)

```
