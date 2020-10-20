/*********************************************
* Radius Targeting Script
* Use Sheet 1 on a google sheet, headings "Campaign Name", "Latitude", "Longitude", "Radius", "Unit" 
* #Latitude: The latitude of the central point.
* #Longitude: The longitude of the central point.
* #Radius: The radius of the proximity target.
* #Radius Units: The units of the radius, either “MILES” or “KILOMETERS”.
*
**********************************************/
function main() {
  var SPREADSHEET_URL = "INsert your spreadsheet URL here";
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = spreadsheet.getActiveSheet();
  var data = sheet.getRange("A:E").getValues();
  for (i in data) {
  if (i == 0) {
  continue;  }

 var [CampaignName, latitude, longitude, raduis, unit] = data[i];

 if (CampaignName == "") {
  break;
  }
  else {

  var campaignIterator = AdWordsApp.campaigns()
  .withCondition("CampaignName CONTAINS_IGNORE_CASE '" + CampaignName +"'")
  .get();
  while (campaignIterator.hasNext()) {
  var campaign = campaignIterator.next();
 campaign.addProximity(latitude, longitude, raduis, unit);
 }
 }
 }
 }