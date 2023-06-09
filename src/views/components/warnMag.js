
export let warnMag = function (data, title,dataSpan) {
  let h = this.$createElement
  return this.$msgbox({
    title: title&&title!='' ? title : this.$t('HINT'),
    message: h(
      "div",
      {
        style: "padding: 35px 8px 49px 8px;",
        class: "messageBox",
      },
      [
        h("i", {
          class: "el-icon-question ",
          style: 'width: 22px;height: 22px;font-size: 22px;margin-right: 12px;color: #ffbf00; vertical-align: middle;margin-top:-3px'
        }, ""),
        h(
          "span",
          { style: "color: #000;font-size:16px" },
          data
        ),
        h(
          "div",
          { style: "color: #999;font-size:14px;marginTop:8px;margin-left:35px" },
          dataSpan
        ),
      ],

    ),
    confirmButtonText: this.$t('Confirm'),
    cancelButtonText:  this.$t('Cancel'),
    showCancelButton: true,
    beforeClose: (action, instance, done) => {
      done()
    },
  })

}
