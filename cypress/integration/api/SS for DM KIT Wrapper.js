/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Wrapper KIT Creatives', () => {
    it('Test Snippet Service for Wrapper Standard Creative', () => {
      let wrapperPayload;
      let wrapperResponse;
      cy.fixture('KIT-DM-Wrapper-Body/Wrapper-Standard.json').then((payload) => {
        wrapperPayload = extend(wrapperPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: wrapperPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Wrapper-Response/Wrapper-Standard.json').then((payload2) => {
            wrapperResponse = extend(wrapperResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, wrapperResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, wrapperResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, wrapperResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, wrapperResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, wrapperResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, wrapperResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, wrapperResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, wrapperResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, wrapperResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, wrapperResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, wrapperResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, wrapperResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, wrapperResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, wrapperResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, wrapperResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, wrapperResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, wrapperResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, wrapperResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, wrapperResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
