/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Outstream Video Creatives', () => {
    it('Test Snippet Service for Outstream Video Standard Creative', () => {
      let outstreamVideoPayload;
      let outstreamVideoResponse;
      cy.fixture('DM-OutstreamVideo-Body/Outstream-Standard.json').then((payload) => {
        outstreamVideoPayload = extend(outstreamVideoPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: outstreamVideoPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('DM-OutstreamVideo-Response/Outstream-Standard.json').then((payload2) => {
            outstreamVideoResponse = extend(outstreamVideoResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, outstreamVideoResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, outstreamVideoResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, outstreamVideoResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, outstreamVideoResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, outstreamVideoResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, outstreamVideoResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, outstreamVideoResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, outstreamVideoResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, outstreamVideoResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, outstreamVideoResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, outstreamVideoResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, outstreamVideoResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, outstreamVideoResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, outstreamVideoResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, outstreamVideoResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, outstreamVideoResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, outstreamVideoResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, outstreamVideoResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, outstreamVideoResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
