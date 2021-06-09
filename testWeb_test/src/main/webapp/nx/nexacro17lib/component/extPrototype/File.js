/**
*  컨설팅 표준화 작업
*  @FileName 	File.js 
*  @Creator 	consulting
*  @CreateDate 	2017.03.08
*  @Desction   
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2017.03.08     	consulting 	                최초 생성 
*  2017.10.17     	consulting       	        주석 정비
*******************************************************************************
*/

var pForm = nexacro.Form.prototype;

// file upload 및 download 환경 설정
pForm.fileConfig = {
		//uploadUrl : "file/saveFile.jsp?path=nexacro",
		uploadUrl : "cmmn/fileUpload.do",	//임시 파일 업로드 경로
		//downloadUrl : "file/downloadFile.jsp?path=nexacro&fileName=",
		downloadUrl : "cmmn/fileDownload.do",
		deleteUrl : "", //"file/deleteFile.jsp?path=nexacro",
		downImage : "theme://images/img_file.png",
		delImage : "theme://images/btn_del.png",
		allowTypes : ["jpg","jpeg","gif","png","bmp","txt","zip","7z","gzip","doc","docx","ppt","pptx","xls","xlsx","pdf"],
		maxCount : 10,
		maxSize : "20MB",
		maxTotalSize : "200MB"
};

// 아이콘별 확장자 목록
pForm.iconInfo = {
		file_icon_ZIP: ["zip","rar","7z"],
		file_icon_IMG: ["jpg", "jpeg", "gif", "png", "bmp"],
		file_icon_TXT: ["txt", "xml"],
		file_icon_DOC: ["doc", "docx"],
		file_icon_XLS: ["xls", "xlsx"],
		file_icon_PPT: ["ppt", "pptx"],
		file_icon_PDF: ["pdf"],
		file_icon_ETC: ["etc"]		//위 확장자 목록에 일치하지 않을 경우. default icon
	};

//확장자별 아이콘 정보	 
pForm.extToIcon = {};

/**
 * @class 현재 Form 상의 FileUpload 컴포넌트를 서버에 업로드한다. <br>
 * @param {Object} objFileUpload - 파일업로드 컴포넌트
 * @param {String} [sUrl] - 파일업로드 서비스 호출 경로
 * @param {String} [sPath] - 파일업로드시킬 폴더 위치
 * @return N/A
 * @example 
 * this.gfnFileUpload(objFileUpload);
 */
 /*//원본.yjlim.20191224
pForm.gfnFileUpload = function(objFileUpload, sUrl, sPath)
{	
	var svcUrl = this.gfnGetServerUrl();
	
	if (this.gfnIsNull(sUrl)) sUrl = svcUrl;
	
	//파일업로드 서비스 호출 경로
	var sFileUrl = sUrl + "fileUpload.jsp";
    
	//파일 업로드 시킬 폴더 위치 지정
	if (this.gfnIsNull(sPath)) sPath = "PATH=upload";
	
	var bSucc = objFileUpload.upload(sFileUrl + "?" + sPath);
	trace("bSucc >> " + bSucc);
};
*/
/**
 * @class 현재 Form 상의 FileUpload 컴포넌트를 서버에 업로드한다. <br>
 * @param {Object} objFileUpload - 파일업로드 컴포넌트
 * @param {String} [subDir] - 파일업로드 서브 경로 경로
 * @param {String} [sSystem] - 파일업로드시킬 시스템 명
 * @return N/A
 * @example 
 * this.gfnFileUpload(objFileUpload, "board");
 * this.gfnFileUpload(objFileUpload, "board", "homepage");
 */
pForm.gfnFileUpload = function(objFileUpload, subDir, sSystem)
{
	var svcUrl = this.gfnGetServerUrl();
	var sPath = "";
	
	//공통 파일업로드 서비스 호출 경로
	var sFileUrl = svcUrl + "/cmmn/fileUpload.do";
    
	//파일 업로드 시킬 폴더 위치 지정
	if( this.gfnIsNull(subDir) ){
		this.gfnAlert("msg.err.validator",["파일업로드 시 subDir은 필수입니다."]);
		return false;
	}
	sPath = "SUBDIR="+subDir;
	
	if( !this.gfnIsNull(sSystem) ) {
		sPath += "&SYSTEM=" + sSystem;
	}
	
	var bSucc = objFileUpload.upload(sFileUrl + "?" + sPath);
	trace("bSucc >> " + bSucc);
	
	return bSucc;
};

/**
 * @class 현재 Form 상의 FileDownload 컴포넌트를 이용하여 지정한 위치에서 원하는 파일을 다운로드한다. <br>
 * @param {Object} objFileDownload - 파일다운로드 컴포넌트
 * @param {String} sFilename - 다운로드 할 파일명
 * @param {String} [sUrl] - 파일업로드 서비스 호출 경로
 * @param {String} [sPath] - 파일업로드시킬 폴더 위치
 * @return N/A
 * @example this.gfnFileUpload(objFileUpload, subPath, downFileName, orgFileName);
 * 공통 업로드 함수와 같이 사용. 업로드 파일이 서버의 upload 폴더에 있을 경우 사용가능.
 * 서버 upload 폴더 안의 업로드 된 파일들을 다운로드 할 때 사용.
 * 이전 아래 소스에서 변경 함. yjlim.20191125
 */
