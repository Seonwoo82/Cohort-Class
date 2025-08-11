This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 백엔드 문서

아래 내용은 본 프로젝트에서 사용할 백엔드(FastAPI + PostgreSQL) 기준의 구조/설정 가이드입니다. 실제 코드 레이아웃과 이름은 필요에 맞게 조정하세요.

### 기술 스택

- **framework**: FastAPI
  - Uvicorn, Gunicorn
- **database**: PostgreSQL, SQLModel, AsyncPG
- **schema/type**: Pydantic
- **API 문서**: Swagger UI (/docs), ReDoc (/redoc)
- **마이그레이션**: Alembic

### 프로젝트 폴더 구조 예시

```text
project_root/
├─ app/
│  ├─ fixtures/
│  │  └─ data/              # 정적/시드 데이터
│  ├─ user/
│  │  ├─ admin.py           # admin 모델/권한 관련 로직
│  │  ├─ models.py          # DB 모델(SQLModel)
│  │  ├─ schemas.py         # 요청/응답 스키마(Pydantic)
│  │  ├─ service.py         # 서비스/비즈니스 로직
│  │  └─ utils.py           # 유틸리티 함수
│  ├─ admin.py              # 관리자 관련 라우터
│  ├─ api.py                # API 라우팅 엔트리포인트
│  ├─ config.py             # 설정/환경변수 로딩
│  ├─ database.py           # 데이터베이스 연결(Session/엔진)
│  └─ main.py               # 앱 엔트리(ASGI)
├─ docs/                    # 개발 문서/스펙
├─ .env                     # 환경 변수
├─ .gitignore
├─ alembic.ini              # Alembic 설정
├─ README.md
└─ requirements.txt
```

#### 주요 모듈 설명

- **`app/main.py`**: FastAPI 앱 객체 생성 및 미들웨어/라우터 등록
- **`app/api.py`**: 라우터들을 모아 앱에 포함시키는 엔트리 포인트
- **`app/database.py`**: SQLModel/AsyncPG 엔진과 세션 관리
- **`app/config.py`**: `.env`를 읽어 설정값을 구조화하여 제공
- **`app/user/*`**: 도메인 모듈(모델/스키마/서비스/유틸/관리자)
- **`alembic.ini`**: Alembic 마이그레이션 설정 파일

### 로컬 개발 환경 준비

```bash
# Python 가상환경 생성 및 활성화 (macOS/Linux)
python -m venv .venv
source .venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# 개발 서버 실행 (hot-reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# 프로덕션 실행 예시
gunicorn -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000 app.main:app
```

### .env 예시

```dotenv
# PostgreSQL (asyncpg 드라이버 사용 예시)
DATABASE_URL=postgresql+asyncpg://cohort_user:YOUR_STRONG_PASSWORD@localhost:5432/cohort

# 기타 환경
APP_ENV=local
DEBUG=true
```

### requirements.txt 예시

```text
fastapi
uvicorn[standard]
gunicorn
sqlmodel
asyncpg
alembic
python-dotenv
pydantic
```

### 데이터베이스 설정

1. PostgreSQL 17.x 설치
2. PostgreSQL 접속

```bash
psql -U postgres
```

3. 데이터베이스 및 계정 생성

```sql
CREATE DATABASE cohort;
CREATE USER cohort_user WITH PASSWORD 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE cohort TO cohort_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cohort_user;
```

4. 연결 확인 (옵션)

```bash
psql "postgresql://cohort_user:YOUR_STRONG_PASSWORD@localhost:5432/cohort"
```

### Alembic 마이그레이션

```bash
# Alembic 초기화 (최초 1회)
alembic init migrations

# 자동화 가능한 경우 (SQLModel 메타데이터를 target_metadata로 연결 필요)
alembic revision -m "create tables" --autogenerate

# 최신으로 적용
alembic upgrade head

# 되돌리기
alembic downgrade -1
```

### API 문서

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### 시드 데이터

- `app/fixtures/data` 폴더에 JSON/CSV 등의 정적 데이터를 두고, 별도의 초기화 스크립트에서 읽어 DB에 적재하는 방식을 권장합니다.

> 주의: 상용 환경에서는 강력한 비밀번호/권한 최소화/네트워크 접근 제어를 반드시 적용하세요.

