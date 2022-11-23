<? 
	session_start(); 
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
	$item_subject     = $row[subject];
	$item_content     = $row[content];
?>
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
			<div class="line_map"><i class="fas fa-home"></i><span class="hidden">home</span> &gt; 세스코광장 &gt; <strong>공지사항</strong></div>
			<h2>공지사항</h2>
			<p>세스코의 <span>새로운 소식</span>과 <span>행사내용</span>을 전해드립니다.</p>
		</div>
		<div class="content_toptopic">
			<h3>NOTICE MODIFY</h3>
		</div>

		<form  name="board_form" class="board_form" method="post" action="insert.php?mode=modify&num=<?=$num?>&page=<?=$page?>"> 
			<div id="write_form">

				<div class="row" id="write_row1">
                    <label for="nick">작성자</label>
					<input type="text" name="nick" id="nick" class="disabled_input " value="<?=$usernick?>" disabled>
                    <div id="loadtext2"></div>  
                </div>

				<div class="row" id="write_row2">
                    <label for="subject">제목</label>
                    <input type="text" name="subject" id="subject" value="<?=$item_subject?>" placeholder="제목을 입력해주세요.">
                </div>

				<div class="row" id="write_row3">
                    <label for="text_content">내용</label>
                    <textarea name="content" id="text_content" class="text_content" placeholder="내용을 입력해주세요."><?=$item_content?></textarea>
                </div>

			</div>

			<div id="page_button">
				<ul class="btn_wrap btn_wrap2">
					<li><a href="list.php?page=<?=$page?>" class="btn btn2">취소</a></li>
					<li><button type="submit" value="등록" class="btn btn1"><span>수정</span></button></li>
				</ul>
			</div>
		</form>
		
    </article>
	<? include "../common/sub_footer.html" ?>

</body>
</html>