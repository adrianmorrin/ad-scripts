function main() {
  // Let's start by getting all of the adGroups that are active
  var ag_iter = AdWordsApp.adGroups()
  .withCondition("Status = ENABLED")
  .get();

  // Then we will go through each one
  while (ag_iter.hasNext()) {
    var ag = ag_iter.next();
    var ad_iter = ag.ads()
      .withCondition("Status = ENABLED")
      .forDateRange("ALL_TIME")
      .orderBy("Ctr DESC")
      .get();
    var ad_array = new Array();
    while(ad_iter.hasNext()) {
      ad_array.push(ad_iter.next());
    }
    if(ad_array.length > 1) {
      for(var i = 1; i < ad_array.length; i++) {
        ad_array[i].pause(); //or .remove(); to delete them 
      }
    }
  }
}