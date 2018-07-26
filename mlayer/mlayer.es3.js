// import './layer.css'
/**
 * 弹出层的类型:
 * 1. toastOptions 简单的文字提示(包括加载层)
 * 2. 单个按钮的提示
 * 3. 两个按钮的提示
 *
 * 共同属性
 * 1.是否有遮罩
 * 2.点击遮罩能不能关闭弹出层
 * 3.标题
 * 4.内容
 * 5.弹出层的层数
 * 6.图标的加载
 * 7.自动关闭的时间
 */
var body = document.body
var root = document.documentElement
var cssHref = Array.prototype.filter.call(document.scripts,function(item){return item.src.indexOf('mlayer')!==-1})[0].src.replace('.js','.css')
var layerCss = createElement('link',  {
  rel: 'stylesheet',
  href: cssHref
})
document.head.appendChild(layerCss)

var modalOptions = {
  // 标题样式
  title: '',
  // 内容的样式
  content: '',
  // 按钮 数组或者单个字符串 默认第一项为确定 一个按钮的默认为确定事件
  // 默认取消在左边,确定在右边
  btns: ['取消', '确定'],
  // 按钮点击的函数
  clickLeftBtn: hideModal,
  clickRightBtn: hideModal,
  // 遮罩的显示
  // shade: true,
  canClickShadeCloseModal: true,
  // 自动关闭的时间,设置为0表示不自动关闭
  autoClose: 0,
  // 层成功弹出的回调函数
  // show: () => {},
  // 层销毁的回调函数
  // destroy: () => {}
}

function showModal(options) {
    document.querySelector('.z-layer') && hideModal()
  // opt = {...modalOpt, ...opt}
  options = Object.assign({},modalOptions, options)
  var hasTwoBtns = options.btns.length === 2
  var hasTitle = options.title !== ''
  /**
   * 按钮
   */
  var btnOpts = {
    class: 'z-layer-btn',
    href: 'javascript:;'
  }
  var leftBtn = createElement('a', Object.assign({},btnOpts, {
    innerHTML: options.btns[0],
    onclick: options.clickLeftBtn
  }))
  var btnWrap = createElement('div', {
    class: 'z-layer-btns-wrap'
  })
  btnWrap.appendChild(leftBtn)
  if (hasTwoBtns) {
    var rightBtn = createElement('a', Object.assign({},btnOpts, {
      innerHTML: options.btns[1],
      onclick: options.clickRightBtn
    }))
    btnWrap.appendChild(rightBtn)
  }
  // 内容
  var content = createElement('p', {
    class: 'z-layer-content',
    innerHTML: options.content
  })
  // main主要是标题和内容区
  var titleAndCntWrap = createElement('div', {
    class: 'z-layer-main'
  })
  if (hasTitle) {
    var title = createElement('h3', {
      class: 'z-layer-title',
      innerHTML: options.title
    })
    titleAndCntWrap.appendChild(title)
  }
  titleAndCntWrap.appendChild(content)
  // box是main和按钮区
  var box = createElement('main', {
    class: 'z-layer-box'
  })
  box.appendChild(titleAndCntWrap)
  box.appendChild(btnWrap)
  // wrap包含box,宽高为整屏幕
  var mask = createElement('div', {
    class: 'z-layer-mask'
  })
  mask.appendChild(box)
  // section就是整个layer
  var layerSection = createElement('section', {
    class: 'z-layer'
  })
  layerSection.appendChild(mask)
  forbidScroll()
  body.appendChild(layerSection)

  options.show && options.show()
  return layerSection
}

function hideModal(callback) {
  var modal = document.querySelector('.z-layer')
  modal && body.removeChild(modal)
  typeof callback === 'function' && callback()
  canScroll()
}
// showModal({title:'标题',content:'你确定要修改么'})
// showModal({title:'标题2',content:'你确定要修改么',clickLeftBtn:()=>{console.log('取消')}})
function createElement(elementName, attr) {
  var element = document.createElement(elementName)
  for (var key in attr) {
    if (attr.hasOwnProperty(key)) {
      key === 'class' && (element['className'] = attr[key])
      element[key] = attr[key]
    }
  }
  return element
}
function forbidScroll(){

  root.className += root.className.indexOf('noscroll')!== -1 ?'':' noscroll'
}
function canScroll(){
  root.className = root.className.replace(' noscroll','')
}

var toastOptions = {
  content: '',
  icon: '',
  duration: 2000,
}
/*
var successIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAOVBMVEUAAAD///////////////////////////////////////////////////////////////////////8KOjVvAAAAEnRSTlMAEPDQoDDPYLCQIN/An4BwUEAtwvFNAAAAiElEQVQ4y9WQSwrDMAwFn/y3m/Sj+x+2aqEkMs3bhszGoBmMEC6PdKE+3zQxf1eNQr5fuM+B+6rcd+5lNR+ILx+f/Wz2WqeLNNmtb3S/ss1K3vsIR1Qj1M2HAYdYYawCCeoWmIqSy/dtwEFhHF1A2hY88Jf08wvAixd4kQBeDPAiAbwY4DxxAm+JAQldhppBqgAAAABJRU5ErkJggg=='
 showToast({
  content: 'sucess',
  icon: successIcon,
  duration: 2000,
}) */
var loadingIcon = 'http://omizt4opc.bkt.clouddn.com/loading200.gif'

function showToast(toastOptions) {
  document.querySelector('.z-toast') && hideToast()
  var toastOptionsIsObj = (typeof toastOptions) === 'object'
  var duration = 2000
  var hasIcon = toastOptionsIsObj && 'icon' in toastOptions
  var contentString
  if (toastOptionsIsObj) {
    contentString = toastOptions.content
    var hasNewDuration = 'duration' in toastOptions
    hasNewDuration && (duration = toastOptions.duration) 
  } else {
    var hasNewDuration = arguments.length === 2 && (!isNaN(arguments[1]))
    hasNewDuration && (duration = parseInt(arguments[1]))
    contentString = toastOptions
  }
  var box = createElement('div', {
    class: 'z-toast-box'
  })
  // if(content!==''){
  var content = createElement('p', {
    class: 'z-toast-content',
    innerHTML: contentString
  })
  box.appendChild(content)
  // }
  if (hasIcon) {
    box.className += ' has-icon'
    var img = createElement('img', {
      class: 'z-toast-icon',
      src: toastOptions.icon
    })
    box.insertBefore(img, content)
    // box.appendChild(img)
  }
  var mask = createElement('div', {
    class: 'z-toast-mask'
  })
  mask.appendChild(box)
  // section就是整个layer
  var layerSection = createElement('section', {
    class: 'z-toast'
  })
  layerSection.appendChild(mask)
  document.body.appendChild(layerSection)
  duration && setTimeout(hideToast, duration)
  forbidScroll()
}

function hideToast(callback) {
  var toast = document.querySelector('.z-toast')
  toast && body.removeChild(toast)
  typeof callback === 'function' && callback()
  canScroll()
}
// showToast('修改成功!',9000)
function showLoading(duration) {
  duration = 0 | duration
  showToast({
    content: '',
    duration: 0,
    icon: loadingIcon
  })
  if(duration){
    setTimeout(hideToast,duration)
  }
}
function hideLoading(){
  hideToast()
}
// export{
//   showToast,
//   showModal,
//   showLoading,
//   hideLoading,
//   hideModal,
//   hideToast

// }

