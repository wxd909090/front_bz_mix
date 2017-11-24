import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
// import Navigation from '@/components/Navigation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mainPage'
    },
    {
      path: '/mainPage',
      component: resolve => require(['../components/mainPage.vue'], resolve),
      children: [
        {
          path: '/homepage',
          component: resolve => require(['../components/homepage/homepage.vue'], resolve),
        },
        {
          path: '/footbath',
          component: resolve => require(['../components/footbath/footbath.vue'], resolve),
        },

        {
          path: '/aboutHotel',
          component: resolve => require(['../components/content/hotel/aboutHotel.vue'], resolve),
        },


        
        {
          path: '/demo/demoPage',
          component: resolve => require(['../components/demo/demoPage.vue'], resolve),
        },
        {
          path: '/demo/demoPage2',
          component: resolve => require(['../components/demo/demoPage2.vue'], resolve),
        },
      ]
    },
    {
      path: '/login',//废掉了
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/Navigation',
      component: resolve => require(['../components/Navigation.vue'], resolve),
      children: [
        {
          path: '/store',
          component: resolve => require(['../components/store.vue'], resolve),
        },
        {
          path: '/cooperation',
          component: resolve => require(['../components/cooperation.vue'], resolve)
        },
      ]
    }
    // {
    //   path: '/readme',
    //   component: resolve => require(['../components/common/Home.vue'], resolve),
    //   children: [
    //     {
    //       path: '/',
    //       component: resolve => require(['../components/page/Readme.vue'], resolve)
    //     },
    //     {
    //       path: '/basetable',
    //       component: resolve => require(['../components/page/BaseTable.vue'], resolve)
    //     },
    //     {
    //       path: '/vuetable',
    //       component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
    //     },
    //     {
    //       path: '/baseform',
    //       component: resolve => require(['../components/page/BaseForm.vue'], resolve)
    //     },
    //     {
    //       path: '/vueeditor',
    //       component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
    //     },
    //     {
    //       path: '/markdown',
    //       component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
    //     },
    //     {
    //       path: '/upload',
    //       component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
    //     },
    //     {
    //       path: '/basecharts',
    //       component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
    //     },
    //     {
    //       path: '/drag',
    //       component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
    //     }
    //   ]
    // },
  ]
})
