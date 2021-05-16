## NodeBird API Document

- BaseURL = 'http://localhost:8002/v2'
- request Token: BaseURL/token
- search your posts: BaseURL/posts/my
- search hashtag: BaseURL/posts/hashtag/:content (use encodeURIComponent!)   

statusCode | message
:-: | -
200 | (정상 응답)
204 | (정상 응답) 서버요청은 정상작동하나 검색 결과가 없습니다.
401 | (권한없음)등록되지 않은 도메인입니다.
404 | (찾을 수 없음) 검색 결과가 없습니다.
410 | (사라짐) 새로운 버전이 나왔습니다.
419 | 토큰이 만료되었습니다.
429 | 요청 횟수를 초과했습니다.
500 | 서버에러
