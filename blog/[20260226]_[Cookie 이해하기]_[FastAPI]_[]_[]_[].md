## Cookie와 Session

- 웹이 Enterprise 환경에서 사용되기 위해서는 상태 관리가 필요하고, 이를 위해 Cookie가 도입됨

- Cookie가 사용자 특화된 정보를 Brower에 저장하면서 Browser와 서버간 상태관리가 가능

- Cookie에서 많은 특화 정보를 가지고 있는 것은 보안상 이슈가 있을 수 있음

- Browser는 특정 Session 키만 가지고 있고, 서버에서 사용자 특화 정보를 관리하는 방식

## Cookie의 Key와 Value

- 브라우저는 여러 개의 Cookie들을 가질 수 있으며 개별 cookie는 고유한 key와 value를 가진다 

- 이떄 개별 cookie 당 최대 4KB 까지 저장 가능하다

- Cookie key = "my_cookie", value = "gildong@gmail.com"

## Cookie의 홀용 

Cookie는 웹이 상업용 애플리케이션으로 확장하는데 기폭제 역할을 수행

- 세션 관리, 개인화, 트랙킹

## Cookie와 보안

- Cookie는 태생적으로 보안에 취약

- Cookie는 가급적 최소환의 정보를 가지되, 민감정보(패스워드, 주민번호, 전화번호)는 가지지 x

- Cookie 정보를 암호할 수 는 있지만 서버쪽에서 복원하는데 시간이 소요되므로 , 암호화가 클수록 서버 자원이 크게 소모된ㄷ. 

- Cookie에 정보 자체는 담지 않고, Cookie를 식별할 Cookie id(session id)만 Cookie로 전송하고
해당 Cookie id로 가지는 상세 정보는 서버의 DB, Memory, Redis등에 저장하는 Session 메커니즘이 발전

## 도메인 구분에 따른 Cookie 유형

**First Party Cookie**: 사용자가 직접 URL을 입력하여 방문한 사이트에서 발행된 Cookie. Cookie 도메인이 방문한 사이트의 도메인과 동일 

- 사용자 세션 관리, 개인화, 사용자 분석

**Third Party Cookie**: 사용자가 직접 URL을 입력하여 방문한 사이트가 아닌 다른 사이트에서 생성된 Cookie. Cookie 도메인이 직접 방문 사이트의 도메인이 아닌 다른 사이트의 도메인을 가짐 

- 개인화 광고, 소셜 미디어 통합, 사용자 분석 솔루션 

## 수명 주기에 따른 Cookie 유형 

**Session Cookie**: 브라우저가 종료되면 사라지는 Cookie

**Permanent Cookie**: 브라우저가 종료되어도 사라지지 않고 max age나 expiration에 지정된 시간동안 계속 유지되는 Cookie

## 주요 Cookie 메타 파라미터들

**max_age**: Cookie 유지 시간, 초 단위이며 정수형 값으로 설정, 서버에서 Cookie의 max_age를 3600로 설정하면 브라우저는 cookie를 받은 후 3600초까지 유지시키고 삭제

**expires**: Cookie를 유지할 일시(일자 + 시분초)
    - ex) Wed, 21 Oct 2024 07:28:99 GMT

**path**: Cookie가 적용되는 서버의 path. Cookie는 해당 서버의 지정된 Path(SUb Path)에 접속시만 보내짐
    - ex) / (전체 path에 다 보내짐)

**domain**: Cookie가 유요한 domain. Cookie는 해당 Domain에 접속 시에 보내지게 됨

**secure**: True이면 HTTPS 접속 시에만 Cookie가 보내짐

**httponly**: True이면 Javescript에서는 cookie에 접근해서 sent 할 수 없도록 함

**samesite**: 
    - Strict: Cookie는 원 접속과 다른 origin에 보내질 수 없음
    - Lax: 기본적으로 Strict랑 같으나, 
    - None: 서로 다른 Origin이라도 Cooike 전송

## Cookie 사용 예시법

```python

# 로그인 수행
@app.post("/login")
async def login(email: str = Form(...), password: str = Form(...)):

    user_data = users_db[email]

    if not user_data or user_data["password"] != password:
        raise HTTPException

    # FastAPI의 Response 객체에 cookie 값 설정
    user_json = json.dumps({"username": user_data["username"]},
                            "email": user_data["email"])

    # 반드시 return 되는 response 객체에 set_cookie()를 호출해서 쿠키 전달
    response = RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)

    # set_cookie()의 max_age 인자가 들어가면 Session Cookie임
    # expires와 max_age 중에 하나 선택, 두개 다 있으면 max_age 선택
    # httponly의 default: True, samesite의 default: Lax
    response.set_cookie(key="my_cookie", value=user_json, httponly=True,
                        max_age=3600)

    return response

@app.get('/logout')
async def logout(request: Response):
    response = RedirectResponse(url="/", statud_code=status.HTTP_302_FOUND)

    response.delete_cookie("my_cookie")

    return response

```

## Request 객체에서 cookie 정보 추출

기본적으로 browser가 first-party cookie, third-party cookie를 가지고 있으며, 관리를 한다

이때 client가 해당 도메인을 입력하여 HTTP Request가 서버쪽에 전송될 때, browser의 cookie 내용이 header에 문자열 형식으로 같이 전달 된다.

이를 바탕으로 coookie 내용에 따라 동일한 도메인 입력을 해도 사용자에 따라 창이 다르게 보이는 것이다.

```python

def get_logged_user(request: Request):
    cookies = request.cookies
    if "my_cookie" in cookies.keys():
        my_cookie_values = cookies['my_cookie']
        # json 객체 -> python dict 객체
        cookie_user = json.loads(my_cookie_value)
        return cookie_user

from fastapi import Cookie

def get_logged_user_by_cookie_di(my_cookie=Cookie(None)):
    if not my_cookie:
        return None

    cookie_user = json.loads(my_cookie)
    return cookie_user

```