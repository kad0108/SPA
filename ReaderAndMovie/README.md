> A wechat applet.

1. 适合轻应用，支付宝也是提供了各个小功能的入口
2. 没有dom节点，是基于数据的，和AngularJS数据绑定的思想很像，不可以用现有的JS组件库
3. [小程序下载](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=1476197490095)
4. 小程序压缩包体积不能超过1M
5. <text>标签支持在移动设备端长按选中
6. 物理分辨率px : 逻辑分辨率rpx = 2 : 1, 不同终端用rpx做自适应
7. 一个移动端逻辑分辨率pt包含2个物理像素点px，包含的像素点越多也就越清晰，人眼可区分的清晰度也是1:2，所以像素点越多在人眼看来无区分。
8. 小程序轮播图实现，swiper组件