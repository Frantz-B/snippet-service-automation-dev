/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM High Rise KIT Creatives', () => {
    it('Test Snippet Service for High Rise Standard Creative', () => {
      let highRisePayload;
      let highRiseResponse;
      cy.fixture('KIT-DM-HighRise-Body/HighRise-Standard.json').then((payload) => {
        highRisePayload = extend(highRisePayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: highRisePayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-HighRise-Response/HighRise-Standard.json').then((payload2) => {
            highRiseResponse = extend(highRiseResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, highRiseResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, highRiseResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, highRiseResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, highRiseResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, highRiseResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, highRiseResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, highRiseResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, highRiseResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, highRiseResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, highRiseResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, highRiseResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, highRiseResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, highRiseResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, highRiseResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, highRiseResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, highRiseResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, highRiseResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, highRiseResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, highRiseResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for High Rise Viewstream Creative', () => {
      let highRisePayload;
      let highRiseResponse;
      cy.fixture('KIT-DM-HighRise-Body/HighRise-Viewstream.json').then((payload) => {
        highRisePayload = extend(highRisePayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: highRisePayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-HighRise-Response/HighRise-Viewstream.json').then((payload2) => {
            highRiseResponse = extend(highRiseResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, highRiseResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, highRiseResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, highRiseResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, highRiseResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, highRiseResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, highRiseResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, highRiseResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, highRiseResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, highRiseResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, highRiseResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, highRiseResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, highRiseResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, highRiseResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, highRiseResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, highRiseResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, highRiseResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, highRiseResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, highRiseResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, highRiseResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
