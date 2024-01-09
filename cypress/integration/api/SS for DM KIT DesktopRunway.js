/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Desktop Runway KIT Creatives', () => {
    const executionList = ['Animated', 'Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Desktop Runway Animated Creative', () => {
      let desktopRunwayPayload;
      cy.fixture('/DM-Creatives-Body/DesktopRunway-Body.json').then((payload) => {
        desktopRunwayPayload = extend(desktopRunwayPayload, payload);
        desktopRunwayPayload.name = `test Desktop Runway ${executionList[0]}`;
        desktopRunwayPayload.execution = executionList[0];
        desktopRunwayPayload.creative_id = generateRandomNumBetween(100000, 999999);
        desktopRunwayPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(desktopRunwayPayload.creative_id);
        desktopRunwayPayload.id_alpha = `DM-CREA-${desktopRunwayPayload.creative_id}`;

        let desktopRunwayResponse;

        cy.fixture('/DM-Creatives-Response/DesktopRunway-Response.json').then((payload2) => {
          desktopRunwayResponse = extend(desktopRunwayResponse, payload2);

          let stringified = JSON.stringify(desktopRunwayResponse);
          stringified = replaceCreativeExecution(stringified, desktopRunwayPayload.execution);
          stringified = replaceCreativeName(stringified, desktopRunwayPayload.name);
          stringified = replaceCampaignIdentifier(stringified, desktopRunwayPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, desktopRunwayPayload.creative_id);
          stringified = replaceAlphaId(stringified, desktopRunwayPayload.id_alpha);
          cy.log(stringified);

          desktopRunwayResponse = JSON.parse(stringified);

          cy.log(desktopRunwayResponse);
          cy.log(desktopRunwayPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: desktopRunwayPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, desktopRunwayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopRunwayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopRunwayResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopRunwayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopRunwayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopRunwayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopRunwayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopRunwayResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${desktopRunwayPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${desktopRunwayPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${desktopRunwayPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${desktopRunwayPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${desktopRunwayPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, desktopRunwayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopRunwayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopRunwayResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopRunwayResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopRunwayResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, desktopRunwayResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, desktopRunwayResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, desktopRunwayResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, desktopRunwayResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, desktopRunwayResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, desktopRunwayResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, desktopRunwayResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, desktopRunwayResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, desktopRunwayResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, desktopRunwayResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, desktopRunwayResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, desktopRunwayResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, desktopRunwayResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, desktopRunwayResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, desktopRunwayResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, desktopRunwayResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, desktopRunwayResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, desktopRunwayResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Desktop Runway Standard Creative', () => {
      let desktopRunwayPayload;
      cy.fixture('/DM-Creatives-Body/DesktopRunway-Body.json').then((payload) => {
        desktopRunwayPayload = extend(desktopRunwayPayload, payload);
        desktopRunwayPayload.name = `test Desktop Runway ${executionList[1]}`;
        desktopRunwayPayload.execution = executionList[1];
        desktopRunwayPayload.creative_id = generateRandomNumBetween(100000, 999999);
        desktopRunwayPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(desktopRunwayPayload.creative_id);
        desktopRunwayPayload.id_alpha = `DM-CREA-${desktopRunwayPayload.creative_id}`;

        let desktopRunwayResponse;

        cy.fixture('/DM-Creatives-Response/DesktopRunway-Response.json').then((payload2) => {
          desktopRunwayResponse = extend(desktopRunwayResponse, payload2);

          let stringified = JSON.stringify(desktopRunwayResponse);
          stringified = replaceCreativeExecution(stringified, desktopRunwayPayload.execution);
          stringified = replaceCreativeName(stringified, desktopRunwayPayload.name);
          stringified = replaceCampaignIdentifier(stringified, desktopRunwayPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, desktopRunwayPayload.creative_id);
          stringified = replaceAlphaId(stringified, desktopRunwayPayload.id_alpha);
          cy.log(stringified);

          desktopRunwayResponse = JSON.parse(stringified);

          cy.log(desktopRunwayResponse);
          cy.log(desktopRunwayPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: desktopRunwayPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, desktopRunwayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopRunwayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopRunwayResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopRunwayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopRunwayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopRunwayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopRunwayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopRunwayResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${desktopRunwayPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${desktopRunwayPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${desktopRunwayPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${desktopRunwayPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${desktopRunwayPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, desktopRunwayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopRunwayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopRunwayResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopRunwayResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopRunwayResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, desktopRunwayResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, desktopRunwayResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, desktopRunwayResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, desktopRunwayResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, desktopRunwayResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, desktopRunwayResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, desktopRunwayResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, desktopRunwayResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, desktopRunwayResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, desktopRunwayResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, desktopRunwayResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, desktopRunwayResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, desktopRunwayResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, desktopRunwayResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, desktopRunwayResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, desktopRunwayResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, desktopRunwayResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, desktopRunwayResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
