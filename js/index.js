window.onload = function() {
	var music = document.getElementById("vd");//获取ID  
	var navLis = document.querySelectorAll('#head .headMain .nav ul li')
	var conUl = document.querySelector('#content ul')
	var conLis = document.querySelectorAll('#content>ul:first-child>li')
	var conLisD = document.querySelectorAll('#content>ul>li>div')
	var navLisUp = document.querySelectorAll('#head .headMain .nav ul li .up')
	var arrow = document.querySelector('#head .headMain .arrow')
	var content = document.querySelector('#content')
	var head = document.querySelector('#head')
	var swiperControl = document.querySelectorAll('#content ul .home div ul:last-of-type li')
	var swipers = document.querySelectorAll('#content ul .home ul:first-of-type li')
	var home = document.querySelector('#content ul .home>div')
	var aboutUl = document.querySelectorAll('#content ul .about .aboutPhotos .item ul')
	var dotLi = document.querySelectorAll('#content>ul:last-child li')
	var teamDiv = document.querySelector('#content ul .team>div')
	var teamDivUl = document.querySelector('#content ul .team>div ul')
	var photoLine = document.querySelector('#content ul .course .photos')
	var mask=document.querySelector('#wrap .mask')
	var maskLine=document.querySelector('#wrap .mask .line')
	var maskDiv=document.querySelectorAll('#wrap .mask>div')
	var nowIndex = 0 //当前页面索引
	var timer = 0
	var swiperTimer = 0
	var oldIndex = autoIndex =nextIndex=0//当前轮播图索引,自动轮播下标,下一个轮播图索引
	var canvas = null
	var bubbleTime = bubbleTime2=0
	var statusArr = [{ //第一屏出入场
			home1: document.querySelector('#content ul .home ul:first-of-type'),
			home2: document.querySelector('#content ul .home ul:last-of-type'),
			inStatus: function() {
				this.home1.style.transform = "translateY(0px)"
				this.home2.style.transform = "translateY(0px)"
			},
			outStatus: function() {
				this.home1.style.transform = "translateY(-400px)"
				this.home2.style.transform = "translateY(100px)"
			}
		},
		{ //第二屏出入场
			plane1: document.querySelector('.course .plane1'),
			plane2: document.querySelector('.course .plane2'),
			plane3: document.querySelector('.course .plane3'),
			inStatus: function() {
				this.plane1.style.transform = "translate(0px,0px)"
				this.plane2.style.transform = "translate(0px,0px)"
				this.plane3.style.transform = "translate(0px,0px)"
			},
			outStatus: function() {
				this.plane1.style.transform = "translate(-200px,-200px)"
				this.plane2.style.transform = "translate(-200px,200px)"
				this.plane3.style.transform = "translate(200px,-200px)"
			}
		},
		{ //第三屏出入场
			pencel1: document.querySelector('.works .pencel1'),
			pencel2: document.querySelector('.works .pencel2'),
			pencel3: document.querySelector('.works .pencel3'),
			inStatus: function() {
				this.pencel1.style.transform = "translate(0px,0px)"
				this.pencel2.style.transform = "translate(0px,0px)"
				this.pencel3.style.transform = "translate(0px,0px)"
			},
			outStatus: function() {
				this.pencel1.style.transform = "translateY(-100px)"
				this.pencel2.style.transform = "translateY(100px)"
				this.pencel3.style.transform = "translateY(100px)"
			}
		},
		{ //第四屏出入场
			photo1: document.querySelector('#content ul .about .aboutPhotos .item:first-child'),
			photo2: document.querySelector('#content ul .about .aboutPhotos .item:last-child'),
			inStatus: function() {
				this.photo1.style.transform = "rotate(0deg)"
				this.photo2.style.transform = "rotate(0deg)"
			},
			outStatus: function() {
				this.photo1.style.transform = "rotate(25deg)"
				this.photo2.style.transform = "rotate(-25deg)"
			}
		},
		{ //第五屏出入场
			team1: document.querySelector('#content ul .team h1'),
			team2: document.querySelector('#content ul .team>div>div'),
			inStatus: function() {
				this.team1.style.transform = "translateX(0px)"
				this.team2.style.transform = "translateX(0px)"
			},
			outStatus: function() {
				this.team1.style.transform = "translateX(-100px)"
				this.team2.style.transform = "translateX(100px)"
			}
		}
	]
	
	for(var i = 0;i<=4; i++) {
		statusArr[i].outStatus()
	}
	var imgsArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg',
				'about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg',
				'worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
	loadBegin()
	//开机动画
	function loadBegin(){
		var flag=0
		for(var i=0;i<imgsArr.length;i++){
			var img=new Image()
			img.src='img/'+imgsArr[i]
			img.onload=function(){
				flag++
				maskLine.style.width=flag/imgsArr.length*100+'%'
			}
		}
		maskLine.addEventListener('transitionend',function(){
			if(flag==imgsArr.length){
				for(var i=0;i<maskDiv.length;i++){
					maskDiv[i].style.height=0+'px'
				}	
			}
			maskLine.style.display='none'
			statusArr[0].inStatus()//开场动画结束，第一个页面进场
		})
		maskDiv[0].addEventListener('transitionend',function(){	
			mask.remove()
			swiper()
		})
		
	}
	
	function change(index) {
		clearInterval(swiperTimer)
		//导航栏点击，箭头位置随之变化
		arrow.style.left = navLis[index].offsetLeft + navLis[index].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
		//先把前面得导航置为初始
		for(var j = 0; j < navLis.length; j++) {
			navLisUp[j].style = 'none'
			dotLi[j].style.backgroundColor = ""
		}
		//导航栏点击，相关导航变黑
		navLisUp[index].style.width = '100%'
		dotLi[index].style.backgroundColor = 'white'
		//切屏
		conUl.style.top = -content.clientHeight * index + 'px'
		nowIndex = index
		conUl.addEventListener('transitionend',function(){
			statusArr[index].inStatus()
			if(index==0)swiper()//跳转到页面再开始轮播
			for(var i = 0;i<=4; i++) {
				if(i!=index)
					statusArr[i].outStatus()					
			}
		})
		
	}
	
	
	
	createPicLine()
	//第二屏生成线和照片墙，过于冗余，于是用js生成
	function createPicLine() {
		for(var i = 0; i < 4; i++) {
			var line = document.createElement('span')
			line.classList.add('line')
			line.style.left = 120 * i - 5 + 'px'
			photoLine.appendChild(line)
		}
		picArr = ['url(img/binoli.png)', 'url(img/hlx.png)', 'url(img/bks.png)', 'url(img/gu.png)',
			'url(img/binoli.png)', 'url(img/pcwelt.png)', 'url(img/leonberg.png)', 'url(img/lbs.png)',
			'url(img/hlx.png)', 'url(img/gu.png)', 'url(img/gu.png)', 'url(img/bks.png)'
		]
		for(var i = 0; i < 12; i++) {
			var item = document.createElement('div')
			var backface = document.createElement('div')
			var face = document.createElement('div')
			item.classList.add('item')
			backface.classList.add('backface')
			face.classList.add('face')
			backface.style.backgroundImage = picArr[i]
			item.appendChild(backface)
			face.innerHTML = i+"人生不相见，动如参与商。今夕复何夕，共此灯烛光。"
			item.appendChild(face)
			photoLine.appendChild(item)
		}
	}
	
	createTeamLi()
	//第五屏生成人物集，过于冗余，于是用js生成
	function createTeamLi() {
		for(var i = 0; i < 8; i++) {
			var li = document.createElement('li')
			li.style.backgroundPositionX = -(i * 118) + 'px'
			teamDivUl.appendChild(li)
		}
	}
	bubble()
	//第五屏气泡特效
	function bubble() {
		var teamLi = document.querySelectorAll('#content ul .team div>ul li')
		for(var i = 0; i < teamLi.length; i++) {
			teamLi[i].onmousemove = function() {
				for(var j = 0; j < teamLi.length; j++) {
					teamLi[j].style.opacity = '0.3'
				}
				this.style.opacity = '1'
				removeCanvas() //生成气泡前先把前面生成而没去掉的去掉
				addCanvas.call(this)
				canvas.onmouseleave = function() {
					for(var j = 0; j < teamLi.length; j++) {
						teamLi[j].style.opacity = '1'
					}
					removeCanvas()
				}
			}
	
		}
	
		function removeCanvas() {
			if(canvas) {
				canvas.remove()
				canvas = null
			}
			clearInterval(bubbleTime)
			clearInterval(bubbleTime2)
		}
	
		function addCanvas() {
			if(!canvas) {
				canvas = document.createElement('canvas')
				canvas.width = teamLi[0].offsetWidth
				canvas.height = teamDivUl.offsetHeight * 2 / 3
				teamDiv.appendChild(canvas)
			}
			canvas.style.left = this.offsetLeft + teamDivUl.offsetLeft + 'px'
			canvas.style.top = teamDivUl.offsetHeight / 2 + 'px'
			if(canvas.getContext) {
				var ctx = canvas.getContext('2d')
				var arr = []
				bubbleTime = setInterval(function() {
					ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
					for(var i = 0; i < arr.length; i++) {
						arr[i].deg += 5
						arr[i].x = arr[i].startX + Math.sin(arr[i].deg * Math.PI / 180) * arr[i].step
						arr[i].y = arr[i].startY - (arr[i].deg * Math.PI / 180) * arr[i].step
						if(arr[i].y < 20) {
							arr.splice(i, 1)
						}
					}
					for(var i = 0; i < arr.length; i++) {
						ctx.save()
						ctx.fillStyle = 'rgba(' + arr[i].red + "," + arr[i].green + "," + arr[i].blue + "," + arr[i].alp + ')'
						ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI)
						ctx.fill()
						ctx.beginPath()
						ctx.restore()
					}
				}, 1000 / 80)
				bubbleTime2 = setInterval(function() {
					var red = Math.round(Math.random() * 255)
					var blue = Math.round(Math.random() * 255)
					var green = Math.round(Math.random() * 255)
					var alp = 1
					var r = Math.random() * 10 + 2
					var x = Math.random() * canvas.clientWidth
					var y = canvas.clientHeight - r
					var deg = 0
					var step = Math.random() * 20 + 10
					var startX = x
					var startY = y
					arr.push({
						red,
						blue,
						green,
						alp,
						r,
						x,
						y,
						step,
						startX,
						startY,
						deg
					})
				}, 3000 / 60)
			}
		}
	}
	
	picBoom()
	//第四屏图片炸裂
	function picBoom() {
		for(var i = 0; i < aboutUl.length; i++) {
			var src = aboutUl[i].dataset.src
			var w = aboutUl[i].clientWidth
			var h = aboutUl[i].clientHeight
			for(var j = 0; j < 4; j++) {
				var li = document.createElement('li')
				var img = document.createElement('img')
				img.src = src
				img.style.left = -(j % 2) * w / 2 + 'px'
				img.style.top = -Math.floor(j / 2) * h / 2 + 'px'
				li.appendChild(img)
				li.style.height = h / 2 + 'px'
				li.style.width = w / 2 + 'px'
				aboutUl[i].appendChild(li)
			}
			aboutUl[i].onmouseenter = function() {
				var aboutImgs = this.querySelectorAll('li img')
				for(var j = 0; j < aboutImgs.length; j++) {
					aboutImgs[0].style.top = h / 2 + 'px'
					aboutImgs[1].style.left = -w + 'px'
					aboutImgs[2].style.left = w / 2 + 'px'
					aboutImgs[2].style.top = -h / 2 + 'px'
					aboutImgs[3].style.left = -w / 2 + 'px'
					aboutImgs[3].style.top = -h + 'px'
				}
			}
			aboutUl[i].onmouseleave = function() {
				var aboutImgs = this.querySelectorAll('li img')
				for(var j = 0; j < aboutImgs.length; j++) {
					aboutImgs[0].style.top = 0 + 'px'
					aboutImgs[1].style.left = -w / 2 + 'px'
					aboutImgs[2].style.left = 0 + 'px'
					aboutImgs[2].style.top = -h / 2 + 'px'
					aboutImgs[3].style.left = -w / 2 + 'px'
					aboutImgs[3].style.top = -h / 2 + 'px'
				}
			}
		}
	}
	
	//第一屏轮播图相关事件
	function swiper() {
		//点击圆点跳转
		for(var i = 0; i < swiperControl.length; i++) {
			swiperControl[i].index = i
			swiperControl[i].onclick = function() {
				clearInterval(swiperTimer)
				for(var i = 0; i < swipers.length; i++) {
					swipers[i].className = '' //清除前面添加的class
				}
				nextIndex = this.index
				//从左往右，触发leftHide和rightShow
				if(nextIndex > oldIndex) {
					swipers[oldIndex].classList.add('leftHide')
					swipers[nextIndex].classList.add('rightShow')
					swiperControl[oldIndex].classList.remove('onActive')
					swiperControl[nextIndex].classList.add('onActive')
				} else if(nextIndex < oldIndex) {
					//从右往左，触发leftShow和rightHide
					swipers[oldIndex].classList.add('rightHide')
					swipers[nextIndex].classList.add('leftShow')
					swiperControl[oldIndex].classList.remove('onActive')
					swiperControl[nextIndex].classList.add('onActive')
				} else {
					//点击跳转是目前的轮播图，则不变
					swipers[oldIndex].classList.add('active')
					swiperControl[oldIndex].classList.add('onActive')
				}
				oldIndex = this.index
			}
		}
	
		//鼠标移入停止轮播
		home.onmousemove = function() {
			clearInterval(swiperTimer)
		}
		swiperAuto()
		//自动轮播//定时器的调用是同步的(swiperTimer的生成)，定时器回调函数的执行是异步的
		function swiperAuto() {
			clearInterval(swiperTimer)
			swiperTimer = setInterval(function() {
				for(var i = 0; i < swipers.length; i++) {
					swipers[i].className = '' //清除前面添加的class
				}
				if(autoIndex < swiperControl.length - 1) {
					autoIndex++
					swipers[autoIndex - 1].classList.add('leftHide')
					swipers[autoIndex].classList.add('rightShow')
					swiperControl[autoIndex - 1].classList.remove('onActive')
					swiperControl[autoIndex].classList.add('onActive')
				} else {
					autoIndex = 0
					swipers[autoIndex].classList.add('leftShow')
					swipers[swiperControl.length - 1].classList.add('rightHide')
					swiperControl[swiperControl.length - 1].classList.remove('onActive')
					swiperControl[autoIndex].classList.add('onActive')
				}
				//把自动轮播的进度告诉手动轮播
				oldIndex = autoIndex
			}, 2000)
	
		}
	}
	
	//箭头初始位置,默认选择第一个导航,侧边导航
	arrow.style.left = navLis[0].offsetLeft + navLis[0].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
	navLisUp[0].style.width = '100%'
	dotLi[0].style.backgroundColor = "white"
	for(var i = 0; i < navLis.length; i++) {
		navLis[i].index = i
		dotLi[i].index = i
		navLis[i].onclick = function() {
			change(this.index)
		}
		dotLi[i].onclick = function() {
			change(this.index)
		}
	}
	//内容区
	//滚轮事件
	if(content.addEventListener) {
		content.addEventListener = function(ev) {
			ev = ev || event
			//防抖函数，滚轮滚的很快，只执行最后一次
			clearTimeout(timer)
			timer = setTimeout(function() {
				fn(ev)
			}, 300)
		}
	}
	content.onmousewheel = function(ev) {
		ev = ev || event
		clearTimeout(timer)
		timer = setTimeout(function() {
			fn(ev)
		}, 300)
	}
	
	function fn(ev) {
		var dir = ""
		if(ev.wheelDelta) {
			dir = ev.wheelDelta > 0 ? 'up' : 'down'
		} else if(ev.detail) {
			dir = ev.detail < 0 ? 'up' : 'down'
		}
		switch(dir) {
			case 'up':
				if(nowIndex > 0) {
					nowIndex--
					change(nowIndex)
				}
				break
			case 'down':
				if(nowIndex < navLis.length - 1) {
					nowIndex++
					change(nowIndex)
				}
				break
		}
	}
	
	getContentSize()
	window.onresize = function() {
		//分辨率改变了，里面的数据也变了，需要重新获取
		getContentSize()
		arrow.style.left = navLis[nowIndex].offsetLeft + navLis[nowIndex].offsetWidth / 2 - arrow.offsetWidth / 2 + 'px'
		conUl.style.top = -content.clientHeight * nowIndex + 'px'
	}
	
	function getContentSize() {
		content.style.height = document.documentElement.clientHeight - head.offsetHeight + 'px'
		for(var i = 0; i < conLis.length; i++) {
			conLis[i].style.height = content.clientHeight + 'px'
		}
	}
}