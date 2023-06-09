<template>
  <div>

    <div style="border: 1px solid #D9D9D9; margin-top: 10px">
      <!-- 工具栏 -->
      <Toolbar style="border-bottom: 1px solid #D9D9D9" :editor="editor" :defaultConfig="toolbarConfig" />
      <!-- 编辑器 -->
      <Editor style="height: 400px; overflow-y: hidden" :defaultConfig="editorConfig" v-model="htmlvalue" @onChange="onChange"
        @onCreated="onCreated" />
    </div>

  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { i18nChangeLanguage } from '@wangeditor/editor'
// 切换语言 - 'en' 或者 'zh-CN'
i18nChangeLanguage('en')

export default {
  name: "MyEditor",
  components: { Editor, Toolbar },
  props: {
    html: {
      type: String,
      default: () => ''
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
  },

  data() {
    return {
      htmlvalue:'',
      editor: null,
      // htmlvalue: "<p>hello&nbsp;world</p>",
      toolbarConfig: {
        toolbarKeys: ['undo', 'redo', 'headerSelect', 'bold', 'fontSize', 'blockquote', 'todo', 'fontFamily', 'italic', 'underline', 'uploadImage', 'uploadVideo', 'color', 'bgColor', 'insertLink', 'bulletedList', 'numberedList', 'lineHeight', 'emotion', 'divider', 'insertTable'],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],

      },
      editorConfig: {
        server: '/api/upload',
        placeholder: "Please enter",
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage: {
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 1 * 1024 * 1024, // 1M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,
            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            meta: {
              token: 'xxx',
              otherKey: 'yyy'
            },
            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,

            // 自定义增加 http  header
            headers: {
              Accept: 'text/x-json',
              otherKey: 'xxx'
            },

            // 跨域是否传递 cookie ，默认为 false
            withCredentials: true,

            // 超时时间，默认为 10 秒
            timeout: 5 * 1000, // 5 秒
          },
          uploadVideo: {
            // form-data fieldName ，默认值 'wangeditor-uploaded-video'
            fieldName: 'your-custom-name',

            // 单个文件的最大体积限制，默认为 10M
            maxFileSize: 5 * 1024 * 1024, // 5M

            // 最多可上传几个文件，默认为 5
            maxNumberOfFiles: 3,

            // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['video/*'],

            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            meta: {
              token: 'xxx',
              otherKey: 'yyy'
            },

            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,

            // 自定义增加 http  header
            headers: {
              Accept: 'text/x-json',
              otherKey: 'xxx'
            },

            // 跨域是否传递 cookie ，默认为 false
            withCredentials: true,

            // 超时时间，默认为 30 秒
            timeout: 15 * 1000, // 15 秒

            // 视频不支持 base64 格式插入
          }
        },
      },
    };
  },
created(){
  this.htmlvalue=this.html
},
  methods: {
    onCreated(editor) {

      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    //   if (this.disabled) {
    //   this.editor.disable()
    // } else {
    //   this.editor.enable()
    // }


    },

    onChange(editor) {
      // console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
    },
    getEditorText() {
      const editor = this.editor;
      if (editor == null) return;


    },
    printEditorHtml() {
      const editor = this.editor;
      if (editor == null) return;


    },
    disableEditor() {
      this.editor.disable();
    },
    enableEditor() {
      this.editor.enable();
    },
  },

  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss">
.w-e-toolbar {
  .w-e-bar-item:nth-of-type(1) {
    svg {
      fill: rgb(95, 172, 253)
    }
  }

  .w-e-bar-item:nth-of-type(2) {
    svg {
      fill: rgb(95, 172, 253)
    }
  }

}
</style>
