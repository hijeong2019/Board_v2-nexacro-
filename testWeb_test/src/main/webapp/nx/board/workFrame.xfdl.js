(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("workFrame");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("Div00","10","50",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","506","119","307","301",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("0");
            obj.set_text("Div00");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00","102","18","105","43",null,null,null,null,null,null,this.Div00.form.Div00.form);
            obj.set_taborder("0");
            obj.set_text("로그인");
            this.Div00.form.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00","12","91","105","43",null,null,null,null,null,null,this.Div00.form.Div00.form);
            obj.set_taborder("1");
            obj.set_text("아이디");
            this.Div00.form.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","12","161","105","43",null,null,null,null,null,null,this.Div00.form.Div00.form);
            obj.set_taborder("2");
            obj.set_text("비밀번호");
            this.Div00.form.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","77","92","172","38",null,null,null,null,null,null,this.Div00.form.Div00.form);
            obj.set_taborder("3");
            this.Div00.form.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00_00","77","161","172","38",null,null,null,null,null,null,this.Div00.form.Div00.form);
            obj.set_taborder("4");
            this.Div00.form.Div00.addChild(obj.name, obj);

            obj = new Button("btn_Login","17","216","104","35",null,null,null,null,null,null,this.Div00.form.Div00.form);
            obj.set_taborder("5");
            obj.set_text("로그인");
            this.Div00.form.Div00.addChild(obj.name, obj);

            obj = new Button("btn_Register","143","216","104","35",null,null,null,null,null,null,this.Div00.form.Div00.form);
            obj.set_taborder("6");
            obj.set_text("회원가입");
            this.Div00.form.Div00.addChild(obj.name, obj);

            obj = new Button("btn_Test01","932","4","77","36",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("화면전환_01");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Test02","1019","4","77","36",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("화면전환_02");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Test04","1193","4","77","36",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("화면전환_04");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Test03","1106","4","77","36",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("화면전환_03");
            obj.set_visible("false");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("workFrame.xfdl", function() {
        this.Comm_Click = function(obj,e)
        {
        	switch(obj.name)
        	{
        		case "btn_Login" :
        			this.btn_Test01.set_visible(true);
        			this.btn_Test02.set_visible(true);
        			this.btn_Test03.set_visible(true);
        			this.btn_Test04.set_visible(true);

        			this.Div00.set_url("board::main.xfdl" );

        		break;

        		case "btn_Register" :
        			this.Div00.set_url("board::member.xfdl" );
        		break;

        		case "btn_Test01" :
        			this.Div00.set_url("board::Test_01.xfdl" );
        		break;

        		case "btn_Test02" :
        			this.Div00.set_url("board::Test_02.xfdl" );
        		break;

        		case "btn_Test03" :
        			this.Div00.set_url("board::Test_03.xfdl" );
        		break;

        		case "btn_Test04" :
        			this.Div00.set_url("board::Test_04.xfdl" );
        		break;
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Div00.form.Div00.form.Static00_00.addEventHandler("onclick",this.Div00_Static00_00_onclick,this);
            this.Div00.form.Div00.form.btn_Login.addEventHandler("onclick",this.Comm_Click,this);
            this.Div00.form.Div00.form.btn_Register.addEventHandler("onclick",this.Comm_Click,this);
            this.btn_Test01.addEventHandler("onclick",this.Comm_Click,this);
            this.btn_Test02.addEventHandler("onclick",this.Comm_Click,this);
            this.btn_Test04.addEventHandler("onclick",this.Comm_Click,this);
            this.btn_Test03.addEventHandler("onclick",this.Comm_Click,this);
        };
        this.loadIncludeScript("workFrame.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
