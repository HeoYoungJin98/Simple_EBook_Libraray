$(document).ready(function(){
  $(document).on("click","#login_btn",function(){//로그인 버튼 클릭 시
    $("#Login_Modal").css("visibility","visible");//로그인 모달 띄우기
    $("#Login_Modal").css("display","inline-block");//로그인 모달 띄우기
  });

  $("#Submit").on("click",function(){//Submit 버튼 클릭 시
    let id = $("#ID_Input").val();//변수 id에 ID입력값 저장
    let pwd = $("#PWD_Input").val();//변수 pwd에 PWD입력값 저장
    let id_pattern = /^([A-Za-z0-9]){6,15}$/;//id 양식 패턴
    let pwd_pattern = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;//pwd 양식 패턴
    if(id == null || pwd == null){//둘 중 하나가 null일 경우,
      alert("아이디 또는 패스워드의 입력양식을 체크해주세요");//경고창 출력.
    }else if(!id.match(id_pattern) || !pwd.match(pwd_pattern)){//id 또는 pwd가 입력 양식에 맞지 않을 경우
      alert("아이디 또는 패스워드의 입력양식을 체크해주세요");//경고창 출력.
      $("#Login_Modal").css("visibility","hidden");//모달 창 닫기
    }else{//입력창이 비어있지도 않고, 입력 양식에도 맞을 경우
      $.post(
        "Login.php",//Search_Book.php로 정보 전달
        {
          id_check: $("#ID_Input").val(),//ID값 전달
          pwd_check: $("#PWD_Input").val(),//PWD값 전달
        },
        function(is_true){//입력한 정보에 맞는 회원이 있는지 검사
          if(is_true == 1){//회원이 있을 경우
            let parent = document.getElementById("infs");//div의 정보 가져옴
            let rm_btn = document.getElementById("login_btn");//로그인 버튼의 정보 가져옴
            parent.removeChild(rm_btn);//로그인 버튼 삭제
            let cr_btn = document.createElement("button");//버튼 생성
            cr_btn.setAttribute("id","logout_btn");//버튼의 id를 logout_btn으로 설정
            let text = document.createTextNode("로그아웃");//텍스트 노드 생성
            cr_btn.appendChild(text);//두 노드를 붙임
            let inf = document.getElementById("Loan_Inf");//대출정보 링크의 정보를 가져옴.
            parent.insertBefore(cr_btn,inf);//대출정보 링크의 앞에 로그아웃 버튼을 위치함
            let location = document.getElementById("logout_btn");//로그아웃 버튼의 위치를 가져옴
            let id_inf = document.createTextNode(id);//id를 값으로 가지는 텍스트 노드 생성
            parent.insertBefore(id_inf,location);//로그아웃 버튼의 앞에 텍스트 노드 위치함.
            $("#Login_Modal").css("visibility","hidden");//모달 창 닫기
            $("#Login_Modal").css("display","none");//로그인 모달 닫기
          };
        },
      );
    };
  });

  $("#SignIn").on("click",function(){//SignIn 버튼 클릭 시
    let id = $("#ID_Input").val();//변수 id에 ID입력값 저장
    let pwd = $("#PWD_Input").val();//변수 pwd에 PWD입력값 저장
    let id_pattern = /^([A-Za-z0-9]){6,15}$/;//id 양식 패턴
    let pwd_pattern = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;//pwd 양식 패턴
    if(id == null || pwd == null){//둘 중 하나가 null일 경우,
      alert("아이디 또는 패스워드의 입력양식을 체크해주세요");//경고창 출력.
    }else if(!id.match(id_pattern) || !pwd.match(pwd_pattern)){//id 또는 pwd가 입력 양식에 맞지 않을 경우
      alert("아이디 또는 패스워드의 입력양식을 체크해주세요");//경고창 출력.
      $("#Login_Modal").css("visibility","hidden");//모달 창 닫기
      $("#Login_Modal").css("display","none");//로그인 모달 닫기
    }else{//입력창이 비어있지도 않고, 입력 양식에도 맞을 경우
      $.post(
        "SignIn.php",//SignIn.php로 정보 전달
        {
          id: $("#ID_Input").val(),//ID값 전달
          pwd: $("#PWD_Input").val(),//PWD값 전달
        },
        function(){
          alert("회원가입이 완료되었습니다.");//회원가입이 완료되었다는 문장 알림
        },
      );
    };
  });

  let Search_count = 0;
  $("#Insert_btn").on("click",function(){//검색을 클릭했을 때
    let table = document.getElementById("Book_List_Table");//테이블 정보 가져옴.
    if(Search_count == 0){
      var create_tr = document.createElement("tr");//tr 생성
      create_tr.setAttribute("id","head");
      table.appendChild(create_tr);//tr생성
      var create_td = document.createElement("td");//td 생성
      create_tr.appendChild(create_td);//td생성
      var Text = document.createTextNode("선택");
      create_td.appendChild(Text);
      create_td = document.createElement("td");
      create_tr.appendChild(create_td);//td생성
      Text = document.createTextNode("제목");
      create_td.appendChild(Text);
      create_td = document.createElement("td");
      create_tr.appendChild(create_td);//td생성
      Text = document.createTextNode("저자");
      create_td.appendChild(Text);
      create_td = document.createElement("td");
      create_tr.appendChild(create_td);//td생성
      Text = document.createTextNode("출판년월일");
      create_td.appendChild(Text);
      create_td = document.createElement("td");
      create_tr.appendChild(create_td);//td생성
      Text = document.createTextNode("출판사");
      create_td.appendChild(Text);
      create_td = document.createElement("td");
      create_tr.appendChild(create_td);//td생성
      Text = document.createTextNode("화일");
      create_td.appendChild(Text);
      create_td = document.createElement("td");
      create_tr.appendChild(create_td);//td생성
      Text = document.createTextNode("대출여부");
      create_td.appendChild(Text);

      let Reserve = document.getElementById("Reserve");//div 정보 가져오기
      let Reserve_btn = document.createElement("button");//버튼 생성하기
      Reserve_btn.setAttribute("id","Reserve_btn");//버튼의 ID 설정하기
      let Reserve_Text = document.createTextNode("대출하기");//텍스트 노드 생성하기
      Reserve_btn.appendChild(Reserve_Text);//버튼과 텍스트 노드 붙이기
      Reserve.appendChild(Reserve_btn);//버튼 출력하기
    };

    $.post(
      "BookList.php",//php로 정보 전달
      {
        word: $("#Insert").val(),
      },
      function(data){//콜백
        if(data == 0){

        }else{
          Search_count += 1;
          let Arr = JSON.parse(data);
          create_tr = document.createElement("tr");//tr 생성
          create_td = document.createElement("td");//td 생성
          for(let r = 0; r<(Arr.length/6); r++){//table 생성
            table.appendChild(create_tr);//tr을 개수에 맞게 생성
            for(let d=0; d<7; d++){//td를 생성하는 반복문
              create_td = document.createElement("td");
              create_td.setAttribute("class","Book_info");
              create_tr.appendChild(create_td);//td생성
              if(d==0){//첫 번째
                let checkbox = document.createElement("input");//체크박스 생성
                checkbox.setAttribute("type","checkbox");//타입을 체크박스로
                checkbox.setAttribute("class","checkbox");//클래스를 체크박스로
                create_td.appendChild(checkbox);
              }else if(d==5){//5번째칸(미리보기)
                let link = document.createElement("button");
                link.setAttribute("value",Arr[(d-1)]);
                link.setAttribute("class","Show_file");
                let link_Text = document.createTextNode("미리보기");
                link.appendChild(link_Text);
                create_td.appendChild(link);
              }else{//두 번째부터
                let result = document.createTextNode(Arr[(d-1)]);
                create_td.appendChild(result);//배열의 값 집어넣음
              };
            };
          };
        };
      },
    );
  });

  $(document).on("click",".Show_file",function(){//미리보기 버튼을 클릭했을 경우
    let val = $(this).val();//value 가져오기
    let path = "/HW2/uploads/"+val;//경로 설정
    window.open(path,"미리보기","width=500,height=600");//새 창에서 윈도우 띄우기
  });

  $(document).on("click","#Reserve_btn",function(){//대출하기 버튼을 클릭했을 경우
    let is_logout = $("#logout_btn").text();//로그아웃 버튼이 있는지 확인
    if(is_logout == ""){//없을 경우 로그인이 안 된 것이므로
      alert("로그인 후 대출 가능합니다.");//경고창 출력
    }else{//로그인은 된 상태일 경우
      let check = document.getElementsByClassName("checkbox");//체크박스들의 정보 가져옴
      let row = 0;//변수값을 0으로
      let td = document.getElementsByClassName("Book_info");//각 테이블들의 정보를 가져옴
      for(row; row<check.length; row++){//체크박스의 수만큼 검사
        if(check[row].checked){//체크박스가 체크 된 경우에만
          let is_keep = td[(row*6)+6].innerHTML;//대출 여부 저장
          if(is_keep == "rented"){//해당 도서가 대출중인 경우
            alert("대출 가능한 도서만 선택해주세요.");//경고창 출력
          }else{
            let day = new Date();//현재 시간을 변수에 저장
            let today = day.getFullYear() + "-" + day.getMonth() + "-" + day.getDate();//연월일만 문자열로 저장
            let BookName = td[(row*6)+1].innerHTML;//책이름
            let parent = document.getElementById("infs");//div의 정보 가져옴
            let User = parent.childNodes[2].nodeValue;

            $.post(
              "Reserve_Book.php",//Reserve_Book.php로 정보 전달
              {
                BookName: BookName,//책이름
                ReserveDate: today,//오늘 연월일
                UserName: User,//로그인한 아이디전달
              },
            );

            $.post(
              "Fix_to_rented.php",//Fix_to_rented.php로 정보 전달
              {
                BookName: BookName,//책 이름 전달
              },
            );
          };
        };
      };
      alert("대출되었습니다");
      for(row = 0; row<check.length; row++){//체크박스의 수만큼 검사
        if(check[row].checked){//체크박스가 체크 된 경우에만
          td[(row*6)+6].innerHTML = "rented";//상태를 rented로 변경
        };
      };
    };
  });

  $("#Loan_Inf").on("click",function(){//대출정보 버튼을 클릭했을 경우
    let is_logout = $("#logout_btn").text();//로그아웃 버튼이 있는지 확인
    if(is_logout == ""){//없을 경우 로그인이 안 된 것이므로
      alert("로그인 후, 대출정보 보기가 가능합니다.");//경고창 출력
    }else{
      
    }
  });

  $(document).on("click","#logout_btn",function(){//로그아웃하기
    let parent = document.getElementById("infs");//div의 정보 가져옴
    let rm_btn = document.getElementById("logout_btn");//로그아웃 버튼의 정보 가져옴
    parent.removeChild(rm_btn);//로그아웃 버튼 삭제
    parent.removeChild(parent.childNodes[2]);
    let cr_btn = document.createElement("button");//버튼 생성
    cr_btn.setAttribute("id","login_btn");//버튼의 id를 login_btn으로 설정
    let text = document.createTextNode("로그인");//텍스트 노드 생성
    cr_btn.appendChild(text);//두 노드를 붙임
    let inf = document.getElementById("Loan_Inf");//대출정보 링크의 정보를 가져옴.
    parent.insertBefore(cr_btn,inf);//대출정보 링크의 앞에 로그인 버튼을 위치함
    alert("로그아웃이 완료되었습니다.");
  });
});
