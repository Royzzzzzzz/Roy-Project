<? 
	session_start(); 
	@extract($_GET); 
   @extract($_POST); 
   @extract($_SESSION); 
   ini_set('display_errors', 0);
   ini_set('display_startup_errors', 0);
   error_reporting(E_ALL);
	include "../lib/dbconn.php";

	$sql = "select * from $table where num=$num";
	$result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);       
      // 하나의 레코드 가져오기
	
	$item_num     = $row[num];
	$item_id      = $row[id];
	$item_name    = $row[name];
  	$item_nick    = $row[nick];
	$item_hit     = $row[hit];

	$image_name[0]   = $row[file_name_0];
	$image_name[1]   = $row[file_name_1];
	$image_name[2]   = $row[file_name_2];


	$image_copied[0] = $row[file_copied_0];
	$image_copied[1] = $row[file_copied_1];
	$image_copied[2] = $row[file_copied_2];

    $item_date    = $row[regist_day];
	$item_subject = str_replace(" ", "&nbsp;", $row[subject]);

	$item_content = $row[content];
	$is_html      = $row[is_html];

	if ($is_html!="y")
	{
		$item_content = str_replace(" ", "&nbsp;", $item_content);
		$item_content = str_replace("\n", "<br>", $item_content);
	}
	
	//이미지 가져오기
	for ($i=0; $i<3; $i++)
	{
		if ($image_copied[$i]) //첨부된 이미지가 있으면
		{
			$imageinfo = GetImageSize("./data/".$image_copied[$i]);
				//배열로 리턴[이미지너비, 이미지ㅗㅍ이,이미지타입]
			$image_width[$i] = $imageinfo[0];
			$image_height[$i] = $imageinfo[1];
			$image_type[$i]  = $imageinfo[2];

			if ($image_width[$i] > 785)
				$image_width[$i] = 785;
		}
		else  //첨부되 이미지가 없으면
		{
			$image_width[$i] = "";
			$image_height[$i] = "";
			$image_type[$i]  = "";
		}
	}

	$new_hit = $item_hit + 1;

	$sql = "update $table set hit=$new_hit where num=$num";   // 글 조회수 증가시킴
	mysql_query($sql, $connect);
?>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>현대로템 뉴스</title>
<link rel="stylesheet" href="../common/css/common.css">
<link rel="stylesheet" href="../sub4/common/css/sub4common.css">
<link rel="stylesheet" href="./concert.css">

<script src="https://kit.fontawesome.com/96a1703d7f.js"
	crossorigin="anonymous"></script>
<script src="../common/js/prefixfree.min.js"></script>
	<script>
		function del(href) 
		{
			if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
					document.location.href = href;
			};
		};
		//댓글 함수
		function check_input()
		{
			if (!document.ripple_form.ripple_content.value)
			{
				alert("댓글의 내용을 입력하세요.");    
				document.ripple_form.ripple_content.focus();
				return;
			};
			document.ripple_form.submit();
		};
	</script>
</head>
<body>
<? include "../common/sub_header.html" ?>
	
