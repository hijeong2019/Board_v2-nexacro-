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
            obj = new Dataset("dsReplyList", this);
            obj._setContents("<ColumnInfo><Column id=\"contents\" type=\"string\" size=\"32\"/><Column id=\"grp_id\" type=\"int\" size=\"4\"/><Column id=\"id\" type=\"string\" size=\"32\"/><Column id=\"isOk\" type=\"string\" size=\"32\"/><Column id=\"level_id\" type=\"int\" size=\"4\"/><Column id=\"mod_date\" type=\"datetime\" size=\"17\"/><Column id=\"parent_id\" type=\"int\" size=\"4\"/><Column id=\"reg_date\" type=\"datetime\" size=\"17\"/><Column id=\"rid\" type=\"int\" size=\"4\"/><Column id=\"seq_id\" type=\"int\" size=\"4\"/><Column id=\"writer\" type=\"string\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSearch", this);
            obj._setContents("<ColumnInfo><Column id=\"boardId\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("sta00","87","164","96","23",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("댓글 작성자");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00","87","215","96","23",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("댓글 내용");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_reply","190","213","307","120",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_border("1px solid");
            this.addChild(obj.name, obj);

            obj = new Button("btn_RegReply","447","103","50","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("등록");
            obj.set_background("#5b92e4");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            obj.set_color("white");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("sta01","264","50","124","38",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("댓글 달기");
            obj.set_font("bold 24px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta_userId","190","162","307","26",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_border("1px solid");
            obj.set_padding("0px 10px");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",640,480,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item1","txt_reply","value","dsRreplyDetail","contents");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("BoardReplyRegForm.xfdl", function() {
        /************************************************************************************************
         * FORM 변수 선언 영역
         ************************************************************************************************/
        this.fv_objApp 	  		= this.gfnGetApplication();

        /*
        *	@description 작성자를 로그인 아이디로 설정
        */
        var objApp = nexacro.getApplication();
        var loginId = objApp.gdsUserAccount.getColumn(0, "id");
        this.sta_userId.set_text(loginId);
        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        this.form_onload = function(obj,e)
        {
        	var paramJson = this.getOwnerFrame().paramJson;

        	//부모창에서 넘어 온 검색어가 있을 경우.
        	//edit 에 set 후 검색 함.
        	if( !this.gfnIsNull(paramJson.boardId) )
        	{
        		this.dsSearch.clearData();

        		var nRow = this.dsSearch.addRow();
        		this.dsSearch.setColumn(nRow, "boardId", paramJson.boardId);
        	}
        };

        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        this.btn_Replysave_onclick = function(obj,e)
        {
        	if(this.fnValidation())
        	{
        		this.fnReplyInsert();
        	}
        };

        /************************************************************************************************
        * 사용자 FUNCTION 영역
        ************************************************************************************************/
        /*
        *	@description 공백 예외처리
        */
        this.fnValidation = function()
        {
        	if(this.gfnIsNull(this.txt_reply.value))
        	{
        		this.alert("댓글을 입력해주세요.");
        		return false;
        	}
        	else
        		return true;
        };


        this.fnReplyInsert = function()
        {
        	if(this.fnInsertParamSet())
        	{
        		//등록
        		this.fnReplyInsertin();
        	}
        }

        this.fnInsertParamSet = function()
        {
        	//DS 초기화
        	this.dsReplyList.clearData();
        	//DS row 추가
        	var nRow = this.dsReplyList.addRow();

        	if(!this.gfnIsNull(this.txt_reply.value))
        	{
        		this.dsReplyList.setColumn(nRow,"writer", loginId);
        		this.dsReplyList.setColumn(nRow,"contents", this.txt_reply.value);
        	}
        	else
        	{
        		this.dsReplyList.setColumn(nRow,"writer", "");
        		this.dsReplyList.setColumn(nRow,"contents", "");
        	}
        	return true;
        };


        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/
        this.fnReplyInsertin = function()
        {
        	var strSvcId    = "insertReplyInfo";
        	var strSvcUrl   = "/board/mainboard/replyInsert.do";
        	var inData      = "dsSearch=dsSearch dsReplyList=dsReplyList";
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
        		case "insertReplyInfo" :
        			//trace(this.dsReplyList.saveXML());

        			if(this.dsReplyList.rowcount > 0)
        			{
        				this.alert("댓글이 등록되었습니다.");
        			}
        		break;
        	}
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.btn_RegReply.addEventHandler("onclick",this.btn_Replysave_onclick,this);
            this.sta01.addEventHandler("onclick",this.sta01_onclick,this);
        };
        this.loadIncludeScript("BoardReplyRegForm.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
