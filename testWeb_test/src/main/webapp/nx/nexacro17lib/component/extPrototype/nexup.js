
/**
 * @fileoverview developer Nex-UP SERVICE 
 */

 /*
*●==================================================================================
*●                          [nexacro form] 
*●==================================================================================
* _nexupCallback :  nexup transaction의 결과를 nexacro form으로 돌려줄 Function의 이름
*●==================================================================================
*●                            [Nex-UP]
*●==================================================================================
* AddService  : NexUp 데이터 처리를 위한 전처리 함수
* CallService : nexup 서비스를 호출하고, 작업이 완료되면 콜백함수을 수행하는 메소드
* getNexupUrl : 서비스 호출 URL 함수
* isNull      : value의 null 여부 반환
*●==================================================================================
*/

/**
 * @namespace
 * @name create the root namespace and making sure we're not overwriting it
 * @memberof! <global>
 */
var createNS = createNS || function namespace(namespace) {
	var object = this, tokens = namespace.split("."), token;
	while (tokens.length > 0) {
		token = tokens.shift();
		if (typeof object[token] === "undefined") {
			object[token] = {};
		}
		object = object[token];
	}
	return object;
};

/**
 * create namespace variable object
 * @private
*/
createNS("nexup");

/**
 * common variable
 * @private
*/
var nfp = nfp || nexacro.Form.prototype;

/**
 *  nexup transaction의 결과를 nexacro form으로 돌려줄 Function의 이름
 * @private
 * @param {object} callback serviceid 
 *                 callback callback      
 * @param {string} error code.
 * @param {string} error message.
 * @return N/A
 * @example
 */
nfp._nexupCallback = function (o, nErrorcode, strErrorMsg)
 {

	var strSvcId 	= o.serviceid;		// service id
	var fncCallback = o.callbackFnc;		//콜벡명

	this.dsService.clearData();

	var isFnc =	(Object.prototype.toString).call(this[fncCallback]);
  
	if(isFnc == '[object Function]')
	{
		this[fncCallback].call(this, strSvcId, nErrorcode, strErrorMsg);

	}
	else
	{
        trace("[ERROR_nexupCallback] UnKnown function callback name : " +fncCallback );

	}
};

/**
 *  NexUp 데이터 처리를 위한 전처리 함수
 * @public
 * @param {nexaForm} nexacro form
 * @param {string} transaction을 구분하기 위한 ID.
 * @param {string} strInDatasets.
 * @param {string} strOutDatasets.
 * @param {string} strArgument.
 * @param {string} row type .
 * @param {string} condition expression.
 * @return N/A
 * @example
   nexup.AddService(this, "login.LOGIN_S", "ds_login=ds_login", "GDS_MENU=GDS_MENU GDS_MESSAGE=GDS_MESSAGE GDS_USER_INFO=GDS_USER_INFO", "" );
 */
nexup.AddService = function(pThis, serviceId, inDataset, outDataset, strParam, useRowType, condition)
{
	var objApp = nexup.getApp();

	//공통 Dataset사용여부 체크
	var sCommonInDatasets = "";
	if(nexup.IsNull(objApp.gdsNexUpCommonDatasets) == false){
		var nCnt = objApp.gdsNexUpCommonDatasets.getRowCount();
		var spliter = "";
		for(var i=0;i<nCnt;i++){
			var sDsNm = objApp.gdsNexUpCommonDatasets.getColumn(i, "name");
			if(nexup.IsNull(objApp[sDsNm]) == false){
				sCommonInDatasets += " " + sDsNm +"="+ sDsNm;
			}
		}
		if(nexup.IsNull(inDataset) == false){
			inDataset += sCommonInDatasets;
		}else{
			inDataset = sCommonInDatasets.substr(1);
		}
	}

	if(nexup.IsNull(pThis.objects["dsService"])==true)
	{
		//데이터셋 생성
		objDs = new Dataset;
		//데이터셋 명 설정
		objDs.set_name("dsService");
		//부모창에 등록
		pThis.addChild(objDs.name, objDs);
		
		//dsService 데이터셋 생성
		objDs.addColumn("name", "string");
		objDs.addColumn("inMapping", "string");
		objDs.addColumn("inputDataset", "string");
		objDs.addColumn("outMapping", "string");
		objDs.addColumn("strParam", "string");
		objDs.addColumn("useRowType", "string");
		objDs.addColumn("condition", "string");
	}
	
	//dsService에 Row 추가
	nRow = pThis.dsService.addRow();
	
	//inMapping 데이터에는 상태값을 표현할 필요 없으므로 삭제
	var sInMapping = inDataset || "";
	sInMapping = sInMapping.replace(":u", "");
	sInMapping = sInMapping.replace(":a", "");
	sInMapping = sInMapping.replace(":n", "");
	sInMapping = sInMapping.replace(":U", "");
	sInMapping = sInMapping.replace(":A", "");
	sInMapping = sInMapping.replace(":N", "");
		
	//undefined 처리함.
	if(nexup.IsNull(strParam) == false){
		strParam = nexacro.replaceAll(strParam, "undefined", "");
	}

	//Service에 대한 정보 설정
	pThis.dsService.setColumn(nRow, "name",			serviceId);
	pThis.dsService.setColumn(nRow, "inMapping", 	sInMapping || "");
	pThis.dsService.setColumn(nRow, "inputDataset",	inDataset || "");
	pThis.dsService.setColumn(nRow, "outMapping", 	outDataset || "");
	pThis.dsService.setColumn(nRow, "strParam", 	strParam || "");	
	pThis.dsService.setColumn(nRow, "useRowType",	useRowType || "rowType");
	
	//차후 서비스 조건식 입력을 위한 컬럼
	pThis.dsService.setColumn(nRow, "condition", condition || "");
};

