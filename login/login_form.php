<? session_start(); ?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>
    <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
    <link rel="stylesheet" href="css/login.css">

    <script src="https://kit.fontawesome.com/96a1703d7f.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <h1><a class="logo" href="../index.html">현대로템 로고</a></h1>
    </header>
<div id="content">
    <div class="title">
        <h2>로그인</h2>
        <p class="pl">회원가입후 로그인 하세요.</p>
    </div>
    <form  name="member_form" method="post" action="login.php"> 
    
    
        <div id="id_pw_input">
            <ul>
                <span>아이디</span>
                <li><input type="text" name="id" class="login_input" required></li>
                <span>비밀번호</span>
                <li><input type="password" name="pass" class="login_input" required></li>
            </ul>						
        </div>
        <div id="login_button">
            <button type="submit" class="login">로그인</button>
        </div>
    
        <ul class="find_wrap">
            <li>
                <a href="id_find.php">아이디 찾기</a>
            </li>
            <li>
                <a href="pw_find.php">비밀번호 찾기</a>
            </li>
        </ul>
    
        <div id="join_button">
            <i class="fa-thin fa-hand-back-point-right"></i>
            <a href="../member/member_form.php">가입하기</a>
        </div>
    </form>
</div>

</body>
</html>