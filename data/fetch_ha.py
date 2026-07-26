import urllib.request, json

URLS = {
    'https://www.ha.org.hk/opendata/facility-hosp.json': '醫院',
    'https://www.ha.org.hk/opendata/facility-sop.json': '專科門診',
    'https://www.ha.org.hk/opendata/facility-fmc.json': '家庭醫學診所',
}

seen = set()
results = []
counts = {}

for url, t in URLS.items():
    with urllib.request.urlopen(url) as resp:
        data = json.loads(resp.read())
    seen_names = set()
    for item in data:
        name = item.get('institution_tc') or item.get('institution_sc', '')
        addr = item.get('address_tc') or item.get('address_sc', '')
        if name in seen:
            continue
        seen.add(name)
        results.append({
            'name': name,
            'address': addr,
            'latitude': item.get('latitude'),
            'longitude': item.get('longitude'),
            't': t,
        })
    counts[t] = len([r for r in results if r['t'] == t])

output_path = r'D:\AI\moneyproject\sites\hktravel\data\hospitals.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, separators=(',', ':'))

for t, c in counts.items():
    print(f'{t}: {c}')
print(f'Total: {len(results)}')
