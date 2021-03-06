$(function() {
	getlist();
	function getlist(e) {
		$.ajax({
			url : "/shopadmin/getshoplist",
			type : "get",
			dataType : "json",
			success : function(data) {
				if (data.success) {
					handleList(data.shopList);
					handleUser(data.user);
				}
			}
		});
	}
	function handleUser(data) {
		$('#user-name').text(data.name);
	}

	function handleList(data) {  //这里的data就是主函数中的handleList(data.shopList)中的data.shopList
		var html = '';
		data.map(function(item, index) {  //item为当前项，即当前遍历的元素本身;index为元素处于数组中的下标或索引，分别为 0, 1, 2,……,n
			html += '<div class="row row-shop"><div class="col-40">'
					+ item.shopName + '</div><div class="col-40">'
					+ shopStatus(item.enableStatus)
					+ '</div><div class="col-20">'
					+ goShop(item.enableStatus, item.shopId) + '</div></div>';

		});
		$('.shop-wrap').html(html);
	}

	function shopStatus(status) {
		if (status == 0) {
			return '审核中';
		} else if (status == -1) {
			return '店铺非法';
		} else if (status == 1) {
			return '审核通过';
		}
	}

	function goShop(status, id) {
		if (status == 1) {
			return '<a href="/shopadmin/shopmanagement?shopId=' + id
					+ '">进入</a>';
		} else {
			return '';
		}
	}
});