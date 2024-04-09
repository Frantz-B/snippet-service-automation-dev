/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, getGeneratedExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Billboard KIT Creatives', () => {
    const executionList = ['Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for Billboard Standard Creative', () => {
      let billboardPayload;
      cy.fixture('/DM-Creatives-Body/Billboard-Body.json').then((payload) => {
        billboardPayload = extend(billboardPayload, payload);
        billboardPayload.name = `test Billboard ${executionList[0]}`;
        billboardPayload.execution = executionList[0];
        const generatedExecution = getGeneratedExecution(billboardPayload.execution);
        billboardPayload.creative_id = generateRandomNumBetween(100000, 999999);
        billboardPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(billboardPayload.creative_id);
        billboardPayload.id_alpha = `DM-CREA-${billboardPayload.creative_id}`;

        let billboardResponse;
        cy.fixture('/DM-Creatives-Response/Billboard-Response.json').then((payload2) => {
          billboardResponse = extend(billboardResponse, payload2);

          let stringified = JSON.stringify(billboardResponse);
          stringified = replaceCreativeExecution(stringified, billboardPayload.execution);
          stringified = replaceCreativeName(stringified, billboardPayload.name);
          stringified = replaceCampaignIdentifier(stringified, billboardPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, billboardPayload.creative_id);
          stringified = replaceAlphaId(stringified, billboardPayload.id_alpha);
          cy.log(stringified);

          billboardResponse = JSON.parse(stringified);

          cy.log(billboardResponse);
          cy.log(billboardPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: billboardPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, billboardResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, billboardResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, billboardResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, billboardResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, billboardResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, billboardResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, billboardResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, billboardResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, billboardPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${billboardPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${billboardPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${billboardPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${billboardPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${billboardPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, billboardResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, billboardResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, billboardResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, billboardResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, billboardResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, billboardResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, billboardResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, billboardResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, billboardResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, billboardResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, billboardResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, billboardResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, billboardResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, billboardResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, billboardResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, billboardResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, billboardResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });
  });
});
