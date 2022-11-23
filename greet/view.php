<? 
	session_start(); 
	/*
		
	*/
	@extract($_GET); 
	@extract($_POST); 
	@extract($_SESSION); 
	ini_set('display_errors', 0);
	ini_set('display_startup_errors', 0);
	error_reporting(E_ALL);
	include "../lib/dbconn.php";

	$sql = "select * from greet where num=$num";
	$result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);       
      // 하나의 레코드 가져오기
	
	$item_num     = $row[num];
	$item_id      = $row[id];
	$item_name    = $row[name];
  	$item_nick    = $row[nick];
	$item_hit     = $row[hit];

    $item_date    = $row[regist_day];

	$item_subject = str_replace(" ", "&nbsp;", $row[subject]);

	$item_content = $row[content];
	$is_html      = $row[is_html];

	if ($is_html!="y")
	{
		$item_content = str_replace(" ", "&nbsp;", $item_content);
		$item_content = str_replace("\n", "<br>", $item_content);
	}	

	$new_hit = $item_hit + 1;

	$sql = "update greet set hit=$new_hit where num=$num";   // 글 조회수 증가시킴
	mysql_query($sql, $connect);
?>
<!DOCTYPE html>
<html lang="ko">
<head> 
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../common//css/common.css">
<link rel="stylesheet" href="../sub4/common/css/sub4common.css">
<link rel="stylesheet" href="./css/greet.css">
<script src="https://kit.fontawesome.com/96a1703d7f.js" crossorigin="anonymous"></script>
<script src="../common/js/prefixfree.min.js"></script>
<script>
    function del(href) 
    {
        if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
                document.location.href = href;
        }
    }
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
            <li class="current" ><a href="../greet/list.php" style="color: #fff;">공지사항</a></li>
            <li><a href="../concert/list.php">뉴스</a></li>
        </ul>
    </div>

    <article id="content">
	<div class="title_area">
            <div class="line_map"><i class="fas fa-home"></i><span class="hidden">home</span> &gt; 홍보센터 &gt; <strong>공지사항</strong></div>
            <h2>공지사항</h2>
            <p>현대로템의 소식을 전해드립니다.</p>
        </div>

		<form  name="view_form" class="view_form"> 

			<div class="view_title">
				<div id="view_title1">
					<?= $item_subject ?>
				</div>
				<div id="view_title2">
					<ul>
						<li><?= $item_nick ?></li>
						<li><i class="fas fa-eye"></i><span class="hidden">조회</span> <?= $item_hit ?></li>
						<li><?= $item_date ?></li>
					</ul>
				</div>
				<div class="view_gbtn">
				<ul class="btn_wrap btn_wrap2 btn_list">
					<li><a href="list.php?page=<?=$page?>" class="btn btn2">목록</a></li>
					<? 
						if($userid)  //로그인이 되면 글쓰기
						{
					?>
					<li><a href="write_form.php" class="btn btn1">글쓰기</a></li>
					<?
						}
					?>
				</ul>
				</div>
			</div>

			<div id="view_content">
				<?= $item_content ?>
			</div>

<div id="view_title3">
					<ul class="btn_wrap btn_wrap2">
						<? 
							if($userid==$item_id || $userlevel==1 || $userid=="cesco")
							{
						?>
						<li><a href="modify_form.php?num=<?=$num?>&page=<?=$page?>" class="btn btn1">수정</a></li>
						<li><a href="javascript:del('delete.php?num=<?=$num?>')" class="btn btn2">삭제</a></li>
						<?
							}
						?>
					</ul>
				</div>
			


		</form>
    </article>
	<? include "../common/sub_footer.html" ?>
</body>
</html>
