import sys, json
str_to_json = json.loads(sys.argv[1])
select = int(sys.argv[2])

test = str_to_json['list_test']
test.sort()
for i in test:
  print(i)
print('Hello Node!')

