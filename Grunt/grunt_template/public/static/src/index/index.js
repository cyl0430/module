require(['base'],function (base) {
	$(function () {
		({
			title:'JS代码模板',
			run:function () {
				this.init();
				this.listen();
			},
			init:function () {
				this.moreBtn = $('.js_more');
			},
			listen:function () {
				this.moreBtn.on('click',this.moreBtnFun);
			},
			moreBtnFun:function () {
				location.href = '../center/center.html';
			}
		}).run();
	})
});