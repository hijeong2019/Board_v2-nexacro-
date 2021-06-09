(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("MainFrame");
            this.set_titletext("메인 Frame");
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
            obj = new Div("divMain","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("div00");
            obj.set_url("BOARD::LoginForm.xfdl");
            this.addChild(obj.name, obj);

            obj = new Static("sta00","0","0","120","23",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("메인Frame");
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
            this._addPreloadList("fdl","BOARD::LoginForm.xfdl");
        };
        
        // User Script
        this.registerScript("MainFrame.xfdl", function() {
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
        this.fv_objApp 	  		= this.gfnGetApplication();

        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        this.form_onload = function(obj,e)
        {
        	//this.fnFormInit();
        };

        this.fnSetUrl = function(url){
        	this.divMain.set_url(url);
        }


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
        };
        this.loadIncludeScript("MainFrame.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
