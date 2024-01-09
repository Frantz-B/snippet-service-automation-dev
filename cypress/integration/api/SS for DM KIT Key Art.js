/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Key Art KIT Creatives', () => {
    const executionList = ['BTO Interactive Adhesive Static', 'Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Key Art BTO Creative', () => {
      let keyArtPayload;
      cy.fixture('/DM-Creatives-Body/KeyArt-Body.json').then((payload) => {
        keyArtPayload = extend(keyArtPayload, payload);
        keyArtPayload.name = `test Key Art ${executionList[0]}`;
        keyArtPayload.execution = executionList[0];
        keyArtPayload.creative_id = generateRandomNumBetween(100000, 999999);
        keyArtPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(keyArtPayload.creative_id);
        keyArtPayload.id_alpha = `DM-CREA-${keyArtPayload.creative_id}`;

        let keyArtResponse;
        cy.fixture('/DM-Creatives-Response/KeyArt-Response.json').then((payload2) => {
          keyArtResponse = extend(keyArtResponse, payload2);

          let stringified = JSON.stringify(keyArtResponse);
          stringified = replaceCreativeExecution(stringified, keyArtPayload.execution);
          stringified = replaceCreativeName(stringified, keyArtPayload.name);
          stringified = replaceCampaignIdentifier(stringified, keyArtPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, keyArtPayload.creative_id);
          stringified = replaceAlphaId(stringified, keyArtPayload.id_alpha);
          cy.log(stringified);

          keyArtResponse = JSON.parse(stringified);

          cy.log(keyArtResponse);
          cy.log(keyArtPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: keyArtPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, keyArtResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, keyArtResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, keyArtResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, keyArtResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, keyArtResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, keyArtResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, keyArtResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, keyArtResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${keyArtPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${keyArtPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${keyArtPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${keyArtPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${keyArtPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, keyArtResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, keyArtResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, keyArtResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, keyArtResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, keyArtResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, keyArtResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, keyArtResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, keyArtResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, keyArtResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, keyArtResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, keyArtResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, keyArtResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, keyArtResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, keyArtResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, keyArtResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, keyArtResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, keyArtResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, keyArtResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, keyArtResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, keyArtResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, keyArtResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, keyArtResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, keyArtResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Key Art Standard Creative', () => {
      let keyArtPayload;
      cy.fixture('/DM-Creatives-Body/KeyArt-Body.json').then((payload) => {
        keyArtPayload = extend(keyArtPayload, payload);
        keyArtPayload.name = `test Key Art ${executionList[1]}`;
        keyArtPayload.execution = executionList[1];
        keyArtPayload.creative_id = generateRandomNumBetween(100000, 999999);
        keyArtPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(keyArtPayload.creative_id);
        keyArtPayload.id_alpha = `DM-CREA-${keyArtPayload.creative_id}`;

        let keyArtResponse;
        cy.fixture('/DM-Creatives-Response/KeyArt-Response.json').then((payload2) => {
          keyArtResponse = extend(keyArtResponse, payload2);

          let stringified = JSON.stringify(keyArtResponse);
          stringified = replaceCreativeExecution(stringified, keyArtPayload.execution);
          stringified = replaceCreativeName(stringified, keyArtPayload.name);
          stringified = replaceCampaignIdentifier(stringified, keyArtPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, keyArtPayload.creative_id);
          stringified = replaceAlphaId(stringified, keyArtPayload.id_alpha);
          cy.log(stringified);

          keyArtResponse = JSON.parse(stringified);

          cy.log(keyArtResponse);
          cy.log(keyArtPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: keyArtPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, keyArtResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, keyArtResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, keyArtResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, keyArtResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, keyArtResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, keyArtResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, keyArtResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, keyArtResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${keyArtPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${keyArtPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${keyArtPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${keyArtPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${keyArtPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, keyArtResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, keyArtResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, keyArtResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, keyArtResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, keyArtResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, keyArtResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, keyArtResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, keyArtResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, keyArtResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, keyArtResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, keyArtResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, keyArtResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, keyArtResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, keyArtResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, keyArtResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, keyArtResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, keyArtResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, keyArtResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, keyArtResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, keyArtResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, keyArtResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, keyArtResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, keyArtResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
