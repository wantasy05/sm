import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "",
		redirect: "index"
	},
	{
		path: "/index",
		component: Index,
		children: [
			{
				path: "/",
				redirect: "home"
			},
			{
				path: "home",
				name: "home",
				// route level code-splitting
				// this generates a separate chunk (home.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () =>
					import(/* webpackChunkName: "home" */ "../views/Home.vue")
			},
			{
				path: "classify",
				name: "classify",
				// route level code-splitting
				// this generates a separate chunk (classify.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () =>
					import(/* webpackChunkName: "classify" */ "../views/Classify.vue")
			},
			{
				path: "discover",
				name: "discover",
				// route level code-splitting
				// this generates a separate chunk (discover.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () =>
					import(/* webpackChunkName: "discover" */ "../views/Discover.vue")
			},
			{
				path: "cart",
				name: "cart",
				// route level code-splitting
				// this generates a separate chunk (cart.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () =>
					import(/* webpackChunkName: "cart" */ "../views/Cart.vue")
			},
			{
				path: "me",
				name: "me",
				// route level code-splitting
				// this generates a separate chunk (me.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "me" */ "../views/Me.vue")
			}
		]
	},
	{
		path: "/login",
		name: "login",
		// route level code-splitting
		// this generates a separate chunk (login.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "login" */ "../views/Login.vue")
	},
	{
		path: "/details",
		name: "details",
		// route level code-splitting
		// this generates a separate chunk (details.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "details" */ "../views/Details.vue")
	},
	{
		path: "/collect",
		name: "collect",
		// route level code-splitting
		// this generates a separate chunk (collect.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "collect" */ "../views/Collect.vue")
	},
	{
		path: "/search",
		name: "search",
		// route level code-splitting
		// this generates a separate chunk (search.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "search" */ "../views/Search.vue")
	},
	{
		path: "/edit",
		name: "edit",
		// route level code-splitting
		// this generates a separate chunk (edit.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue")
	},
	{
		path: "/email",
		name: "email",
		// route level code-splitting
		// this generates a separate chunk (email.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "email" */ "../views/edit/Email.vue")
	},
	{
		path: "/name",
		name: "name",
		// route level code-splitting
		// this generates a separate chunk (name.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "name" */ "../views/edit/Name.vue")
	},
	{
		path: "/site",
		name: "site",
		// route level code-splitting
		// this generates a separate chunk (site.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "site" */ "../views/edit/Site.vue")
	},
	{
		path: "/sign",
		name: "sign",
		// route level code-splitting
		// this generates a separate chunk (sign.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "sign" */ "../views/edit/Sign.vue")
	},
	{
		path: "/username",
		name: "username",
		// route level code-splitting
		// this generates a separate chunk (username.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "username" */ "../views/edit/UserName.vue")
	},
	{
		path: "/amend",
		name: "amend",
		// route level code-splitting
		// this generates a separate chunk (amend.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "amend" */ "../views/Amend.vue")
	},
	{
		path: "/newsite",
		name: "newsite",
		// route level code-splitting
		// this generates a separate chunk (newsite.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "newsite" */ "../views/edit/NewSite.vue")
	},
	{
		path: "/order",
		name: "order",
		// route level code-splitting
		// this generates a separate chunk (order.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "order" */ "../views/Order.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