//pForm.gfnFileDownload = function(objFileDownload, subPath, downFileName, orgFileName)  //파일 로그 생성 때문에 파라메터 변경.
pForm.gfnFileDownload = function(objFileDownload, fileSeq, fileNo, orgFileName, userEmpNo)
{
	var svcUrl = this.gfnGetServerUrl();
	var clientType = "web";
	
	if (this.gfnIsNull(svcUrl)) {
		this.gfnAlert("msg.err.validator",["svcUrl은 필수입니다."]);
		return;
	}
	
	if (this.gfnIsNull(fileSeq)) {
		this.gfnAlert("msg.err.validator",["fileSeq은 필수입니다."]);
		return;
	}
	
	if (this.gfnIsNull(fileNo)) {
		this.gfnAlert("msg.err.validator",["fileNo은 필수입니다."]);
		return;
	}
	
	if (this.gfnIsNull(orgFileName)) {
		this.gfnAlert("msg.err.validator",["orgFileName은 필수입니다."]);
		return;
	}
	
	if (this.gfnIsNull(userEmpNo)) {
		this.gfnAlert("msg.err.validator",["userEmpNo은 필수입니다."]);
		return;
	}

	//파일다운로드 서비스 호출 경로
	var sFileUrl = svcUrl + "cmmn/fileDownload.do";
	
	//파일 다운로드할 폴더 위치 지정
	var sPath = "fileSeq="+fileSeq+"&fileNo="+fileNo+"&userEmpNo="+userEmpNo;
	//trace("sFileUrl:" + sFileUrl + ", sPath : " + sPath + ", orgFileName:" + orgFileName);
	
	if( system.navigatorname =="nexacro")
	{
		objFileDownload.set_downloadfilename(orgFileName);
		//objFileDownload.set_downloadurl(sFileUrl);
		clientType = "nexacro";
	}
	orgFileName = escape(encodeURIComponent(orgFileName));	//한글명 인코딩
	objFileDownload.download(sFileUrl + "?" + sPath + "&orgFileName=" + orgFileName + "&clientType=" + clientType);
};


/**
*  @class 현재 Form 상의 FileUpload 컴포넌트를 EDMS 서버에 업로드한다. <br>
*  @param {Object} objFileUpload - 파일업로드 컴포넌트
*  EDMS 전용 서버로 FTP 한다.
**/
/* 공통 업로드로 변경
pForm.gfnFtpUpload = function(objFileUpload, sPath)
{
	var svcUrl = this.gfnGetServerUrl();
	//var sPath = "";
	
	//공통 파일업로드 서비스 호출 경로
	//FTP 처리는 서버에서 공통으로 처리
	var sFileUrl = svcUrl + "/cmmn/ftpUpload.do";
	
	var bSucc = objFileUpload.upload(sFileUrl + "?" + sPath);
	trace("bSucc >> " + bSucc);
	
	return bSucc;
};
*/
/**
 * @class 현재 Form 상의 FileDownload 컴포넌트를 EDMS 서버에 파일을 다운로드한다. <br>
 * @param {Object} objFileDownload - 파일다운로드 컴포넌트
 * @param {String} ftpPath - FTP 경로
 * @param {String} downFileName -업로드 된 파일 명
 * @param {String} orgFileName - 업로드 된 원본 파일 명
 * @return N/A
 */
 /* 공통 FTP 다운로드 */
//pForm.gfnFtpDownload = function(objFileDownload, ftpPath, downFileName, orgFileName)  //파일 로그 생성 때문에 파라메터 변경.
pForm.gfnFtpDownload = function(objFileDownload, fileSeq, fileNo, orgFileName, userEmpNo)
{
	var svcUrl = this.gfnGetServerUrl();
	var clientType = "web";
	
	if (this.gfnIsNull(svcUrl)) {
		this.gfnAlert("msg.err.validator",["svcUrl은 필수입니다."]);
		return;
	}
	
	if (this.gfnIsNull(fileSeq)) {
		this.gfnAlert("msg.err.validator",["fileSeq은 필수입니다."]);
		return;
	}
	
	if (this.gfnIsNull(fileNo)) {
		this.gfnAlert("msg.err.validator",["fileNo은 필수입니다."]);
		return;
	}
	
	if (this.gfnIsNull(orgFileName)) {
		this.gfnAlert("msg.err.validator",["orgFileName은 필수입니다."]);
		return;
	}
	
	if (this.gfnIsNull(userEmpNo)) {
		this.gfnAlert("msg.err.validator",["userEmpNo은 필수입니다."]);
		return;
	}

	//FTP 파일다운로드 서비스 호출 경로
	var sFileUrl = svcUrl + "cmmn/ftpDownload.do";
	
	if( system.navigatorname =="nexacro")
	{
		objFileDownload.set_downloadfilename(orgFileName);
		clientType = "nexacro";
	}
	
	orgFileName = escape(encodeURIComponent(orgFileName));	//한글명 인코딩

	var sPath = "fileSeq="+fileSeq+"&fileNo="+fileNo+"&orgFileName="+orgFileName+"&userEmpNo="+userEmpNo+"&clientType="+clientType;
	objFileDownload.download(sFileUrl + "?" + sPath);
};



