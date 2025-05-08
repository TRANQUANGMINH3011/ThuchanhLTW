export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/travel',
		name: 'Travel Planning',
		icon: 'CompassOutlined',
		routes: [
			{
				path: '/travel/discover',
				name: 'Discover',
				component: './Travel/Discover',
				icon: 'SearchOutlined',
			},
			{
				path: '/travel/itinerary',
				name: 'Itinerary',
				component: './Travel/Itinerary',
				icon: 'ScheduleOutlined',
			},
			{
				path: '/travel/budget',
				name: 'Budget',
				component: './Travel/Budget',
				icon: 'WalletOutlined',
			},
		],
	},
	{
		path: '/travel-admin',
		name: 'Travel Admin',
		icon: 'ControlOutlined',
		access: 'canAdmin',
		routes: [
			{
				path: '/travel-admin/destinations',
				name: 'Destinations',
				component: './Travel/Admin/Destinations',
				icon: 'EnvironmentOutlined',
			},
			{
				path: '/travel-admin/analytics',
				name: 'Analytics',
				component: './Travel/Admin/Analytics',
				icon: 'BarChartOutlined',
			},
		],
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
