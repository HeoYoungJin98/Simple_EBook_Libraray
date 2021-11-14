<?php
$BookName = $_POST["BookName"];//넘겨받은 책 이름
$Date = $_POST["ReserveDate"];//넘겨받은 날짜
$UserName = $_POST["UserName"];//넘겨받은 유저 ID
$Path = "/data/".$UserName.".json";//유저 ID를 가지고 경로 생성

$f = fopen($Path,"a+");//파일을 읽기+쓰기 형식으로 open
$Arr = array("bookName" => $BookName, "rentalDate" => $Date);//배열 생성
$json = json_encode($Arr);//json 형식으로 encode
fwrite($f,$json."\n");//파일에 쓰기
fclose($f);//파일 닫기
 ?>
