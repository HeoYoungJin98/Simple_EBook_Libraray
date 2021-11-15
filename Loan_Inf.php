<?php
$User = $_POST["User"];//넘겨받은 User
$Arr = array();//배열 생성
$Path = "data/".$User.".json";//사용자 이름을 통한 경로 생성
$f = fopen($Path,"r");//파일을 읽기 형식으로 open

if(!$f){
  echo 0;
};

while(!feof($f)){
  $Readed_line = json_decode(fgets($f),true);//한 줄을 읽어와 배열로 생성

  if(!$Readed_line){
    break;
  }else{
    array_push($Arr,$Readed_line["bookName"],$Readed_line["rentalDate"]);
  };
};

if(count($Arr)>0){
  echo json_encode($Arr);
}else{
  echo 0;
}
fclose($f);
 ?>
