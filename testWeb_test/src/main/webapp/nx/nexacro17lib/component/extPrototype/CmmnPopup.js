/**
*  TIMS 공통 팝업
*  @FileName 	CmmnPopup.js 
*  @Creator 	YJLIM
*  @CreateDate 	2020.03.25
*  @Desction   		
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2020.03.25     	YJLIM 	           	    	최초 생성 
*******************************************************************************
*/

var pForm = nexacro.Form.prototype;

/**
 * @class TIMS 공통 팝업오픈
 * @param {String} gbn	- 구분값
 * @param {String} searchKeyword	 - 검색어
 * @param {String} width - 팝업 가로
 * @param {String} height - 팝업 세로
 * 
 * 2020.03.25 : 우선 popupId는 고정으로 함.
 */
pForm.gfnCmmnPopup = function (gbn, searchKeyword, width, height)
{
    var objApp = this.gfnGetApplication();
	
	var sTitle = "";
	var sFormUrl = "";
	var oArg;
	//oOption
	var sPopupCallBack = "fnPopupCallback";
	var popupId = "";
	
	if( gbn == "Truck" ){
		//Line
		sTitle = "Customer 검색";
		sFormUrl  = "CMMN_POPUP::customerSearchPopup.xfdl";
		oArg = {paramJson:{"searchCustomerType":"T","searchKeyword":searchKeyword}, paramDataset:"", paramUrl:sFormUrl};
		//oOption
		//sPopupCallBack
		popupId = "truckSearchPopup";
		
	}else if( gbn == "Cy" ){
		//CY
		sTitle = "Code 검색";
		sFormUrl  = "CMMN_POPUP::codeSearchPopup.xfdl";
		oArg = {paramJson:{"searchGroupCode":"BONDEDWAREHOUSE","searchKeyword":searchKeyword}, paramDataset:"", paramUrl:sFormUrl};
		//oOption
		//sPopupCallBack
		popupId = "cySearchPopup";
		
	}else if( gbn == "Pol" ){
		//POL
		sTitle = "Port 검색";
		sFormUrl  = "CMMN_POPUP::portCodeSearchPopup.xfdl";
		oArg = {paramJson:{"searchKeyword":searchKeyword}, paramDataset:"", paramUrl:sFormUrl};
		//oOption
		//sPopupCallBack
		popupId = "polSearchPopup";
		
	}else if( gbn == "Pod" ){
		//POD
		sTitle = "Port 검색";
		sFormUrl  = "CMMN_POPUP::portCodeSearchPopup.xfdl";
		oArg = {paramJson:{"searchKeyword":searchKeyword}, paramDataset:"", paramUrl:sFormUrl};
		//oOption
		//sPopupCallBack
		popupId = "podSearchPopup";
	}else{
		return;
	}
	
	var oOption = {title:sTitle,width:"550",height:"400"};	//top, left를 지정하지 않으면 가운데정렬 //"top:20,left:370"
	this.gfnOpenPopup(popupId,"cmm::cmmPopup.xfdl", oArg, sPopupCallBack, oOption);
	
};