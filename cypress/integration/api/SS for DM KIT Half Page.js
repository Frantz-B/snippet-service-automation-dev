/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Half Page KIT Creatives', () => {
    it('Test Snippet Service for Half Page Standard Creative', () => {
      let halfPagePayload;
      let halfPageResponse;
      cy.fixture('KIT-DM-HalfPage-Body/HalfPage-Standard.json').then((payload) => {
        halfPagePayload = extend(halfPagePayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: halfPagePayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-HalfPage-Response/HalfPage-Standard.json').then((payload2) => {
            halfPageResponse = extend(halfPageResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, halfPageResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, halfPageResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, halfPageResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, halfPageResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, halfPageResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, halfPageResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, halfPageResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, halfPageResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, halfPageResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, halfPageResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, halfPageResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, halfPageResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, halfPageResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, halfPageResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, halfPageResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, halfPageResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, halfPageResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, halfPageResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, halfPageResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
