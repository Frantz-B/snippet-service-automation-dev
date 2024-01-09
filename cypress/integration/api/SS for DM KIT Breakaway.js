/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Breakaway KIT Creatives', () => {
    const executionList = ['Animated', 'Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Breakaway Animated Creative', () => {
      let breakawayPayload;
      cy.fixture('/DM-Creatives-Body/Breakaway-Body.json').then((payload) => {
        breakawayPayload = extend(breakawayPayload, payload);
        breakawayPayload.name = `test Breakaway ${executionList[0]}`;
        breakawayPayload.execution = executionList[0];
        breakawayPayload.creative_id = generateRandomNumBetween(100000, 999999);
        breakawayPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(breakawayPayload.creative_id);
        breakawayPayload.id_alpha = `DM-CREA-${breakawayPayload.creative_id}`;

        let breakawayResponse;
        cy.fixture('/DM-Creatives-Response/Breakaway-Response.json').then((payload2) => {
          breakawayResponse = extend(breakawayResponse, payload2);

          let stringified = JSON.stringify(breakawayResponse);
          stringified = replaceCreativeExecution(stringified, breakawayPayload.execution);
          stringified = replaceCreativeName(stringified, breakawayPayload.name);
          stringified = replaceCampaignIdentifier(stringified, breakawayPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, breakawayPayload.creative_id);
          stringified = replaceAlphaId(stringified, breakawayPayload.id_alpha);
          cy.log(stringified);

          breakawayResponse = JSON.parse(stringified);

          cy.log(breakawayResponse);
          cy.log(breakawayPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: breakawayPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, breakawayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakawayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakawayResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakawayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakawayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakawayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakawayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakawayResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${breakawayPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${breakawayPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${breakawayPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${breakawayPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${breakawayPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, breakawayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakawayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakawayResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakawayResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakawayResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, breakawayResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, breakawayResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, breakawayResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, breakawayResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, breakawayResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, breakawayResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, breakawayResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, breakawayResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, breakawayResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, breakawayResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, breakawayResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, breakawayResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, breakawayResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, breakawayResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, breakawayResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, breakawayResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, breakawayResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, breakawayResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakaway Standard Creative', () => {
      let breakawayPayload;
      cy.fixture('/DM-Creatives-Body/Breakaway-Body.json').then((payload) => {
        breakawayPayload = extend(breakawayPayload, payload);
        breakawayPayload.name = `test Breakaway ${executionList[1]}`;
        breakawayPayload.execution = executionList[1];
        breakawayPayload.creative_id = generateRandomNumBetween(100000, 999999);
        breakawayPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(breakawayPayload.creative_id);
        breakawayPayload.id_alpha = `DM-CREA-${breakawayPayload.creative_id}`;

        let breakawayResponse;
        cy.fixture('/DM-Creatives-Response/Breakaway-Response.json').then((payload2) => {
          breakawayResponse = extend(breakawayResponse, payload2);

          let stringified = JSON.stringify(breakawayResponse);
          stringified = replaceCreativeExecution(stringified, breakawayPayload.execution);
          stringified = replaceCreativeName(stringified, breakawayPayload.name);
          stringified = replaceCampaignIdentifier(stringified, breakawayPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, breakawayPayload.creative_id);
          stringified = replaceAlphaId(stringified, breakawayPayload.id_alpha);
          cy.log(stringified);

          breakawayResponse = JSON.parse(stringified);

          cy.log(breakawayResponse);
          cy.log(breakawayPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: breakawayPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, breakawayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakawayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakawayResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakawayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakawayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakawayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakawayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakawayResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${breakawayPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${breakawayPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${breakawayPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${breakawayPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${breakawayPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, breakawayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakawayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakawayResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakawayResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakawayResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, breakawayResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, breakawayResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, breakawayResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, breakawayResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, breakawayResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, breakawayResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, breakawayResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, breakawayResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, breakawayResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, breakawayResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, breakawayResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, breakawayResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, breakawayResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, breakawayResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, breakawayResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, breakawayResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, breakawayResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, breakawayResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
