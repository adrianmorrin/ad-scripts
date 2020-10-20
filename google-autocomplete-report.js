 var hashMapResults = {}; 
 var numOfKeywords = 0; 
 var doWork = false; 
 var keywordsToQuery = new Array(); 
 var keywordsToQueryIndex = 0; 
 var queryflag = false; 

var brandKeywordList = [];
var targetKeyword = "life insurance"; // this is the keyword that you want to know about
var emailAddress ="adrian@lowquotes.ie"; // this is where the final report will be sent 

function main() {
	// Get the brand name from the account 
	var accountName = AdWordsApp.currentAccount().getName().split('-');
	
    var clientName = accountName[0];
    
    info('Now starting Google Search Autocomplete Analysis..');
   
   buildKeywordList(targetKeyword);
      
      // Sort array 
     brandKeywordList.sort();
     
     /* // remove any keywords that don't include the brand term
      for (i = 0; i < brandKeywordList.length; i++) {
         if ((brandKeywordList[i].indexOf(accountName)) == -1) {
          
           brandKeywordList.splice(i,1);
           
         }       
      } */
  
    // let user know that search has completed
    info('Google Autocomplete Search has completed, expect an email with search term results momentarily');
    info(brandKeywordList.length + ' searches were found. ');
    
    var fileUrl = createSpreadsheet(brandKeywordList);
  
    info(' Or you can find it here:' + fileUrl);  
    sendAnEmail(clientName, brandKeywordList.toString(), fileUrl);
}

function buildKeywordList(keyword) {

// get the first set of keywords related to the term and add to list   
 brandKeywordList = queryKeyword(keyword);
 
 // iterate through alphabet and build keyword list for initial keyword 
 info('now checking for the variation [' + keyword + '] + [a-z][0-9] ...');
 info('variation: ' + keyword);
  
 for(var j = 0; j < 26; j++) {
      var chr = String.fromCharCode(97 + j);
      
      keywordVariation = keyword + ' '+ chr;
       
      var alphaList = {};
      alphaList = queryKeyword(keywordVariation);
      
      for (var x = 0; x < alphaList.length; x++) {      
        
       if (x !== 0) {
          info(alphaList[x]);
          brandKeywordList.push(alphaList[x]);
        
        }     
    } 
 }
  
 for(var n = 0; n <= 9; n++) {
      
      keywordVariation = keyword + ' '+ n;
       
      var numberList = {};
      numberList = queryKeyword(keywordVariation);
      
      for (var y = 0; y < numberList.length; y++) {      
        
       if (y !== 0) {
          info(numberList[y]);
          brandKeywordList.push(numberList[y]);
        
        }     
    } 
 } 
 
 // Split keyword up if possible and look for different variations 
 var keywordPieces = _.str.words(keyword);
 
  if (keywordPieces.length > 1) {
     info(keywordPieces); 
    // iterate through alphabet and build keyword list for the variation: [keywordPiece1] + [a-z][0-9] + [keywordPiece2] 
 
 warn('now checking for the variation [keywordPiece1] + [a-z][0-9] + [keywordPiece2]...');
 warn('variation: ' + keywordPieces[0] + ' '+ keywordPieces[1] + keywordPieces[2]);   
    
 for(var j = 0; j < 26; j++) {
      var chr = String.fromCharCode(97 + j);
      
      keywordVariation = keywordPieces[0] + ' '+ chr + ' ' + keywordPieces[1]+ ' ' + keywordPieces[2];
       
      var alphaList = {};
      alphaList = queryKeyword(keywordVariation);
      
      for (var x = 0; x < alphaList.length; x++) {      
        
       if (x !== 0) {
          info(alphaList[x]);
          brandKeywordList.push(alphaList[x]);
        
        }     
    } 
 }
  
 for(var n = 0; n <= 9; n++) {
      
      keywordVariation = keywordPieces[0] + ' '+ n + ' ' + keywordPieces[1] +' '+  keywordPieces[2];
       
      var numberList = {};
      numberList = queryKeyword(keywordVariation);
      
      for (var y = 0; y < numberList.length; y++) {      
        
       if (y !== 0) {
          info(numberList[y]);
          brandKeywordList.push(numberList[y]);
        
        }     
    } 
 }   
    
Utilities.sleep(2000);
    
/* CHECK FOR THE VARIATION [keywordPiece1] + [a-z][0-9] + [keywordPiece0] */
warn('now checking for the variation [keywordPiece2] + [a-z][0-9] + [keywordPiece1]...');
warn('variation: ' + keywordPieces[1] + ' '+ keywordPieces[0]); 
    
 for(var j = 0; j < 26; j++) {
      var chr = String.fromCharCode(97 + j);
      
      keywordVariation = keywordPieces[1] + ' ' + keywordPieces[2] + ' '+ chr + ' ' + keywordPieces[0];
       
      var alphaList = {};
      alphaList = queryKeyword(keywordVariation);
      
      for (var x = 0; x < alphaList.length; x++) {      
        
       if (x !== 0) {
          info(alphaList[x]);
          brandKeywordList.push(alphaList[x]);
        
        }     
    } 
 }
  
 for(var n = 0; n <= 9; n++) {
      
      keywordVariation = keywordPieces[1] + ' ' + keywordPieces[2] + ' '+ n + ' ' + keywordPieces[0];
       
      var numberList = {};
      numberList = queryKeyword(keywordVariation);
      
      for (var y = 0; y < numberList.length; y++) {      
        
       if (y !== 0) {
          info(numberList[y]);
          brandKeywordList.push(numberList[y]);
        
        }     
    } 
 }   
    
Utilities.sleep(2000);
    /* last variation: [a-z][0-9] [keyword1] [keyword2] */
    /* CHECK FOR THE VARIATION [keywordPiece1] + [a-z][0-9] + [keywordPiece0] */
info('now checking for the variation [a-z][0-9] + [keywordPiece1]  + [keywordPiece2]...');
// warn('variation: ' + keywordPieces[0] + ' '+ keywordPieces[1]); 
    
 for(var j = 0; j < 26; j++) {
      var chr = String.fromCharCode(97 + j);
      
      keywordVariation =  chr + ' ' + keywordPieces[0] + ' ' + keywordPieces[1] + keywordPieces[2];
       
      var alphaList = {};
      alphaList = queryKeyword(keywordVariation);
      
      for (var x = 0; x < alphaList.length; x++) {      
        
       if (x !== 0) {
          info(alphaList[x]);
          brandKeywordList.push(alphaList[x]);
        
        }     
    } 
 }
  
 for(var n = 0; n <= 9; n++) {
      
      keywordVariation = n + ' ' + keywordPieces[0] + ' ' + keywordPieces[1] + keywordPieces[2];
       
      var numberList = {};
      numberList = queryKeyword(keywordVariation);
      
      for (var y = 0; y < numberList.length; y++) {      
        
       if (y !== 0) {
          info(numberList[y]);
          brandKeywordList.push(numberList[y]);
        
        }     
    } 
 }   
    
  }
}

