import json
unique = []
json_unique = []
i=0
with open('DataBucket/CSE_ABBV.json', 'r') as file:
    data = json.load(file)
    print(len(data['cse_abbreviations']))
    for item in data['cse_abbreviations']:
        print(item['shortForm'])
        if item['shortForm'] not in unique:
            unique.append(item['shortForm'])
            temp = {
                "id" : str(i),
                "shortForm" : item['shortForm'],
                "fullForm" : item['fullForm'],
            }
            json_unique.append(temp)
            i+=1
    print(len(json_unique))