<div class="visual">
        <img src="../sub4/common/images/topbg.jpg" alt="서브 비주얼 이미지">
        <div class="visual_text">
            <h3>공지사항</h3>
        </div>
    </div>

	<div class="subNav">
        <ul>
            <li><a href="../greet/list.php">공지사항</a></li>
            <li class="current"><a style="color: #fff;" href="../concert/list.php">뉴스</a></li>
        </ul>
    </div>

	<article id="content">
		<div class="title_area">
            <div class="line_map"><i class="fas fa-home"></i><span class="hidden">home</span> &gt; 홍보센터 &gt; <strong>공지사항</strong></div>
            <h2>공지사항</h2>
            <p>현대로템의 소식을 전해드립니다.</p>
        </div>

		<div class="view_form"> 

			<div class="view_title">
				<div id="view_title1">
					<?= $item_subject ?>
				</div>
				<div id="view_title2">
					<ul>
						<li><?= $item_nick ?></li>
						<li><?= $item_date ?></li>
						<li><i class="fas fa-eye"></i><span class="hidden">조회</span> <?= $item_hit ?></li>
					</ul>
				</div>
				<div id="view_title3">
					<ul class="btn_wrap btn_double center_btn" id="view_button">
						<? 
							if($userid==$item_id || $userlevel==1 || $userid=="cesco")
							{
						?>
						<li><a href="javascript:del('delete.php?table=<?=$table?>&num=<?=$num?>')" class="btn btn_nomal">삭제</a></li>
						<li><a href="write_form.php?table=<?=$table?>&mode=modify&num=<?=$num?>&page=<?=$page?>" class="btn btn_solid">수정</a></li>
						<?
							}
						?>
					</ul>
				</div>
			</div>
			<div id="view_content">
				<?
					for ($i=0; $i<3; $i++)  //업로드된 이미지를 출력한다 
					{
						if ($image_copied[$i]) //첨부된 파일이 있으면
						{
							$img_name = $image_copied[$i];
							$img_name = "./data/".$img_name; 
							// ./data/2019_03_22_10_07_15_0.jpg
							$img_width = $image_width[$i];
							
							echo "<img src='$img_name' width='$img_width'>"."<br><br>";
						}
					}
				?>
				<?= $item_content ?>
			</div>

			<!-- 댓글 폼 -->
			<!-- <div class="reply_form">
				<div>
					<?
						$sql = "select * from free_ripple where parent='$item_num'";
						$ripple_result = mysql_query($sql);
					
						while ($row_ripple = mysql_fetch_array($ripple_result))
						{
							$ripple_num     = $row_ripple[num];
							$ripple_id      = $row_ripple[id];
							$ripple_nick    = $row_ripple[nick];
							$ripple_content = str_replace("\n", "<br>", $row_ripple[content]);
							$ripple_content = str_replace(" ", "&nbsp;", $ripple_content);
							$ripple_date    = $row_ripple[regist_day];
					?>
					<div class="reply_wrap">
						<i class="fas fa-user-circle usericon"></i><span class="hidden">프로필 아이콘</span>
						<ul class="reply_infobox">
							<li><?=$ripple_nick?><span><?=$ripple_date?></span></li>
							<li> 
							<? 
								if($userid=="cesco" || $userid==$ripple_id){
								echo "<a href='delete_ripple.php?table=$table&num=$item_num&ripple_num=$ripple_num'><i class='fas fa-trash'></i><span class='hidden'>삭제아이콘</span> 삭제</a>"; 
								};
							?>
							</li>
						</ul>
						<div class="reply_content"><?=$ripple_content?></div>
					</div>
					<?
						}
					?>
				</div> -->
				<!-- 댓글 작성 폼(로그인 유저만 사용가능) -->
				<!-- <?
				if($userid){
				?>
				<form  name="ripple_form" method="post" action="insert_ripple.php?table=<?=$table?>&num=<?=$item_num?>" class="writer_content">  
					<div>
						<label for="ripple_content" class="hidden">댓글작성</label>
						<textarea name="ripple_content" id="ripple_content" placeholder="댓글을 입력해주세요."></textarea>
					</div>
					<div class="btn_wrap right_btn">
						<a href="#" role="button" onclick="check_input()" class="btn btn_solid">등록</a>
					</div>
				</form>
				<?
					};
				?>
			</div>

			<div class="view_gbtn">
				<ul class="btn_wrap center_btn btn_double" id="view_button">
					<li><a href="list.php?page=<?=$page?>" class="btn btn_nomal">목록</a></li>
					<? 
						if($userid)  //로그인이 되면 글쓰기
						{
					?>
					<li><a href="write_form.php?table=<?=$table?>" class="btn btn_solid">글쓰기</a></li>
					<?
						}
					?>
				</ul>
			</div> -->
			
		</div>
			
	</article>
	<? include "../common/sub_footer.html" ?>
</body>
</html>