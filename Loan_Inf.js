$(document).ready(function(){
  let ID = opener.document.getElementById("infs").childNodes[2].nodeValue;//부모창에서 회원의 아이디를 가져옴
  let Parent = document.getElementById("Infs");//현재 창의 div정보를 가져옴
  let User = document.createTextNode(ID);//가져온 ID로 텍스트 노드 생성
  let Text = Parent.childNodes[0];//회원이라는 텍스트의 정보를 가져옴
  Parent.insertBefore(User,Text);//회원 텍스트 앞에 유저 정보 출력


  $.post(
    "Loan_Inf.php",
    {
      User: ID,
    },
    function(data){
      if(data == 0){//대출중인 도서가 없을 경우

      }else{
        let table = document.getElementById("Book_List_Table");//테이블 정보 가져옴.
        var create_tr = document.createElement("tr");//tr 생성
        create_tr.setAttribute("id","head");
        table.appendChild(create_tr);//tr생성

        var create_td = document.createElement("td");//td 생성
        create_tr.appendChild(create_td);//td생성
        var TextNode = document.createTextNode("선택");
        create_td.appendChild(TextNode);

        create_td = document.createElement("td");
        create_tr.appendChild(create_td);//td생성
        TextNode = document.createTextNode("책 제목");
        create_td.appendChild(TextNode);

        create_td = document.createElement("td");
        create_tr.appendChild(create_td);//td생성
        TextNode = document.createTextNode("대출 날짜");
        create_td.appendChild(TextNode);

        let Reserve = document.getElementById("return");//div 정보 가져오기
        let Reserve_btn = document.createElement("button");//버튼 생성하기
        Reserve_btn.setAttribute("id","return_btn");//버튼의 ID 설정하기
        let Reserve_Text = document.createTextNode("반납하기");//텍스트 노드 생성하기
        Reserve_btn.appendChild(Reserve_Text);//버튼과 텍스트 노드 붙이기
        Reserve.appendChild(Reserve_btn);//버튼 출력하기

        let Arr = JSON.parse(data);
        create_tr = document.createElement("tr");//tr 생성
        create_td = document.createElement("td");//td 생성
        for(let r = 0; r<(Arr.length/2); r++){//table 생성
          create_tr = document.createElement("tr");//tr 생성
          table.appendChild(create_tr);//tr을 개수에 맞게 생성
          create_tr.setAttribute("class","tr");
          for(let d=0; d<3; d++){//td를 생성하는 반복문
            create_td = document.createElement("td");
            create_td.setAttribute("class","Book_info");
            create_tr.appendChild(create_td);//td생성
            if(d==0){//첫 번째
              let checkbox = document.createElement("input");//체크박스 생성
              checkbox.setAttribute("type","checkbox");//타입을 체크박스로
              checkbox.setAttribute("class","checkbox");//클래스를 체크박스로
              create_td.appendChild(checkbox);
            }else{
              let result = document.createTextNode(Arr[r*2+(d-1)]);
              create_td.appendChild(result);//배열의 값 집어넣음
            };
          };
        };
      };
    },
  );

  $(document).on("click","#return_btn",function(){
    let check = document.getElementsByClassName("checkbox");//체크박스들의 정보 가져옴
    let row = 0;//변수값을 0으로
    let td = document.getElementsByClassName("Book_info");//각 테이블들의 정보를 가져옴
    for(row; row<check.length; row++){//체크박스의 수만큼 반복
      if(check[row].checked){//체크박스가 체크된 경우에만
        let BookName = td[(row*3)+1].innerHTML;//책 이름 가져옴

        $.post(
          "Return_Book.php",//Return_Book으로 정보 넘겨줌
          {
            BookName: BookName,
            User: ID,
          },
        );

        $.post(
          "Fix_to_keep.php",//Fix_to_keep.php로 정보 넘겨줌
          {
            BookName: BookName,
          },
        );
      };
    };
    alert("반환되었습니다.");
    //테이블 삭제하기
    for(row=0; row<check.length; row++){
      if(check[row].checked){//체크박스가 체크되어 있는 경우
        let tbl = document.getElementsByClassName("tr");
        tbl[row].removeChild(td[row*3+2]);//테이블 삭제
        tbl[row].removeChild(td[(row*3)+1]);
        tbl[row].removeChild(td[(row*3)]);
      };
    };
  });
});
