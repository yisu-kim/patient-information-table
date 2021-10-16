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
  <img src="https://user-images.githubusercontent.com/37607373/137590944-b717d95c-00c3-40ce-97dc-ed8b23ccf797.png" alt="project patient table view screenshot" height=600 />
</p>

### 테이블 페이지네이션

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/137591101-5c937de3-31bd-449e-b4b2-551677805d95.gif" alt="project patient table pagination screenshot" height=600 />
</p>

### 테이블 컬럼 기준 정렬

<p align="center">
  <img src="https://user-images.githubusercontent.com/37607373/137591260-c380988b-a68d-49c1-aeb0-00efaa7529f4.gif" alt="project patient table sorting screenshot" height=600 />
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

   - API 호출을 통해 환자 정보 가져오기 (2021.10.16 기준, API 에러로 dummy 데이터 사용)
   - 환자 id, 성별, 생년월일, 나이, 인종, 민족, 사망 여부 컬럼 및 데이터 표현
   - 버튼을 통해 페이지 이동 가능, 한 페이지당 row 갯수 선택 가능, 데이터 총합 관련 정보 표시
   - 환자 id, 성별, 생년월일, 인종, 민족, 사망여부 컬럼으로 정렬 가능
