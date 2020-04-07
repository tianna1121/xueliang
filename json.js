const tabList = [{
	name: '全部',
	id: '1',
}, {
	name: '待处理',
	id: '2'
}, {
	name: '处理中',
	id: '3'
}, {
	name: '已处理',
	id: '4'
} ];
const tabList1 = [{
	name: '通知',
	id: '1',
}, {
	name: '公告',
	id: '2'
} ];
/*
*status:1 待处理 2，待办，3 处理中，4 代办结 5已办结
*
*/
const newsList = [{
		id: 1,
		reporter: '降央卓玛',
		phone: '13540020380',
		status: 2,
		address:"美兴县新街村",
		content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调有两人发生争吵和斗殴，需要其他人员前来辅助协调有两人发生争吵和斗殴，需要其他人员前来辅助协调有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
		time: '2019-12-25 13:25:30',
	},

	{
			id: 2,
			reporter: '降央卓玛',
			phone: '13540020380',
			status: 1,
			address:"美兴县新街村",
			content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
			time: '2019-12-25 13:25:30',
		},
	{
			id: 3,
			reporter: '降央卓玛',
			phone: '13540020380',
			status: 3,
			address:"美兴县新街村",
			content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
			time: '2019-12-25 13:25:30',
		},
	{
			id: 4,
			reporter: '降央卓玛',
			phone: '13540020380',
			status: 4,
			address:"美兴县新街村",
			content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
			time: '2019-12-25 13:25:30',
		},
	{
			id: 5,
			reporter: '降央卓玛',
			phone: '13540020380',
			status: 5,
			address:"美兴县新街村",
			content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
			time: '2019-12-25 13:25:30',
		},
	{
			id: 6,
			reporter: '降央卓玛',
			phone: '13540020380',
			status: 2,
			address:"美兴县新街村",
			content: "在美兴县新街村，有两人发生争吵和斗殴，需要其他人员前来辅助协调。",
			time: '2019-12-25 13:25:30',
		},
	{
			id: 7,
			reporter: '降央卓玛',
			phone: '13540020380',
			status: 1,
			address:"美兴县新街村",
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
const evaList1 = [{
		id: 1,
		nickname: '通知',
		time: '2019-12-25 13:25:30',
		status: 1,
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	},
	{
		id: 2,
		nickname: '工作',
		time: '2019-11-25 11:24:30',
		status: 2,
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	},
	{
		id: 3,
		nickname: '公告',
		time: '2019-11-25 11:24:30',
		status: 2,
		content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
	}
]
export default {
	tabList,
	newsList,
	evaList,
	tabList1,
	evaList1
}
