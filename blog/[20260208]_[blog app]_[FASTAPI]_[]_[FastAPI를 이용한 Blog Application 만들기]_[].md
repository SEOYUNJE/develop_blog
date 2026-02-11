## Rest API 개요

REST(Reprentational State Transfer) 주요 설계 원칙

- _**`동일한 리소스에 대한 균일한 인터페이스`**_  
- _**`클라이언트와 서버는 완전히 독립적`**_  
- _**`무상태(Stateless)`**_  
- _**`캐쉬 지원 가능`**_  
- _**`계층화된 시스템 아키텍처`**_
- _**`온디맨드 코드`**_


- Resource를 나타낼 때는 명사를 사용
    - GET /blogs (블로그 리스트를 가져옴)
    - POST /blogs (신규 블로그를 생성)

- Resource의 마지막에 슬래쉬를 포함하지 않으며, 파일 확장자는 URL에 포함하지 않음
    - 잘못된 예시: http://www.example.com/blogs/
    - 잘못된 예시: http://www.example.com/blogs.png

- HTTP Status Code 기반으로 수행 결과 및 에러 발생 시 Client에게 의미있는 메세지를 전달한다. 

## Blog API 명세서

| API 명 | HTTP Method | API 설명 | 예시 |
| ----- | ------------ | --------| ---- |
|  /blogs | GET | 모든 blog 요약 보기 | GET /blogs | 
|  /blogs/show/{id} | GET | 지정된 id의 Blog 상세 보기 | GET /blogs/show/1 |
|  /blogs/new | GET | 새로운 Blog 생성을 위한 UI(HTML) | GET /blogs/new/ |
|  /blogs/new | POST | 새로운 Blog 생성, DB 저장 | POST /blogs/new |
|  /blogs/modify/{id} | GET | 지정된 id의 Blog 수정을 위한 UI 생성 | GET /blogs/modify/1 | 
|  /blogs/modify/{id} | POST(또는 PUT) | 지정된 blog 수정, DB Update | POST /blogs/modify/1 |
|  /blogs/delete/{id} | POST(또는 DELETE) | 지정된 id의 Blog 삭제. DB Delete | POST /blogs/delete/1 | 

## Blog Application 모듈 디렉토리 구조

- DataBase 접속: `db`, `dataset.py`

- Domain 별 APIRouter: `routes`, `blog.py`

- Pydantic Model 및 DataClass: `schemas`, `blog_schema.py`

- Templates Engine: `templates`, `Template용 html`

- 각종 Utility: `utils`, `util.py`

### DataBase 접속

```python
from sqlalchemy import create_engine, Connection
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.pool import QueuePool, NullPool
from contextlib import contextmanager
from fastapi import status
from fastapi.exceptions import HTTPException

# database connection URL
DATABASE_CONN = "mysql+mysqlconnector://root:origin0327!@127.0.0.1:3306/blog_db"

engine = create_engine(DATABASE_CONN, #echo=True,
                       poolclass=QueuePool,
                       #poolclass=NullPool, # Connection Pool 사용하지 않음. 
                       pool_size=10, max_overflow=0,
                       pool_recycle=300)

def direct_get_conn():
    conn = None
    try:
        conn = engine.connect()
        return conn
    except SQLAlchemyError as e:
        print(e)
        raise e
```

### APIRouter 

```python
from fastapi import APIRouter, Request
from db.database import direct_get_conn
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from schemas.blog_schema import BlogData

# Router 생성
router = APIRouter(prefix="/blogs", tags=["blogs"])

@router.get("/")
async def get_all_blogs(request: Request):
    conn = None
    try: 
        conn = direct_get_conn()
        query = """
        SELECT id, title, author, content, image_loc, modified_dt FROM blog
                """
        result = conn.execute(text(query)) 
               
        rows = [BlogData(id = row.id, # row[0]
                     title = row.title,
                     author = row.author,
                     content = row.content,
                     image_loc = row.image_loc,
                     modified_dt = row.modified_dt) 
                for row in result]
        
        result.close()
        return rows
    except SQLAlchemyError as e:
        print(e)
        raise e
    finally: 
        if conn:
            conn.close()

```

### Data Schema

```python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from pydantic import dataclass

class BlogInput(BaseModel):
    title: str = Field(..., min_length=2, max_length=200)
    author: str= Field(..., max_length=100)
    content: str = Field(..., min_length=2, max_length=4000)
    image_loc: Optional[str]  = Field(None, max_length=400)
    
class Blog(BlogInput):
    id: int
    modified_dt: datetime

@dataclass
class BlogData:
    id: int
    title: str
    author: str
    content: str
    modified_dt: datetime
    image_loc: Optional[str] = None
```

## FastAPI Dependency Injection 개요
