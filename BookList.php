<?php
$f = fopen("data/bookList.json", "r");//파일을 읽기 전용으로 open
$Arr = array();//배열 Arr 생성
$word = $_POST["word"];//넘겨받은 단어 저장
while(!feof($f)){//파일의 끝까지 반복
  $Readed_line = json_decode(fgets($f), true);
  if(!$Readed_line){//읽어온 라인이 없으면
    break;//중단
  };
  if(strpos($Readed_line["bookName"],$word) !== false || strpos($Readed_line["authors"],$word) !== false || strpos($Readed_line["publishDate"],$word) !== false || strpos($Readed_line["publisher"],$word) !== false){
    array_push($Arr,$Readed_line["bookName"],$Readed_line["authors"],$Readed_line["publishDate"],$Readed_line["publisher"],$Readed_line["fileName"],$Readed_line["rental"]);
  };
};
if(count($Arr)>0){
    echo json_encode($Arr);
}else{
  echo 0;
}
fclose($f);
?>
