# inventory web

Project made by Hawaiian Pizza.

Spring Boot, 리엑트로 개발된 프론트로 구성된 웹 - 서버 기반 애플리케이션입니다. URL은 다음과 같습니다.

- https://inventory.hawaiian-pizza.ml/

## Features

- 홈페이지 접속시 로그인 화면이 나타난다.
  - 회원가입이 되어있지 않은 경우, 구글 로그인시 이름, 연락처를 등록한다.
    - 이후 회원가입을 위한 —> 관리자 승인대기 목록 → 사용자 허가
    - 관리자 승인이 있기 전까지는 로그인할 수 없으며, 승인이 완료되면 로그인 가능
- 로그인 이후 재고 상태리스트가 보여진다. UI는 쇼핑몰과 비슷한 구조로 이루어진다.
- 사용자는 요구사항과 동일하게 조회가 가능하다.
  - 제품의 등록, 삭제는 불가하나, 대여는 가능하다.
  - 물품 상세페이지에는 물품의 대한 자세한 정보가 보여지고, 사용자 대여 히스토리가 보여진다.
    - 반납에 시간은 정해져 있지 않으나, 대여 히스토리는 보여주어야 한다.
    - 대여, 반납에 대한 정보가 표시된다. 또한 총 수량, 남은 수량을 보여주어야 한다.
- 사용자별 별도의 페이지 존재
  - 본인이 대여한 품목 리스트

## Installation

Follow these installation instructions:

본 프로그램을 온프레미스 환경에서 사용하기 위해서는 접속정보를 수정해야 합니다. 

* **login-web/src/lib/constants.js** 

  ```javascript
  /* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
  export default {
      BackUrl: '$(BACKEND-URL)',
    };
    
  ```

  

### Manually

```bash
$ git clone https://github.com/Connecting-Project/inventory-web.git
$ cd inventory-web
$ npm install 
$ npm start
```

### Docker

```bash
$ docker run -p 5000:5000 -d jusk2/hawaiian-inventory-web:production
```



## Tech Stack

- React
- Node
- Docker
- Jenkins

## Developer

- 김수현 - 벡엔드
- 조용우 - 프론트 엔드
- 이성원 - 인프라

## Contact

토이 프로젝트에 있어서 궁금한 점이 있거나 개선하고 싶은 점 등 여러분들의 다양한 의견을 기다립니다.

- [seongwon@edu.hanbat.ac.kr](mailto:seongwon@edu.hanbat.ac.kr)
- [dpfmxlfls95@naver.com](mailto:dpfmxlfls95@naver.com)
- [kimsoo5133@gmail.com](mailto:kimsoo5133@gmail.com)

## License

Distributed under the MIT License. See `LICENSE` for more information.
