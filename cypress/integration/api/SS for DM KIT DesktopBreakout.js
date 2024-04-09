/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Desktop Breakout KIT Creatives', () => {
    const executionList = ['Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for Desktop Breakout Standard Creative', () => {
      let desktopBreakoutPayload;
      cy.fixture('/DM-Creatives-Body/DesktopBreakout-Body.json').then((payload) => {
        desktopBreakoutPayload = extend(desktopBreakoutPayload, payload);
        desktopBreakoutPayload.name = `test Desktop Breakout ${executionList[0]}`;
        desktopBreakoutPayload.execution = executionList[0];
        desktopBreakoutPayload.creative_id = generateRandomNumBetween(100000, 999999);
        desktopBreakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(desktopBreakoutPayload.creative_id);
        desktopBreakoutPayload.id_alpha = `DM-CREA-${desktopBreakoutPayload.creative_id}`;

        let desktopBreakoutResponse;
        cy.fixture('/DM-Creatives-Response/DesktopBreakout-Response.json').then((payload2) => {
          desktopBreakoutResponse = extend(desktopBreakoutResponse, payload2);

          let stringified = JSON.stringify(desktopBreakoutResponse);
          stringified = replaceCreativeExecution(stringified, desktopBreakoutPayload.execution);
          stringified = replaceCreativeName(stringified, desktopBreakoutPayload.name);
          stringified = replaceCampaignIdentifier(stringified, desktopBreakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, desktopBreakoutPayload.creative_id);
          stringified = replaceAlphaId(stringified, desktopBreakoutPayload.id_alpha);
          cy.log(stringified);

          desktopBreakoutResponse = JSON.parse(stringified);

          cy.log(desktopBreakoutResponse);
          cy.log(desktopBreakoutPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: desktopBreakoutPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, desktopBreakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopBreakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopBreakoutResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopBreakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopBreakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopBreakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopBreakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopBreakoutResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${desktopBreakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${desktopBreakoutPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${desktopBreakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${desktopBreakoutPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${desktopBreakoutPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, desktopBreakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopBreakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopBreakoutResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopBreakoutResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopBreakoutResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, desktopBreakoutResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, desktopBreakoutResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, desktopBreakoutResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, desktopBreakoutResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, desktopBreakoutResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, desktopBreakoutResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, desktopBreakoutResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, desktopBreakoutResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, desktopBreakoutResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, desktopBreakoutResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, desktopBreakoutResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, desktopBreakoutResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, desktopBreakoutResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, desktopBreakoutResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, desktopBreakoutResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, desktopBreakoutResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, desktopBreakoutResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, desktopBreakoutResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
