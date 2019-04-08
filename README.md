# mlayer

主要是移动端的弹出层.

## 使用方法

将mlayer.js mlayer.css 放在同一个文件夹。  
只需要引入mlayer.js即可。  
mlayer.scss 可以定义层的样式，这里可以定制想要的样式。  
实际使用中，按需使用。  
对于js，使用es6语法了，如果不支持，将const let 箭头函数修改即可。  

## 加载层

三个点

```js
// 默认加载层不自动消失
showLoading([duration]) 
hideLoading([callback])
```

## 简单提示层

```js
// 默认2s后消失
showToast(tipString[,duration])

showToast({
  content: tipString,
  icon: imagePath,
  duration: layerDuration,
})

hideToast([callback])
```

## 对话框层

```js
showModal({
  // 标题样式
  title: '',
  // 内容的样式
  content: '',
  // 按钮 数组或者单个字符串 默认第一项为确定 一个按钮的默认为确定事件
  // 默认取消在左边,确定在右边
  btns: ['取消', '确定'],
  // 按钮点击的函数
  clickLeftBtn: () => {
    hideModal()
  },
  clickRightBtn: () => {
    hideModal()
  },
  // 遮罩的显示
  // shade: true,
  canClickShadeCloseModal: true,
  // 自动关闭的时间,设置为0表示不自动关闭
  autoClose: 0,
  // 层成功弹出的回调函数
  // show: () => {},
  // 层销毁的回调函数
  // destroy: () => {}
})

hideModal([callback])
```

## 小技巧

* duration是0的时候，层不会自动消失
* 同样类型的层只显示一个
* 可以看demo