/**
 * nexup 서비스를 호출하고, 작업이 완료되면 콜백함수을 수행하는 메소드
 * @public
 * @param {nexaForm} nexacro form
 * @param {string} transaction을 구분하기 위한 ID.
 * @param {string}{function} transaction의 결과를 돌려줄 Function의 이름입니다..
 * @param {string} strOutDatasets.
 * @param {boolen} 비동기 여부를 지정합니다.
 *                 Default : true
 * @param {number} 전송할 형태를 지정합니다. .
 *                Default : 0 (XML 타입)
 *                  0(XML 타입),1(Binary 타입), 2(SSV 타입)
 * @param {boolen} 통신시 PostData를 압축할지 여부를 지정합니다
 * @param {string} Insert Update, Delete 서비스 사용시 simple | batch 선택
 * @return N/A
 * @example
	nexup.CallService(this, "serviceId", "fn_CallBack");
 */
nexup.CallService = function(p, trId, CallbackFunc, Async, DataType, Compress, mybatisExecutorType)
{
	var objApp = nexup.getApp();
	var pThis = p;
	var i, j;
	var sTrId 				= trId;
	var sInDatasetList 		= "dsService=dsService dsServiceOption=dsServiceOption ";
	var sOutDatasetList 	= "";
	var sParam				= "";
	var sCallbackFunc 		= CallbackFunc || "";
	var bAsync 				= Async;
	if(nexup.IsNull(bAsync)){
		bAsync = true;
	}
	if(nexup.IsNull(objApp.gvNexUpDataType)){
		nDataType = DataType || 0;
	}else{
		nDataType = DataType || nexacro.toNumber(objApp.gvNexUpDataType);
	}
	var nDataType = DataType || 0;
	var bCompress = Compress || false;
	var sMybatisExecutorType = mybatisExecutorType || "simple";
	var sInDataset;
	var arrInDatasetList = "";
	var arrInDataset = "";
	var sOutDatset;
	var arrOutDatsetList = "";
	var arrOutDatset = "";	
	var strParam;
	var arrInDatasetStatus = "";

	//CallService하기전에 사용자 함수정의가 되어 있으면 호출
	if(nexup.IsNull(objApp.gvNexUpBeforeCallServiceFuncNm) == false){
		if(pThis[objApp.gvNexUpBeforeCallServiceFuncNm] != undefined ){
			pThis[objApp.gvNexUpBeforeCallServiceFuncNm].call(pThis);
		}
	}	

	//
	if(nexup.IsNull(pThis.objects["dsServiceOption"])==true)
	{
		//데이터셋 생성
		objDs = new Dataset;
		//데이터셋 명 설정
		objDs.set_name("dsServiceOption");
		//부모창에 등록
		pThis.addChild(objDs.name, objDs);
		
		//dsService 데이터셋 생성
		objDs.addColumn("mybatisExecutorType", "string");
	}
	pThis.dsServiceOption.clearData();
	pThis.dsServiceOption.addRow();
	pThis.dsServiceOption.setColumn(0, "mybatisExecutorType", sMybatisExecutorType);

	//실행할 Service의 갯수만큼 For Loop
	for(i=0;i<pThis.dsService.rowcount;i++)
	{
		//inputDataset 데이터 꺼내기
		//양 끝쪽에 공백이 있을수 있으므로 공백 제거
		sInDataset = nexacro.trim(pThis.dsService.getColumn(i, "inputDataset"), " ");
		
		//sInDataset 값이 있을 경우
		if(nexup.IsNull(sInDataset)==false)
		{
			//InputDataset String을 Array로 만들기
			//arrInDatasetList[0] = Dataset00=Dataset00
			//arrInDatasetList[1] = Dataset01=Dataset01
			arrInDatasetList = sInDataset.split(" ");
			
			for(j=0;j<arrInDatasetList.length;j++)
			{
				//InputDatasetList String을  Array로 만들기
				//arrInDataset[0] = Dataseet0
				//arrInDataset[1] = Dataseet0
				arrInDataset = arrInDatasetList[j].split("=");
				
				//InputDatasetList String에서 Status 꺼내기
				//arrInDatasetStatus[0] = Dataset0
				//arrInDatasetStatus[1] = u
				arrInDatasetStatus = arrInDataset[1].split(":");
				if(sInDatasetList.indexOf(arrInDatasetStatus[0]+"="+arrInDataset[1])==-1)
				{
					//Transaction InputDataset String 만들기
					sInDatasetList += arrInDatasetStatus[0]+"="+arrInDataset[1]+" ";
				}
			}
		}
		
		//outMapping 데이터 꺼내기
		//양 끝쪽에 공백이 있을수 있으므로 공백 제거
		sOutDatset = nexacro.trim(pThis.dsService.getColumn(i, "outMapping"), " ");
		
		//sOutDatset 값이 있을 경우
		if(nexup.IsNull(sOutDatset)==false)
		{
			var arrOutDatasetList = sOutDatset.split(" ");			
			for(j=0;j<arrOutDatasetList.length;j++)
			{
				arrOutDataset = arrOutDatasetList[j].split("=");
				sOutDatasetList += arrOutDataset[0] + "=" + arrOutDataset[0] + " ";
			}
		}		

		//Transaction Param String 만들기
		strParam = nexacro.trim(pThis.dsService.getColumn(i, "strParam"), " ");
		sParam += strParam+" ";
	}
	
	//공통 데이터 Variable 세팅
	if(nexup.IsNull(objApp.gdsNexUpCommonVariables) == false){
		var nCnt = objApp.gdsNexUpCommonVariables.getRowCount();
		strParam = "";
		for(var i=0;i<nCnt;i++){
			sParamId = objApp.gdsNexUpCommonVariables.getColumn(i, "name");
			sValue = objApp.gdsNexUpCommonVariables.getColumn(i, "value");
			strParam += sParamId + "=" + sValue + " ";
		}
		sParam += strParam+" ";
	}
	pThis.transaction({serviceid:sTrId,callbackFnc:sCallbackFunc}, this.getNexupUrl() + "/dynamicService.do", sInDatasetList, sOutDatasetList, sParam, "_nexupCallback", bAsync, nDataType, bCompress);
};

