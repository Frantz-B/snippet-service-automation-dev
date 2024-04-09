/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM High Rise KIT Creatives', () => {
    const executionList = ['Standard', 'Viewstream'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for High Rise Standard Creative', () => {
      let highRisePayload;
      cy.fixture('/DM-Creatives-Body/HighRise-Body.json').then((payload) => {
        highRisePayload = extend(highRisePayload, payload);
        highRisePayload.name = `test High Rise ${executionList[0]}`;
        highRisePayload.execution = executionList[0];
        highRisePayload.creative_id = generateRandomNumBetween(100000, 999999);
        highRisePayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(highRisePayload.creative_id);
        highRisePayload.id_alpha = `DM-CREA-${highRisePayload.creative_id}`;

        let highRiseResponse;

        cy.fixture('/DM-Creatives-Response/HighRise-Response.json').then((payload2) => {
          highRiseResponse = extend(highRiseResponse, payload2);

          let stringified = JSON.stringify(highRiseResponse);
          stringified = replaceCreativeExecution(stringified, highRisePayload.execution);
          stringified = replaceCreativeName(stringified, highRisePayload.name);
          stringified = replaceCampaignIdentifier(stringified, highRisePayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, highRisePayload.creative_id);
          stringified = replaceAlphaId(stringified, highRisePayload.id_alpha);
          cy.log(stringified);

          highRiseResponse = JSON.parse(stringified);

          cy.log(highRiseResponse);
          cy.log(highRisePayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: highRisePayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, highRiseResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, highRiseResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, highRiseResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, highRiseResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, highRiseResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, highRiseResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, highRiseResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, highRiseResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${highRisePayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${highRisePayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${highRisePayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${highRisePayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${highRisePayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, highRiseResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, highRiseResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, highRiseResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, highRiseResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, highRiseResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, highRiseResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, highRiseResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, highRiseResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, highRiseResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, highRiseResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, highRiseResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, highRiseResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, highRiseResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, highRiseResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, highRiseResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, highRiseResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, highRiseResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, highRiseResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, highRiseResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, highRiseResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, highRiseResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, highRiseResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, highRiseResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for High Rise Viewstream Creative', () => {
      let highRisePayload;
      cy.fixture('/DM-Creatives-Body/HighRise-Body.json').then((payload) => {
        highRisePayload = extend(highRisePayload, payload);
        highRisePayload.name = `test High Rise ${executionList[1]}`;
        highRisePayload.execution = executionList[1];
        highRisePayload.creative_id = generateRandomNumBetween(100000, 999999);
        highRisePayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(highRisePayload.creative_id);
        highRisePayload.id_alpha = `DM-CREA-${highRisePayload.creative_id}`;

        let highRiseResponse;

        cy.fixture('/DM-Creatives-Response/HighRise-Response.json').then((payload2) => {
          highRiseResponse = extend(highRiseResponse, payload2);

          let stringified = JSON.stringify(highRiseResponse);
          stringified = replaceCreativeExecution(stringified, highRisePayload.execution);
          stringified = replaceCreativeName(stringified, highRisePayload.name);
          stringified = replaceCampaignIdentifier(stringified, highRisePayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, highRisePayload.creative_id);
          stringified = replaceAlphaId(stringified, highRisePayload.id_alpha);
          cy.log(stringified);

          highRiseResponse = JSON.parse(stringified);

          cy.log(highRiseResponse);
          cy.log(highRisePayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: highRisePayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, highRiseResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, highRiseResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, highRiseResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, highRiseResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, highRiseResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, highRiseResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, highRiseResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, highRiseResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${highRisePayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${highRisePayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${highRisePayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${highRisePayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${highRisePayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, highRiseResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, highRiseResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, highRiseResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, highRiseResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, highRiseResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, highRiseResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, highRiseResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, highRiseResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, highRiseResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, highRiseResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, highRiseResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, highRiseResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, highRiseResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, highRiseResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, highRiseResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, highRiseResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, highRiseResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, highRiseResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, highRiseResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, highRiseResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, highRiseResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, highRiseResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, highRiseResponse.trackers[2].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[3].tid, `${trackerLink}.video-start`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].is_auto_created, highRiseResponse.trackers[3].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].name, highRiseResponse.trackers[3].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].associated_field, highRiseResponse.trackers[3].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].type, highRiseResponse.trackers[3].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].category, highRiseResponse.trackers[3].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].url, highRiseResponse.trackers[3].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[4].tid, `${trackerLink}.video-q1`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].is_auto_created, highRiseResponse.trackers[4].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].name, highRiseResponse.trackers[4].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].associated_field, highRiseResponse.trackers[4].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].type, highRiseResponse.trackers[4].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].category, highRiseResponse.trackers[4].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].url, highRiseResponse.trackers[4].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[5].tid, `${trackerLink}.video-q2`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].is_auto_created, highRiseResponse.trackers[5].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].name, highRiseResponse.trackers[5].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].associated_field, highRiseResponse.trackers[5].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].type, highRiseResponse.trackers[5].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].category, highRiseResponse.trackers[5].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].url, highRiseResponse.trackers[5].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[6].tid, `${trackerLink}.video-q3`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].is_auto_created, highRiseResponse.trackers[6].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].name, highRiseResponse.trackers[6].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].associated_field, highRiseResponse.trackers[6].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].type, highRiseResponse.trackers[6].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].category, highRiseResponse.trackers[6].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].url, highRiseResponse.trackers[6].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[7].tid, `${trackerLink}.video-complete`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].is_auto_created, highRiseResponse.trackers[7].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].name, highRiseResponse.trackers[7].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].associated_field, highRiseResponse.trackers[7].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].type, highRiseResponse.trackers[7].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].category, highRiseResponse.trackers[7].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].url, highRiseResponse.trackers[7].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[8].tid, `${trackerLink}.mute`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].is_auto_created, highRiseResponse.trackers[8].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].name, highRiseResponse.trackers[8].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].associated_field, highRiseResponse.trackers[8].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].type, highRiseResponse.trackers[8].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].category, highRiseResponse.trackers[8].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].url, highRiseResponse.trackers[8].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[9].tid, `${trackerLink}.unmute`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].is_auto_created, highRiseResponse.trackers[9].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].name, highRiseResponse.trackers[9].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].associated_field, highRiseResponse.trackers[9].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].type, highRiseResponse.trackers[9].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].category, highRiseResponse.trackers[9].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].url, highRiseResponse.trackers[9].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[10].tid, `${trackerLink}.replay`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].is_auto_created, highRiseResponse.trackers[10].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].name, highRiseResponse.trackers[10].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].associated_field, highRiseResponse.trackers[10].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].type, highRiseResponse.trackers[10].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].category, highRiseResponse.trackers[10].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].url, highRiseResponse.trackers[10].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 11, '11 Trackers object');
          });
        });
      });
    });
  });
});
