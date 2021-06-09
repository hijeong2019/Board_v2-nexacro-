(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("MainForm");
            this.set_titletext("메인화면");
            if (Form == this.constructor)
            {
                this._setFormPosition(1168,726);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("div_Boardform","0","-4","1170","724",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("div00");
            obj.set_url("BOARD::BoardForm.xfdl");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1168,726,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl","BOARD::BoardForm.xfdl");
        };
        
        // User Script
        this.registerScript("MainForm.xfdl", function() {
        /**
        *  @MenuPath    BOARD > MainForm
        *  @FileName 	MainForm.xfdl
        *  @Creator     박정연
        *  @CreateDate 	2020.04.09
        *  @Desction    게시판 화면 구현

        ************** 소스 수정 이력 ***********************************************
        *  date          		Modifier                Description
        *******************************************************************************
        *  2020.04.09     	consulting 	        최초 생성
        *******************************************************************************
        */
        /***********************************************************************************************
        * FORM EVENT 영역(onload)
        /***********************************************************************************************/
        // this.MainForm_onsize = function(obj:nexacro.Form,e:nexacro.SizeEventInfo) //Form의 사이즈가 변할때 실행
        // {
        // 	this.div00.form.fnFormInit();
        // };


        /**
        * @description Form이 로드됬을 때 실행
        */
        this.form_onload = function(obj,e)
        {
        	this.div_Boardform.form.fnFormInit();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.addEventHandler("onsize",this.MainForm_onsize,this);
        };
        this.loadIncludeScript("MainForm.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