function createSpreadsheet(results) {
  var newSS = SpreadsheetApp.create('searchtermreport', results.length, 26);
  
  var sheet = newSS.getActiveSheet();
  
  var columnNames = ["Campaign Name", "AdGroup", "Keyword", "Match Type"];
  
  var headersRange = sheet.getRange(1, 1, 1, columnNames.length);

  for (i = 0; i < results.length; i++) {
    
    headersRange.setValues([columnNames]);
     
     var resultKw;
     resultKw = results[i].toString();
     
    sheet.appendRow(["Your Campaign", "Your AdGroup", resultKw,'Phrase']);
    
    // Sets the first column to a width which fits the text
    sheet.setColumnWidth(1, 300);

  }
  
  return newSS.getUrl();
  
}

function sendAnEmail (results, fileUrl) {
 
  var data = Utilities.parseCsv(results, '\t');
  var today = new Date();

  var filename = 'search-results' + today;
  
  // Send an email with Search list attachment
   var blob = Utilities.newBlob(results, 'text/html', '');
    
  MailApp.sendEmail(emailAddress, 'Google Autocomplete Results ', 'You can find the results at the following URL:' + fileUrl, {
     name: 'Google Autocomplete Search Results'
 });
  
}
/* Utility Functions */
 
function warn(msg) {
  Logger.log('WARNING: '+msg);
}
 
function info(msg) {
  Logger.log(msg);
}
                       
 function queryKeyword(keyword)
        {
            var querykeyword = encodeURIComponent(keyword); 
          
            var queryresult = ''; 
            queryflag = true; 
         
             Utilities.sleep(1000);
              var response = UrlFetchApp.fetch("https://www.google.com/s?gs_rn=18&gs_ri=psy-ab&cp=7&gs_id=d7&xhr=t&q=" + querykeyword);
                
                    var retval = response.getContentText();
                    
                    var test = _.str.stripTags(retval);
          
                    var retList = ScrapePage(retval, '["', '",');
          
                 queryflag = false; 
              
                 return retList;
                }
           // });           
       // }
        
