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
                this._setFormPosition(1000,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds00", this);
            obj._setContents("<ColumnInfo><Column id=\"No\" type=\"STRING\" size=\"256\"/><Column id=\"Gr\" type=\"STRING\" size=\"256\"/><Column id=\"Co\" type=\"STRING\" size=\"256\"/><Column id=\"Code\" type=\"STRING\" size=\"256\"/><Column id=\"Par\" type=\"STRING\" size=\"256\"/><Column id=\"Use\" type=\"STRING\" size=\"256\"/><Column id=\"Rem\" type=\"STRING\" size=\"256\"/><Column id=\"Regist\" type=\"STRING\" size=\"256\"/><Column id=\"Reg\" type=\"STRING\" size=\"256\"/><Column id=\"RegistDate\" type=\"STRING\" size=\"256\"/><Column id=\"Mod\" type=\"STRING\" size=\"256\"/><Column id=\"Date\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsyn", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">y</Col><Col id=\"value\">y</Col></Row><Row><Col id=\"value\">n</Col><Col id=\"code\">n</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grd00","20","150","940","420",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds00");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"No\"/><Cell col=\"1\" text=\"Gr\"/><Cell col=\"2\" text=\"Co\"/><Cell col=\"3\" text=\"Code\"/><Cell col=\"4\" text=\"Par\"/><Cell col=\"5\" text=\"Use\"/><Cell col=\"6\" text=\"Rem\"/><Cell col=\"7\" text=\"Regist\"/><Cell col=\"8\" text=\"Reg\"/><Cell col=\"9\" text=\"RegistDate\"/><Cell col=\"10\" text=\"Mod\"/><Cell col=\"11\" text=\"Date\"/></Band><Band id=\"body\"><Cell text=\"bind:No\"/><Cell col=\"1\" text=\"bind:Gr\" displaytype=\"combocontrol\" edittype=\"combo\"/><Cell col=\"2\" text=\"bind:Co\"/><Cell col=\"3\" text=\"bind:Code\"/><Cell col=\"4\" text=\"bind:Par\"/><Cell col=\"5\" text=\"bind:Use\" edittype=\"combo\" displaytype=\"combocontrol\" combodataset=\"dsyn\" combodatacol=\"value\" combocodecol=\"code\"/><Cell col=\"6\" text=\"bind:Rem\"/><Cell col=\"7\" text=\"bind:Regist\"/><Cell col=\"8\" text=\"bind:Reg\"/><Cell col=\"9\" text=\"bind:RegistDate\"/><Cell col=\"10\" text=\"bind:Mod\"/><Cell col=\"11\" text=\"bind:Date\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo00","245","117","150","23",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("cbo00");
            this.addChild(obj.name, obj);

            obj = new Button("btn01","120","46","80","51",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("btn01");
            this.addChild(obj.name, obj);

            obj = new Button("btn00","30","40",null,"63","btn01:36",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("btn00");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1000,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
        };
        this.loadIncludeScript("test_copy0.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
