# 😊문벅스 카페메뉴앱 타입스크립트로 변환하기😊

## ✔  개요
1. 기본적인 의존성 설치가 된 저장소로 시작합니다.
    > 설치 파일 : 타입스크립트, ESLint, Prettier
    > - Linter 파일에 대한 설정은 각기 원하시는대로 하시면 됩니다.

<br>

2. 코드 리뷰는 기존 블랙 커피 스터디와 동일한 형태입니다.
   - 코드 리뷰가 주를 이을 것이며 관련 정보를 공유하고자 합니다. 아래의 형태로요.
      > 나보다 나은 코드가 있네? 댓글이나 코멘트 적고 응용
      
      > 조금 수정하면 멋지겠다! 댓글이나 코멘트 적고 피드백
      
      > 이런 문제점이 생겼는데 이렇게 처리하니 훨씬 좋네?! 공유!

    - 인원이 얼마나 모일지는 모르지만, 소규모라면 마이크 키고 주 1회마다 의견을 공유하고 실시간 피드백을 고려하고 있습니다.

<br>

3. 타입스크립트 변환이 중점이지만, 더 나아가 견고한 애플리케이션을 구현해봅시다. 이를 토대로 프레임워크에 활용하는 것은 여러분 몫이네요!

<br>

4. 5주차에 진행할 최종 공유 내용이 가장 크다고 생각합니다. 어떻게 구현했고, 무슨 고민을 했는지 간략하게라도 기록해서 제 3자에게 공유해주세요. 그를 통해 서로가 성장할 수 있으리라 믿습니다.

<br>

## ✔ 진행순서
### 1주차
🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기 / 타입스크립트 변환

<br>

### 2주차 : 🎯 step2 요구사항 - 상태 관리로 메뉴 관리하기 / 타입스크립트 변환

<br>

### 3주차 : 🎯 step3 요구사항 - 서버와의 통신을 통해 메뉴 관리하기 / 타입스크립트 변환

<br>

### 4주차 : Webpack 설정 및 Dev-server 구축(선택: sass 전환)

<br>

### 5주차 : 마무리, 어떤 기능을 추가했는지, 어떤 코드를 중점적으로 수정하고 변환했는지 기록하고 공유하기

<br>

## ✔  진행방법
1. 환경이 세팅된 저장소를 fork하여 각 브런치로 만듭니다.
2. 주차별 요구사항이 완료(피드백 포함)되면 즉시 merge합니다.
3. 수시로 PR하고, 리뷰합니다.
4. 전체 기능을 구현하고 커밋하면 코드가 너무 길어 보기 힘듭니다. 따라서 특정 소단위 기능이 구현되면 바로바로 커밋해주세요! 한 파일에 코드가 최대 300줄을 넘어가면 보기 힘들더군요😭

이상입니다!
실제 주 1회 온라인 진행을 생각하고 있으며, 디스코드로 실시간 피드백 위주일 것입니다. 이 점 참고해주세요!

+ 추가적으로 좋은 의견 있으면 언제나 환영입니다!

<br>
<hr>
<br>
<br/>
<p align="middle">
  <img width="200px;" src="./src/images/moonbucks.png"/>
</p>
<h2 align="middle">JS 문벅스 카페메뉴 앱</h2>
<p align="middle">Vanilla JS로 구현 하는 상태관리가 가능한 카페메뉴 앱</p>
<p align="middle">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
  <img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
  <img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
  <a href="https://github.com/blackcoffee-study/js-lv1-book-manual/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/blackcoffee-study/moonbucks-menu.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

<br/>

# ☕️ 코드리뷰 모임 - Black Coffee

<br/>

> '훌륭한 의사소통은 블랙커피처럼 자극적이며, 후에 잠들기가 어렵다'. <br> A.M. 린드버그(미국의 작가, 수필가) -

<br/>

