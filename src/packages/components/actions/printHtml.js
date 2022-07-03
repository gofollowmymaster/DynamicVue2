
//表单打印
function print(id) {
  var url = ip + port + '/process/form/getDesignForm';
  var data = {
    //表单Id
    formId: id
  }
  ajax('get', url, data, function (data) {
    //打印表单HTML
    var htmlTemplate = data.data.htmlTemplate;
    //获取html内容展示在富文本中
    if (htmlTemplate != null) {
      //执行打印方法
      var wind = window.open('', 'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
      wind.document.body.innerHTML = htmlTemplate;
      wind.print();
    } else {
      window.parent.parent.layer.msg('表单没有内容，请填写后再打印')
    }
  })
}