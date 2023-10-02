/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Venti KIT Creatives', () => {
    it('Test Snippet Service for Venti Animated Creative', () => {
      let ventiPayload;
      let ventiResponse;
      cy.fixture('/KIT-DM-Venti-Body/Venti-Animated.json').then((payload) => {
        ventiPayload = extend(ventiPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: ventiPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Venti-Response/Venti-Animated.json').then((payload2) => {
            ventiResponse = extend(ventiResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, ventiResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, ventiResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, ventiResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, ventiResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, ventiResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, ventiResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, ventiResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, ventiResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, ventiResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, ventiResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, ventiResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, ventiResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, ventiResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, ventiResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, ventiResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, ventiResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, ventiResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, ventiResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, ventiResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Venti Explorer Creative', () => {
      let ventiPayload;
      let ventiResponse;
      cy.fixture('/KIT-DM-Venti-Body/Venti-Explorer.json').then((payload) => {
        ventiPayload = extend(ventiPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: ventiPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Venti-Response/Venti-Explorer.json').then((payload2) => {
            ventiResponse = extend(ventiResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, ventiResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, ventiResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, ventiResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, ventiResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, ventiResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, ventiResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, ventiResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, ventiResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, ventiResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, ventiResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, ventiResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, ventiResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, ventiResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, ventiResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, ventiResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, ventiResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, ventiResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, ventiResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, ventiResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Venti Standard Creative', () => {
      let ventiPayload;
      let ventiResponse;
      cy.fixture('/KIT-DM-Venti-Body/Venti-Standard.json').then((payload) => {
        ventiPayload = extend(ventiPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: ventiPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Venti-Response/Venti-Standard.json').then((payload2) => {
            ventiResponse = extend(ventiResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, ventiResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, ventiResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, ventiResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, ventiResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, ventiResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, ventiResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, ventiResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, ventiResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, ventiResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, ventiResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, ventiResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, ventiResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, ventiResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, ventiResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, ventiResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, ventiResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, ventiResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, ventiResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, ventiResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
