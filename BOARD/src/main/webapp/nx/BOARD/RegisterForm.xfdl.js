(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("registerForm");
            this.set_titletext("Login");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMemberinsert", this);
            obj._setContents("<ColumnInfo><Column id=\"userId\" type=\"STRING\" size=\"10\"/><Column id=\"userPw\" type=\"STRING\" size=\"10\"/><Column id=\"userName\" type=\"STRING\" size=\"10\"/><Column id=\"userEmail\" type=\"STRING\" size=\"20\"/><Column id=\"userGender\" type=\"STRING\" size=\"10\"/><Column id=\"userAddress\" type=\"STRING\" size=\"20\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsIdsearch", this);
            obj._setContents("<ColumnInfo><Column id=\"userId\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsIdok", this);
            obj._setContents("");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("sta00","50","25","210","54",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("회원가입");
            obj.set_textAlign("center");
            obj.set_font("bold 36px/19px \"Malgun Gothic\"");
            obj.set_color("#5b92e4");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00","258","763","68","22",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("아이디");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00_00","258","851","68","22",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("비밀번호");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00_00_00","258","991","68","22",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("이메일");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00_01","258","922","68","22",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("이름");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00_00_00_00","258","1129","68","22",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("주소");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00_01_00","258","1063","68","22",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("성별");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_Id","258","790","165","27",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_displaynulltext("ID 입력");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_Pwd","258","878","255","27",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_displaynulltext("PW 입력");
            obj.set_password("true");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_Name","258","949","255","27",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_displaynulltext("홍길동");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_Email","258","1018","255","27",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_displaynulltext("id@domain.com");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_Address","258","1155","255","27",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_displaynulltext("Korea");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Register","258","1201","255","34",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("확인");
            obj.set_background("#5B92E4");
            obj.set_cursor("pointer");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_color("white");
            obj.set_font("14px/normal \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Back","524","1201","50","34",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("취소");
            obj.set_cursor("pointer");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_color("#5b92e4");
            obj.set_background("white");
            obj.set_border("1px inset #5b92e4");
            obj.set_font("14px/normal \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Idchk","436","791","79","29",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("중복확인");
            obj.set_background("#5B92E4");
            obj.set_cursor("pointer");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_color("white");
            this.addChild(obj.name, obj);

            obj = new Radio("rdo_Gender","258","1090","143","29",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_rowcount("1");
            var rdo_Gender_innerdataset = new nexacro.NormalDataset("rdo_Gender_innerdataset", obj);
            rdo_Gender_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">M</Col><Col id=\"datacolumn\">Male</Col></Row><Row><Col id=\"codecolumn\">W</Col><Col id=\"datacolumn\">Female</Col></Row></Rows>");
            obj.set_innerdataset(rdo_Gender_innerdataset);
            obj.set_text("");
            obj.set_value("");
            obj.set_index("-1");
            this.addChild(obj.name, obj);

            obj = new Static("stc_Impossible","258","818","146","30",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("중복된 아이디 입니다.");
            obj.set_color("red");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("stc_Possible","258","818","146","30",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("사용 가능한 아이디입니다.");
            obj.set_color("blue");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("div","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_border("2px solid black");
            obj.set_formscrollbartype("none");
            this.addChild(obj.name, obj);

            obj = new Div("div00","0","0","27.89%",null,null,"0",null,null,null,null,this.div.form);
            obj.set_taborder("0");
            obj.set_border("2px solid black");
            obj.set_text("");
            obj.set_background("red");
            this.div.addChild(obj.name, obj);

            obj = new Div("div01","221","0","44.85%",null,null,"0",null,null,null,null,this.div.form);
            obj.set_taborder("1");
            obj.set_border("2px solid black");
            obj.set_text("");
            obj.set_background("yellow");
            this.div.addChild(obj.name, obj);

            obj = new Static("sta00","14.16%","4.22%","210","71",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("0");
            obj.set_text("회원가입");
            obj.set_textAlign("center");
            obj.set_font("bold 36px/19px \"Malgun Gothic\"");
            obj.set_color("#5b92e4");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Static("sta00_00","28","95","68","22",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("1");
            obj.set_text("아이디");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Static("sta00_00_00","28","183","68","22",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("2");
            obj.set_text("비밀번호");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Static("sta00_00_00_00","28","323","68","22",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("3");
            obj.set_text("이메일");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Static("sta00_00_01","28","254","68","22",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("4");
            obj.set_text("이름");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Static("sta00_00_00_00_00","28","461","68","22",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("5");
            obj.set_text("주소");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Static("sta00_00_01_00","28","395","68","22",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("6");
            obj.set_text("성별");
            obj.set_font("bold 16px/19px \"Malgun Gothic\"");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Edit("edt_Id","28","122","165","27",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("7");
            obj.set_displaynulltext("ID 입력");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Edit("edt_Pwd","28","210","255","27",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("8");
            obj.set_displaynulltext("PW 입력");
            obj.set_password("true");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Edit("edt_Name","28","281","255","27",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("9");
            obj.set_displaynulltext("홍길동");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Edit("edt_Email","28","350","255","27",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("10");
            obj.set_displaynulltext("id@domain.com");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Edit("edt_Address","28","487","255","27",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("11");
            obj.set_displaynulltext("Korea");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Button("btn_Register","28","533","255","34",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("12");
            obj.set_text("확인");
            obj.set_background("#5B92E4");
            obj.set_cursor("pointer");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_color("white");
            obj.set_font("14px/normal \"Malgun Gothic\"");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Button("btn_Back","294","533","50","34",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("13");
            obj.set_text("취소");
            obj.set_cursor("pointer");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_color("#5b92e4");
            obj.set_background("white");
            obj.set_border("1px inset #5b92e4");
            obj.set_font("14px/normal \"Malgun Gothic\"");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Button("btn_Idchk","206","123","79","29",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("14");
            obj.set_text("중복확인");
            obj.set_background("#5B92E4");
            obj.set_cursor("pointer");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_color("white");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Radio("rdo_Gender","28","422","143","29",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("15");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_rowcount("1");
            var div_form_div01_form_rdo_Gender_innerdataset = new nexacro.NormalDataset("div_form_div01_form_rdo_Gender_innerdataset", obj);
            div_form_div01_form_rdo_Gender_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">M</Col><Col id=\"datacolumn\">Male</Col></Row><Row><Col id=\"codecolumn\">W</Col><Col id=\"datacolumn\">Female</Col></Row></Rows>");
            obj.set_innerdataset(div_form_div01_form_rdo_Gender_innerdataset);
            obj.set_text("");
            obj.set_value("");
            obj.set_index("-1");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Static("stc_Impossible","28","150","146","30",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("16");
            obj.set_text("중복된 아이디 입니다.");
            obj.set_color("red");
            obj.set_visible("false");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Static("stc_Possible","38","160","146","30",null,null,null,null,null,null,this.div.form.div01.form);
            obj.set_taborder("17");
            obj.set_text("사용 가능한 아이디입니다.");
            obj.set_color("blue");
            obj.set_visible("false");
            this.div.form.div01.addChild(obj.name, obj);

            obj = new Div("div02",null,"0","27.89%",null,"-5","0",null,null,null,null,this.div.form);
            obj.set_taborder("2");
            obj.set_border("2px solid black");
            obj.set_text("");
            obj.set_background("green");
            this.div.addChild(obj.name, obj);
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
        this.registerScript("RegisterForm.xfdl", function() {
        /**
        *  @MenuPath    BOARD > RegisterForm
        *  @FileName 	RegisterForm.xfdl
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
        this.fv_objApp 	  		= this.gfnGetApplication();
        this.fv_flag			= 0;

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
        this.fnRegisterin = function()
        {
        	var strSvcId    = "insertMemberInfo";
        	var strSvcUrl   = "/board/member/insertMember.do";
        	var inData      = "dsMemberinsert=dsMemberinsert:A";
        	var outData     = "";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	this.gfnTransaction(
        							strSvcId , 		// transaction을 구분하기 위한 svc id값;
        							strSvcUrl , 	// trabsaction을 요청할 주소;
        							inData , 		// 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭; :A모든 정보 전송
        							outData , 		// 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭;
        							strArg , 		// 입력갑스로 보낼 arguments, strFormData="20120607";
        							callBackFnc , 	// 콜백 함수명;
        							"LIST"			// LIST/REG/MOD/RMV/PROC;
        						);
        };

        //아이디 중복체크
        this.fnIdcheckin = function()
        {
        	var strSvcId    = "idCheckInfo";
        	var strSvcUrl   = "/board/member/idCheck.do";
        	var inData      = "dsIdsearch=dsIdsearch";
        	var outData     = "dsIdok=dsIdok";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	this.gfnTransaction(
        							strSvcId , 		// transaction을 구분하기 위한 svc id값;
        							strSvcUrl , 	// trabsaction을 요청할 주소;
        							inData , 		// 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭; :A모든 정보 전송
        							outData , 		// 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭;
        							strArg , 		// 입력갑스로 보낼 arguments, strFormData="20120607";
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
        		case "insertMemberInfo":
        			//trace(this.dsMemberinsert.saveXML());

        			if(this.dsMemberinsert.rowcount > 0)
        			{
        				//VFrameSet 사이즈 조정
        				//this.fv_objApp.mainframe.VFrameSet.set_separatesize("*,0,0");      //로그인화면 보여줌
        				this.parent.parent.parent.form.fnSetUrl("BOARD::LoginForm.xfdl");
        				this.alert("회원가입되었습니다.");
        			}
        			else
        				this.alert("회원가입에 실패했습니다.");
        		break;

        		//아이디 중복체크
        		case "idCheckInfo" :

        			if(this.dsIdok.getColumn(0, "cnt") > 0)
        			{
        			//사용 불가능 ID
        				this.fv_flag = 0;
        				this.stc_Impossible.set_visible(true);
        				this.stc_Possible.set_visible(false);
        			}
        			//사용 가능 ID
        			else
        			{
        				this.fv_flag = 1;
        				this.stc_Possible.set_visible(true);
        				this.stc_Impossible.set_visible(false);
        			}
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
         * @description 회원가입
        */
        this.fnRegister = function()
        {
        	//검색조건 초기화.
        	if(this.fnSearchParamSet())
        	{
        		//회원가입 TRANSACTION
        		this.fnRegisterin();
        	}
        };

        /**
         * @description 아이디 중복체크
        */
        this.fnIdcheck = function()
        {
        	if(this.fnSearchId())
        	{
        		//아이디 중복체크 TRANSACTION
        		this.fnIdcheckin();
        	}
        }

        /**
         * @description dsMemberinsert dataset 초기화
        */
        this.fnSearchParamSet = function()
        {
        	//DS 초기화
        	this.dsMemberinsert.clearData();
        	//DS row 추가
        	var nRow = this.dsMemberinsert.addRow();

        	var fromDate = this.gfnGetDate("dash");
        	var toDate = this.gfnGetDate("dash");

        	//회원가입
        	if(!this.gfnIsNull(this.edt_Id.value))
        	{
        		this.dsMemberinsert.setColumn(nRow,"userId", this.edt_Id.value);
        		this.dsMemberinsert.setColumn(nRow,"userPw", this.edt_Pwd.value);
        		this.dsMemberinsert.setColumn(nRow,"userName", this.edt_Name.value);
        		this.dsMemberinsert.setColumn(nRow,"userEmail", this.edt_Email.value);
        		this.dsMemberinsert.setColumn(nRow,"userGender", this.rdo_Gender.value);
        		this.dsMemberinsert.setColumn(nRow,"userAddress", this.edt_Address.value);
        	}
        	else
        	{
        		this.dsMemberinsert.setColumn(nRow,"userId", "");
        		this.dsMemberinsert.setColumn(nRow,"userPw", "");
        		this.dsMemberinsert.setColumn(nRow,"userName", "");
        		this.dsMemberinsert.setColumn(nRow,"userEmail", "");
        		this.dsMemberinsert.setColumn(nRow,"userGender", "");
        		this.dsMemberinsert.setColumn(nRow,"userAddress", "");
        	}
        	return true;

        };

        /**
         * @description dsIdsearch dataset 초기화
        */
        this.fnSearchId = function()
        {
        	//DS 초기화
        	this.dsIdsearch.clearData();
        	//DS row 추가
        	var nRow = this.dsIdsearch.addRow();

        	if(!this.gfnIsNull(this.edt_Id.value))
        		this.dsIdsearch.setColumn(nRow,"userId", this.edt_Id.value);
        	else
        		this.dsIdsearch.setColumn(nRow,"userId", "");
        	return true;
        }

        /**
         * @description 공백 예외처리
        */
        this.fnValidation = function()
        {
        	if(this.gfnIsNull(this.edt_Id.value) || this.gfnIsNull(this.edt_Pwd.value) || this.gfnIsNull(this.edt_Name.value) || this.gfnIsNull(this.edt_Email.value) || this.gfnIsNull(this.rdo_Gender.value) || this.gfnIsNull(this.edt_Address.value))
        	{
        		this.alert("입력란을 모두 입력해주세요.");
        		return false;
        	}
        	else
        		return true;
        };

        /**
         * @description 아이디 중복확인 전 공백확인
        */
        this.fnIdValidation = function()
        {
        	if(this.gfnIsNull(this.edt_Id.value))
        	{
        		this.alert("아이디를 입력해주세요.");
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
        		case "btn_Register" :
        			if(this.fnValidation())
        			{
        				if(this.fv_flag == 0)
        				{
        					this.alert("아이디 중복확인이 필요합니다.");
        					return;
        				}
        				else
        					this.fnRegister();
        			}
        		break;

        		case "btn_Back" :
        			//VFrameSet 사이즈 조정
        			//this.fv_objApp.mainframe.VFrameSet.set_separatesize("*,0,0");
        			this.parent.parent.parent.form.fnSetUrl("BOARD::LoginForm.xfdl");
        		break;

        		case "btn_Idchk" :
        			if(this.fnIdValidation())
        			{
        				this.fnIdcheck();
        			}
        		break;
        	}
        };

        this.edt_Address_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.btn_Register.click();
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.edt_Address.addEventHandler("onkeydown",this.edt_Address_onkeydown,this);
            this.btn_Register.addEventHandler("onclick",this.comm_Click,this);
            this.btn_Back.addEventHandler("onclick",this.comm_Click,this);
            this.btn_Idchk.addEventHandler("onclick",this.comm_Click,this);
            this.div.form.div01.form.edt_Address.addEventHandler("onkeydown",this.edt_Address_onkeydown,this);
            this.div.form.div01.form.btn_Register.addEventHandler("onclick",this.comm_Click,this);
            this.div.form.div01.form.btn_Back.addEventHandler("onclick",this.comm_Click,this);
            this.div.form.div01.form.btn_Idchk.addEventHandler("onclick",this.comm_Click,this);
        };
        this.loadIncludeScript("RegisterForm.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