/**
 * 서비스 호출 URL 함수 
 * @public 
 * @return nexup service url
 * @example
 */
nexup.getNexupUrl = function()
{
	var objEnv = nexup.getEnv();
	var objApp = nexup.getApp();

	var defUrl = objEnv.services["nexupSvc"].url;
	var svcUrl = defUrl;
	var adlUrl = objApp.xadl;
	
	if(nexup.IsNull(defUrl))
	{
		var str = adlUrl;
		for(var i=0;i<2;i++){
			var nLast = str.lastIndexOf("/");
			str = str.substr(0, nLast);
		}
		svcUrl = str;
	}

	return svcUrl;
};

/**
 * Null Check
 * @param {*} pvVal 체크할 값.
 * @return {boolean} null 여부
 */
nexup.IsNull = function (pvVal)
{
	if (new String(pvVal).valueOf() == "undefined") 
	{
		return true;
	}
	if (pvVal == null) 
	{
		return true;
	}
	if (("x" + pvVal == "xNaN") && (new String(pvVal.length).valueOf() == "undefined")) 
	{
		return true;
	}
	if (pvVal.length == 0) 
	{
		return true;
	}

	return false;
};

/**
 * Nexacro버전별 appilication 객체 가져오기
 * @return objApp
 */
nexup.getApp = function()
{
	var  objApp = (nexacro.Version ==  "17"  ? nexacro.getApplication() : application);
	return objApp;
}

/**
 * Nexacro버전별 environment 객체 가져오기
 * @return objEnv
 */
nexup.getEnv = function()
{
	var objEnv = (nexacro.Version ==  "17" ? nexacro.getEnvironment() : application);
	return objEnv;
}