<?php
//Book_Name validation
$Name_Validation = 1;
$f = fopen("data/bookList.json","r");//읽기 전용으로 json 파일을 open
$Book_Name = $_POST['Book_Name'];//form에 저장된 도서명을 변수에 저장
while(!feof($f)){//.json의 내용이 있을 경우 반복
  $temp = fgets($f);//한 줄씩 읽어옴
  $json = json_decode($temp,true); //배열 형태로 decode
  if($json === null){
    $Name_Validation = 1;
  }else if($Book_Name === $json['bookName']){//도서명이 중복인 경우가 있을 경우
    $Name_Validation = 0;//Validation 결과 0으로 설정
  };
};
fclose($f);

//File validation
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}
if (file_exists($target_file)) {//파일이 이미 있는지 확인
  echo "Sorry, file already exists.";
  $uploadOk = 3;
}


if ($uploadOk == 3) {//이미지 중복 검사 결과가 0일 경우
  echo "Sorry, your file was not uploaded.";//이미지가 이미 업로드됨을 알림
}else if($Name_Validation == 0){//도서명 중복 검사 결과가 0일 경우
  echo "Sorry your Book Name is not unique";//도서명이 중복됨을 알림
}else{//이미지 중복 검사 결과와 도서명 중복 검사 결과 모두 0이 아닐 경우
  if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {//파일의 업로드가 성공한 경우
    $Book_Name = $_POST['Book_Name'];//form에 입력된 도서명을 변수에 저장
    $Author = $_POST['Author'];//form에 입력된 저자명을 변수에 저장
    $Date = $_POST['date'];//form에 입력된 출판사명을 변수에 저장
    $Publisher = $_POST['publisher'];//form에 입력된 출판사를 변수에 저장

    $Arr = array("bookName" => $Book_Name, "authors" => $Author, "publishDate" => $Date, "publisher" => $Publisher, "fileName" => basename($_FILES["file"]["name"]), "rental" => "keep");
      //각 변수들을 value로 가지는 배열 생성
    $json = json_encode($Arr);//json 형태로 인코드
    $f = fopen("data/bookList.json","a+");//bookList.json 파일을 쓰기+읽기 권한으로 open
    fwrite($f,$json."\n");//file의 마지막줄에 json 작성
    echo "저장되었습니다.";//저장되었습니다 출력
    fclose($f);//file close
  }
};

 ?>
