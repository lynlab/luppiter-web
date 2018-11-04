<template>
  <div id="reference">
    <h1>도움말</h1>
    <h2>GraphQL API</h2>
    <p>Luppiter API는 GraphQL 인터페이스를 사용합니다. (<a href="https://graphql.org/learn/">GraphQL이 무엇인가요?</a>)</p>
    <p>다음과 같은 두 가지 방식으로 요청을 보낼 수 있습니다. 예제는 Key-Value 서비스를 이용하여 key 값이 "foo"인 객체를 가져오는 요청입니다.</p>

    <h3>1. GET 방식</h3>
    <code>
      curl -H 'Authorization: Bearer YOUR_API_KEY' \<br/>
      &nbsp;&nbsp;https://luppiter.lynlab.co.kr/apis/graphql?query=query{keyValue(key:"foo"){key,value}}
    </code>
    <p>요청 주소는 어떠한 경우에도 변하지 않습니다. 모든 요청은 query 파라미터로 구분합니다.</p>

    <h3>2. POST 방식</h3>
    <code>
      curl -X POST \<br/>
      &nbsp;&nbsp;-H 'Authorization: Bearer YOUR_API_KEY' \<br/>
      &nbsp;&nbsp;-H 'Content-Type: application/graphql' \<br/>
      &nbsp;&nbsp;-d 'query{keyValue(key:"foo"){key,value}}' \<br/>
      &nbsp;&nbsp;https://luppiter.lynlab.co.kr/apis/graphql
    </code>
    <p>
      POST 요청은 주소는 동일하지만, query 파라미터를 요청의 body에 싣어 보낸다는 점이 다릅니다.
      로그인 정보나 토큰 등 민감한 데이터를 전송하는 경우에는 보안을 위해 POST 방식을 사용하는 것이 좋습니다.
    </p>
    <p>
      요청 body의 자료형이 JSON이 아닌 GraphQL Syntax임에 유의하세요.
      이를 명시하기 위해, <code>Content-Type: application/graphql</code> 헤더를 반드시 포함해야합니다.
    </p>
  </div>
</template>

<style lang="scss" scoped>
#reference {
  h2:not(:first-of-type) { margin-top: 60px; }
  h3 { margin-top: 30px; }
}
</style>
