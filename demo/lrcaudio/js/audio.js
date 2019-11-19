			//封装一个获取id的方法
			function $(id){
				return document.getElementById(id);
			}
			//歌词对象
			var lrc = {
				init:function(lrctxts){
					//获取每句歌词
					var txts = lrctxts.split("\n");
					var html = "";//歌词文本，以后用力拼接
					var i = 0;var length = txts.length;
					for(i;i<length;i++) {
						//去掉歌词两边的空格，然后用]分割开，ms[0]是时间，ms[1]是时间所对的歌词
						var ms = txts[i].replace("/^\s+|\s+$/","").split("]");
						//去掉时间部分的[，然后分开分和秒
						var mt = ms[0].replace("[","").split(":");
						//把分和秒计算成秒，取整数
						var m = parseInt(mt[0]*60+mt[1]*1);
						//如果歌词不等于空，就拼接一句歌词
						if(ms[1]!=""&&ms[1]!=undefined){
							html+="<li id='t_"+m+"'>"+ms[1]+"</li>";
						}
					}
					//把歌词拼接到显示区域
					$("lrclist").innerHTML += html;
				},
				jump:function(duration){
					//拿到时间对应的歌词的对象li
					var dom = $("t_"+duration);
					var lrclist = $("lrclist");
					//判断，存不存在这句歌词，如果存在就添加hover样式
					this.indexof(dom);
					if(dom){
						var arr = this.siblings(dom);
						var i = 0;var length = arr.length;
						for(i;i<length;i++) {
							arr[i].className = "";
						}
						$("t_"+duration).className="hover";
						//获取当前第几句歌词
						var index = this.indexof(dom)-3;
						lrclist.style.marginTop =(index<0?0:index)*-40+"px";
					}
				},
				indexof:function(dom){
					//dom是当前歌词的li,获取他的父元素ul,然后在获取ul下面的所有li的集合
					var listDoms = dom.parentElement.children;
					//遍历获取当前的歌词的下标，并返回出来
					var i = 0;var length = listDoms.length;
					for(i;i<length;i++){
						if(listDoms[i]==dom){
							index = i;
							break;
						}
					}
						return index;
				},
				siblings:function(dom){
					//dom是当前歌词的li,获取他的父元素ul,然后在获取ul下面的所有li的集合
					var listDoms = dom.parentElement.children;
					var arr = [];
					var i = 0;var length = listDoms.length;
					for(i;i<length;i++){
						if(listDoms[i]!=dom){
							arr.push(listDoms[i]);
						}
					}
						return arr;
				}
			};
			window.onload = function(){
				//把文本域里面的歌词传进去
				lrc.init($("ircnt").value);
				//监控当前音乐的时间，拿来和歌词做配对
				$("audio").ontimeupdate = function(){
					lrc.jump(parseInt(this.currentTime));
				}
			}