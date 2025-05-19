# 이벤트 / 보상 관리 플랫폼
## 실행 방법 (Docker Compose)

### Git Clone 및 도커 컴포즈 실행

작업 디렉토리에서 다음 명령어를 순서대로 실행하세요:

```bash

git clone https://github.com/JeongSH1/event-management-platform.git

# 이미지 빌드
docker compose build

# 컨테이너 실행 (백그라운드 모드)
docker compose up -d
```

### 주요 포트 안내

| 서비스       | 포트    | 설명                                                  |
|--------------|-------|-----------------------------------------------------|
| **MongoDB**  | 12067 | MongoDB 데이터베이스 접근 포트 <br/>(원활한 테스트를 위해 외부에서 접근 가능하도록 설정) |
| **Gateway**  | 1206  | 모든 API 요청이 진입하는 포트                                  |


### 환경 변수 설정
각 서비스는 .env 파일을 사용하지 않고 Docker 환경 변수를 통해 설정됩니다. 이 설정은 docker-compose.yml 내부에 정의되어 있으므로, 별도의 설정 없이 실행됩니다.

### 테스트

* AccessToken은 Bearer Token, 
* RefreshToken은 header에 x-refresh-token필드에 저장
* clone 후 받은 파일 루트에 `과제 테스트용.postman_collection`를 postman 에서 import 하여 테스트 가능

## 이벤트 설계 개요

이 시스템에서 "이벤트"는 유저가 특정 조건을 만족하면 보상을 받을 수 있도록 구성되어 있습니다.

### 이벤트의 기본 구성

- **title**: 이벤트의 제목
- **description**: 이벤트 설명 (선택적)
- **startAt / endAt**: 이벤트 진행 기간
- **status**: 이벤트 상태 (ACTIVE 또는 INACTIVE)
- **conditions**: 유저가 만족해야 할 조건들의 배열
- **rewardId**: 보상과 연결

이벤트는 여러 데이터 필드와, 여러개의 조건, 1개의 보상으로 매핑되어 있습니다.

### 보상 연결 방식
- 각 이벤트는 하나의 보상(reward)과 1:1로 연결됩니다.
- 사용자가 보상을 받기 위해서는 이벤트에 설정된 **모든 조건을 만족해야** 합니다.

### 보상 구성
- 보상은 여러 개의 아이템들과 수량으로 구성됩니다.
- 각 아이템은 특정 카테고리에 속합니다 (현재 등록된 카테고리):
    - meso (메소)
    - maple_point (메이플 포인트)
    - game_item (게임 아이템)

### 조건 구성 방식
- 조건은 다음과 같은 속성들을 포함합니다:
    - **category**: 조건의 종류
    - **threshold**: 조건을 만족하기 위한 기준값 (예: 출석 횟수 3회 이상)
    - **startAt / endAt**: 조건이 체크되는 유효 기간

### 현재 조건 카테고리 예시
다음과 같은 조건 카테고리들이 존재합니다:
- check_attendance: 출석 체크
- change_name: 이름 변경 여부
- change_email: 이메일 변경 여부
- has_recommender: 추천인 입력 여부

## 조건 검증 방식

사용자가 이벤트 보상을 수령하기 위해 요청할 때, 시스템은 해당 유저가 이벤트의 모든 조건을 충족했는지를 아래와 같은 방식으로 검증합니다.

### 1. 공통 조건 검증

모든 조건 카테고리에 앞서 **공통적으로** 적용되는 기본 검증 로직입니다:

- **이벤트 상태 확인**: 이벤트가 활성화 상태인지 확인합니다.
    - `status`가 `ACTIVE`인지 여부
- **이벤트 기간 확인**: 현재 시간이 이벤트 기간 내에 속하는지 확인합니다.
    - `startAt ≤ 현재 시각 ≤ endAt`
- **중복 수령 방지**: 유저가 해당 이벤트에 대해 이미 보상을 수령한 기록이 있는지 확인합니다.
    - `RewardClaimLog`를 조회하여, 동일 이벤트에 대해 `SUCCESS` 상태로 등록된 내역이 있는지 검증합니다.

### 2. 세부 조건 검증

이벤트에는 하나 이상의 **세부 조건**이 포함되어 있으며, 각 조건의 유형(`category`)에 따라 검증 방식이 달라집니다.

#### 현재 조건 카테고리 분기

- `check_attendance` : 출석 횟수가 기준(threshold) 이상인지 확인
- `change_name` : 이름 변경 이력이 있는지 확인
- `change_email` : 이메일 변경 이력이 있는지 확인
- `has_recommender` : 추천인으로 입력된 적이 있는지 확인

#### 검증 방식
- 각 조건 카테고리에 대해 **전용 체크 모듈(ConfirmModule)** 를 분리하여 구현하였습니다.
- 조건 카테고리를 기준으로 해당 조건을 담당하는 함수를 호출합니다.
- 외부 API 또는 내부 DB 조회를 통해 조건 만족 여부를 반환합니다.
- 검증된 결과는 모두 `RewardClaimLog`로 저장됩니다.

#### 예시

- `check_attendance` 조건:  
  → Attendance(MSA Service)에서 일정 기간 동안의 출석 횟수를 조회하고, 조건의 `threshold` 이상인지 확인

- `has_recommender` 조건:  
  → User(MSA Service) 에서 추천인 입력 여부 확인

## 사용자 역할
* USER 보상 요청 가능
* OPERATOR 이벤트/보상 등록
* AUDITOR 보상 이력 조회만 가능
* ADMIN 모든 기능 접근가능

## 구조 설명

### Gateway
- 모든 외부 요청의 진입점 역할
- Gateway는 인증/인가 처리 후 각 도메인 서비스로 요청을 위임
- 요청 시, 인증된 사용자 정보를 `x-user-id` 등의 Header에 포함하여 전달
- 외부 클라이언트는 Gateway만 접근 가능

### Auth 서비스
- 회원가입, 로그인 처리
- JWT Access Token 및 Refresh Token 발급
- Access Token이 만료되었을 경우 Refresh Token을 검증 후 갱신
- 사용자 민감 정보 관리 (role, password, refreshToken)

### Event  / Attendance / User 서비스
- User(사용자 정보 관리), Attendance(사용자 출석 관리)는 사용자 시뮬레이션을 위한 서비스
- 각 도메인 책임 단위로 서비스 분리
- 독립적인 비즈니스 로직 처리 및 DB 구성
- 내부 Docker 네트워크로 통신하며, 외부에는 노출되지 않음
