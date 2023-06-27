import threading
import queue
import requests

# Create a queue to store proxy addresses
q = queue.Queue()

# Create an empty list to store valid proxies
validProxy = []

# Read proxy addresses from the file "proxyList.txt" and add them to the queue
with open('./proxy/proxyList.txt', 'r') as f:
    for line in f.readlines():
        q.put(line.strip())

# Function to check the validity of proxies
def checkProxies():
    global q, validProxy
    while not q.empty():
        # Get a proxy from the queue
        proxy = q.get()
        try:
            # Make a GET request to "http://ipinfo.io/ip" using the proxy with a timeout of 5 seconds
            res = requests.get("http://ipinfo.io/ip", proxies={"http": proxy, "https": proxy}, timeout=5)
            if res.status_code == 200:
                # If the request is successful, consider the proxy as valid and add it to the list
                validProxy.append(proxy)
                print(proxy)
        except:
            continue

    # Write the valid proxies to the file "validProxyList.txt"
    with open('./proxy/validProxyList.txt', 'w') as f:
        for proxy in validProxy:
            f.write(proxy + '\n')

# Create and start 10 threads, each running the checkProxies function concurrently
for _ in range(10):
    threading.Thread(target=checkProxies).start()
