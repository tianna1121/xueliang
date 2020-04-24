// router/modules/home.js
const home = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/index/index',
     // aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/ 
	  name: 'index',
	  component: () => import('@/pages/index/index.vue'),      
    },
    {
	    path: '/pages/video-details/video-details',
        name: 'videoDetails',
		component: () => import('@/pages/video-details/video-details'),
	},
	{
	    path: 'pages/login/login',
	    name: 'login',
		component: () => import('@/pages/login/login'),
	},
	{
	    path: '/pages/register/register',
	    name: 'register',
		component: () => import('@/pages/register/register'),
	},
	{
	    path: '/pages/regresult/regresult',
	    name: 'regresult',
		component: () => import('@/pages/regresult/regresult'),
	},
	{
	    path: '/pages/regres/regres',
	    name: 'regres',
		component: () => import('@/pages/regres/regres'),
	},{
	    path: '/pages/details/details',
        name: 'details',
		component: () => import('@/pages/details/details'),
	},
	{
	    path: '/pages/notificationDetail/notificationDetail',
	    name: 'notificationDetail',
		component: () => import('@/pages/notificationDetail/notificationDetail'),
	},
	{
	    path: '/pages/change-phone/change-phone',
	    name: 'changePhone',
		component: () => import('@/pages/change-phone/change-phone'),
	},
	{
	    path: '/pages/my-report/my-report',
	    name: 'myReport',
		component: () => import('@/pages/my-report/my-report'),
	},
	{
	    path: '/pages/my-report-detail/my-report-detail',
	    name: 'myReportDetail',
		component: () => import('@/pages/my-report-detail/my-report-detail'),
	},
	{
	    path: '*',
	    name: 'login',
		component: () => import('@/pages/login/login'),
	}
]
export default home