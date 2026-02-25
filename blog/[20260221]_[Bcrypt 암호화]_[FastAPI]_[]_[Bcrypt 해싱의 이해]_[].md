## Bcrypt 개요

- Bcrypt는 Hashing 알고리즘이며, Encryption 알고리즘이 아님
    - 즉, 한번 Hashing 하면 복구가 불가능하다

- Bcryp는 패스워드와 같은 민감정보를 복원할 수 없도록 안전하게 변환하며 입력된 패스워드등의 정보가 저장된 패스워드와 동일한지를 Verfiy할 수 있음

## Bcrypt의 주요 요소

- **`Salt`**: Hashing 적용되기 전에 패스워드에 추가되는 random value로 동일한 패스워드 값이라도 서로 다른 salt값으로 인하여 _hashing 적용 결과는 달라짐_

- **`Cost Factor`**: Hashing을 적용하는데 필요한 복잡도: 높을 수록 Hashing에 시간이 오래 걸리므로, 해당 Hashing 값을 재현하여 패스워드 탈취하는데 오랜 시간이 걸림

- **`Hashing`**: 패스워드 + Salt + Cost Factor를 합쳐서 Hashing 값을 구함

## Bcrypt의 Salt

Algorithm identifier + Number of Rounds + Salt(Random String)

## Bcrypt를 이용한 검증

1. DB 등에 저장되어 있는 Hash 된 패스워드 값에서 Salt와 Cost Factor 추출

2. 사용자가 검증을 위해 입력한 패스워드 값을 추출된 Salt값과 Cost Factor를 이용하여 Hashing 적용

3. Hashing 적용된 값이 DB에 저장된 Hash된 패스워드 값과 동일한지 비교하여 검증