<?php
$BookName = $_POST["BookName"];
$f = fopen("data/bookList.json","r");
$Arr = [];
while(!feof($f)){
  $Readed_line = json_decode(fgets($f), true);
  if(!$Readed_line){
    break;
  };

  if($BookName == $Readed_line['bookName']){
    $Readed_line['rental'] = "rented";
  };

  array_push($Arr,$Readed_line["bookName"],$Readed_line["authors"],$Readed_line["publishDate"],$Readed_line["publisher"],$Readed_line["fileName"],$Readed_line["rental"]);
};
fclose($f);

$f = fopen("data/bookList.json","w");
for($a = 0; $a<count($Arr)/6; $a++){
  $temp = array("bookName" => $Arr[$a*6], "authors" => $Arr[$a*6+1], "publishDate" => $Arr[$a*6+2], "publisher" => $Arr[$a*6+3], "fileName" => $Arr[$a*6+4], "rental" => $Arr[$a*6+5]);
  $json = json_encode($temp);
  fwrite($f,$json."\n");
};
fclose($f);
?>
