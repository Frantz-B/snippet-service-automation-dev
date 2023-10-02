/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Billboard KIT Creatives', () => {
    it('Test Snippet Service for Billboard Standard Creative', () => {
      let billboardPayload;
      let billboardResponse;
      cy.fixture('KIT-DM-Billboard-Body/Billboard-Standard.json').then((payload) => {
        billboardPayload = extend(billboardPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: billboardPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Billboard-Response/Billboard-Standard.json').then((payload2) => {
            billboardResponse = extend(billboardResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, billboardResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, billboardResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, billboardResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, billboardResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, billboardResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, billboardResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, billboardResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, billboardResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, billboardResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, billboardResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, billboardResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, billboardResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, billboardResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, billboardResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, billboardResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, billboardResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, billboardResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, billboardResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, billboardResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
