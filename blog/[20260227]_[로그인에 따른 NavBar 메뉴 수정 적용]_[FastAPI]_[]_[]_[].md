## 로그인 여부 

로그인 하면 sessionMiddleware에 의해서 쿠기가 생성됨

쿠키 여부에 따라 로그인 또는 로그인한 사용자 정보 보여줘야 함

## Layout 구조 

- footer.html

- navbar.html

- main_layout.html(footer.html & navbar.html 포함)

```html
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Blog UI</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body class="d-flex flex-column min-vh-100">
    {% include '/layout/navbar.html' %} 
    
        {% block content %}
        {% endblock %}


    {% include '/layout/footer.html' %}
   
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>
</html>
```

## NavBar 적용 

원래 navbar html

```html
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="#">My Blog</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/blogs">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/blogs/new">Create New</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/auth/login">로그인</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

```

session 유무에 따른 html

```html
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="#">My Blog</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/blogs">Home</a>
                </li>
                {% if session_user %}
                <li class="nav-item">
                    <a class="nav-link" href="/blogs/new">Create New</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">{{session_user.name}}님 방가</a>
                </li>
                {% else %}
                <li class="nav-item">
                    <a class="nav-link" href="/auth/login">로그인</a>
                </li>
                {% endif %}
            </ul>
        </div>
    </div>
</nav>

```

## Login 되어 있냐 안되어 있냐에 따른 구분

blogs/ 의 경우에는 로그인 안되어 있어도 전체 글을 읽게는 놔둬야 하기에 

get_session_user를 통해 해당 쿠키가 있을 경우 해당 계정 정보와 create new가 주어진다

```python
def get_session_user(request: Reqeust):
    if "session_user" in request.session.keys():
        return request.session["session_user"]

@router.get("/")
async def get_all_blogs(request: Request, conn: Connection = Depends(context_get_conn),
                        session = Depends(auth_svc.get_session_user)):
```

그러나 블로그 생성(/blogs/new/)와 블로그 수정(/blogs/modify) 자체는 애초에 url로 들어오는 걸 막아야 한다(login이 안되어 있는 경우)

```python
def get_session_user_protect(request: Request):
    if "session_user" not in request.session.keys():
        raise HTTPException(status_code=status.HTTP_401_AUTHORIZED,
                            detail="해당 로그인 정보가 존재하지 않습니다")
```