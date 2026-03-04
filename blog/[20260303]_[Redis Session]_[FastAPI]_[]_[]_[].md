## FastAPI의 Session Middleware

Session Middleware는 Session 기반이 아닌 signed cooki 기반이다.

그러다 보니 cookie에 민감한 정보(username, email)등이 포함되어 있어 안정성이 떨어진다

이에 Redis 기반 Session Middleware를 진행한다
이를 통해 cookie는 개별 식별 번호만 가지게 되어 브라우저 내 저장된 cookie를 보면 민감한 개별 정보가 없어 안정성 있게 관리 가능 

## Cookie vs Session

보안 취약성으로 인해 대기업에서는 Session을 통해 민감 정보를 관리한다

- 쿠기과 달리 정보가 Session id만 있다 보니 용량이 적어, 네트워크 전송 부하가 적다. 

- Cookie는 보안 침해가 우려될 경우 서버에서 일괄적으로 Cookie 데이터 삭제 불가 

- Session는 보안 침해가 우려될 경우, Session 저장소를 Restart하여 모든 Session id를 invalidate 시켜서 보안 및 데이터 통제 가능 

# Redis 개요

- RAM에 데이터 액세스를 빠르게 수행하는 Database 솔루션

- 주로 Key=Value 형태로 다양한 데이터 타입들에 대해 데이터 액세스/수정/삭제/저장등을 수행

- 메모리의 데이터를 File로 영구적으로 저장 가능

- 마이크로 Second 단위의 빠른 처리 성능으로 매우 빈번한 데이터 액세스가 발생할 경우 자주 활용 