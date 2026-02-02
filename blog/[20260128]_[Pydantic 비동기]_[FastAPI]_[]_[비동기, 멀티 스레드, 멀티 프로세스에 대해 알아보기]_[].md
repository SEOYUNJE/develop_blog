## 동기 프로세스 Vs 비동기 프로세스 

**`동기 프로세스`**

1) Process A -> Process B 호출
2) Process B 수행이 완료될때 까지 Wait
3) Process B로부터 응답 받음
4) Process A는 계속 Working

```python
@app.get("/task")
async def run_task():
    time.sleep(20)
    return {"status": "long_running task completed"}

```

**`비동기 프로세스`**

1) Process A -> Process B 호출
2) Process B 수행과 상관없이 Process A는 계속 Working
3) Process B로부터 응답 받음

<ins/>주로 I/O Bound(File,DB,Network처리) 또는 DeepLearning Model Inference처럼 시간이 많이 걸리는 작업을 진행 시 비동기를 이용하면 많은 수의 사용자 reqeust를 효율적으로 처리 할 수가 있다</ins> 

```python
async def long_running_task():
    await asyncio.sleep(20)

@app.get("/task")
async def run_task():
    result = await long_running_task()
    return result

```

## Async 적용 시 유의 사항

`FastAPI`와 달리 `Flask` or `Djagno`와 같은 동기 방식의 프레임워크에선 비동기 대신 ThreadPool 방식의 multi thread을 이용해 request에 대한 반응성을 높인다. 

1) 단일 동기 방식으로 진행

비동기 함수는 Event Loop을 통해 다양한 request를 처리하는데 비동기 함수 내 time.sleep(20)을 쓰게 되면 event loop가 blocking되어 비동기를 쓸 수가 없다. 

```python
@app.get("/task")
async def 
    time.sleep(20)
```

2) 비동기 방식으로 진행

```python
@app.get("/task")
async def 
    await asyncio.sleep(20)
```

3) 동기 방식으로 진행 (Thread Pool, 병렬 방식)

I/O Bound or Model Inference의 경우를 제외하고 빠르게 처리되는 함수의 경우
동기, 비동기의 차이가 미미해서 굳이 신경쓸 필요가 없다. 

```python
@app.get("/task")
def 
    time.sleep(20)
```