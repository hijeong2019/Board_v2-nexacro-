(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("LoginForm");
            this.set_titletext("로그인 화면");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsSearch", this);
            obj._setContents("<ColumnInfo><Column id=\"searchId\" type=\"STRING\" size=\"256\"/><Column id=\"searchPw\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsLogin", this);
            obj._setContents("");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("div01","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("div01");
            this.addChild(obj.name, obj);

            obj = new Div("div02","0","0","30%",null,null,"0",null,null,null,null,this.div01.form);
            obj.set_taborder("2");
            obj.set_formscrollbartype("none none");
            obj.set_formscrolltype("none");
            this.div01.addChild(obj.name, obj);

            obj = new Div("div00","div02:0","0","39.75%",null,null,"0",null,null,null,null,this.div01.form);
            obj.set_taborder("1");
            obj.set_text("");
            obj.set_formscrollbartype("none none");
            obj.set_formscrolltype("none");
            this.div01.addChild(obj.name, obj);

            obj = new Static("sta00_01","14.15%","28.50%","210","54",null,null,null,null,null,null,this.div01.form.div00.form);
            obj.set_taborder("3");
            obj.set_text("BOARD");
            obj.set_textAlign("center");
            obj.set_font("bold 36px/19px \"Malgun Gothic\"");
            obj.set_color("#5b92e4");
            this.div01.form.div00.addChild(obj.name, obj);

            obj = new Edit("edt_Id","11.95%","sta00_01:13","240","34",null,null,null,null,null,null,this.div01.form.div00.form);
            obj.set_taborder("0");
            obj.set_displaynulltext("아이디");
            this.div01.form.div00.addChild(obj.name, obj);

            obj = new Edit("edt_Pwd","11.95%","edt_Id:9","240","34",null,null,null,null,null,null,this.div01.form.div00.form);
            obj.set_taborder("1");
            obj.set_password("true");
            obj.set_displaynulltext("비밀번호");
            this.div01.form.div00.addChild(obj.name, obj);

            obj = new Button("btn_Login","11.95%","edt_Pwd:19","240","34",null,null,null,null,null,null,this.div01.form.div00.form);
            obj.set_taborder("2");
            obj.set_text("로그인");
            obj.set_font("14px/normal \"Malgun Gothic\"");
            obj.set_background("#5B92E4");
            obj.set_color("#ffffff");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_cursor("pointer");
            this.div01.form.div00.addChild(obj.name, obj);

            obj = new Static("sta00","11.95%","btn_Login:20","147","25",null,null,null,null,null,null,this.div01.form.div00.form);
            obj.set_taborder("5");
            obj.set_text("아직 계정이 없으신가요?");
            obj.set_font("10pt/normal \"Arial\"");
            obj.set_color("#7c7c7c");
            this.div01.form.div00.addChild(obj.name, obj);

            obj = new Static("sta_Register","sta00:13.61%","btn_Login:20","62","23",null,null,null,null,null,null,this.div01.form.div00.form);
            obj.set_taborder("4");
            obj.set_text("회원가입>");
            obj.set_font("10pt/normal \"Arial\"");
            obj.set_color("#7c7c7c");
            obj.set_textDecoration("underline");
            obj.set_cursor("pointer");
            this.div01.form.div00.addChild(obj.name, obj);

            obj = new Div("div02_00","div00:0","0","30%",null,null,"0",null,null,null,null,this.div01.form);
            obj.set_taborder("0");
            obj.set_formscrollbartype("none none");
            obj.set_formscrolltype("none");
            this.div01.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("LoginForm.xfdl", function() {
        /**
        *  @MenuPath    BOARD > LoginForm
        *  @FileName 	LoginForm.xfdl
        *  @Creator     박정연
        *  @CreateDate 	2020.04.09
        *  @Desction    게시판 화면 구현

        ************** 소스 수정 이력 ***********************************************
        *  date          		Modifier                Description
        *******************************************************************************
        *  2020.04.09     	consulting 	        최초 생성
        *******************************************************************************
        */

        /************************************************************************************************
         * FORM 변수 선언 영역
         ************************************************************************************************/

        // 사용자 userEmpNo
        //this.fv_objApp 	  		= this.gfnGetApplication();

        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        this.form_onload = function(obj,e)
        {
        	//this.fnFormInit();
        };

        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/
        this.fnLogin = function()
        {
        	var strSvcId    = "selectLoginInfo";
        	var strSvcUrl   = "/board/member/login.do";
        	var inData      = "dsSearch=dsSearch";
        	var outData     = "dsLogin=dsLogin";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	this.gfnTransaction(
        							strSvcId , 		// transaction을 구분하기 위한 svc id값;
        							strSvcUrl , 	// trabsaction을 요청할 주소;
        							inData , 		// 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭;
        							outData , 		// 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭;
        							strArg , 		// 입력값으로 보낼 arguments, strFormData="20120607";
        							callBackFnc , 	// 콜백 함수명;
        							"LIST"			// LIST/REG/MOD/RMV/PROC;
        						);
        };

        /************************************************************************************************
         * CALLBACK 콜백 처리부분
         ************************************************************************************************/
        this.fnCallback = function(svcID, errorCode, errorMsg)
        {
        	if( errorCode != 0 )
        	{
        		trace(errorCode + ">>>" + errorMsg );

        		//서버에서 다음과 같은 에러메시지를 받았습니다.\n{0}
        		this.gfnAlert("msg.server.error.msg",[errorMsg]);
        		return;
        	}

        	switch(svcID)
        	{
        		case "selectLoginInfo":
        			if(this.dsLogin.rowcount > 0)
        			{
        				this.alert("로그인에 성공했습니다.");

        				//VFrameSet 사이즈 조정
        				//this.fv_objApp.mainframe.VFrameSet.set_separatesize("0,0,*");      //메인화면 보여짐(1번화면, 2번화면, 3번화면)

        				//전역변수에 등록한 gdsUserAccount에서 id, pwd 가져옴
        				var objApp = nexacro.getApplication();
        				objApp.gdsUserAccount.setColumn(0, "id", this.dsLogin.getColumn(0, "userid"));
        				objApp.gdsUserAccount.setColumn(0, "pwd", this.dsLogin.getColumn(0, "userpw"));

        				this.parent.parent.parent.form.fnSetUrl("BOARD::MainForm.xfdl"); //로그인시 해당 URL로
        			}
        			else
        				this.alert("로그인 정보를 확인하세요.");
        		break;
        	}
        };

         /************************************************************************************************
         * 사용자 FUNCTION 영역
         ************************************************************************************************/
        this.fnFormInit = function()
        {
        // 	this.gfnFormOnLoad(this); //초기화[필수]
        // 	this.fnSearch();
        };

        /**
         * @description 검색 및 조회
        */
        this.fnSearch = function()
        {
        	//검색조건 초기화.
        	if(this.fnSearchParamSet())
        	{
        		//조회
        		this.fnLogin();
        	}
        };

        /**
         * @description 검색 dataset 초기화
        */
        this.fnSearchParamSet = function()
        {
        	//검색 DS 초기화
        	this.dsSearch.clearData();
        	//검색 DS row 추가
        	var nRow = this.dsSearch.addRow();

        	//검색
        	if(!this.gfnIsNull(this.div01.form.div00.form.edt_Id.value))
        	{
        		this.dsSearch.setColumn(nRow,"searchId", this.div01.form.div00.form.edt_Id.value);
        		this.dsSearch.setColumn(nRow,"searchPw", this.div01.form.div00.form.edt_Pwd.value);
        	}else{
        		this.dsSearch.setColumn(nRow,"searchId", "");
        		this.dsSearch.setColumn(nRow,"searchPw", "");
        	}
        	return true;
        };

        /**
         * @description 공백 예외처리
        */
        this.fnValidation = function()
        {
        	if(this.gfnIsNull(this.div01.form.div00.form.edt_Id.value) || this.gfnIsNull(this.div01.form.div00.form.edt_Pwd.value) )
        	{
        		this.alert("아이디, 비밀번호를 모두 입력해주세요.");
        		return false;
        	}
        	else
        		return true;
        };

         /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        this.comm_Click = function(obj,e)
        {
        	switch(obj.name)
        	{
        		case "btn_Login" :
        			if(this.fnValidation())
        			{
        				this.fnSearch();
        			}
        		break;

        		case "sta_Register" :
        			//VFrameSet 사이즈 조정
        			//this.fv_objApp.mainframe.VFrameSet.set_separatesize("0,*,0");
        			this.parent.parent.parent.form.fnSetUrl("BOARD::RegisterForm_copy0.xfdl");
        		break;
        	}
        };

        this.edt_Pwd_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.fnSearch();
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.div01.form.div00.form.sta00_01.addEventHandler("onclick",this.sta00_01_onclick,this);
            this.div01.form.div00.form.edt_Pwd.addEventHandler("onkeydown",this.edt_Pwd_onkeydown,this);
            this.div01.form.div00.form.btn_Login.addEventHandler("onclick",this.comm_Click,this);
            this.div01.form.div00.form.sta_Register.addEventHandler("onclick",this.comm_Click,this);
        };
        this.loadIncludeScript("LoginForm.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
