const PrerenderSpaPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

plugins: [
    ...
    new PrerenderSpaPlugin({
        // 生成文件的路径，也可以与webpakc打包的一致。
        // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        staticDir: path.join(__dirname, '../dist'),
        // Required - Routes to render
        // 对应自己的路由文件，比如index有参数，就需要写成 /index/param1。
        routes: [ '/', '/about', '/some/deep/nested/route'],

        // 这个很重要，如果没有配置这段，也不会进行预编译
        renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
           renderAfterTime: 5000, //触发渲染的时间，用于获取数据后再保存渲染结果
           // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
           renderAfterDocumentEvent: 'render-event',

          // 会等待class为my-app-element的dom节点生成功之后再进行预渲染（使用document.querySelector）
          // renderAfterElementExists: 'my-app-element',
        })
    })
]
