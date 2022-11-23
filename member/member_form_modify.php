<?
    session_start();
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
    @extract($_POST);
    @extract($_GET);
    @extract($_SESSION);
?>
<!DOCTYPE html>
<html lang="ko">
<head> 
<meta charset="utf-8">
<link href="./css/member_form.css" rel="stylesheet" type="text/css" media="all">
<script>
   function check_id()
   {
     window.open("check_id.php?id=" + document.member_form.id.value,
         "IDcheck",
          "left=200,top=200,width=250,height=100,scrollbars=no,resizable=yes");
   }

   function check_nick()
   {
     window.open("../member/check_nick.php?nick=" + document.member_form.nick.value,
         "NICKcheck",
          "left=200,top=200,width=250,height=100,scrollbars=no,resizable=yes");
   }

   function check_input()
   {
      if (!document.member_form.pass.value)
      {
          alert("비밀번호를 입력하세요");    
          document.member_form.pass.focus();
          return;
      }

      if (!document.member_form.pass_confirm.value)
      {
          alert("비밀번호확인을 입력하세요");    
          document.member_form.pass_confirm.focus();
          return;
      }

      if (!document.member_form.name.value)
      {
          alert("이름을 입력하세요");    
          document.member_form.name.focus();
          return;
      }

      if (!document.member_form.nick.value)
      {
          alert("닉네임을 입력하세요");    
          document.member_form.nick.focus();
          return;
      }

      if (!document.member_form.hp2.value || !document.member_form.hp3.value )
      {
          alert("휴대폰 번호를 입력하세요");    
          document.member_form.nick.focus();
          return;
      }

      if (document.member_form.pass.value != 
            document.member_form.pass_confirm.value)
      {
          alert("비밀번호가 일치하지 않습니다.\n다시 입력해주세요.");    
          document.member_form.pass.focus();
          document.member_form.pass.select();
          return;
      }

      document.member_form.submit();
   }

   function reset_form()
   {
      document.member_form.id.value = "";
      document.member_form.pass.value = "";
      document.member_form.pass_confirm.value = "";
      document.member_form.name.value = "";
      document.member_form.nick.value = "";
      document.member_form.hp1.value = "010";
      document.member_form.hp2.value = "";
      document.member_form.hp3.value = "";
      document.member_form.email1.value = "";
      document.member_form.email2.value = "";
	  
      document.member_form.id.focus();

      return;
   }
</script>
</head>
<?
    include "../lib/dbconn.php";

    $sql = "select * from member where id='$userid'";
    $result = mysql_query($sql, $connect);

    $row = mysql_fetch_array($result);

    $hp = explode("-", $row[hp]);
    $hp1 = $hp[0];
    $hp2 = $hp[1];
    $hp3 = $hp[2];

    $email = explode("@", $row[email]);
    $email1 = $email[0];
    $email2 = $email[1];

    mysql_close();
?>
<body>
<div class="wrap">
        <header>
            <h1><a class="rotem_logo" href="../index.html">현대로템 로고</a></h1>
        </header>
        <article id="content">
            <div class="tit">
				<h2>나의 정보</h2>
				<p class="ex">가입 시 등록한 회원정보입니다.</p>
			</div>
            <form  name="member_form" method="post" action="modify.php"> 
				<!-- 회원정보 폼 -->
                <div class="row">
                    <label for="id">아이디</label>
                    <input type="text" name="id" id="id" class="disabled_input " value="<?= $row[id] ?>" disabled>
                </div>
                <div class="row">
                    <label for="pass">비밀번호</label>
                    <input type="password" name="pass" id="pass" placeholder="****" maxlength="16">
                </div>

                <div class="row">
                    <label for="pass_confirm">비밀번호 재확인</label>
                    <input type="password" name="pass_confirm" id="pass_confirm" placeholder="****" maxlength="16">
                </div>
                <div class="row">
                    <label for="name">이름</label>
                    <input type="text" name="name" id="name" class="name " value="<?= $row[name] ?>" placeholder="홍길동">
                </div>
                <div class="row">
                    <label for="nick">닉네임</label>
                    <input type="text" name="nick" id="nick" value="<?= $row[nick] ?>" placeholder="현대로템">
                    <div id="loadtext2"></div>  
                </div>
                <div class="row">
                    <label for="hp1">휴대전화</label>
                    <label class="hidden" for="hp1">전화번호앞3자리</label>
                    <select class="hp" name="hp1" id="hp1" value="<?= $hp1 ?>"> 
                        <option value='010'>010</option>
                        <option value='011'>011</option>
                        <option value='016'>016</option>
                        <option value='017'>017</option>
                        <option value='018'>018</option>
                        <option value='019'>019</option>
                    </select>
                    <span class="symbol">-</span>
                    <label class="hidden" for="hp2">전화번호중간4자리</label>
                    <input type="text" class="hp" name="hp2" id="hp2" maxlength="4" value="<?= $hp2 ?>" placeholder="0000">
                    <span class="symbol">-</span>
                    <label class="hidden" for="hp3">전화번호끝4자리</label>
                    <input type="text" class="hp" name="hp3" id="hp3" maxlength="4" value="<?= $hp3 ?>" placeholder="0000">
                    <div id="loadtext2"></div>  
                </div>
                <div class="row">
                    <label for="nick">이메일</label>
                    <label class="hidden" for="email1">이메일아이디</label>
                    <input type="text" id="email1" name="email1" class="mail" value="<?= $email1 ?>" placeholder="Rotem" required>
                    <span class="symbol">@</span>
                    <label class="hidden" for="email2">이메일주소</label>
                    <input type="text" name="email2" id="email2" class="mail" value="<?= $email2 ?>" placeholder="Rotem.co.kr" required>
                    <div id="loadtext"></div>  
                </div>
			</form>
            <ul class="btn_wrap btn_wrap2">
            <li><a href="#" class="btn" role="button" onclick="check_input()">수정하기</a></li>
                <li><a href="#" class="btn" role="button" onclick="history.go(0);">초기화하기</a></li>
                
            </ul>

        </article>
    </div>
</body>
</html>
