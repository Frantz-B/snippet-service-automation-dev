/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Instream Video Creatives', () => {
    it('Test Snippet Service for Instream Video Standard Creative', () => {
      let instreamVideoPayload;
      let instreamVideoResponse;
      cy.fixture('DM-InstreamVideo-Body/InstreamVideo-Standard.json').then((payload) => {
        instreamVideoPayload = extend(instreamVideoPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: instreamVideoPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('DM-InstreamVideo-Response/InstreamVideo-Standard.json').then((payload2) => {
            instreamVideoResponse = extend(instreamVideoResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, instreamVideoResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, instreamVideoResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, instreamVideoResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, instreamVideoResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, instreamVideoResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, instreamVideoResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, instreamVideoResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, instreamVideoResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, instreamVideoResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, instreamVideoResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, instreamVideoResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, instreamVideoResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, instreamVideoResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, instreamVideoResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, instreamVideoResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, instreamVideoResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, instreamVideoResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, instreamVideoResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, instreamVideoResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
