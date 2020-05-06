const tabList = [{
	name: '全部',
	id: '1',
}, {
	name: '待处理',
	id: '2'
}, 
{
	name: '已处理',
	id: '3'
}, 
// {
// 	name: '已处理',
// 	id: '4'
// },
];
const tabList1 = [{
	name: '通知',
	id: '1',
}, {
	name: '公告',
	id: '2'
},{
	name: '工作安排',
	id: '3'
}
];
/*
 *status:1 待处理 2，待办，3 处理中，4 代办结 5已办结
 *
 */
const newsList = [{
		id: 1,
		reporter: '降央卓玛',
		phone: '13540020380',
		status: 2,
		address: "美兴县新街村",
		content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调有两人发生争吵和斗殴，需要其他人员前来辅助协调有两人发生争吵和斗殴，需要其他人员前来辅助协调有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		time: '2019-12-25 13:25:30',
	},

	{
		id: 2,
		reporter: '降央卓玛',
		phone: '13540020380',
		status: 1,
		address: "美兴县新街村",
		content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		time: '2019-12-25 13:25:30',
	},
	{
		id: 3,
		reporter: '降央卓玛',
		phone: '13540020380',
		status: 3,
		address: "美兴县新街村",
		content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		time: '2019-12-25 13:25:30',
	},
	{
		id: 4,
		reporter: '降央卓玛',
		phone: '13540020380',
		status: 4,
		address: "美兴县新街村",
		content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		time: '2019-12-25 13:25:30',
	},
	{
		id: 5,
		reporter: '降央卓玛',
		phone: '13540020380',
		status: 5,
		address: "美兴县新街村",
		content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		time: '2019-12-25 13:25:30',
	},
	{
		id: 6,
		reporter: '降央卓玛',
		phone: '13540020380',
		status: 2,
		address: "美兴县新街村",
		content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		time: '2019-12-25 13:25:30',
	},
	{
		id: 7,
		reporter: '降央卓玛',
		phone: '13540020380',
		status: 1,
		address: "美兴县新街村",
		content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		time: '2019-12-25 13:25:30',
	},

]
const evaList = [{
		id: 1,
		src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
		nickname: 'Ranth Allngal',
		time: '2019-12-25 13:25:30',
		status: 1,
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	},
	{
		id: 2,
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
		nickname: 'Ranth Allngal',
		time: '09-20 12:54',
		zan: '54',
		content: '楼上说的好有道理。'
	}
]
/*
*category:1、通知，2、公告，3、工作
*status ：1、已读，2、未读
*/
const evaList1 = [{
		id: 1,
		category: 1,
		time: '2019-12-25 13:25:30',
		status: 1,
		
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	},
	{
		id: 2,
		category: 2,
		time: '2019-11-25 11:24:30',
		status: 2,
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	},
	{
		id: 3,
		category: 3,
		time: '2019-11-25 11:24:30',
		status: 2,
		feedback_content:"我是反馈内容啊啊啊啊啊啊啊啊啊啊啊啊",
		'feedback_time':"2020-04-43 12:23:10",
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	},
	{
		id: 5,
		category: 3,
		time: '2019-11-25 11:24:30',
		status: 2,
		feedback_content:"",
		'feedback_time':"",
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	}
]
const subs = [
	{
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
},  {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
},  {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "1",
	address: "金川县阿阿镇",
	date: "2020-04-09 00:00:00"
},  {
	name: "监控点1",
	url: "rtsp://www.baidu.com",
	logoUrl: "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg",
	id: "2",
	address: "金川县阿阿镇", 
	date: "2020-04-09 00:00:00"
}, 
]

const detail = {
	'data': {
		'upReport': "小程序",
		'type': "类型一",
		"category": "类别1",
		'time': "2019-12-21",
		'content': "请更换附近队员进行处理,在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		'imgList': [
			'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg',
			'http://fc-feed.cdn.bcebos.com/0/pic/dc4b0610241d7016279f4f4652ea0886.jpg',
			'http://fc-feed.cdn.bcebos.com/0/pic/0f6effa42536fb5c2ca945bd46c59335.jpg',
			'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2133231534,4242817610&fm=173&app=49&f=JPEG?w=218&h=146&s=4FB42BC55E2A26076B2D1301030060C6',
			'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1276936674,3021787485&fm=173&app=49&f=JPEG?w=218&h=146&s=4FB02FC40B00064332AD45170300D0C7',
			'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1909353310,863816541&fm=173&app=49&f=JPEG?w=218&h=146&s=25F67E844C002445437DE8810300E0D3'
		],
		'adress': {
			'addressContent': "地点",
			'longitude': 334.44,
			'latitude': 323.22
		},
		'status': 1,
		'processingProcess': [
			{
				'title': '待处理',
				'desc': '2018-11-11'
			},
			{
				title: '处理中',
				desc: '2018-11-13'
			},
			{
				title: '已处理',
				desc: '2018-11-13'
			}
		],
		'feedbackContent': "请更换附近队员进行处理,在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		'feedbackTime': "2019-23-12",
		'userinfo': {
			'name': "张三",
			'phone': "135444444",
			'url': "http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg"
		}
	}
}
const subs1= [
	{id:'0',type:"点击选择"}, 
	{id:'1',type:"劳动局"}, 
	{id:'2',type:"社保局"}, 
	{id:'3',type:"林业局"}, 
	]

export default {
	tabList,
	newsList,
	evaList,
	tabList1,
	evaList1,
	subs,
	detail,
	subs1
}
