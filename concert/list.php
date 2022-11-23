<? 
	session_start(); 
    @extract($_POST);
    @extract($_GET);
    @extract($_SESSION);
	ini_set('display_errors', 0);
	ini_set('display_startup_errors', 0);
	error_reporting(E_ALL);
	$table = "concert"; //테이블명 처리(추가 또는 테이블명 변경 시 변수만 수정)
	$ripple = "free_ripple";
?>
<!DOCTYPE html>
<html lang="ko">
<head> 
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="../common/css/common.css">
<link rel="stylesheet" href="../sub4/common/css/sub4common.css">
<link rel="stylesheet" href="./concert.css">

<script src="https://kit.fontawesome.com/96a1703d7f.js"
      crossorigin="anonymous"></script>
    <script src="../common/js/prefixfree.min.js"></script>
</head>
<?

@extract($_GET); 
@extract($_POST); 
@extract($_SESSION); 
	include "../lib/dbconn.php";
	if(!$scale)
	$scale=10;			// 한 화면에 표시되는 글 수

    if ($mode=="search")
	{
		if(!$search)
		{
			echo("
				<script>
				 window.alert('검색할 단어를 입력해 주세요!');
			     history.go(-1);
				</script>
			");
			exit;
		}

		$sql = "select * from $table where $find like '%$search%' order by num desc";
	}
	else
	{
		$sql = "select * from $table order by num desc";
	}

	$result = mysql_query($sql, $connect);

	$total_record = mysql_num_rows($result); // 전체 글 수

	// 전체 페이지 수($total_page) 계산 
	if ($total_record % $scale == 0)     
		$total_page = floor($total_record/$scale);      
	else
		$total_page = floor($total_record/$scale) + 1; 
 
	if (!$page)                 // 페이지번호($page)가 0 일 때
		$page = 1;              // 페이지 번호를 1로 초기화
 
	// 표시할 페이지($page)에 따라 $start 계산  
	$start = ($page - 1) * $scale;      
	$number = $total_record - $start;
?>
<body>
<? include "../common/sub_header.html" ?>
<div class="visual">
        <img src="../sub4/common/images/topbg.jpg" alt="서브 비주얼 이미지">
        <div class="visual_text">
            <h3>NEWS</h3>
        </div>
    </div>

	<div class="subNav">
        <ul>
            <li><a href="../greet/list.php" >공지사항</a></li>
            <li class="current"><a style="color: #fff;" href="../concert/list.php">뉴스</a></li>
        </ul>
    </div>

	<article id="content" class="concert_content">
	<div class="title_area">
            <div class="line_map"><i class="fas fa-home"></i><span class="hidden">home</span> &gt; 홍보센터 &gt; <strong>뉴스</strong></div>
            <h2>로템뉴스</h2>
            <p>현대로템의 소식을 전해드립니다.</p>
        </div>
		
		
		<div class="tb_top">
			<p>총 <span><?= $total_record ?></span> 개의 소식이 있습니다.</p>
			<select name="scale" class="scale" onchange="location.href='list.php?scale='+this.value">
				<option value=''>보기</option>
				<option value='3'>3</option>
				<option value='6'>6</option>
				<option value='9'>9</option>
				<option value='12'>12</option>
			</select>
		</div>
		<div class="list_wrap2">
			<div><span class="hidden">회원목록</span></div>
			<div class="hidden list_head"> 
				<ul> 
					<li class="list_title1">No</li> 
					<li class="list_title2">이미지</li>
					<li class="list_title3">제목</li> 
					<li class="list_title4">작성자</li> 
					<li class="list_title5">등록일</li> 
					<li class="list_title6">조회</li> 
				</ul> 
			</div>

			<div class="list_body">
				<?		
					for ($i=$start; $i<$start+$scale && $i < $total_record; $i++)                    
					{
						mysql_data_seek($result, $i); //가져올 레코드로 위치(포인터) 이동  
						$row = mysql_fetch_array($result); // 하나의 레코드 가져오기
						$item_num     = $row[num];
						$item_id      = $row[id];
						$item_name    = $row[name];
						$item_nick    = $row[nick];
						$item_hit     = $row[hit];
						$item_date    = $row[regist_day];
						$item_date = substr($item_date, 0, 10);  //2022-02-21(10자만 가지고 오기)
						$item_subject = str_replace(" ", "&nbsp;", $row[subject]); //공백 문자는 태그로 바꾸기
						$item_content = $row[content];
						// 댓글 정보
						$sql = "select * from $ripple where parent=$item_num"; 
						$result2 = mysql_query($sql, $connect); 
						$num_ripple = mysql_num_rows($result2); 
			
						if($row[file_copied_0]){ 
							$item_img = './data/'.$row[file_copied_0];  
						}else{
							$item_img = './data/default.jpg'  ;
						}
				?>
					<div OnClick="location.href='view.php?table=<?=$table?>&num=<?=$item_num?>&page=<?=$page?>'" style="cursor:pointer;" class="item_wrap">
						<div> 
							<div class="list_item1 hidden"><?= $number ?></div> 
							<div class="list_item2"><img src="<?=$item_img?>" alt="섬네일 이미지"></div> 
							<div class="bottom_item">
								<div class="list_item3"><?= $item_subject ?></div>
								<div class="list_item4"><?= $item_content ?></div>
								<div class="bottom_sub">
									<div class="list_item5"><?= $item_nick ?></div> 
									<div class="list_item6"><?= $item_date ?></div> 
									<div class="list_item7"><i class="fas fa-eye"></i><span class="hidden">조회</span> <?= $item_hit ?></div> 
									<div class="list_item8">
									<?
										if ($num_ripple) //추가
											echo " <i class='fas fa-comment-dots'></i><span class='hidden'>댓글아이콘</span> $num_ripple"; //추가
									?>
									</div>
								</div>
							</div>
						</div> 
					</div>
				<?
						$number--;
					}
				?>
			</div>
		</div>
		<!-- 하단 버튼 -->
		<div id="page_button">
			<!-- 목록/글쓰기 버튼 -->
			<ul class="btn_wrap btn_double right_btn">
				<li><a href="list.php" class="btn btn_nomal">목록</a></li>
				<? 
					if($userid) //만약 로그인 상태라면
					{
				?>
				<li><a href="write_form.php?table=<?=$table?>" class="btn btn_solid">글쓰기</a></li>

				<?
					}
				?>
			</ul>
			<!-- 페이지 버튼 -->
			<div id="page_num"> 
			<i class="fa-regular fa-square-caret-left"></i><span class="hidden">이전</span>
				<?
					// 게시판 목록 하단에 페이지 링크 번호 출력
					for ($i=1; $i<=$total_page; $i++)
					{
						if ($page == $i)     // 현재 페이지 번호 링크 안함
						{
							echo "<b> $i </b>";
						}
						else
						{ 
							if($mode=="search") //검색했을때
							{ 
								echo "<a href='list.php?page=$i&scale=$scale&mode=search&find=$find&search=$search'> $i </a>"; //3페이지 번호랑 스케일, 검색 값을 다 넘겨줌
							}
							else //검색 안했을때
							{ 
								echo "<a href='list.php?page=$i&scale=$scale'> $i </a>"; //페이지 번호랑 스케일만 넘겨줌
							}
						}      
					}
				?>			
				<i class="fa-regular fa-square-caret-right"></i><span class="hidden">다음</span>
			</div>

		</div> <!-- end of page_button -->
		<!-- 검색 -->
		<!-- <div class="search_wrap">	
			<form  name="board_form" method="post" action="list.php?table=<?=$table?>&mode=search" class="search_form"> 
				<div class="search_cat">
					<label class="hidden" for="find">검색 카테고리</label>
					<select name="find" id="find"> 
						<option value='subject'>제목</option>
						<option value='content'>내용</option>
						<option value='nick'>닉네임</option>
						<option value='name'>이름</option>
					</select>
				</div>
				<div class="query">
					<input type="text" name="search" value="<?= $search ?>" placeholder="검색어를 입력해주세요.">
				</div>
				<div class="btn_wrap btn_double">
					<div>
						<button type="submit" value="검색" class="btn btn_solid">검색</button>
					</div>
					<div>
						<button type="button" value="검색" class="btn btn_nomal" onclick="location.href='list.php'">초기화</button>
					</div>
				</div>
			</form>
		</div> -->
    </article>
<? include "../common/sub_footer.html" ?>
</body>
</html>