function ScrapePage(page, left, right)
        {
            var i = 0; 
            var retVal = new Array(); 
            var firstIndex = page.indexOf(left);
            while (firstIndex != -1)
            {
                firstIndex += left.length;
                var secondIndex = page.indexOf(right, firstIndex);
                if (secondIndex != -1)
                {
                    var val = page.substring(firstIndex, secondIndex);
                    val = val.replace("\\u003cb\\u003e", "");
                    val = val.replace("\\u003c\\/b\\u003e", "");
                    val = val.replace("\\u003c\\/b\\u003e", "");
                    val = val.replace("\\u003cb\\u003e", "");
                    val = val.replace("\\u003c\\/b\\u003e", "");
                    val = val.replace("\\u003cb\\u003e", "");
                    val = val.replace("\\u003cb\\u003e", "");
                    val = val.replace("\\u003c\\/b\\u003e", "");
                    val = val.replace("\\u0026amp;", "&");
                    val = val.replace("\\u003cb\\u003e", "");
                    val = val.replace("\\u0026", "");
                    val = val.replace("\\u0026#39;", "'");
                    val = val.replace("#39;", "'");
                    val = val.replace("\\u003c\\/b\\u003e", "");
                    val = val.replace("\\u2013", "2013");
                    retVal[i] = val; 
                    i++; 
                    firstIndex = page.indexOf(left, secondIndex); 
                }
                else
                {
                    return retVal; 
                }
            }
            return retVal; 
}
        
 
!function(e,t){"use strict";var n=t.prototype.trim;var r=t.prototype.trimRight;var i=t.prototype.trimLeft;var s=function(e){return e*1||0};var o=function(e,t){if(t<1)return"";var n="";while(t>0){if(t&1)n+=e;t>>=1,e+=e}return n};var u=[].slice;var a=function(e){if(e==null)return"\\s";else if(e.source)return e.source;else return"["+p.escapeRegExp(e)+"]"};var f={lt:"<",gt:">",quot:'"',apos:"'",amp:"&"};var l={};for(var c in f){l[f[c]]=c}var h=function(){function e(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}var n=o;var r=function(){if(!r.cache.hasOwnProperty(arguments[0])){r.cache[arguments[0]]=r.parse(arguments[0])}return r.format.call(null,r.cache[arguments[0]],arguments)};r.format=function(r,i){var s=1,o=r.length,u="",a,f=[],l,c,p,d,v,m;for(l=0;l<o;l++){u=e(r[l]);if(u==="string"){f.push(r[l])}else if(u==="array"){p=r[l];if(p[2]){a=i[s];for(c=0;c<p[2].length;c++){if(!a.hasOwnProperty(p[2][c])){throw new Error(h('[_.sprintf] property "%s" does not exist',p[2][c]))}a=a[p[2][c]]}}else if(p[1]){a=i[p[1]]}else{a=i[s++]}if(/[^s]/.test(p[8])&&e(a)!="number"){throw new Error(h("[_.sprintf] expecting number but found %s",e(a)))}switch(p[8]){case"b":a=a.toString(2);break;case"c":a=t.fromCharCode(a);break;case"d":a=parseInt(a,10);break;case"e":a=p[7]?a.toExponential(p[7]):a.toExponential();break;case"f":a=p[7]?parseFloat(a).toFixed(p[7]):parseFloat(a);break;case"o":a=a.toString(8);break;case"s":a=(a=t(a))&&p[7]?a.substring(0,p[7]):a;break;case"u":a=Math.abs(a);break;case"x":a=a.toString(16);break;case"X":a=a.toString(16).toUpperCase();break}a=/[def]/.test(p[8])&&p[3]&&a>=0?"+"+a:a;v=p[4]?p[4]=="0"?"0":p[4].charAt(1):" ";m=p[6]-t(a).length;d=p[6]?n(v,m):"";f.push(p[5]?a+d:d+a)}}return f.join("")};r.cache={};r.parse=function(e){var t=e,n=[],r=[],i=0;while(t){if((n=/^[^\x25]+/.exec(t))!==null){r.push(n[0])}else if((n=/^\x25{2}/.exec(t))!==null){r.push("%")}else if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))!==null){if(n[2]){i|=1;var s=[],o=n[2],u=[];if((u=/^([a-z_][a-z_\d]*)/i.exec(o))!==null){s.push(u[1]);while((o=o.substring(u[0].length))!==""){if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null){s.push(u[1])}else if((u=/^\[(\d+)\]/.exec(o))!==null){s.push(u[1])}else{throw new Error("[_.sprintf] huh?")}}}else{throw new Error("[_.sprintf] huh?")}n[2]=s}else{i|=2}if(i===3){throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported")}r.push(n)}else{throw new Error("[_.sprintf] huh?")}t=t.substring(n[0].length)}return r};return r}();var p={VERSION:"2.3.0",isBlank:function(e){if(e==null)e="";return/^\s*$/.test(e)},stripTags:function(e){if(e==null)return"";return t(e).replace(/<\/?[^>]+>/g,"")},capitalize:function(e){e=e==null?"":t(e);return e.charAt(0).toUpperCase()+e.slice(1)},chop:function(e,n){if(e==null)return[];e=t(e);n=~~n;return n>0?e.match(new RegExp(".{1,"+n+"}","g")):[e]},clean:function(e){return p.strip(e).replace(/\s+/g," ")},count:function(e,n){if(e==null||n==null)return 0;return t(e).split(n).length-1},chars:function(e){if(e==null)return[];return t(e).split("")},swapCase:function(e){if(e==null)return"";return t(e).replace(/\S/g,function(e){return e===e.toUpperCase()?e.toLowerCase():e.toUpperCase()})},escapeHTML:function(e){if(e==null)return"";return t(e).replace(/[&<>"']/g,function(e){return"&"+l[e]+";"})},unescapeHTML:function(e){if(e==null)return"";return t(e).replace(/\&([^;]+);/g,function(e,n){var r;if(n in f){return f[n]}else if(r=n.match(/^#x([\da-fA-F]+)$/)){return t.fromCharCode(parseInt(r[1],16))}else if(r=n.match(/^#(\d+)$/)){return t.fromCharCode(~~r[1])}else{return e}})},escapeRegExp:function(e){if(e==null)return"";return t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")},splice:function(e,t,n,r){var i=p.chars(e);i.splice(~~t,~~n,r);return i.join("")},insert:function(e,t,n){return p.splice(e,t,0,n)},include:function(e,n){if(n==="")return true;if(e==null)return false;return t(e).indexOf(n)!==-1},join:function(){var e=u.call(arguments),t=e.shift();if(t==null)t="";return e.join(t)},lines:function(e){if(e==null)return[];return t(e).split("\n")},reverse:function(e){return p.chars(e).reverse().join("")},startsWith:function(e,n){if(n==="")return true;if(e==null||n==null)return false;e=t(e);n=t(n);return e.length>=n.length&&e.slice(0,n.length)===n},endsWith:function(e,n){if(n==="")return true;if(e==null||n==null)return false;e=t(e);n=t(n);return e.length>=n.length&&e.slice(e.length-n.length)===n},succ:function(e){if(e==null)return"";e=t(e);return e.slice(0,-1)+t.fromCharCode(e.charCodeAt(e.length-1)+1)},titleize:function(e){if(e==null)return"";return t(e).replace(/(?:^|\s)\S/g,function(e){return e.toUpperCase()})},camelize:function(e){return p.trim(e).replace(/[-_\s]+(.)?/g,function(e,t){return t.toUpperCase()})},underscored:function(e){return p.trim(e).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase()},dasherize:function(e){return p.trim(e).replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-").toLowerCase()},classify:function(e){return p.titleize(t(e).replace(/_/g," ")).replace(/\s/g,"")},humanize:function(e){return p.capitalize(p.underscored(e).replace(/_id$/,"").replace(/_/g," "))},trim:function(e,r){if(e==null)return"";if(!r&&n)return n.call(e);r=a(r);return t(e).replace(new RegExp("^"+r+"+|"+r+"+$","g"),"")},ltrim:function(e,n){if(e==null)return"";if(!n&&i)return i.call(e);n=a(n);return t(e).replace(new RegExp("^"+n+"+"),"")},rtrim:function(e,n){if(e==null)return"";if(!n&&r)return r.call(e);n=a(n);return t(e).replace(new RegExp(n+"+$"),"")},truncate:function(e,n,r){if(e==null)return"";e=t(e);r=r||"...";n=~~n;return e.length>n?e.slice(0,n)+r:e},prune:function(e,n,r){if(e==null)return"";e=t(e);n=~~n;r=r!=null?t(r):"...";if(e.length<=n)return e;var i=function(e){return e.toUpperCase()!==e.toLowerCase()?"A":" "},s=e.slice(0,n+1).replace(/.(?=\W*\w*$)/g,i);if(s.slice(s.length-2).match(/\w\w/))s=s.replace(/\s*\S+$/,"");else s=p.rtrim(s.slice(0,s.length-1));return(s+r).length>e.length?e:e.slice(0,s.length)+r},words:function(e,t){if(p.isBlank(e))return[];return p.trim(e,t).split(t||/\s+/)},pad:function(e,n,r,i){e=e==null?"":t(e);n=~~n;var s=0;if(!r)r=" ";else if(r.length>1)r=r.charAt(0);switch(i){case"right":s=n-e.length;return e+o(r,s);case"both":s=n-e.length;return o(r,Math.ceil(s/2))+e+o(r,Math.floor(s/2));default:s=n-e.length;return o(r,s)+e}},lpad:function(e,t,n){return p.pad(e,t,n)},rpad:function(e,t,n){return p.pad(e,t,n,"right")},lrpad:function(e,t,n){return p.pad(e,t,n,"both")},sprintf:h,vsprintf:function(e,t){t.unshift(e);return h.apply(null,t)},toNumber:function(e,n){if(e==null||e=="")return 0;e=t(e);var r=s(s(e).toFixed(~~n));return r===0&&!e.match(/^0+$/)?Number.NaN:r},numberFormat:function(e,t,n,r){if(isNaN(e)||e==null)return"";e=e.toFixed(~~t);r=r||",";var i=e.split("."),s=i[0],o=i[1]?(n||".")+i[1]:"";return s.replace(/(\d)(?=(?:\d{3})+$)/g,"$1"+r)+o},strRight:function(e,n){if(e==null)return"";e=t(e);n=n!=null?t(n):n;var r=!n?-1:e.indexOf(n);return~r?e.slice(r+n.length,e.length):e},strRightBack:function(e,n){if(e==null)return"";e=t(e);n=n!=null?t(n):n;var r=!n?-1:e.lastIndexOf(n);return~r?e.slice(r+n.length,e.length):e},strLeft:function(e,n){if(e==null)return"";e=t(e);n=n!=null?t(n):n;var r=!n?-1:e.indexOf(n);return~r?e.slice(0,r):e},strLeftBack:function(e,t){if(e==null)return"";e+="";t=t!=null?""+t:t;var n=e.lastIndexOf(t);return~n?e.slice(0,n):e},toSentence:function(e,t,n,r){t=t||", ";n=n||" and ";var i=e.slice(),s=i.pop();if(e.length>2&&r)n=p.rtrim(t)+n;return i.length?i.join(t)+n+s:s},toSentenceSerial:function(){var e=u.call(arguments);e[3]=true;return p.toSentence.apply(p,e)},slugify:function(e){if(e==null)return"";var n="ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",r="aaaaaaaaceeeeeiiiilnoooooouuuunczz",i=new RegExp(a(n),"g");e=t(e).toLowerCase().replace(i,function(e){var t=n.indexOf(e);return r.charAt(t)||"-"});return p.dasherize(e.replace(/[^\w\s-]/g,""))},surround:function(e,t){return[t,e,t].join("")},quote:function(e){return p.surround(e,'"')},exports:function(){var e={};for(var t in this){if(!this.hasOwnProperty(t)||t.match(/^(?:include|contains|reverse)$/))continue;e[t]=this[t]}return e},repeat:function(e,n,r){if(e==null)return"";n=~~n;if(r==null)return o(t(e),n);for(var i=[];n>0;i[--n]=e){}return i.join(r)},levenshtein:function(e,n){if(e==null&&n==null)return 0;if(e==null)return t(n).length;if(n==null)return t(e).length;e=t(e);n=t(n);var r=[],i,s;for(var o=0;o<=n.length;o++)for(var u=0;u<=e.length;u++){if(o&&u)if(e.charAt(u-1)===n.charAt(o-1))s=i;else s=Math.min(r[u],r[u-1],i)+1;else s=o+u;i=r[u];r[u]=s}return r.pop()}};p.strip=p.trim;p.lstrip=p.ltrim;p.rstrip=p.rtrim;p.center=p.lrpad;p.rjust=p.lpad;p.ljust=p.rpad;p.contains=p.include;p.q=p.quote;if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){module.exports=p}exports._s=p}else if(typeof define==="function"&&define.amd){define("underscore.string",[],function(){return p})}else{e._=e._||{};e._.string=e._.str=p}}(this,String)
