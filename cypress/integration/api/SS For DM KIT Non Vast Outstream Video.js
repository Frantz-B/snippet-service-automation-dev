/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Non-VAST Outstream Video KIT Creatives', () => {
    it('Test Snippet Service for Non-VAST Outstream Video Standard Creative', () => {
      let nonVastPayload;
      let nonVatsResponse;
      cy.fixture('KIT-DM-NonVASTOustream-Body/NonVastOutstream-ViewStream.json').then((payload) => {
        nonVastPayload = extend(nonVastPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: nonVastPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-NonVASTOustream-Response/NonVastOutstream-Viewstream.json').then((payload2) => {
            nonVatsResponse = extend(nonVatsResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, nonVatsResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, nonVatsResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, nonVatsResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, nonVatsResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, nonVatsResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, nonVatsResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, nonVatsResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, nonVatsResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, nonVatsResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, nonVatsResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, nonVatsResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, nonVatsResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, nonVatsResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, nonVatsResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, nonVatsResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, nonVatsResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, nonVatsResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, nonVatsResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, nonVatsResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
