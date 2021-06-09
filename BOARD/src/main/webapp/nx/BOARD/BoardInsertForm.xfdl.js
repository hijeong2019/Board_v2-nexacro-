(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("boardlistForm");
            this.set_titletext("Login");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsBoard", this);
            obj._setContents("<ColumnInfo><Column id=\"isOk\" type=\"string\" size=\"256\"/><Column id=\"description\" type=\"string\" size=\"32\"/><Column id=\"hit\" type=\"int\" size=\"4\"/><Column id=\"id\" type=\"string\" size=\"32\"/><Column id=\"keyword\" type=\"string\" size=\"32\"/><Column id=\"name\" type=\"string\" size=\"32\"/><Column id=\"regUser\" type=\"string\" size=\"32\"/><Column id=\"replyCnt\" type=\"string\" size=\"32\"/><Column id=\"searchType\" type=\"string\" size=\"32\"/><Column id=\"useYn\" type=\"string\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSearch", this);
            obj._setContents("<ColumnInfo><Column id=\"boardId\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsUseYn", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">Y</Col><Col id=\"value\">Y</Col></Row><Row><Col id=\"code\">N</Col><Col id=\"value\">N</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("sta00_01","33.13%","51","310","60",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("게시글 등록");
            obj.set_textAlign("center");
            obj.set_font("bold 40px/19px \"Malgun Gothic\"");
            obj.set_color("#5b92e4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Insert",null,"509","50","24","80",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("등록");
            obj.set_color("white");
            obj.set_background("#5b92e4");
            obj.set_cursor("pointer");
            obj.set_boxShadow("1px 1px 2px 0px #7c7c7c");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00_00","87","225","34","23",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("설명");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_02","87","188","34","23",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("제목");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_02_00","55","436","66","23",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("사용여부");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_00_00_00","71","474","50","23",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("등록자");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_name","134","185",null,"28","80",null,null,null,null,null,this);
            obj.set_taborder("6");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt_description","134","224",null,"198","80",null,null,null,null,null,this);
            obj.set_taborder("7");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_register","134","471",null,"28","80",null,null,null,null,null,this);
            obj.set_taborder("8");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_useyn","134","432",null,"30","80",null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var cbo_useyn_innerdataset = new nexacro.NormalDataset("cbo_useyn_innerdataset", obj);
            cbo_useyn_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">Y</Col><Col id=\"datacolumn\">Y</Col></Row><Row><Col id=\"codecolumn\">N</Col><Col id=\"datacolumn\">N</Col></Row></Rows>");
            obj.set_innerdataset(cbo_useyn_innerdataset);
            obj.set_text("Y");
            obj.set_value("Y");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("sta00_02_01","71","132","50","42",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("게시글\r\n아이디");
            obj.set_font("16px/19px \"Malgun Gothic\"");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_boardid","132","132",null,"42","82",null,null,null,null,null,this);
            obj.set_taborder("11");
            this.addChild(obj.name, obj);
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
        this.registerScript("BoardInsertForm.xfdl", function() {
        /************************************************************************************************
         * FORM 변수 선언 영역
         ************************************************************************************************/
        var objApp = nexacro.getApplication();
        var loginId = objApp.gdsUserAccount.getColumn(0, "id");

        this.edt_register.set_value(loginId);
        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        this.form_onload = function(obj,e)
        {
        	var paramJson = this.getOwnerFrame().paramJson;

        	//부모창에서 넘어 온 검색어가 있을 경우.
        	//edit 에 set 후 검색 함.
        	if( !this.gfnIsNull(paramJson.boardId) ){
        		this.dsSearch.clearData();
        		var nRow = this.dsSearch.addRow();
        		this.dsSearch.setColumn(nRow, "boardId", "SAMPLE-" + paramJson.boardId);
        		//trace(this.dsSearch.saveXML());

        		this.edt_boardid.set_value("SAMPLE-" + paramJson.boardId);
        		//trace("loginId?>>" + loginId);
        	}
        };

        /************************************************************************************************
        * TRANSACTION 서비스 호출 처리
        ************************************************************************************************/

        //게시글 등록
        this.fnBoardInsertin = function()
        {
        	var strSvcId    = "boardInsert";
        	var strSvcUrl   = "/board/mainboard/boardInsert.do";
        	var inData      = "dsSearch=dsSearch dsBoard=dsBoard";
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
        }

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
        		case "boardInsert" :
        			if(this.dsBoard.rowcount > 0)
        			{
        				this.alert("게시글이 등록되었습니다.");
        			}
        			break;
        	}
        };

        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        this.btn_Insert_onclick = function(obj,e)
        {
        	if(this.fnValidation())
        	{
        		this.fnBoardInsert();
        	}
        };

        /************************************************************************************************
        * 사용자 FUNCTION 영역
        ************************************************************************************************/
        /*
        * @description 글등록 공백입력 시 예외처리
        */
        this.fnValidation = function()
        {
        	if(this.gfnIsNull(this.edt_name.value) || this.gfnIsNull(this.txt_description.value) || this.gfnIsNull(this.cbo_useyn.value))
        	{
        		this.alert("입력란을 모두 입력해주세요.");
        		return false;
        	}
        	else
        		return true;
        };


        this.fnBoardInsert = function()
        {
        	if(this.fnInsertParamSet())
        	{
        		//등록
        		this.fnBoardInsertin();
        	}
        }

        this.fnInsertParamSet = function()
        {
        	//DS 초기화
        	this.dsBoard.clearData();
        	//DS row 추가
        	var nRow = this.dsBoard.addRow();

        	if(!this.gfnIsNull(this.edt_name.value))
        	{
        		this.dsBoard.setColumn(nRow,"name", this.edt_name.value);
        		this.dsBoard.setColumn(nRow,"description", this.txt_description.value);
        		this.dsBoard.setColumn(nRow,"useYn", this.cbo_useyn.value);
        		this.dsBoard.setColumn(nRow,"regUser", loginId);
        	}
        	else
        	{
        		this.dsBoard.setColumn(nRow,"name", "");
        		this.dsBoard.setColumn(nRow,"description", "");
        		this.dsBoard.setColumn(nRow,"useYn", "");
        		this.dsBoard.setColumn(nRow,"regUser", "");
        	}
        	return true;
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.btn_Insert.addEventHandler("onclick",this.btn_Insert_onclick,this);
        };
        this.loadIncludeScript("BoardInsertForm.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
