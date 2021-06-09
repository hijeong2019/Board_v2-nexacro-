(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("BoardReplyRegForm");
            this.set_titletext("Login");
            if (Form == this.constructor)
            {
                this._setFormPosition(640,480);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsRreplyDetail", this);
            obj._setContents("<ColumnInfo><Column id=\"contents\" type=\"string\" size=\"32\"/><Column id=\"grp_id\" type=\"int\" size=\"4\"/><Column id=\"id\" type=\"string\" size=\"32\"/><Column id=\"isOk\" type=\"string\" size=\"32\"/><Column id=\"level_id\" type=\"int\" size=\"4\"/><Column id=\"mod_date\" type=\"datetime\" size=\"17\"/><Column id=\"parent_id\" type=\"int\" size=\"4\"/><Column id=\"reg_date\" type=\"datetime\" size=\"17\"/><Column id=\"rid\" type=\"int\" size=\"4\"/><Column id=\"seq_id\" type=\"int\" size=\"4\"/><Column id=\"writer\" type=\"string\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSearch", this);
            obj._setContents("<ColumnInfo><Column id=\"rid\" type=\"INT\" size=\"4\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("sta00","115","157","50","36",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("작성자");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00","115","213","50","23",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("내용");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_replywriter","183","162","307","26",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_reply","182","213","307","120",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            this.addChild(obj.name, obj);

            obj = new Button("btn_RegReply","438","101","50","30",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("저장");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_color("white");
            obj.set_cursor("pointer");
            obj.set_background("#5b92e4");
            this.addChild(obj.name, obj);

            obj = new Static("sta01","300","50","50","38",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("수정");
            obj.set_font("bold 24px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",640,480,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","edt_replywriter","value","dsRreplyDetail","writer");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","txt_reply","value","dsRreplyDetail","contents");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("BoardReplyUpdateForm.xfdl", function() {
        /************************************************************************************************
         * FORM 변수 선언 영역
         ************************************************************************************************/
        this.fv_objApp 	  		= this.gfnGetApplication();

        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        this.form_onload = function(obj,e)
        {
        	var paramJson = this.getOwnerFrame().paramJson;

        	//부모창에서 넘어 온 검색어가 있을 경우.
        	//edit 에 set 후 검색 함.
        	if( !this.gfnIsNull(paramJson.rid) )
        	{
        		this.dsSearch.clearData();
        		this.dsSearch.addRow();

        		this.dsSearch.setColumn(0, "rid", paramJson.rid);
        		this.fnBoardDetailSelect();
        	}
        };


        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/
        //댓글 상세보기
        this.fnBoardDetailSelect = function()
        {
        	var strSvcId    = "selectReplyDetailInfo";
        	var strSvcUrl   = "/board/mainboard/replyDetail.do";
        	var inData      = "dsSearch=dsSearch";
        	var outData     = "dsRreplyDetail=dsRreplyDetail";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	this.gfnTransaction(
        							strSvcId , 		// transaction을 구분하기 위한 svc id값;
        							strSvcUrl , 	// trabsaction을 요청할 주소;
        							inData , 		// 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭;
        							outData , 		// 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭;
        							strArg , 		// 입력갑스로 보낼 arguments, strFormData="20120607";
        							callBackFnc , 	// 콜백 함수명;
        							"LIST"			// LIST/REG/MOD/RMV/PROC;
        						);
        };

        //댓글 수정
        this.fnReplyInsertin = function()
        {
        	var strSvcId    = "updateReplyInfo";
        	var strSvcUrl   = "/board/mainboard/updateReply.do";
        	var inData      = "dsRreplyDetail=dsRreplyDetail";
        	var outData     = "";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	this.gfnTransaction(
        							strSvcId , 		// transaction을 구분하기 위한 svc id값;
        							strSvcUrl , 	// trabsaction을 요청할 주소;
        							inData , 		// 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭;
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
        		case "selectReplyDetailInfo" :
        			//trace(this.dsRreplyDetail.saveXML());

        			var objApp = nexacro.getApplication();
        			var loginId = objApp.gdsUserAccount.getColumn(0, "id");
        			var writer = this.dsRreplyDetail.getColumn(0, "writer");

        			if(loginId != writer)
        			{
        				this.edt_replywriter.set_enable(false);
        				this.txt_reply.set_enable(false);
        				this.btn_RegReply.set_enable(false);
        				this.alert("작성자만 수정 가능합니다.");
        			}
        			else if(loginId == writer)
        			{
        				this.edt_replywriter.set_enable(false);
        				this.txt_reply.set_enable(true);
        				this.btn_RegReply.set_enable(true);
        			}
        		break;

        		case "updateReplyInfo" :
        			//trace(this.dsRreplyDetail.saveXML());

        			if(this.dsRreplyDetail.rowcount > 0)
        			{
        				this.alert("수정되었습니다.");
        				this.fnBoardDetailSelect();
        			}
        		break;
        	}
        };

        /************************************************************************************************
        * 사용자 FUNCTION 영역
        ************************************************************************************************/
        this.fnValidation = function()
        {
        	if(this.gfnIsNull(this.txt_reply.value) )
        	{
        		this.alert("내용을 입력해주세요.");
        		return false;
        	}
        	else
        		return true;
        };

         /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        this.btn_boardupdate_onclick = function(obj,e)
        {
        	if(this.fnValidation())
        	{
        		this.fnReplyInsertin();
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.btn_RegReply.addEventHandler("onclick",this.btn_boardupdate_onclick,this);
            this.sta01.addEventHandler("onclick",this.sta01_onclick,this);
        };
        this.loadIncludeScript("BoardReplyUpdateForm.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
