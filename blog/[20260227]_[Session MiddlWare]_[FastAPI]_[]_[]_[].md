## Session 개요

- Cookie에 모든 정보를 수록하지 않고, 개별 식별 번호 수준의 Session id값만 
Cookie에 저장하고, 상세 정보는 서버의 RDB/Memory/Redis등에 저장하는 방식

- Cookie는 개별 식별 번호만 가지므로 브라우저에서 민감 정보를 가지고 있지 않으므로 보다 안정성 있는 민감 정보 관리 가능

## FastAPI의 SessionMiddle 개요

- FastAPI는 SessionMiddleware Class를 Middleware로 제공

```python
from starlette.middleware.sessions import SessionMiddleware

```

- 이름은 Session을 표방하고 있지만, 실제로는 Signed Cookie임

- SessionMiddleware를 Middleware로 FastAPI에 등록하면, FastAPI에서 request.session 객체 변수를 사용할 수 있으며, request.session은 Python Dicitionary 기반으로 데이터를 저장함

- FastAPI는 브라우저로 Response를 내려 줄때 request.session의 Dict 값을 JSON 문자열 형태로 변경한 뒤 이를 다시 Signed Key로 Encoding하여 전송함

- Browser에서 다시 서버로 전송되는 Cookie 값을 FastAPI가 request.session으로 읽어들일 때는 Signed Key로 Encoding된 Cookie 값을 다시 Decoding한 뒤 JSON값을 Dict 형태로 로딩함(Sign 시 사용한 key로 데이터가 변경되었는지 검증)

## SessionMiddle의 동작 

```python

# Request 객체에 session이라는 내부 dict를 access할 수 있음
app.add_middleware(SessionMiddleware)

```

```python

# Request.session에 정보 담음
Request.session['session_user'] = {'id': 1, 'email': 'gildong@gmaio.com'}

# 브라우저로 Response 전송
Request.session에 있는 값을 Json으로 Seralization. Cookie key는 Session으로 Value는 json 값을 Signature Key 방식으로 변환하여 전송

```

브라우저에서 읽어 들이기
- 브라우저에서 Cookie Key Session을 읽어 들이되 Signature Key 기반으로 Decoding. 변형되지 않는 Cookie임이 확인되면 request.session 객체로 해당 json 문자열을 Dictionary로 로딩함

## Signed Cookie 다루기

SessionMiddleware의 secret_key 값 생성

```python
import secrets

secret_key = secrets.token_hex(32)

from dotenv import load_dotenv
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

# SessionMiddleware 등록
# pip install itsdangerous==2.2.0 (SessionMiddleware 동작을 위해선)
from starlette.middleware.sessions import SessionMiddleware
app.add_middleware(SessionMiddleware, session_cookie ='session', secret_key=SECRET_KEY, max_age=3600)

```

request.session은 일반적인 HTTP Request에 존재하지 않는다. 그렇기에 middleware로 SessionMiddleware로 설정하지 않으면 없는 값이여서 문제가 발생한다 

ex) request.scope['session] = json.loads() [json -> dict]

ex) b64encode(json.dumps(scope['sesssion'])).encode('utf-8') [dict -> json]

```python

# FastAPI의 Response 객체에 signed cookie 값 설정
session = request.session
session["session_user"] = {"username": username, "email": email}

return RedirectResponse()

```

- 이떄 browser의 cookie value는 해당 username, email data 값이 암호화되어 있어 저장되어 있음

- SessionMiddleware를 이용할 경우 response.set_cookie()가 필요 없고 알아서 cookie가 생성됨

```python

def get_session_user(request: Request):
    session = request.session
    if "session_user" not in session.keys():
        return None
    else:
        session_user = session['session_user']
        return session_user 

@app.get("/logout")
async def logout(request: Request):
    request.session.clear() # cookie일 경우,  response.delete_cookie()

```
