var pForm = nexacro.Form.prototype;


/************************************************************************************************
* Dataset 관련 Util
************************************************************************************************/

 /**
 * @class 컨트롤이 Dataset에 bind되어 있을 경우 즉시 value를 Dataset에 적용시킨다.
 * @return N/A
 */   
pForm.gfnUpdateToDataset = function()
{
	var objComp = this.getFocus();
	
	if (objComp != null) 
	{
		try 
		{
			objComp.updateToDataset();
		}
		catch (e) 
		{
		}
	}
};

 /**
 * @class dataSet의 Row 중에서 변경된 내용이 있는지 여부
 * @param {Object} objDs - 확인 대상 Dataset
 * @return {boolean}
 */   
pForm.gfnDsIsUpdated = function (objDs)
{
	if (objDs.getDeletedRowCount() > 0) 
	{
		return true;
	}
	
	/* 원본. 아래걸로 수정 해 봄.오류나면 원복 하세요.yjlim.20190816
	for(var i = 0 ; i < objDs.getRowCount() ; i++)
	{
		if(objDs.getRowType(i) == 2 || objDs.getRowType(i) == 4 || objDs.getRowType(i) == 8)
		{
			return true;
		}
	}
	*/
	if( objDs.getCaseCount("dataset.getRowType(currow)==2 || dataset.getRowType(currow)==4 || dataset.getRowType(currow)==8 ") > 0 ){
		return true;
	}
	return false;
};

 /**
 * @class dataSet의 Row가 변경되었는지 판단하는 함수
 * @param {Object} ObjDs - 대상 dataset
 * @param {Number} nRow - row값
 * @return {boolean}
 */   
pForm.gfnIsUpdatedRow = function (objDs, nRow)
{
	if (objDs.updatecontrol == true) 
	{
		if (objDs.getRowType(nRow) == 2 || objDs.getRowType(nRow) == 4) 
		{
			return true;
		}
		return false;
	}
	else 
	{
		for (var i = 0; objDs.getColCount(); i++) 
		{
			if (this.gfnIsUpdateColumn(objDs, nRow, i) == true) 
			{
				return true;
			}
		}
	}
	return false;
};

 /**
 * @class dataSet의 Row 에서 해당 칼럼이 변경되었는지 판단하는 함수
 * @param {Object} ObjDs - 대상 dataset
 * @param {Number} nRow - row값
 * @param {String || Number} Column - 칼럼명 or 칼럼index
 * @return {boolean}
 */   
pForm.gfnIsUpdateColumn = function (objDs, nRow, Column)
{
	if (objDs.getRowType(nRow) == 2) 
	{
		if (this.gfnIsNull(objDs.getColumn(nRow, Column))) 
		{
			return false;
		}
	}
	else 
	{
		if (objDs.getColumn(nRow, Column) == objDs.getOrgColumn(nRow, Column)) 
		{
			return false;
		}
	}
	return true;
};


/*
 ===============================================================================
 == data 관련 공통함수들은 여기에 작성한다.
 ===============================================================================
 ● gfn_isUpdate    : 수정/신규/삭제 변경사항츨 체크
 ● gfn_isUpdateD   : 삭제를 죄외한 수정/신규 변경사항츨 체크
 ● gfn_reSetDs     : 그리드 변경시 이전행의 데이타를 insert이면 삭제를 하고 update이면 이전행을 복구.
 */
/**********************************************************************************
 * Function Name: gfnIsUpdate
 * Description  : 수정/신규/삭제 변경사항츨 체크
 * Arguments    : Dataset(데이타셋)
 * Return       : true/false
 **********************************************************************************/ 
pForm.gfnIsUpdate = function(dsObj)
{
	var lv_nRowCnt;
	var lv_nRowType;
	lv_nRowCnt = dsObj.getRowCount();
	for(var i=0; i<lv_nRowCnt; i++) 
	{
		lv_nRowType = dsObj.getRowType(i);
		if(lv_nRowType != 1) 
		{
			return true;
		}
	}
	if (dsObj.getDeletedRowCount() > 0) 
	{
		return true;
	}
	return false;
};

/**********************************************************************************
 * Function Name: gfnIsUpdateD
 * Description  : 삭제를 죄외한 수정/신규 변경사항츨 체크
 * Arguments    : Dataset(데이타셋)
 * Return       : true/false
 **********************************************************************************/ 
