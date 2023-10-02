/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Leaderboard KIT Creatives', () => {
    it('Test Snippet Service for Leaderboard Standard Creative', () => {
      let leaderboardPayload;
      let leaderboardResponse;
      cy.fixture('KIT-DM-Leaderboard-Body/Leaderboard-Standard.json').then((payload) => {
        leaderboardPayload = extend(leaderboardPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: leaderboardPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Leaderboard-Response/Leaderboard-Standard.json').then((payload2) => {
            leaderboardResponse = extend(leaderboardResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, leaderboardResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, leaderboardResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, leaderboardResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, leaderboardResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, leaderboardResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, leaderboardResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, leaderboardResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, leaderboardResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, leaderboardResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, leaderboardResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, leaderboardResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, leaderboardResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, leaderboardResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, leaderboardResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, leaderboardResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, leaderboardResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, leaderboardResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, leaderboardResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, leaderboardResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
