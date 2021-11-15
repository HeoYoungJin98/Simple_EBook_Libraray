<?php
echo "hi";
if($_POST["id"] != null && $_POST["pwd"] != null){//회원가입
  $ID = $_POST["id"];//넘어온 id값 저장
  $PWD = $_POST["pwd"];//넘어온 pwd값 저장

  $f = fopen("data/person.json","a+");//파일을 읽기 + 쓰기 형식으로 open
  $Arr = array("id" => $ID, "Password" => $PWD);//key 와 value를 쌍으로 가지는 배열 생성
  $json = json_encode($Arr);//json 형식으로 인코드
  fwrite($f,$json."\n");//파일에 쓰기
  fclose($f);//파일 닫기
}
 ?>
