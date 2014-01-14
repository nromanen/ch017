#-*-coding:utf-8-*-
import json
import sys
import codecs
from pprint import pprint


def convert_django_dump_to_mongo(filename, file_for_save):	
	converted = []
	
	with codecs.open(filename, 'r', 'utf-8') as json_data, codecs.open(file_for_save, 'w', 'utf-8') as save:	
		for record in json.load(json_data):
			record['fields']['_id'] = record['pk']
			converted.append(record['fields'])
		save.write(
			json.dumps(converted, ensure_ascii=False).replace('}, ', '}\n')[1:-1])

if __name__ == '__main__':
	print 'Start convert file', sys.argv[1], 'and save to', sys.argv[2]
	convert_django_dump_to_mongo(sys.argv[1], sys.argv[2])
