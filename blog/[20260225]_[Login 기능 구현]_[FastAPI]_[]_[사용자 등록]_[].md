## User Table 생성

- schmea: blog_db

- table 이름: user

```sql
create table user(
    id integar auto_increment primary key,
    email varchar(100) not null uniuqe,
    hashed_password varchar(200) not null,
);

```

- Depenecy Library: bcrypt, passlib[bcrypt]

- Control 관점에서 auth_svc.py 생성
- View 관점에서 auth.py 생성

```python

from passlib.context import CryptContext

# router 생성
router = APIRouter(prefix="/auth", tags=["auth"])
# jinja2 Template 엔진 생성
templates = Jinja2Templates(directory="templates")

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

def get_hashed_password(password: str):
    return pwd_context.hash(password)

@router.get("/register")
async def register_user_ui(request: Request):
    return templates.TemplateResponse(
        request = request,
        name = "register_user.html",
        context = {},
        status_code = status.HTTP_200_OK
    )

@router.get("/login")
async def login_ui(request: Request):
    return templates.TemplateResponse(
        request=request,
        name = "login.html",
        context = {},
        status_code = status.HTTP_200_OK
    )

```

이떄 password는 unique하게 table 생성할 떄 설정했으므로

/auth/login 창에서 form을 요청할때 503 Error가 반환된다

