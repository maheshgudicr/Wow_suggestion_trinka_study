//https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
//https://stackoverflow.com/questions/14220321/how-to-return-the-response-from-an-asynchronous-call
async function get_client() {
	try {
		let get_resp = await fetch('https://json.geoiplookup.io/?callback=');
		response = await get_resp.text();
		response = await response.slice(1, response.length-2); //console.log(response);
	} catch(err) {
		console.log(`Custom Error (IP URL callback blocked by client, and\n the error returned is: ${err}`);
		response = '{"ip":"blocked_by_client"}';
	}
}

//https://github.com/bestiejs/platform.js/
//https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript
user_agent = platform.ua; //var2
user_agent = user_agent.replaceAll("; ","-");
user_agent = user_agent.replaceAll(", ","-");
os_ver_bit = platform.os.family+'_'+platform.os.version+'-'+platform.os.architecture+'_bit'; //var3
os_ver_bit = os_ver_bit.replaceAll(", ","-");
br_ver_eng = platform.name+'-('+platform.layout+') '+platform.version; //var4
br_ver_eng = br_ver_eng.replaceAll(", ","-");
description = platform.description.replaceAll(", ","-"); //var5
item_detail = platform.product+'_'+platform.manufacturer;//var6
item_detail = item_detail.replaceAll(", ","-");

//https://stackoverflow.com/questions/49692073/how-can-i-get-a-unique-device-id-in-javascript
const uuid = new DeviceUUID().get(); //var7
var du = new DeviceUUID().parse(); 
const isTouch = du.isTouchScreen; //var8
const isTablet = du.isTablet; //var9
const device_lang = du.language; //var10
var window_res = du.resolution; 
window_res = window_res[0]+"_"+window_res[1]; //var11

const browser_res = screen.availWidth+'_'+screen.availHeight; //var12
const total_res = screen.width+'_'+screen.height; //var13
const color_depth = screen.colorDepth; //var14
try{ orient = screen.orientation.type + ' (angle-'+screen.orientation.angle+')'; } //var15
catch{ orient = 'MacOS_disabled';} 

custom_vars = {inst_flag:device_type, uniqueID:uuid, resTotal:total_res, resAvail:browser_res, colDepth:color_depth, orient: orient, deviceLang:device_lang, os:os_ver_bit, browser:br_ver_eng, describe:description, company:item_detail, userAgent:user_agent, isTouch:isTouch, isTablet:isTablet, windowRes:window_res};

const get_promise = get_client().then(()=> {
	client_ip_data = JSON.parse(response);
	//console.log(response);
	merged = {...custom_vars, ...client_ip_data};
	merged = JSON.stringify(merged);
	merged = merged.replaceAll(",",";").replaceAll('"','').replaceAll(":","=");
	merged = merged.slice(1, merged.length-1);
	//console.log(merged);
})


