/* eslint-disable max-len */
// Generates a unique name with the current timestamp and a suffix
// You should pass in the entity name like 'Bidder'
exports.generateName = (suffix) => {
  const name = `${Cypress.moment().format('YY.MM.DD_hh:mm:ss')}-${suffix}`;
  return name;
};

exports.generateRandomNum = maxNumber => Math.floor(Math.random() * maxNumber);

// Returns an integer random number between min (included) and max (included):
exports.generateRandomNumBetween = (minNumber, maxNumber) => Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;

exports.replaceCreativeName = (string, name) => {
  const creativeName = string.replaceAll('"name":"String - will be changed"', `"name":"${name}"`);
  return creativeName;
};

exports.replaceCreativeExecution = (string, execution) => {
  const creativeExecution = string.replaceAll('"execution":"String - will be changed"', `"execution":"${execution}"`);
  return creativeExecution;
};

exports.getGeneratedExecution = (string) => {
  let generatedExecution = string.replaceAll(' ', '-').toLowerCase();
  generatedExecution = generatedExecution.replace('&', 'and');
  return generatedExecution;
};

exports.replaceCampaignIdentifier = (string, name) => {
  const campaignIdentifierName = string.replaceAll('"payload_campaign_identifier":"String - will be changed"', `"payload_campaign_identifier":"${name}"`);
  return campaignIdentifierName;
};

exports.replaceCreativeId = (string, id) => {
  const creativeId = string.replaceAll('"creative_id":"id - will be changed"', `"creative_id":${id}`);
  return creativeId;
};

exports.replaceAlphaId = (string, id) => {
  const alphaId = string.replaceAll('"id_alpha":"id - will be changed"', `"id_alpha":"${id}"`);
  return alphaId;
};
