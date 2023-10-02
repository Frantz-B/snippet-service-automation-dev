/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Large Leaderboard KIT Creatives', () => {
    it('Test Snippet Service for Large Leaderboard BTO Creative', () => {
      let largeLeaderboardPayload;
      let largeLeaderboardResponse;
      cy.fixture('KIT-DM-LargeLeaderBoard-Body/LargeLeaderBoard-Standard.json').then((payload) => {
        largeLeaderboardPayload = extend(largeLeaderboardPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: largeLeaderboardPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-LargeLeaderBoard-Response/LargeLeaderBoard-Standard.json').then((payload2) => {
            largeLeaderboardResponse = extend(largeLeaderboardResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, largeLeaderboardResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, largeLeaderboardResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, largeLeaderboardResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, largeLeaderboardResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, largeLeaderboardResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, largeLeaderboardResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, largeLeaderboardResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, largeLeaderboardResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, largeLeaderboardResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, largeLeaderboardResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, largeLeaderboardResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, largeLeaderboardResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, largeLeaderboardResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, largeLeaderboardResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, largeLeaderboardResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, largeLeaderboardResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, largeLeaderboardResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, largeLeaderboardResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, largeLeaderboardResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
