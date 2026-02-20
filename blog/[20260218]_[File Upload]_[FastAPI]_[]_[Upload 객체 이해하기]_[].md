## File(Dependency Injection)

```python
from fastapi import Depends, File, UploadFile

imagefile: Uploadfile | None = File(None)

```

`Form()`과 `File()` 둘다 모두 Depends 함수로 Fastapi 내부 로직을 수행하여 반환하는 형식이다.

이때 주로 Form()는 `str`을, File()는 `UploadFile`을 반환한다 

이때 File() 함수가 작동하기 위해서는

1) enctype = `multipart/form-data`
2) input type: `file`

```python
<form action="/blogs/new" method="POST" enctype="multipart/form-data">
<input type="file" class="form-control" id="imagefile" name="imagefile">

```

## UploadFile

<ins>File이라는 Depends 함수를 이용해서 반환 한 객체 유형은 UploadFile이다</ins>

- **filename**: client가 upload한 파일의 이름명

- **content-type**: 미디어 타입(image/jpeg 등등)

- **file**: python의 SpooledTemporaryFile 객체 

- **read(size)**: size만큼 파일 정보를 불러온다

- **write**: 파일을 작성하는 기능 

## 파일명 중복 

filename의 경우 client가 저장한 파일 이름명으로 서로 겹칠 수 있고 동일한 client가 같은 이름의 image file를 저장할 수 있다.

이에 static 폴더에 upload한 파일을 저장할 때 그대로 저장하지 않고 이름을 변경하여 저장할 필요가 있다.

전체적인 형태는: **/static/uploads/author/** 형태이고

아래는 time library를 이용한 _timestamp를 이용한 새로운 이름 생성 알고리즘_이다.

```python
filename_only, ext = os.path.splittext(imagefile.filename)
upload_filename = f"{filename_only}_{(int)(time.time())}{ext}"

```

## UPLOAD DIR

Upload dir의 경우 외부적으로 공개를 하지 않고 private를 위해서

`dotenv`의 `load_dotenv`을 이용한다

1) .env 파일을 생성하고 거기에 UPLOAD_DIR = "/static/uploads"
2) from dotenv import load_dotenv
3) load_dotenv()
4) UPLOAD_DIR = os.getinv("UPLOAD_DIR)

## StaticFiles

```python
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="statics"), name="static")

```

1) HTML에서 불러올 때

2) 직접 localhost/static/temp.png로 불러올수도 있음