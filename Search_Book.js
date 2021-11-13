$(document).ready(function(){
  $("#login_btn").on("click",function(){//로그인 버튼 클릭 시
    $("#Login_Modal").css("visibility","visible");//로그인 모달 띄우기
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
          }
        }
      )
    }
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
    }else{//입력창이 비어있지도 않고, 입력 양식에도 맞을 경우
      $.post(
        "SingIn.php",//search_Book.php로 정보 전달
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
});