pForm.gfnIsUpdateD = function(dsObj)
{
	var lv_nRowCnt;
	var lv_nRowType;
	
	lv_nRowCnt = dsObj.getRowCount();
	
	for(var i=0; i<lv_nRowCnt; i++) 
	{
		lv_nRowType = dsObj.getRowType(i);
		if(lv_nRowType != 1) 
		{
			return true;
		}
	}
	return false;
};

/**********************************************************************************
 * Function Name: gfnReSetDs
 * Description  : 그리드 변경시 이전행의 데이타를 insert이면 삭제를 하고 update이면 이전행을 복구.
 * Arguments    : obj    => Object(현재그리드)
                  setRow = > preRow 이전행
 * Return       : N/A
 **********************************************************************************/  
pForm.gfnReSetDs = function(obj,setRow)
{
	var colCnt 	= obj.getColCount();
	var strType = obj.getRowType(setRow);
	if(strType == 2)
	{
		obj.deleteRow(setRow);
		
	}else if(strType == 4) 
	{
		for(var idx = 0; idx < colCnt; idx++)
		{
			obj.setColumn(setRow, idx, obj.getOrgColumn(setRow, idx));
		}
	}
	obj.applyChange();
};

/**
 * @desc 데이터셋의 empty row는 삭제
 * @param objDs     - 데이터셋명
 * @return N/A
 */ 
pForm.gfnEmptyRowDel = function(objDs)
{
	var sColNm = objDs.getColID(0);
	var nStrRow = 0;
	var nEndRow = objDs.rowcount-1;
	var nFlag;
	
	objDs.set_enableevent(false);
	objDs.filter(sColNm +"== '' || "+sColNm+"== null", nEndRow, nStrRow);	
	nEndRow = objDs.rowcount-1;
	nColCnt = objDs.colcount;
	
	for (var i=nEndRow; i>=0; i--) {     //빈Row	
		nFlag = true;
		for (var j=0; j<nColCnt; j++) {  //컬럼
			if (!this.gfn_isNull(objDs.getColumn(i, j)) ) {
				nFlag = false;
				break;
			}
		}
		
		if (nFlag) { objDs.deleteRow(i); }		
	}
	
	objDs.filter("");
	objDs.set_enableevent(true);
};

/**
 * @desc 해당 데이터셋명으로 검색하여 데이터셋찾아서 리턴 없으면 -1을 반환
 * @param sDsNm     - 데이터셋명
 * @return Dataset
 */   
pForm.gfnGetDataset = function(sDsNm)
{		
	return eval("this."+sDsNm);
};

/**
 * @desc 해당 데이터셋을 Json Object으로 변환
 * @param objDs     - 데이터셋 Object
 * @return String
 * yjlim.2020.03.05 add
 */
pForm.gfnDsToJson = function (objDs)
{
	var colCount = objDs.colcount;
	var jsonStr = "[";
	for(var idx=0; idx < objDs.rowcount; idx++){
		jsonStr += "{";
		
		for(var colIdx=0; colIdx < colCount; colIdx++){
			//trace(this.dsSlsRpt.getColumnInfo(colIdx).name);
			//jsonStr += "\"" + objDs.getColumnInfo(colIdx).name + "\":\"" + this.gfn_isEmpty(objDs.getColumn(idx,objDs.getColumnInfo(colIdx).name)).replace(/\\/ig,"\\\\") + "\","; //정규식 표현방법.
			jsonStr += "\"" + objDs.getColumnInfo(colIdx).name + "\":\"" + this.gfn_replaceAll(this.gfn_isEmpty(objDs.getColumn(idx,objDs.getColumnInfo(colIdx).name)),"\\","\\\\") + "\",";  //공통함수 사용
		}
		jsonStr = jsonStr.substring(0, jsonStr.length-1);	//맨 끝 콤마 제거
		jsonStr += "},";
	}
	jsonStr = jsonStr.substring(0, jsonStr.length-1);	//맨 끝 콤마 제거
	jsonStr += "]";
	//trace(jsonStr);
	return JSON.parse(jsonStr);
	//return jsonStr; //JSON.parse(jsonStr); //테스트용
};

/**
 * @desc 데이타셋의 xml을 저장한 데이타셋으로 부터 해당 데이터셋을 Load XML 함. 트랜젝션 후 값이 없으면 ds 구조가 사라짐.
 * @param xmlDs     - 데이터셋 Object
 * @return N/A
 * yjlim.2021.03.23 add
 */
