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
    }
  });

  $("#SignIn").on("click",function(){//SignIn 버튼 클릭 시
    let id = $("#ID_Input").val();//변수 id에 ID입력값 저장
    let pwd = $("#PWD_Input").val();//변수 pwd에 PWD입력값 저장
    if(id == null || pwd == null){//둘 중 하나가 null일 경우,
      alert("아이디 또는 패스워드의 입력양식을 체크해주세요");//경고창 출력.
    }else if(!id.match(id_pattern) || !pwd.match(pwd_pattern)){//id 또는 pwd가 입력 양식에 맞지 않을 경우
      alert("아이디 또는 패스워드의 입력양식을 체크해주세요");//경고창 출력.
      $("#Login_Modal").css("visibility","hidden");//모달 창 닫기
      
    }
  });
})
