/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');


context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Large Leaderboard KIT Creatives', () => {
    const executionList = ['Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Large Leaderboard Standard Creative', () => {
      let largeLeaderboardPayload;
      cy.fixture('/DM-Creatives-Body/LargeLeaderBoard-Body.json').then((payload) => {
        largeLeaderboardPayload = extend(largeLeaderboardPayload, payload);
        largeLeaderboardPayload.name = `test Large LeaderBoard ${executionList[0]}`;
        largeLeaderboardPayload.execution = executionList[0];
        largeLeaderboardPayload.creative_id = generateRandomNumBetween(100000, 999999);
        largeLeaderboardPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(largeLeaderboardPayload.creative_id);
        largeLeaderboardPayload.id_alpha = `DM-CREA-${largeLeaderboardPayload.creative_id}`;

        let largeLeaderboardResponse;
        cy.fixture('/DM-Creatives-Response/LargeLeaderBoard-Response.json').then((payload2) => {
          largeLeaderboardResponse = extend(largeLeaderboardResponse, payload2);

          let stringified = JSON.stringify(largeLeaderboardResponse);
          stringified = replaceCreativeExecution(stringified, largeLeaderboardPayload.execution);
          stringified = replaceCreativeName(stringified, largeLeaderboardPayload.name);
          stringified = replaceCampaignIdentifier(stringified, largeLeaderboardPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, largeLeaderboardPayload.creative_id);
          stringified = replaceAlphaId(stringified, largeLeaderboardPayload.id_alpha);
          cy.log(stringified);

          largeLeaderboardResponse = JSON.parse(stringified);

          cy.log(largeLeaderboardResponse);
          cy.log(largeLeaderboardPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: largeLeaderboardPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, largeLeaderboardResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, largeLeaderboardResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, largeLeaderboardResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, largeLeaderboardResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, largeLeaderboardResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, largeLeaderboardResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, largeLeaderboardResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, largeLeaderboardResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${largeLeaderboardPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${largeLeaderboardPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${largeLeaderboardPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${largeLeaderboardPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${largeLeaderboardPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, largeLeaderboardResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, largeLeaderboardResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, largeLeaderboardResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, largeLeaderboardResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, largeLeaderboardResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, largeLeaderboardResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, largeLeaderboardResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, largeLeaderboardResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, largeLeaderboardResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, largeLeaderboardResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, largeLeaderboardResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, largeLeaderboardResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, largeLeaderboardResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, largeLeaderboardResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, largeLeaderboardResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, largeLeaderboardResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, largeLeaderboardResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, largeLeaderboardResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, largeLeaderboardResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, largeLeaderboardResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, largeLeaderboardResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, largeLeaderboardResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, largeLeaderboardResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
