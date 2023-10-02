/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Breakaway KIT Creatives', () => {
    it('Test Snippet Service for Breakaway Animated Creative', () => {
      let breakawayPayload;
      let breakawayResponse;
      cy.fixture('KIT-DM-Breakaway-Body/Breakaway-Animated.json').then((payload) => {
        breakawayPayload = extend(breakawayPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakawayPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Breakaway-Response/Breakaway-Animated.json').then((payload2) => {
            breakawayResponse = extend(breakawayResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, breakawayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakawayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakawayResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, breakawayResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakawayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakawayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakawayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakawayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakawayResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, breakawayResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, breakawayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakawayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakawayResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, breakawayResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, breakawayResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakawayResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, breakawayResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakawayResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, breakawayResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakaway Standard Creative', () => {
      let breakawayPayload;
      let breakawayResponse;
      cy.fixture('/KIT-DM-Breakaway-Body/Breakaway-Standard.json').then((payload) => {
        breakawayPayload = extend(breakawayPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakawayPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Breakaway-Response/Breakaway-Standard.json').then((payload2) => {
            breakawayResponse = extend(breakawayResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, breakawayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakawayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakawayResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, breakawayResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakawayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakawayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakawayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakawayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakawayResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, breakawayResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, breakawayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakawayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakawayResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, breakawayResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, breakawayResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakawayResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, breakawayResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakawayResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, breakawayResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
