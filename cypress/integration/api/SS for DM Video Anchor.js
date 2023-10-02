/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Video Anchor Creatives', () => {
    it('Test Snippet Service for Video Anchor Standard Creative', () => {
      let videoAnchorPayload;
      let videoAnchorResponse;
      cy.fixture('DM-VideoAnchor-Body/VideoAnchor-Standard.json').then((payload) => {
        videoAnchorPayload = extend(videoAnchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: videoAnchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('DM-VideoAnchor-Response/VideoAnchor-Standard.json').then((payload2) => {
            videoAnchorResponse = extend(videoAnchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, videoAnchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, videoAnchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, videoAnchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, videoAnchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, videoAnchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, videoAnchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, videoAnchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, videoAnchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, videoAnchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, videoAnchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, videoAnchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, videoAnchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, videoAnchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, videoAnchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, videoAnchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, videoAnchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, videoAnchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, videoAnchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, videoAnchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
