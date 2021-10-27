<br />
<p align="center">
  <h3 align="center">환자 정보를 보여주는 테이블 & 차트</h3>

  <p align="center">
    <a href="https://patient-table-n-chart.netlify.app/">View Demo</a>
  </p>
</p>

## About The Project

### 환자 정보 테이블

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/139057860-7da4c770-d468-4a85-b00b-0d37e9986c35.png" alt="patient table view" width=600 />
</p>

### 테이블 페이지네이션

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/139059189-dfe934cc-747f-43e2-a4df-839530dbc418.gif" alt="patient table pagination" width=600 />
</p>

### 테이블 컬럼 기준 정렬

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/139059694-3076e637-3941-4be0-84cf-33355941ffdb.gif" alt="patient table sorting" width=600 />
</p>

### 테이블 컬럼 기준 필터링

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/139062716-18b22700-bb7c-4318-acab-b269f30704aa.gif" alt="patient table filtering" width=600 />
</p>

### 테이블 상세 정보 행

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/139063515-5ab8d9f6-810b-4e6f-b9b3-cc21a3feb546.gif" alt="patient table detail row" width=600 />
</p>

### Built With

- React
- TypeScript
- axios
- styled-components

## Getting Started

### Installation

To install packages:

```sh
yarn install
```

To serve the app:

```sh
yarn start
```

## Features

1. 환자 정보를 탐색할 수 있는 테이블 컴포넌트

   - API 호출을 통해 환자 정보 가져오기
   - 환자 id, 성별, 생년월일, 나이, 인종, 민족, 사망 여부 컬럼 및 데이터 표현
   - 버튼을 통해 페이지 이동 가능, 한 페이지당 row 갯수 선택 가능, 데이터 총합 관련 정보 표시
   - 환자 id, 성별, 생년월일, 인종, 민족, 사망여부 컬럼으로 정렬 가능

2. 테이블 필터링

   - API 호출을 통해 필터링 정보 가져오기
   - 성별, 나이, 인종, 민족, 사망 여부 컬럼으로 필터링 가능
   - 이 중 나이 컬럼의 경우 단일 값이 아닌 범위로 필터링

3. 환자 상세 정보 표현

   - API 호출을 통해 선택한 환자의 상세 정보 가져오기
   - 환자 정보를 표현하는 행 클릭 시 그 아래 상세 정보를 보여주는 행 추가
   - 상세 정보에는 전체 방문 수와 진단 정보 표현
