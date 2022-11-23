$(function () {
	const urlprev = '<iframe src="https://www.youtube.com/embed/';
	const urlnext =
		'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

	$.ajax({
		url: '../js/sub4_1.json',
		dataType: 'json',
		success: function (data) {
			let useData = data.media;
			let txt = '<p><span>현대로템의 다양한 컨텐츠를 즐겨보세요</span></p>';
			txt += '<div class="swiper-container swiper">';
			txt += '<div class="swiper-wrapper">';
			for (var i in useData) {
				var title = useData[i].title;
				let date = useData[i].date;
				txt += '<div class="swiper-slide"><a href="#">';
				txt +=
					'<div><img src="../images/sub4/content1/media' +
					(+i + 1) +
					'.jpg" alt="썸네일사진"></div>';
				txt += '<dl><dt>' + title + '</dt>';
				txt += '<dd>' + date + '</dd></dl>';
				txt += '</a></div>';
			}
			txt += '</div>';
			txt += '<div class="swiper-pagination"></div></div>';
			$('.youtube_list').html(txt);
			var swiper = new Swiper('.swiper', {
				pagination: {
					el: '.swiper-pagination',
					dynamicBullets: true,
				},
			});
		},
	});

	function youtube(data, num) {
		let useData = data.media[num];
		let txt = '<div>';
		txt += '<div class="main_text">';
		txt +=
			'<p>' + useData.title + '<span>' + useData.date + '</span></p></div>';
		txt += '<div class="youtube_box">';
		txt += urlprev + useData.source + urlnext;
		txt += '</div>';
		txt += '<div class="sub_text">';
		txt += '<p>' + useData.desc1 + '</p>';
		txt += '<p>' + useData.desc2 + '</p></div></div>';

		$('.main_box').html(txt);
	}

	//처음에 보여질 영상
	$.ajax({
		url: '../js/sub4_1.json',
		dataType: 'json',
		success: function (data) {
			youtube(data, 0);
		},
	});

	$(document).on('click', '.youtube_list .swiper-slide a', function (e) {
		e.preventDefault();
		let num = $(this).parents('.swiper-slide').index();
		$.ajax({
			url: '../js/sub4_1.json',
			dataType: 'json',
			success: function (data) {
				youtube(data, num);
			},
		});
	});
});