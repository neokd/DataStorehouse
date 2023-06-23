import threading
import queue
import requests

q = queue.Queue()
validProxy = []

with open('./proxy/proxyList.txt', 'r') as f:
    for line in f.readlines():
        q.put(line.strip())


def checkProxies():
    global q
    while not q.empty():
        proxy = q.get()
        try:
            res = requests.get("http://ipinfo.io/ip", proxies={"http": proxy, "https": proxy}, timeout=5)
            if res.status_code == 200:
                validProxy.append(proxy)
                print(proxy)
        except:
            continue

    with open('./proxy/validProxyList.txt', 'w') as f:
        for proxy in validProxy:
            f.write(proxy + '\n')

for _ in range(10):
    threading.Thread(target=checkProxies).start()