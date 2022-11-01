//https://stackoverflow.com/questions/53021813/html-two-language-option-with-button-without-having-to-redirect-to-different-pa

// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.
var today = new Date();
var expiry = new Date(today.getTime() + 30*24*3600*1000*3); // plus 30 days
var cookjson;

function make_pid() {
  var makeid = (length) => {
      var result           = '';
      var characters       = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength)); }
  return result; }

  //today = new Date();
  year  = today.getFullYear();
  month = (today.getMonth() + 1).toString().padStart(2, "0");
  day   = today.getDate().toString().padStart(2, "0");
  hrs   = today.getHours().toString().padStart(2, "0");
  mins  = today.getMinutes().toString().padStart(2, "0")
  secs  = today.getSeconds().toString().padStart(2, "0")
  ms    = today.getMilliseconds().toString().padStart(4,"0")

  pid = 'LexT_'+year+month+day+'_'+hrs+mins+secs+ms+'_'+makeid(7);
  pid_show = pid.slice(0,4) + pid.slice(24,32);
}

function hide_forms() {
  $("#head2").css("display", "None");
  $("#line2").css("display", "None");
  $(".form-control").css("display", "None");
  $(".form-check-input").css("display", "None");
  $("#help").css("display", "None");
  $(".inp").css("display", "None");
  $("#tickmarks").css("display", "None");
  $(".form-group").css("display", "None");
  $("#clear").css("display", "");
  $("#start").css("display", "");
  $("#pid_head").css("display", "");
  $("#pid_auto").css("display", "");
}

function getCookie(name) {
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}

function setCookie(name, value) {
	document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

function clearCookies() {
	document.cookie.split(";").forEach(function(c) { 
		document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
	$("#myAlert2").css("display", "None");
	$("#head2").css("display", "");
  $("#line2").css("display", "");
	$(".form-control").css("display", "");
	$(".form-check-input").css("display", "");
	$("#help").css("display", "");
	$(".inp").css("display", "");
	$("#tickmarks").css("display", "");
	$(".form-group").css("display", "");
	$("#clear").css("display", "None");
	$("#start").css("display", "None");
	$(".form-group").css("display", "");
}

function saveData(filename, dir, data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'scripts_jscssphp/save1_xmlhttp.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: filename, directory: dir, filedata: data}));
}

function save_data_csv(f_name, dir, data) {
  jQuery.ajax({type: 'post', cache: false, url: 'scripts_jscssphp/save2_jquery.php',
      data: { data_dir: dir,
        file_name: f_name + '.csv', // the file type should be added
        exp_data: data }
      });
}

function str_obj(str) {
    str = str.split(';');
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }
    return result;
}

function save_and_hide() {
  if(form1.reportValidity()) {
    console.log("Valid data");
    datLBQ = {PartID:pid, age:form1.cook2_age.value, gender:form1.cook3_gen.value, country: form1.cook4_country.value, education:form1.cook5_edu.value, P_status:form1.cook6_stat.value, discipline:form1.cook7_discipline.value, publications:form1.cook8_publi.value, firstLang:form1.cook9_firstL.value.replaceAll(',','-').replaceAll(' ','').replaceAll(';','-'), otherLang:form1.cook10_othL.value.replaceAll(',','-').replaceAll(' ','').replaceAll(';','-'), rateEnglish:form1.cook11_knw.value, rateSpeak:form1.cook12_speak.value, rateUnd:form1.cook13_understand.value, rateRead:form1.cook14_read.value, rateWrite:form1.cook15_write.value, age_start_speaking_english:form1.cook16_age.value, experienceEnglish:form1.cook17_exp.value, FormalEduEng:form1.cook181_Prim_med.value, PrimEduEng:form1.cook181_Prim_med.value.replaceAll(',','-').replaceAll(' ','').replaceAll(';','-'), SecEduEng:form1.cook182_Sec_med.value.replaceAll(',','-').replaceAll(' ','').replaceAll(';','-'), HighEduEng:form1.cook183_High_med.value.replaceAll(',','-').replaceAll(' ','').replaceAll(';','-'), UniEduEng_Uni:form1.cook184_Uni_med.value.replaceAll(',','-').replaceAll(' ','').replaceAll(';','-'), readhrsPerDay:form1.cook20_rday.value, writehrsPerDay:form1.cook21_wday.value, speakhrsPerDay:form1.cook22_sday.value};
    datLBQ = JSON.stringify(datLBQ);
    datLBQ = datLBQ.replaceAll(",",";").replaceAll('"','').replaceAll(":","=");
    datLBQ = datLBQ.slice(1, datLBQ.length-1);
    
    csv_imp = cook_to_csv(datLBQ);
    csv_clnt = cook_to_csv(merged);
    csv_all = csv_imp+'\n'+csv_clnt;

    setCookie("cook_ClientProfID", pid);
    
    saveData('imp_'+pid+'.txt',"data_profile",csv_imp); 
    saveData('all_'+pid+'.txt',"data_profile",csv_all);
    
    hide_forms();
    $("#myAlert1").css("display", "");
  }
  else {
    console.log("Invalid data");
    //alert("Something is missing from profile data. Please check.");  
  }
}

function updateRangeInput(elem) {
  $(elem).next().val($(elem).val());
}

function cook_to_csv(cook) {
  cookjson = cook.split(";")
  var arr = new Array();
  for (var i = 0; i < cookjson.length; i++) {
    temp = cookjson[i].split('=');
    arr.push(temp);
  }
  arr = JSON.stringify(arr);
  arr = arr.replaceAll('"],["','\n');
  arr = arr.replaceAll('","',',');
  arr = arr.replaceAll('[["','');
  arr = arr.replaceAll('"]]','');
  return arr;
}