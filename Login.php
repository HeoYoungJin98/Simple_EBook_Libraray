<?php
if($_POST["id_check"] != null && $_POST["pwd_check"] != null){//로그인
  $ID = $_POST["id_check"];//넘어온 id값 저장
  $PWD = $_POST["pwd_check"];//넘어온 pwd값 저장

  $f = fopen("data/person.json","r+");//파일을 읽기 + 쓰기 형식으로 open
  while(!feof($f)){//file의 끝까지 반복
    $Readed_line = json_decode(fgets($f), true);//파일의 한 줄을 읽어와 배열 형식으로 변환
    if(!$Readed_line){//읽어온 라인이 없을 경우
      break;//break
    };

    if($Readed_line["id"] == $ID && $Readed_line["Password"] == $PWD){//ID와 Password가 모두 맞을 경우
      echo 1;//1리턴
    };
  };
  fclose($f);
};
?>