pForm.gfnDsLoadXml = function (xmlDs)
{
	for(var idx=0; idx < xmlDs.getColCount(); idx++){
		//데이타셋 명
		var dsName = xmlDs.getColumnInfo(idx).name;
		
		//dataset 이름으로 obj를 찾음
		var dsObj = this.gfnLookup(this, dsName);
		//trace("dsObj:"+dsObj);
		//trace("dsObj.rowcount:"+dsObj.saveXML());
		
		//load 할 ds 가 없으면 패스.
		if( dsObj == null ){
			continue;
		}
		//데이타가 없으면 xml을 로드 함.
		if( dsObj.rowcount == 0 ){
			dsObj.loadXML(xmlDs.getColumn(0,dsName));
		}
	}
};

// /*
//  ===============================================================================
//  == data 관련 공통함수들은 여기에 작성한다.
//  ===============================================================================
//  ● gfn_deleteData    : dataset object에서 키에 해당되는 Row를 찾아서 삭제
//  ● gfn_moveData      : dataset object에서 키에 해당되는 Row를 찾아서 이동
//  ● gfn_editData      : dataset object에서 키에 해당되는 Row를 찾아서 값을 변경
//  ★ gfn_getData       : dataset object에서 데이터를 가져오는 함수 Null경우에는 Type에 의한 예외처리 하여 반환
//  ● gfn_getLookupData : dataSet object에서 키에 해당되는 Row를 찾아서 칼럼값을 전달
//  ● gfn_findData      : dataSet object에서 키에 해당되는 Row를 찾아서 rowpostion 전달
//  ● gfn_dsIsUpdated   : dataSet의 Row 중에서 변경된 내용이 있는지 여부를
//  ● gfn_isUpdatedRow  : dataSet의 Row가 변경되었는지 판단하는 함수
//  ● gfn_isUpdateColumn : dataSet의 Row 에서 해당 칼럼이 변경되었는지
//  ● gfn_allRowDataCall : Dataset의 모든 행을 함수의 인자로 넘겨주고 함수 호출처리
//  ★ gfn_dsFilter       : Dataset의 필터한 정보를 대상 Dataset으로 Copy하는 기능
//  ★ gfn_isCheckDs      : 해당 데이터셋명으로 검색하여 데이터셋이 없으면 데이터셋을 생성
//  ★ gfn_getDataset      : 해당 데이터셋명으로 검색하여 데이터셋찾아서 리턴 없으면 -1을 반환
//  
//  */
// 
// //include "lib::lib_Base.xjs"
// /**********************************************************************************
//  * Function Name: gfn_deleteData
//  * Description  : dataset object에서 키에 해당되는 Row를 찾아서 삭제
//  * Arguments    : ObjDs:dataset, strIdCol:키칼럼, strId:키값,
//  strSubCol:서브키칼럼, strSubId:서브 키값
//  * Return       : 없음
//  **********************************************************************************/
// pForm.gfn_deleteData = function (ObjDs, strIdCol, strId, strSubCol, strSubId)
// {
// 	var curRow = this.gfn_findData(ObjDs, strIdCol, strId, strSubCol, strSubId);
// 	ObjDs.deleteRow(curRow);
// };
// 
// /**********************************************************************************
//  * Function Name: gfn_moveData
//  * Description  : dataset object에서 키에 해당되는 Row를 찾아서 이동
//  * Arguments    : ObjDs:dataset, strIdCol:키칼럼, strId:키값, newRow:이동할 Row,
//  strSubCol:서브키칼럼, strSubId:서브 키값
//  * Return       : 없음
//  **********************************************************************************/
// pForm.gfn_moveData = function (ObjDs, strIdCol, strId, newRow, strSubCol, strSubId)
// {
// 	var curRow = this.gfn_findData(ObjDs, strIdCol, strId, strSubCol, strSubId);
// 	ObjDs.moveRow(curRow, newRow);
// };
// 
// /**********************************************************************************
//  * Function Name: gfn_editData
//  * Description  : dataset object에서 키에 해당되는 Row를 찾아서 값을 변경
//  * Arguments    : ObjDs:dataset, strIdCol:키칼럼, strId:키값, valCol:변경할 칼럼, newVal:변경값,
//  strSubCol:서브키칼럼, strSubId:서브 키값
//  * Return       : 없음
//  **********************************************************************************/
// pForm.gfn_editData = function (ObjDs, strIdCol, strId, valCol, newVal, strSubCol, strSubId)
// {
// 	var curRow = this.gfn_findData(ObjDs, strIdCol, strId, strSubCol, strSubId);
// 	return ObjDs.setColumn(curRow, valCol, newVal);
// };
// 
// /**********************************************************************************
//  * Function Name: gfn_getData
//  * Description  : dataset object에서 가져오는 함수 Null경우에는 Type에 의한 예외처리 하여 반환
//  * Arguments    : ObjDs:dataset, strIdCol:키칼럼, strId:키값, valCol:변경할 칼럼, newVal:변경값,
//  strSubCol:서브키칼럼, strSubId:서브 키값
//  * Return       : 없음
//  **********************************************************************************/
// pForm.gfn_getData = function(ObjDs,nRow,sColId,sVal)
// {
//     var oData = ObjDs.getColumn(nRow,sColId);
//  
//     var oColInfo = ObjDs.getColumnInfo(sColId);
//     if(this.gfn_isNull(oColInfo)) return "";
//     var sType = oColInfo.type;
//     
//     if(this.gfn_isNull(sVal))
//     {
// 		switch(sType.toUpperCase())
// 		{
// 			case "STRING" : 
// 			   sVal = "";
// 			break;
// 			case "BIGDECIMAL" :
// 			case "INT" :
// 			case "FLOAT" :
// 			   sVal = 0;
// 			break;
// 		}
// 	}	
//     
//     var rtnVal = (this.gfn_isNull(oData)) ? sVal : oData;
//     
//     return rtnVal;
// };
// /**********************************************************************************
//  * Function Name: gfn_getLookupData
//  * Description  : dataSet object에서 키에 해당되는 Row를 찾아서 칼럼값을 전달
//  * Arguments    : ObjDs:dataset, strIdCol:키칼럼, strId:키값,  strInfo: dataSet 칼럼,
//  strSubCol:서브키칼럼, strSubId:서브 키값
//  * Return       : 칼럼값
//  **********************************************************************************/
// pForm.gfn_getLookupData = function (ObjDs, strIdCol, strId, strInfo, strSubCol, strSubId)
// {
// 	var strVal;
// 	var curRow = this.gfn_findData(ObjDs, strIdCol, strId, strSubCol, strSubId);
// 	if (curRow < 0) 
// 	{
// 		return "";
// 	}
// 	
// 	strVal = ObjDs.getColumn(curRow, strInfo);
// 	if (this.gfn_isNull(strVal)) 
// 	{
// 		return "";
// 	}
// 
// 	return strVal;
// };
// 
// /**********************************************************************************
//  * Function Name: gfn_findData
//  * Description  : dataSet object에서 키에 해당되는 Row를 찾아서 rowpostion 전달
//  * Arguments    : ObjDs:dataset, strIdCol:키칼럼, strId:키값,
//  strSubCol:서브키칼럼, strSubId:서브 키값
//  * Return       : rowpostion
//  **********************************************************************************/
// pForm.gfn_findData = function (ObjDs, strIdCol, strId, strSubCol, strSubId)
// {
// 	//var arrArgument = this.gfn_findData.arguments;
// 	if (this.gfn_isNull(strSubCol)) 
// 	{
// 		return ObjDs.findRow(strIdCol, strId);
// 	}
// 	
// 	return ObjDs.findRowExpr(strIdCol + " == '" + strId + "' && " + strSubCol + " == '" + strSubId + "'");
// };
// 
// /********************************************************************************
//  * Function Name	: gfn_dsIsUpdated
//  * Description		: dataSet의 Row 중에서 변경된 내용이 있는지 여부를
//  *					  판단하는 함수
//  * Arguments		: objDs(DataSet)
//  * Return 			: true = 변경 된 데이터가 존재
//  *					  false = 변경 된 데이터가 없음
//  ********************************************************************************/
// pForm.gfn_dsIsUpdated = function (objDs)
// {
// 	if (objDs.getDeletedRowCount() > 0) 
// 	{
// 		return true;
// 	}
// 	
// 	if (objDs.findRowExpr("(this.getRowType(rowidx)==Dataset.ROWTYPE_UPDATE)||(this.getRowType(rowidx)==Dataset.ROWTYPE_INSERT)") > -1) 
// 	{
// 		return true;
// 	}
// 	return false;
// };
// 
// /********************************************************************************
//  * Function Name	: gfn_IsUpdatedRow
//  * Description		: dataSet의 Row가 변경되었는지 판단하는 함수
//  * Arguments		: objDs(DataSet), nRow, Column
//  * Return 			: true = 변경 된 데이터가 존재
//  *					  false = 변경 된 데이터가 없음
//  ********************************************************************************/
// pForm.gfn_isUpdatedRow = function (objDs, nRow)
// {
// 	if (objDs.updatecontrol == true) 
// 	{
// 		if (objDs.getRowType(nRow) == 2 || objDs.getRowType(nRow) == 4) 
// 		{
// 			return true;
// 		}
// 		return false;
// 	
// 	}else 
// 	{
// 		for (var i = 0; objDs.getColCount(); i++) 
// 		{
// 			if (this.gfn_IsUpdateColumn(objDs, nRow, i) == true) 
// 			{
// 				return true;
// 			}
// 		}
// 	}
// 	return false;
// };
// 
// /********************************************************************************
//  * Function Name	: gfn_isUpdateColumn
//  * Description		: dataSet의 Row 에서 해당 칼럼이 변경되었는지
//  *					  판단하는 함수
//  * Arguments		: objDs(DataSet), nRow, Column
//  * Return 			: true = 변경 된 데이터가 존재
//  *					  false = 변경 된 데이터가 없음
//  ********************************************************************************/
// pForm.gfn_isUpdateColumn = function (objDs, nRow, Column)
// {
// 	if(objDs.getRowType(nRow) == 2) 
// 	{
// 		if (this.gfn_isNull(objDs.getColumn(nRow, Column))) 
// 		{
// 			return false;
// 		}
// 	}else 
// 	{
// 		if (objDs.getColumn(nRow, Column) == objDs.getOrgColumn(nRow, Column)) 
// 		{
// 			return false;
// 		}
// 	}
// 	return true;
// };
// 
// /*******************************************************************************
//  * Function Name: gfn_allRowDataCall
//  * Description	: Dataset의 모든 행을 함수의 인자로 넘겨주고 함수 호출처리
//  * Arguments	: dsObj :Dataset, callFncObj:호출할 함수, bModifiedOnly:변경된 데이터만 호출할지 여부
//  * Return 		: retVal
//  ********************************************************************************/
// pForm.gfn_allRowDataCall = function (dsObj, callFncObj, bModifiedOnly)
// {
// 	var retVal;
// 	for (var i = 0; i < dsObj.getRowCount(); i++) 
// 	{
// 		if (bModifiedOnly && !(dsObj.getRowType(i) == 2 || dsObj.getRowType(i) == 4)) 
// 		{
// 			continue;
// 		}
// 		retVal = callFncObj(dsObj, i);
// 		if (this.gfn_isNull(retVal) == false) 
// 		{
// 			return retVal;
// 		}
// 	}
// };
// 
// /*******************************************************************************
//  * Function Name: gfn_dsFilter
//  * Description	: Dataset의 필터한 정보를 대상 Dataset으로 Copy하는 기능
//  * Arguments	: 목적데이타셋dsDs 처리데이타셋 tgDs 필터표현 sFilterExpr
//  * Return 		: N/A
//  ********************************************************************************/
// pForm.gfn_dsFilter = function(dsSc,dsTg,sFilterExpr)
// {
//     var sKeyString = dsSc.keystring;
//     if(!this.gfn_isNull(sKeyString))  sKeyString = sKeyString.toString();
//     dsSc.set_keystring("");
//     dsSc.filter(sFilterExpr);
//     dsTg.copyData(dsSc,true);
//     dsSc.filter("");   
//     if(!this.gfn_isNull(sKeyString))  dsSc.set_keystring(sKeyString);
// };
//  
//  /*******************************************************************************
//  * Function Name: gfn_isCheckDs
//  * Description	: 해당 데이터셋명으로 검색하여 데이터셋이 없으면 데이터셋을 생성
//  * Arguments	: sDsNm - 데이터셋명
//  * Return 		: Dataset
//  ********************************************************************************/
// pForm.gfn_isCheckDs = function(sDsNm)
// {
// 	 var oDs = this.gfn_getDataset(sDsNm);
// 	 
// 	 if(this.gfn_isNull(oDs))
// 	 {
// 		 oDs = new Dataset;
// 		 oDs.name = sDsNm;
// 		 this.addChild(sDsNm, oDs);
// 	 }
// 	 
// 	 return oDs;
// };
//  
//   /*******************************************************************************
//  * Function Name: gfn_isCheckDs
//  * Description	: 해당 데이터셋명으로 검색하여 데이터셋찾아서 리턴 없으면 -1을 반환
//  * Arguments	: sDsNm - 데이터셋명
//  * Return 		: Dataset
//  ********************************************************************************/
// pForm.gfn_getDataset = function(sDsNm)
// {
//      return Base.XPComp.query(this, "typeOf == 'Dataset' && prop[name] == '"+sDsNm+"'")[0];
// };
