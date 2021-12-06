$(document).ready(function(){
    
    // #lang을 눌렀을때
        // #langlist는 토글한다.
    $("#lang").click(function(){
        $("#langlist").toggle();
    });
    // #langlist>a를 눌렀을때
        // 방금 눌린 그것의 내용을
        // #langbtn에 넣는다.
    $("#langlist>a").click(function(){
        $("#langbtn").text( $(this).text() );
    });
    
    $("label").click(function(event){
        event.preventDefault();
        $(this).children(".chkbox").toggleClass("checked");
        if($(this).children(".chkbox").hasClass("checked")){
            $(this).children("input[type='checkbox']").attr("checked",true);
        }else{
            $(this).children("input[type='checkbox']").attr("checked",false);
        }
    });
    
    
    $("#total label").click(function(){
        if($(this).find(".chkbox").hasClass("checked")){
            $(".agree").find(".chkbox").addClass("checked");
            $(".agree").find("input[type='checkbox']").attr("checked",true);
        }else{
            $(".agree").find(".chkbox").removeClass("checked");
            $(".agree").find("input[type='checkbox']").attr("checked",false);
        }
    });
    $(".agree label").click(function(e){
        e.preventDefault();
        var len = $(".agree .chkbox").length;
        var chklen = $(".agree .checked").length;
        var unchk = len - chklen;
        if(unchk == 0){
            $("#total label .chkbox").addClass("checked");
            $("#total label input[type='checkbox']").attr("checked",true);
        }else{
            $("#total label .chkbox").removeClass("checked");
            $("#total label input[type='checkbox']").attr("checked",false);
        }
    });
    
    $(".cancel").click(function(){
       location.href = "http://naver.com";
    });
    
    // 확인버튼을 눌렀을때
        // 필수 동의사항을 모두 체크했는지 확인해서
        // 모두 체크했으면 통과
        // 하나라도 체크 안한게 있으면 #reqwarn보여주고
        // 막아야함.
    
    // #submit 버튼을 눌렀을때 아래와같은일이 벌어질것이다.
        // (.req의 수) - (req안에 들어있는 .checked의 수)
        // = (체크 안한 동의사항의 수)
        // 이 값이 0이라면 (다 체크했다면)
            // #form1을 전송.
        // 그렇지 않다면 (하나라도 체크 안한게 있다면)
            // #reqwarn을 보여준다.
    
    $("#submit1").click(function(){
        var req = $(".req").length;
        var chkreq = $(".req .checked").length;
        var unchk = req - chkreq;
        if(unchk == 0) {
            $("#form1").submit();
        }else{
            $("#reqwarn").show();
        }
    });
    
    var idveri, pwveri, pwchkveri,
        nameveri, birthveri, genderveri,
        phoneveri = false;
    var mailveri = true;
    
    // .inputbox를 클릭하면
        // 그것의 후손중에 input에게 focus를 주자.
    $(".inputbox").click(function(){
       $(this).find("input").trigger("focus");
    });
    
    // input이나 select에 focus가 들어오면
        // 그것의 부모 .inputbox에게 "inputboxact"라는 클래스를 준다.
    $("input, select").focusin(function(){
        $(this).parent(".inputbox").addClass("inputboxact")
    });
    // input이나 select에서 focus가 나가면
        // 그것의 부모 .inputbox에게서 "inputboxact"라는 클래스를
    $("input, select").focusout(function(){
        $(this).parent(".inputbox").removeClass("inputboxact")
    });
    
    // "#userid input"의 후손중에 input에서 포커스가 나갈때(블러되었을때)
        // 그것의 값의 글자수가 0이라면
            // #userid .warn에 내용을 쓰자. "<span class='text-red'>필수 정보입니다.</span>"
    $("#userid input").focusout(function(){
        var len = $(this).val().length;
        idveri = false;
       if( len == 0 ){
           $("#userid .warn").html("<span class='text-red'>필수 정보입니다.</span>");
       }else if( len<5 || len>20){
           $("#userid .warn").html("<span class='text-red'>5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>");
       }else{
           $("#userid .warn").html("<span class='text-green'>멋진 아이디네요!</span>");
           idveri = true;
       }
    });
    
    $("#userpw input").focusout(function(){
        var len = $(this).val().length;
        pwveri = false;
       if( len == 0 ){
           $("#userpw .warn").html("<span class='text-red'>필수 정보입니다.</span>");
           $("#userpw .inputbox span").empty();
           $("#userpw .inputbox img").attr("src","images/m_icon_pw_step_01.png");
       }else if( len<8 || len>16){
           $("#userpw .warn").html("<span class='text-red'>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>");
           $("#userpw .inputbox span").html("<span class='text-red'>사용불가</span>");
           $("#userpw .inputbox img").attr("src","images/m_icon_pw_step_10.png");
       }else{
           $("#userpw .warn").empty();
           $("#userpw .inputbox span").html("<span class='text-green'>안전</span>");
           $("#userpw .inputbox img").attr("src","images/m_icon_pw_step_04.png");
           pwveri = true;
       }
    });
    
    // #userpw_chk input 에서 focus가 나갈때
        // 그것의 값의 글자수가 0인가?
            // 
            // #userpw_chk .inputbox img의 속성중에 src의 값을
                // images/m_icon_pw_step_02.png 으로 바꾼다.
        // 그것의 값과 #userpw input의 값이 같은가?
            // 같다면
                //  #userpw_chk .warn은 비우고
                // #userpw_chk .inputbox img의 속성중에 src의 값을
                    // images/m_icon_pw_step_07.png 으로 바꾼다.
            // 그렇지 않다면
                // #userpw_chk .warn에 빨간글자(비밀번호가 일치하지 않습니다.)
                // #userpw_chk .inputbox img의 속성중에 src의 값을
                    // images/m_icon_pw_step_02.png 으로 바꾼다.

//    $("#userpw_chk input").focusout(function(){
//        var len = $(this).val().length;
//       if( len == 0 ){
//           $("#userpw_chk .warn").html("<span class='text-red'>필수 정보입니다.</span>");
//           $("#userpw_chk .inputbox span").empty();
//           $("#userpw_chk .inputbox img").attr("src","images/m_icon_pw_step_02.png");
//       }
//       if($(this).val() == $("#userpw input").val()){
//           $("#userpw_chk .warn").empty();
//           $("#userpw_chk .inputbox img").attr("src","images/m_icon_pw_step_07.png");
//       }else{
//           $("#userpw_chk .warn").html("<span class='text-red'>비밀번호가 일치하지 않습니다.</span>");
//           $("#userpw_chk .inputbox img").attr("src","images/m_icon_pw_step_02.png");
//       }
//    });
    
    $("#userpw_chk input").focusout(function(){
        var userpwchk = $(this).val();
        pwchkveri = false;
       if( userpwchk.length == 0 ){
           $("#userpw_chk .warn").html("<span class='text-red'>필수 정보입니다.</span>");
           $("#userpw_chk .inputbox img").attr("src","images/m_icon_pw_step_02.png");
       }else if(userpwchk == $("#userpw input").val()){
           $("#userpw_chk .warn").empty();
           $("#userpw_chk .inputbox img").attr("src","images/m_icon_pw_step_07.png");
           pwchkveri = true;
       }else{
           $("#userpw_chk .warn").html("<span class='text-red'>비밀번호가 일치하지 않습니다.</span>");
           $("#userpw_chk .inputbox img").attr("src","images/m_icon_pw_step_02.png");
       }
    });
    
    // #username input 의 값이 글자수가 0이면
        // #username .warn에 빨간글씨로 "필수 정보입니다."라고 쓴다.
    // #username input 의 값이 글자가 아닌 부분을 포함한다면
        //  #username .warn에 빨간글씨로 "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)"라고 쓴다.
    // 그렇지 않다면
        // .username warm을 비운다.

    $("#username input").focusout(function(){
        var username = $("#username input").val();
        var reg = /[^a-zA-zㄱ-ㅎㅏ-ㅣ가-힣0-9]/g;
        nameveri = false;
        if(username.length == 0){
            $("#username .warn").html("<span class='text-red'>필수 정보입니다.</span>");
        }else if( reg.test(username) ){
            $("#username .warn").html("<span class='text-red'>한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)</span>");
        }else{
            $("#username .warn").empty();
            nameveri = true;
        }
    });

    // #year 또는 #month 또는 #date 에서 포커스가 나갈때
        // #year의 값이 네자리 숫자가 아니면
            // 경고 : 태어난 년도 4자리를 정확하게 입력하세요.
        // 그게아니고 만약 #month의 값이 비어있으면
            // 경고 : 태어난 월을 선택하세요.
        // 그게아니고 만약 #date의 값이 비어있거나 두자리 이하의 숫
            // 경고 : 태어난 일(날짜) 2자리를 정확하게 입력하세요.
        // 그게아니고 올해기준으로 나이가 100초과라면 
            // 경고 : 정말이세요?
        // 그게아니고 만약 연*월*일 의 값이 숫자가 아니면
            // 경고 : 생년월일을 다시 확인해주세요.
        // 그게아니면
            //경고를 비운다.
    
    function bwarn(text){
        $("#birth .warn").html("<span class='text-red'>"+text+"</span>");
    }
    $("#year, #month, #date").focusout(function(){
        var year = $("#year").val();
        var month = $("#month").val();
        var date = $("#date").val();
        var now = new Date();
        var nowstamp = now.getTime();
        now = now.getFullYear();
        var birth = new Date(year, month, date);
        birth = birth.getTime();
        birthveri = false;
        
        if(year.length !== 4){
            bwarn("태어난 년도 4자리를 정확하게 입력하세요.");
        }else if(month.length == 0){
            bwarn("태어난 월을 선택하세요.");
        }else if(date.length == 0){
            bwarn("태어난 일(날짜) 2자리를 정확하게 입력하세요.");
        }else if( isNaN(year*month*date) ){
            bwarn("생년월일을 다시 확인해주세요.");
        }else if( now - year > 100 ){
            bwarn("정말이세요?");
        }else if( nowstamp < birth ){
            bwarn("미래에서 오셨군요. ^^");
        }else{
            bwarn("");
            birthveri = true;
        }
    });
    
    
    // #gender .inputbox를 클릭했을때
        // #gender .inputbox에서 .radiochk을 뻇어주고
        // #gender .inputbox안에 들어있는 radio버튼에서
        // checked속성을 지운다.
        // 방금클릭한그것에게 .radiochk 클래스를 주고.
        // 방금클릭한그것 안에 들어있는 radio버튼에게
        // checked 속성을 준다.
    $("#gender .inputbox").click(function(){
        $("#gender .inputbox").removeClass("radiochk");
        $("#gender .inputbox input").removeAttr("checked")
        $(this).addClass("radiochk");
        $(this).children("input").attr("checked","checked");
        genderveri = true;
    });
    
    // #usermail input에서 focus가 나갈 때
        // 그것에 쓴 값을 mail이라고 하자
        // 이메일 형식 : var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        // mail의 글자수가 0이라면
            // #usermail .warn에다가 ""라고 쓰자.
        // 그게아니고 mail이라는 문자열이 이메일형식을 따르지 않는다면
            // #usermail .warn에다가 "이메일 주소를 다시 확인해주세요."라고 쓰자.
        // 그게아니라면
            // #usermail .warn에다가 ""라고 쓰자.
    
    $("#usermail input").focusout(function(){
        var mail = $(this).val();
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        mailveri = true;
        if(mail.length == 0){
            $("#usermail .warn").empty();
        }else if( !regExp.test(mail) ){
            $("#usermail .warn").html("<span class='text-red'>이메일 주소를 다시 확인해주세요.</span>")
            mailveri = false;
        }else{
            $("#usermail .warn").empty();
        }
    });
    
    
    // 1. 전화번호쓰는칸을 비워둬서는 안된다.
    // #phonenum input에서 focus가 나갔을때
        // 그것의 값의 글자수가 0이라면
            // #phone .warn에 "필수 정보입니다."
    
    $("#phonenum input").focusout(function(){
       if( $(this).val().length == 0 ){
           $("#phone .warn").html("<span class='text-red'>필수 정보입니다.</span>")
       }else{
           $("#phone .warn").empty();
       }
    });
    
    // 2. 전화번호를 제대로 입력해야 인증번호를 발급해준다.
        // 3. 인증번호를 발급받은 뒤에야 인증번호입력칸을 활성화시킨다.
    // 4. 전화번호를 제대로 입력하지 않으면 인증번호입력칸을 비활성화
    
    // #veribtn을 클릭했을때
        // #phonenum input의 값의 글자수가 10-11자리가 아니거나
        // 숫자로 변환이 안되거나
        // 위와같은경우가 전화번호형식이 아닌경우다.

    $("#veribtn").click(function(){
        var v = $("#phonenum input").val();
        // 010-1234-1234 로 적었을 경우 - 를 빼주는 작업
        v = v.replace(/\-/g,"");
        $("#phonenum input").val(v);
        
        var veri1;
        if(v.length < 10 || v.length > 11){
            veri1 = false;
        }else{
            veri1 = true;
        }
        
        var veri2;
        if( !isNaN(v) ){
           veri2 = true;
        }else{
           veri2 = false;
        }
        
        if(veri1 && veri2){
        // 그것의 값이 전화번호형식에 맞으면
            // 인증번호를 보내고 .warn에 "인증번호가 전송되었습니다"
            // #phone .warn에 ""
            // 인증번호 입력칸을 활성화
            // .disinput으로부터 disinput이라는 클래스를 뺏고
            // #veritext로부터 disabled라는 속성을 뺏는다.
            $("#phone .warn").html("<span class='text-green'>인증번호가 전송되었습니다.(유효시간 30분)</span>");
            $(".disinput").removeClass("disinput");
            $("#veritext").removeAttr("disabled");
        }else{
        // 그것의 값이 전화번호형식에 맞지 않으면
            // #phone .warn에 "형식에 맞지 않는 번호입니다."
            // 인증번호 입력칸을 비활성화
            // #veritext에게 disabled라는 속성을 준다.
            // #veritext의 부모(.inputbox)에게 disinput이라는 클래스를 준다.
            $("#phone .warn").html("<span class='text-red'>형식에 맞지 않는 번호입니다.</span>");
            $("#veritext").val("");
            $(".disinput").attr("disabled","disabled");
            $("#veritext").parent(".inputbox").addClass("disinput");
            
        }
    });
    
    
    // #veritext에서 focus가 나갈때
        // 그것에 씌여진 값이 "1234"와 같다면
            // 그것의 동생 "div"를 비운다.
            // #phone .warn 에 "인증되었습니다."
        // 그렇지 않다면
            // 그것의 동생 "div"에 다음과같은내용을 채운다.
                // "<span class='text-red'>불일치</span><span id='ex'></span>"
            // #phone .warn"인증번호를 다시 확인해주세요."
   $("#veritext").focusout(function(){
       phoneveri = false;
      if( $(this).val() == "1234" ){
          $(this).next("div").empty();
          $("#phone .warn").html("<span class='text-green'>인증되었습니다.</span>");
          phoneveri = true;
          $(this).parent(".inputbox").removeClass("border-red");
      }else{
          $(this).next("div").html("<span class='text-red'>불일치</span><span id='ex'></span>")
          $("#phone .warn").html("<span class='text-red'>인증번호를 다시 확인해주세요.</span>");
          $(this).parent(".inputbox").addClass("border-red");
      }
   });
    
    
        // #joinbtn을 눌렀을때
        // 8가지 인증요소를 모두 통과했는가?
        // 통과했다면
            // joinform을 submit
        // 그렇지 않다면 (하나라도 통과하지 못했다면)
            // 현 페이지에 존재하는 모든 input, select들을
            // focusout하도록
            // .warn .text-red 중에서 첫번째의 부모
            // 의 자손중에 input에게 focus를 준다.
    $("#joinbtn").click(function(){
        if(idveri && pwveri && pwchkveri && nameveri && birthveri && genderveri && mailveri && phoneveri){
            $("#joinform").submit();
        }else{
            $("input, select").trigger("focusout");
            $(".warn .text-red").first().parent().parent().find("input").trigger("focus");
        }
    });
    
    
    
    
    
    
    
    
});