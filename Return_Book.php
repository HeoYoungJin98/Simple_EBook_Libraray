<?php
$BookName = $_POST["BookName"];
$UserName = $_POST["User"];
$Arr = array();
$Path = "data/".$UserName.".json";//넘겨받은 아이디로 경로 설정
$f = fopen($Path,"r");//파일을 읽기 방식으로 open
while(!feof($f)){
  $Readed_line = json_decode(fgets($f), true);
  if(!$Readed_line){
    break;
  }else{
    if($Readed_line["bookName"] == $BookName){
      array_push($Arr,null,null);
    }else{
      array_push($Arr,$Readed_line["bookName"],$Readed_line["rentalDate"]);
    };
  };
}
fclose($f);
$f = fopen($Path,"w");
for($a=0; $a<count($Arr)/2; $a++){
  if($Arr[$a*2] != null){
      $temp = array("bookName" => $Arr[$a*2], "rentalDate" => $Arr[$a*2+1]);
      $json = json_encode($temp);
      fwrite($f,$json."\n");
  }else{
    fwrite($f,"");
  };
};

 ?>
