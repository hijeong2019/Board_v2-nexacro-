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
            obj._setContents("<ColumnInfo><Column id=\"userId\" type=\"STRING\" size=\"10\"/><Column id=\"userPw\" type=\"STRING\" size=\"10\"/><Column id=\"userName\" type=\"STRING\" size=\"10\"/><Column id=\"userEmail\" type=\"STRING\" size=\"20\"/><Column id=\"userGender\" type=\"STRING\" size=\"10\"/><Column id=\"userAddress\" type=\"STRING\" size=\"20\"/></ColumnInfo><Rows><Row><Col id=\"userId\">TW2103215A</Col><Col id=\"userPw\">twsc7980</Col><Col id=\"userName\">박정연</Col><Col id=\"userEmail\">tw@naver.com</Col><Col id=\"userGender\">Female</Col><Col id=\"userAddress\">korea</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsIdsearch", this);
            obj._setContents("<ColumnInfo><Column id=\"userId\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsIdok", this);
            obj._setContents("");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsCboTest", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"value\">11111</Col><Col id=\"code\">1</Col></Row><Row><Col id=\"value\">22222</Col><Col id=\"code\">2</Col></Row><Row><Col id=\"value\">33333</Col><Col id=\"code\">3</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsTestGrid", this);
            obj.set_updatecontrol("true");
            obj._setContents("<ColumnInfo><Column id=\"userId\" type=\"STRING\" size=\"256\"/><Column id=\"userPw\" type=\"STRING\" size=\"256\"/><Column id=\"userName\" type=\"STRING\" size=\"256\"/><Column id=\"userEmail\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"userId\">1</Col><Col id=\"userPw\">11</Col><Col id=\"userName\">asdf</Col><Col id=\"userEmail\">4</Col></Row><Row><Col id=\"userId\">2</Col><Col id=\"userEmail\">asdfasdf</Col><Col id=\"userName\">6666</Col><Col id=\"userPw\">sdfsdf</Col></Row><Row><Col id=\"userId\">3</Col><Col id=\"userEmail\">444</Col><Col id=\"userName\">7777</Col><Col id=\"userPw\">asdfasdfasdfrr</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsRecServer", this);
            obj._setContents("<ColumnInfo><Column id=\"A2\" type=\"STRING\" size=\"256\"/><Column id=\"A4\" type=\"STRING\" size=\"256\"/><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btn00","71","37","120","23",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("btn00");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo00","76","81","150","23",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_innerdataset("dsCboTest");
            obj.set_codecolumn("value");
            obj.set_datacolumn("value");
            obj.set_text("cbo00");
            this.addChild(obj.name, obj);

            obj = new Edit("edt00","81","134","150","23",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_value("testestset");
            obj.set_readonly("false");
            obj.set_inputmode("upper");
            obj.set_password("false");
            obj.set_text("testestset");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("msk00","85","187","90","23",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_format("9,999");
            this.addChild(obj.name, obj);

            obj = new TextArea("txt00","91","238","179","62",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Static("sta00","59","330","120","23",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("sta00");
            this.addChild(obj.name, obj);

            obj = new Grid("grd00","290","167","500","360",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_binddataset("dsTestGrid");
            obj.set_autoenter("select");
            obj.set_cellsizingtype("both");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"76\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"150\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"Row Type\" edittype=\"checkbox\"/><Cell col=\"1\" text=\"아이디\"/><Cell col=\"2\" text=\"비밀번호\"/><Cell col=\"3\" text=\"userName\"/><Cell col=\"4\" text=\"userEmail\"/></Band><Band id=\"body\"><Cell text=\"expr:dataset.getRowType(currow)\" edittype=\"expr:comp.parent.fnSet()\"/><Cell col=\"1\" text=\"bind:userId\" displaytype=\"text\" edittype=\"text\"/><Cell col=\"2\" text=\"bind:userPw\" displaytype=\"normal\"/><Cell col=\"3\" text=\"bind:userName\" expandshow=\"hide\"/><Cell col=\"4\" text=\"bind:userEmail\" edittype=\"mask\" maskedittype=\"string\" maskeditformat=\"****\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Tab("tab00","41","419","279","93",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_tabindex("0");
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.tab00);
            obj.set_text("Tabpage1");
            this.tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.tab00);
            obj.set_text("Tabpage2");
            this.tab00.addChild(obj.name, obj);

            obj = new Button("btn01","326","116","120","23",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("추가");
            this.addChild(obj.name, obj);

            obj = new Button("btn02","478","112","120","23",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("삭제");
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
        this.registerScript("test.xfdl", function() {

        this.cbo00_onitemchanged = function(obj,e)
        {
        	trace(this.cbo00.value);
        };

        this.chk00_onchanged = function(obj,e)
        {
        	trace(this.chk00.value);
        };

        this.fnSet = function()
        {
        	this.alert("123")
        };
        this.fnReplyInsertin = function()
        {
        	var strSvcId    = "insertReplyInfo";
        	var strSvcUrl   = "/board/mainboard/boardList.do";
        	var inData      = "dsTestGrid=dsTestGrid:U";
        	var outData     = "dsRecServer=dsRecServer";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	this.gfnTransaction(    strSvcId , 		// transaction을 구분하기 위한 svc id값;
        							strSvcUrl , 	// trabsaction을 요청할 주소;
        							inData , 		// 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭;
        							outData , 		// 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭;
        							strArg , 		// 입력갑스로 보낼 arguments, strFormData="20120607";
        							callBackFnc , 	// 콜백 함수명;
        							"LIST"			// LIST/REG/MOD/RMV/PROC;
        						);
        };

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
        			trace(this.dsRecServer.saveXML());

        		break;
        	}
        };


        this.btn00_onclick = function(obj,e)
        {
        	this.fnReplyInsertin();
        };

        this.btn01_onclick = function(obj,e)
        {
        	this.dsTestGrid.addRow();
        };

        this.btn02_onclick = function(obj,e)
        {
        	var objApp = nexacro.getApplication() ;
        	var bOK;
        	bOK = objApp.confirm( "삭제하겠습니?" , "TitleTest", "error" );
        	if(bOK)
        	{
        		this.alert("삭제됨");
        		this.dsTestGrid.deleteRow(this.dsTestGrid.rowposition);
        	}



        	//this.dsTestGrid.setRowType(this.dsTestGrid.rowposition, "D");
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.btn00.addEventHandler("onclick",this.btn00_onclick,this);
            this.cbo00.addEventHandler("onitemchanged",this.cbo00_onitemchanged,this);
            this.btn01.addEventHandler("onclick",this.btn01_onclick,this);
            this.btn02.addEventHandler("onclick",this.btn02_onclick,this);
        };
        this.loadIncludeScript("test.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
