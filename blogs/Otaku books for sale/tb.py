#!/usr/bin/python
#coding:utf-8
import requests
from bs4 import BeautifulSoup
import re
import os

pageEnd = False
pageNo = 1
goodList = []

# 下载商品列表信息

while pageEnd == False:
	url = "https://shop36066072.taobao.com/i/asynSearch.htm?_ksTS=1496667092093_153&callback=jsonp154&mid=w-726411589-0&wid=726411589&path=/category-280511461.htm&spm=a1z10.5-c.w4010-726411588.19.wSh6bZ&search=y&parentCatId=280510034&catId=280511461&scid=280511461&pageNo="+str(pageNo)
	remap = {
	    'jsonp154("                ' : None
	}
	htmltext = requests.get(url).text
	hh = htmltext.replace('jsonp154("                ', '')
	hh2 = hh.replace('\\"', '"')
	soup = BeautifulSoup(hh2, 'html.parser')
	tags = soup.find_all('dt', class_='photo')
	end = soup.find_all('strong')
	if len(end) > 0 :
		pageEnd = True
		break
	startindex = len(goodList)
	for _ in tags: 
		href = 'https:' + _.a['href']
		imgsrc = _.a.img['src']
		title = _.a.img['alt']
		imgurl = requests.get('http:'+imgsrc)
		idstr = href.replace('https://item.taobao.com/item.htm?id=', '')
		string = idstr + '.jpg'
		isFolderExists = os.path.exists('thumbnails/')
		if not isFolderExists:
			os.mkdir('thumbnails/')
		fp = open('thumbnails/'+string,'wb')
		fp.write(imgurl.content)
		fp.close()
		goodList.append({'id':idstr, 'href':href, 'title':title, 'price':''})
	spans = soup.find_all('span', class_='c-price')
	spanindex = startindex
	for _ in spans:
		price = _.text
		goodList[spanindex]['price'] = price
		spanindex = spanindex + 1
	pageNo = pageNo + 1
jsontext = {'data':goodList}
fh = open("json.txt","wb")
fh.write(str(jsontext).replace(' u\'', ' \'').decode("utf-8"))
fh.close()

# 下载商品详情大图

for good in goodList:
	goodid = good['id']
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




