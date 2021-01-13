const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/students",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/StudentList.vue") }]
  },
  {
    path: "/products",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProductList.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