/**
 * @class 현재 Form 상의 FileDownload 컴포넌트를 이용하여 지정한 위치에서 원하는 파일을 다운로드한다. <br>
 * @param {Object} objFileDownload - 파일다운로드 컴포넌트
 * @param {String} sFilename - 다운로드 할 파일명
 * @param {String} [sUrl] - 파일업로드 서비스 호출 경로
 * @param {String} [sPath] - 파일업로드시킬 폴더 위치
 * @return N/A
 * @example this.gfnFileUpload(objFileUpload, sFilename);
 */
 /* JSP다운로드 말고, 공통 .do로 변경 */
 /* 원본.yjlim.20191122
pForm.gfnFileDownload = function(objFileDownload, sFilename, sUrl, sPath)
{
	var svcUrl = this.gfnGetServerUrl();
	if (this.gfnIsNull(sUrl)) sUrl = svcUrl;
	
	
	//파일다운로드 서비스 호출 경로
	var sFileUrl = sUrl + "fileDownload.jsp";
	
	//파일 다운로드할 폴더 위치 지정
	if (this.gfnIsNull(sPath)) sPath = "PATH=upload";
	
	objFileDownload.download(sFileUrl + "?" + sPath + "&file=" + sFilename);
};
*/

/**
 * @class File Path 문자열(예 : C:\a\b\filename.ext)에서 File명(예 : filename)을 추출 <br>
 * @param {String} sPath - File Path 문자열 (예 : "C:\a\b\filename.ext")
 * @param {String} bExt - extend를 return되는 File명에 포함시킬지 여부 ( 옵션 : Default=false )
 * @return {String} 
 * 성공 : <br>
 * bExt가 true인 경우 ==> sPath에서 File명(예 : "filename.ext") <br>
 * bExt가 false인 경우 ==> sPath에서 File명(예 : "filename") <br>
 * 실패 : "" <br>
 */
pForm.gfnGetFileName = function (sPath, bExt)
{
	var start_pos,end_pos,tmp_pos,filename;

	if (this.gfnIsNull(sPath)) 
	{
		return "";
	}
	if (this.gfnIsNull(bExt)) 
	{
		bExt = false;
	}

	start_pos = Math.max(this.gfnPosReverse(sPath, "\\"), this.gfnPosReverse(sPath, "/"));
	tmp_pos = this.gfnPosReverse(sPath, "::");
	if (tmp_pos > 0) 
	{
		tmp_pos++;
	}
	start_pos = Math.max(start_pos, tmp_pos);
	if (bExt == false) 
	{
		end_pos = this.gfnPosReverse(sPath, ".");
		if (end_pos < 0) 
		{
			end_pos = sPath.length;
		}
		filename = sPath.substr(start_pos + 1, end_pos - start_pos - 1);
	}
	else 
	{
		filename = sPath.substr(start_pos + 1);
	}

	return filename;
};

/**
 * @description 확장자별 파일 아이콘 설정
*/
pForm.gfnInitExtToIcon = function ()
{
	var extToIcon = this.extToIcon;
	var iconInfo = this.iconInfo;

	for (var name in iconInfo) {
		var len = iconInfo[name].length;
		for (var i=0; i<len; i++) 
		{
			extToIcon[iconInfo[name][i]] = name;
		}
	}
};

/**
 * @class  파일 확장자에 해당하는 이미지경로 반환.
 * @param  {string} fileName file name
 * @return {string} image full path
*/
pForm.gfnGetFileIcon = function(fileName)
{
	if(this.gfnIsNull(fileName)) return;
	
	fileName = fileName.toLowerCase();
	var ext = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName) : undefined;
	var icon = this.extToIcon[ext];
	
	if(icon == undefined) ext = "etc";

	return "theme://images/" + this.extToIcon[ext] + ".png";
};

/**
 * @description size를 byte로 변환처리한다.
*/ 
/**
 * @class  size를 byte로 변환처리한다.
 * @param  {string} fileSize - 파일사이즈 및 용량(300MB)
 * @return {integer} 파일 byte사이즈
*/
pForm.gfnSizeToByte = function(fileSize) 
{
	var unit = fileSize.match(/[^\d]+/g),
		size = fileSize.match(/\d+/);

	unit = unit ? unit[0].toLowerCase() : "";
	size = size ? size[0] : fileSize;
	
	if (unit == "mb") {
		return size * 1024 * 1024;
	}
	else if (unit == "gb") {
		return size * 1024 * 1024 * 1024;
	}
	else if (unit == "tb") {
		return size * 1024 * 1024 * 1024 * 1024;
	}
	else if (unit == "") {
		return size;
	}
	else {
		return fileSize;
	}
};