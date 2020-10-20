function main() {
  
  var allowedOverdeliveryPercentage = 0.0; // set percentage as decimal, i.e. 20% should be set as 0.2, Currently 0%
  var labelName = "paused by overdelivery checker script";
  
  AdWordsApp.createLabel(labelName, "automatic label needed to reenable campaigns");
  
  var campaigns = AdWordsApp.campaigns()
   .withCondition("Status = ENABLED")
   .withCondition("Cost > 0")
   .forDateRange("TODAY");
  
  var campaignIterator = campaigns.get();
  
  while (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    var campaignName = campaign.getName();
    var budgetAmount = campaign.getBudget().getAmount();
    var costToday = campaign.getStatsFor("TODAY").getCost();
    
    if(costToday > budgetAmount * (1 + allowedOverdeliveryPercentage)) {
      Logger.log(campaignName + " has spent " + costToday + " which is more than allowed.");
      campaign.applyLabel(labelName);
      campaign.pause();
    } else {
      Logger.log(campaignName + " has spent " + costToday + " and can continue to run.");
    }
  }

}