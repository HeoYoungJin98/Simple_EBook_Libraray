$(document).ready(function(){
  $("#Add_Author").on("click",function(){//저자 생성 버튼 클릭 시
    let Authors = document.getElementsByClassName("Author");//저자명을 작성하는 input 태그들을 가져옴.
    if(Authors.length < 3){//저자 이름을 쓰는 input 박스가 3개 이하일 경우에만
      let input_box = document.createElement("input");//input Element를 만들고
      input_box.setAttribute("type","text");//type을 text로
      input_box.setAttribute("name","Author");//name을 Author로
      input_box.setAttribute("class","Author");//class를 Author로 설정
      let btn = document.getElementById("Add_Author");//저자 추가 버튼을 가져옴.
      document.getElementById("div2").insertBefore(input_box,btn); //저자 추가 버튼 앞에 input 태그 생성
    };
  });
  $("#Remove_Author").on("click",function(){//저자 삭제 버튼 클릭 시
    let Authors = document.getElementsByClassName("Author");
    if(Authors.length >= 2){//저자 이름을 쓰는 박스가 2개 이상일 경우에만
      let Remove_target = Authors[Authors.length-1];//저자 이름을 쓰는 input 태그의 마지막을 선택
      document.getElementById("div2").removeChild(Remove_target);//선택된 태그 삭제
    };
  });
})
