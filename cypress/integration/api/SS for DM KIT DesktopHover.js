/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM DesktopHover KIT Creatives', () => {
    const executionList = ['Animated', 'Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for DesktopHover Animated Creative', () => {
      let desktopHoverPayload;
      cy.fixture('/DM-Creatives-Body/DesktopHover-Body.json').then((payload) => {
        desktopHoverPayload = extend(desktopHoverPayload, payload);
        desktopHoverPayload.name = `test Desktop Hover ${executionList[0]}`;
        desktopHoverPayload.execution = executionList[0];
        desktopHoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        desktopHoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(desktopHoverPayload.creative_id);
        desktopHoverPayload.id_alpha = `DM-CREA-${desktopHoverPayload.creative_id}`;

        let desktopHoverResponse;
        cy.fixture('/DM-Creatives-Response/DesktopHover-Response.json').then((payload2) => {
          desktopHoverResponse = extend(desktopHoverResponse, payload2);

          let stringified = JSON.stringify(desktopHoverResponse);
          stringified = replaceCreativeExecution(stringified, desktopHoverPayload.execution);
          stringified = replaceCreativeName(stringified, desktopHoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, desktopHoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, desktopHoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, desktopHoverPayload.id_alpha);
          cy.log(stringified);

          desktopHoverResponse = JSON.parse(stringified);

          cy.log(desktopHoverResponse);
          cy.log(desktopHoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: desktopHoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, desktopHoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopHoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopHoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopHoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopHoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopHoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopHoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopHoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${desktopHoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${desktopHoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${desktopHoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${desktopHoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${desktopHoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, desktopHoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopHoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopHoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopHoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopHoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, desktopHoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, desktopHoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, desktopHoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, desktopHoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, desktopHoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, desktopHoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, desktopHoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, desktopHoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, desktopHoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, desktopHoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, desktopHoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, desktopHoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, desktopHoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, desktopHoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, desktopHoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, desktopHoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, desktopHoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, desktopHoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for DesktopHover Standard Creative', () => {
      let desktopHoverPayload;
      cy.fixture('/DM-Creatives-Body/DesktopHover-Body.json').then((payload) => {
        desktopHoverPayload = extend(desktopHoverPayload, payload);
        desktopHoverPayload.name = `test Desktop Hover ${executionList[1]}`;
        desktopHoverPayload.execution = executionList[1];
        desktopHoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        desktopHoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(desktopHoverPayload.creative_id);
        desktopHoverPayload.id_alpha = `DM-CREA-${desktopHoverPayload.creative_id}`;

        let desktopHoverResponse;
        cy.fixture('/DM-Creatives-Response/DesktopHover-Response.json').then((payload2) => {
          desktopHoverResponse = extend(desktopHoverResponse, payload2);

          let stringified = JSON.stringify(desktopHoverResponse);
          stringified = replaceCreativeExecution(stringified, desktopHoverPayload.execution);
          stringified = replaceCreativeName(stringified, desktopHoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, desktopHoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, desktopHoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, desktopHoverPayload.id_alpha);
          cy.log(stringified);

          desktopHoverResponse = JSON.parse(stringified);

          cy.log(desktopHoverResponse);
          cy.log(desktopHoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: desktopHoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, desktopHoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopHoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopHoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopHoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopHoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopHoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopHoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopHoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${desktopHoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${desktopHoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${desktopHoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${desktopHoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${desktopHoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, desktopHoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopHoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopHoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopHoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopHoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, desktopHoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, desktopHoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, desktopHoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, desktopHoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, desktopHoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, desktopHoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, desktopHoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, desktopHoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, desktopHoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, desktopHoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, desktopHoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, desktopHoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, desktopHoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, desktopHoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, desktopHoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, desktopHoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, desktopHoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, desktopHoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
