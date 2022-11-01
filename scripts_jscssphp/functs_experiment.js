

function save_data_json(f_name, dir, data) {
  jQuery.ajax({type: 'post', cache: false, url: save_script,
    data: {data_dir: dir,
      file_name: f_name + '.json', // the file type should be added
      exp_data: data }
    });
}

function save_data_csv(f_name, dir, data) {
  jQuery.ajax({type: 'post', cache: false, url: save_script,
      data: { data_dir: dir,
        file_name: f_name + '.csv', // the file type should be added
        exp_data: data }
      });
}

function saveData(f_name, dir, data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', backup_script);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: f_name, directory: dir, filedata: data}));
}

// https://stackoverflow.com/questions/40362456/put-data-from-a-csv-file-into-an-array-javascript
// Create an array of objects
// Use the first line as keys
// Split by ","
function process(dataString) {
  //console.log(dataString);
  var lines = dataString.split(/\n/)
    .map(function(lineStr) {
        return lineStr.split(",");
    });
  var keys = lines[0];
  var objects = lines.slice(1)
    .map(function(arr) {
      return arr.reduce(function(obj, val, i) {
        obj[keys[i]] = val;
        return obj;
      }, {});
    });
  return JSON.stringify(objects, null, 2);
}

// Randomize array in-place using Durstenfeld shuffle algorithm 
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

var main_stim_1 = "stim,type,corrResp,complexity\nabstain,word,m,medium\nbough,word,m,high\nfocus,word,m,low\nintegral,word,m,medium\nagile,word,m,medium\nproud,word,m,low\nlunch,word,m,low\npyrrhic,word,m,high\nwaft,word,m,high\ncreate,word,m,low\nfission,word,m,high\ninsane,word,m,medium\nlettuce,word,m,low\nrim,word,m,medium\nski,word,m,low\njocular,word,m,high\nawe,word,m,medium\nsilt,word,m,medium\nbail,word,m,low\ncomet,word,m,medium\ncyst,word,m,medium\nbleakly ,word,m,medium\nornate,word,m,high\nemu,word,m,high\nfatally,word,m,low\noften,word,m,low\nfield,word,m,low\nformal,word,m,low\nmemory,word,m,low\nnominee,word,m,medium\nsenate,word,m,medium\nbilious,word,m,high\nriposte,word,m,high\nempathy,word,m,medium\nenhance,word,m,low\nshriek,word,m,medium\nmorsel,word,m,medium\nErsatz,word,m,high\nhollow,word,m,low\nsygzy,word,m,high\nennui,word,m,high\nhaven,word,m,high\naglet,word,m,high\ncycle,word,m,low\nadept,word,m,high\nagog,word,m,high\nbest,word,m,low\nark,word,m,medium\npetine,non-word,z,medium\ndilerria,non-word,z,low\nglup,non-word,z,medium\ncanbel,non-word,z,high\ncaxtel,non-word,z,high\nhaveted,non-word,z,high\nlagom,non-word,z,medium\narienator,non-word,z,high\nthears,non-word,z,low\ntur,non-word,z,low\nexing,non-word,z,low\nskirmy,non-word,z,medium";

var pract_stim_1= "stim,type,corrResp,complexity\ndowager,word,m,high\nflourless,word,m,medium\nwater,word,m,low\nrain,word,m,low\nswoon,word,m,high\nklien,word,m,high\ncraigsim,non-word,z,high\nprindle,non-word,z,high";