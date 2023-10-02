/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Swipeup KIT Creatives', () => {
    it('Test Snippet Service for Swipeup Standard Creative', () => {
      let swipeupPayload;
      let swipeupResponse;
      cy.fixture('KIT-DM-Swipeup-Body/Swipeup-Standard.json').then((payload) => {
        swipeupPayload = extend(swipeupPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: swipeupPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Swipeup-Response/Swipeup-Standard.json').then((payload2) => {
            swipeupResponse = extend(swipeupResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, swipeupResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, swipeupResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, swipeupResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, swipeupResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, swipeupResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, swipeupResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, swipeupResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, swipeupResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, swipeupResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, swipeupResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, swipeupResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, swipeupResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, swipeupResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, swipeupResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, swipeupResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, swipeupResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, swipeupResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, swipeupResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, swipeupResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
