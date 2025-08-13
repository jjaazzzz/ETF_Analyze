from urllib.robotparser import RobotFileParser
from urllib.parse import urlparse

def is_allowed(url, user_agent='*'):
    parsed_url = urlparse(url)
    robots_url = f"{parsed_url.scheme}://{parsed_url.netloc}/robots.txt"

    rp = RobotFileParser()
    rp.set_url(robots_url)
    try:
        rp.read()
    except:
        return False  # robots.txt 읽기 실패 시 차단
    
    return rp.can_fetch(user_agent, url)
