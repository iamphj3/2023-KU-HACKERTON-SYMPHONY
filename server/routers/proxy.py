import requests
url = 'https://ip.smartproxy.com/json'
username = 'spnfcu2wai'
password = 'f8mfNvr5GH28rCzwxu'
proxy = f"https://spnfcu2wai:f8mfNvr5GH28rCzwxu@gate.smartproxy.com:7000"
result = requests.get(url, proxies = {
    'http': proxy,
    'https': proxy
})
print(result.text)