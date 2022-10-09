#!/usr/bin/python
#coding:utf-8
import requests
from bs4 import BeautifulSoup
import re
import os

# 下载商品详情大图
goodid = '544515860791'
detailurl = 'https://item.taobao.com/item.htm?id=' + goodid
htmltext = requests.get(detailurl).text
pattern = re.compile(r'auctionImages    :(.*?)"]')
imgsstr = re.search(pattern, htmltext, flags=0).group()
imgsstr = imgsstr.replace('auctionImages    : [', '')
imgsstr = imgsstr.replace(']', '')
imgsstr = imgsstr.replace('"', '')
imgs = imgsstr.split(',')
isFolderExists = os.path.exists('images/')
if not isFolderExists:
	os.mkdir('images/')
imgfolder = 'images/' + goodid + '/'
isImgFolderExists = os.path.exists(imgfolder)
if not isImgFolderExists:
	os.mkdir(imgfolder)
for _ in imgs:
	imgstrs = _.split('/')
	string = imgstrs[len(imgstrs) - 1]
	fp = open(imgfolder + string,'wb')
	fp.write(requests.get('http:' + _).content)
	fp.close()

# soup = BeautifulSoup(htmltext, "html5lib")
# scripts = soup.find_all('script')
# for script in scripts:
#    if(pattern.match(str(script.string))):
#        data = pattern.match(script.string)
#        # stock = json.loads(data.groups()[0])
#        print data