블랙커피처럼 서로를 자극해주고, 동기부여 해주며, 그 성장과정으로 인해 의미있는 가치를 만들어내고자 하는  
**개발자 커뮤니티** ☕️ **Black Coffee**입니다.

<br/>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="./src/images/moonbucks-main.png">
</p>

<p align="middle">
  <a href="https://blackcoffee-study.github.io/moonbucks-menu/">🖥️ 데모 링크</a>
</p>

<br/>

## 🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

- [ ] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다.
  - [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
  - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.
- [ ] 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
  - [ ] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용한다.
- [ ] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
  - [ ] 메뉴 삭제시 브라우저에서 제공하는 `confirm` 인터페이스를 활용한다.
- [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.
- 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.

```js
<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${name}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>
```

## 🎯 step2 요구사항 - 상태 관리로 메뉴 관리하기

- [ ] [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
- [ ] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
  - [ ] 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
- [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 `sold-out` class를 추가하여 상태를 변경한다.
- 품절 상태 메뉴의 마크업

```js
<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name sold-out">${name}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>
```

## 🎯 step3 요구사항 - 서버와의 통신을 통해 메뉴 관리하기

- [ ] [링크](https://github.com/blackcoffee-study/moonbucks-menu-server)에 있는 웹 서버 저장소를 clone하여 로컬에서 웹 서버를 실행시킨다.
- [ ] 웹 서버를 띄워서 실제 서버에 데이터의 변경을 저장하는 형태로 리팩터링한다.
  - [ ] localStorage에 저장하는 로직은 지운다.
  - [ ] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.
  - [ ] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 [alert](https://developer.mozilla.org/ko/docs/Web/API/Window/alert)으로 예외처리를 진행한다.
- [ ] 중복되는 메뉴는 추가할 수 없다.

## 📝 API

### baseUrl

`http://localhost:3000`

### 메뉴 생성하기

| method | uri                          |
| ------ | ---------------------------- |
| POST   | /api/category/:category/menu |

```javascript
{
 requestBody: {
   "name": "string"
 },
 response: {
   "id": "string",
   "name": "string",
   "isSoldOut": Boolean
  }
}
```

### 카테고리별 메뉴리스트 불러오기

| method | uri                          |
| ------ | ---------------------------- |
| GET    | /api/category/:category/menu |

```javascript
{
  response: [
    {
      id: "string",
      name: "string",
      isSoldOut: Boolean,
    },
  ];
}
```

### 메뉴 이름 수정하기

| method | uri                                  |
| ------ | ------------------------------------ |
| PUT    | /api/category/:category/menu/:menuId |

```javascript
{
 requestBody: {
   "name": "string"
 },
 response: {
   "id": "string",
   "name": "string",
   "isSoldOut": Boolean
  }
}
```

### 메뉴 품절 처리하기

| method | uri                                          |
| ------ | -------------------------------------------- |
| PUT    | /api/category/:category/menu/:menuId/soldout |

```javascript
{
 response: {
   "id": "string",
   "name": "string",
   "isSoldOut": Boolean
  }
}
```

### 메뉴 삭제하기

| method | uri                                  |
| ------ | ------------------------------------ |
| DELETE | /api/category/:category/menu/:menuId |

```javascript
응답 데이터 없음
```

<br/>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br/>

## 💻 Code Review

아래 링크들에 있는 리뷰 가이드를 보고, 좋은 코드 리뷰 문화를 만들어 나가려고 합니다.

- [코드리뷰 가이드1](https://edykim.com/ko/post/code-review-guide/)
- [코드리뷰 가이드2](https://wiki.lucashan.space/code-review/01.intro/)

<br/>

## 👏🏼 Contributing

만약 미션 수행 중에 개선사항이 필요하다면, 언제든 자유롭게 PR을 보내주세요.

<br/>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/blackcoffee-study/moonbucks-menu/issues)에 등록해주세요.

<br/>

## 📝 License

This project is [MIT](https://github.com/blackcoffee-study/moonbucks-menu/blob/main/LICENSE) licensed.
