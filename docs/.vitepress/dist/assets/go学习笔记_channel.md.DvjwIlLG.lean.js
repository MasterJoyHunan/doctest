import{_ as o,c as t,j as e,o as a}from"./chunks/framework.DPuwY6B9.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"go学习笔记/channel.md","filePath":"go学习笔记/channel.md","lastUpdated":1729761429000}'),r={name:"go学习笔记/channel.md"};function l(s,n,c,i,u,p){return a(),t("div",null,n[0]||(n[0]=[e("p",null,"channel 是 goroutine 于 goroutine 之间连接的桥梁，也是通信的实现",-1),e("p",null,"建立一个无缓冲通道，如果一个 goroutine 发送消息，另一个 goroutine将会阻塞，知道读取消息为止",-1),e("p",null,"反之，如果一个 goroutine 先执行接受消息，另一个 goroutine将会阻塞，直到发送了消息为止",-1),e("p",null,"因为这样的特性，无缓冲通道也成为同步通道，当一个值在通道传递时，接受方接收到了值，发送方才会被唤醒",-1),e("p",null,"在有channel连接的时候，关闭读的 goroutine 会导致发生错误， 关闭写的 goroutine 导致 EOF",-1)]))}const m=o(r,[["render",l]]);export{g as __pageData,m as default};
