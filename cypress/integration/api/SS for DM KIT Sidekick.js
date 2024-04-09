/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Sidekick KIT Creatives', () => {
    const executionList = ['Launcher', 'Krush', 'Tilt & Catch'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for Sidekick Launcher Creative', () => {
      let sidekickPayload;
      cy.fixture('/DM-Creatives-Body/Sidekick-Body.json').then((payload) => {
        sidekickPayload = extend(sidekickPayload, payload);
        sidekickPayload.name = `test Sidekick ${executionList[0]}`;
        sidekickPayload.execution = executionList[0];
        sidekickPayload.creative_id = generateRandomNumBetween(100000, 999999);
        sidekickPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(sidekickPayload.creative_id);
        sidekickPayload.id_alpha = `DM-CREA-${sidekickPayload.creative_id}`;

        let sidekickResponse;
        cy.fixture('/DM-Creatives-Response/Sidekick-Response.json').then((payload2) => {
          sidekickResponse = extend(sidekickResponse, payload2);

          let stringified = JSON.stringify(sidekickResponse);
          stringified = replaceCreativeExecution(stringified, sidekickPayload.execution);
          stringified = replaceCreativeName(stringified, sidekickPayload.name);
          stringified = replaceCampaignIdentifier(stringified, sidekickPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, sidekickPayload.creative_id);
          stringified = replaceAlphaId(stringified, sidekickPayload.id_alpha);
          cy.log(stringified);

          sidekickResponse = JSON.parse(stringified);

          cy.log(sidekickResponse);
          cy.log(sidekickPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: sidekickPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, sidekickResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, sidekickResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, sidekickResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, sidekickResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, sidekickResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, sidekickResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, sidekickResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, sidekickResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://s3.amazonaws.com/storage.kargo.com/ad/creative');
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${sidekickPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${sidekickPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${sidekickPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${sidekickPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${sidekickPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, sidekickResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, sidekickResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, sidekickResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, sidekickResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, sidekickResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, sidekickResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, sidekickResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, sidekickResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, sidekickResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, sidekickResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, sidekickResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, sidekickResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, sidekickResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, sidekickResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, sidekickResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, sidekickResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, sidekickResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, sidekickResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, sidekickResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, sidekickResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, sidekickResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, sidekickResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, sidekickResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Sidekick Krush Creative', () => {
      let sidekickPayload;
      cy.fixture('/DM-Creatives-Body/Sidekick-Body.json').then((payload) => {
        sidekickPayload = extend(sidekickPayload, payload);
        sidekickPayload.name = `test Sidekick ${executionList[1]}`;
        sidekickPayload.execution = executionList[1];
        sidekickPayload.creative_id = generateRandomNumBetween(100000, 999999);
        sidekickPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(sidekickPayload.creative_id);
        sidekickPayload.id_alpha = `DM-CREA-${sidekickPayload.creative_id}`;

        let sidekickResponse;
        cy.fixture('/DM-Creatives-Response/Sidekick-Response.json').then((payload2) => {
          sidekickResponse = extend(sidekickResponse, payload2);

          let stringified = JSON.stringify(sidekickResponse);
          stringified = replaceCreativeExecution(stringified, sidekickPayload.execution);
          stringified = replaceCreativeName(stringified, sidekickPayload.name);
          stringified = replaceCampaignIdentifier(stringified, sidekickPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, sidekickPayload.creative_id);
          stringified = replaceAlphaId(stringified, sidekickPayload.id_alpha);
          cy.log(stringified);

          sidekickResponse = JSON.parse(stringified);

          cy.log(sidekickResponse);
          cy.log(sidekickPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: sidekickPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, sidekickResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, sidekickResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, sidekickResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, sidekickResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, sidekickResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, sidekickResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, sidekickResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, sidekickResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://s3.amazonaws.com/storage.kargo.com/ad/creative');
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${sidekickPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${sidekickPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${sidekickPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${sidekickPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${sidekickPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, sidekickResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, sidekickResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, sidekickResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, sidekickResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, sidekickResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, sidekickResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, sidekickResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, sidekickResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, sidekickResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, sidekickResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, sidekickResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, sidekickResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, sidekickResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, sidekickResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, sidekickResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, sidekickResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, sidekickResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, sidekickResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, sidekickResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, sidekickResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, sidekickResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, sidekickResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, sidekickResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Sidekick Tilt & Catch Creative', () => {
      let sidekickPayload;
      cy.fixture('/DM-Creatives-Body/Sidekick-Body.json').then((payload) => {
        sidekickPayload = extend(sidekickPayload, payload);
        sidekickPayload.name = `test Sidekick ${executionList[2]}`;
        sidekickPayload.execution = executionList[2];
        sidekickPayload.creative_id = generateRandomNumBetween(100000, 999999);
        sidekickPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(sidekickPayload.creative_id);
        sidekickPayload.id_alpha = `DM-CREA-${sidekickPayload.creative_id}`;

        let sidekickResponse;
        cy.fixture('/DM-Creatives-Response/Sidekick-Response.json').then((payload2) => {
          sidekickResponse = extend(sidekickResponse, payload2);

          let stringified = JSON.stringify(sidekickResponse);
          stringified = replaceCreativeExecution(stringified, sidekickPayload.execution);
          stringified = replaceCreativeName(stringified, sidekickPayload.name);
          stringified = replaceCampaignIdentifier(stringified, sidekickPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, sidekickPayload.creative_id);
          stringified = replaceAlphaId(stringified, sidekickPayload.id_alpha);
          cy.log(stringified);

          sidekickResponse = JSON.parse(stringified);

          cy.log(sidekickResponse);
          cy.log(sidekickPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: sidekickPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, sidekickResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, sidekickResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, sidekickResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, sidekickResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, sidekickResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, sidekickResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, sidekickResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, sidekickResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://s3.amazonaws.com/storage.kargo.com/ad/creative');
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${sidekickPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${sidekickPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${sidekickPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${sidekickPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${sidekickPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, sidekickResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, sidekickResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, sidekickResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, sidekickResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, sidekickResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, sidekickResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, sidekickResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, sidekickResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, sidekickResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, sidekickResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, sidekickResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, sidekickResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, sidekickResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, sidekickResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, sidekickResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, sidekickResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, sidekickResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, sidekickResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, sidekickResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, sidekickResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, sidekickResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, sidekickResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, sidekickResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
