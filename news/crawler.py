# from bs4 import BeautifulSoup
# import requests
# from allowCrawl import is_allowed

# def crawl_naver_news(query):
#     base_url = "https://search.naver.com/search.naver"
#     full_url = f"{base_url}?where=news&query={query}"
#     headers = {'User-Agent': 'Mozilla/5.0'}

#     if not is_allowed(full_url):
#         print("robots.txt에 의해 크롤링이 허용되지 않습니다.")
#         return []

#     res = requests.get(full_url, headers=headers)
#     soup = BeautifulSoup(res.text, 'html.parser')

#     results = []
#     for tag in soup.select("div.sds-comps-vertical-layout sds-comps-full-layout _sghYQmdqcpm83O1jqen"):
#         results.append({
#             'title': tag['title'],
#             'link': tag['href']
#         })

#     print(results)

# if __name__ == "__main__":
#     crawl_naver_news('삼성전자')
import feedparser

def fetch_google_news(keyword):
    # 구글 뉴스 RSS URL 생성
    url = f"https://news.google.com/rss/search?q={keyword}&hl=ko&gl=KR&ceid=KR:ko"

    # RSS 피드 파싱
    feed = feedparser.parse(url)

    # 기사 결과 추출
    for entry in feed.entries[:5]:  # 최근 뉴스 5개만 출력
        print(f"📰 {entry.title}")
        print(f"🕒 {entry.published}")
        print(f"🔗 {entry.link}\n")
        print(f"{entry.summary.split('"')[1]}\n")

# # 예시 사용
# if __name__ == "__main__":
#     fetch_google_news("뉴스케일")
