/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM DesktopHover KIT Creatives', () => {
    it('Test Snippet Service for DesktopHover Animated Creative', () => {
      let desktopHoverPayload;
      let desktopHoverResponse;
      cy.fixture('KIT-DM-DesktopHover-Body/DesktopHover-Animated.json').then((payload) => {
        desktopHoverPayload = extend(desktopHoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: desktopHoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-DesktopHover-Response/DesktopHover-Animated.json').then((payload2) => {
            desktopHoverResponse = extend(desktopHoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, desktopHoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopHoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopHoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, desktopHoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopHoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopHoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopHoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopHoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopHoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, desktopHoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, desktopHoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopHoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopHoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, desktopHoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, desktopHoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopHoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, desktopHoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopHoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, desktopHoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for DesktopHover Standard Creative', () => {
      let desktopHoverPayload;
      let desktopHoverResponse;
      cy.fixture('KIT-DM-DesktopHover-Body/DesktopHover-Standard.json').then((payload) => {
        desktopHoverPayload = extend(desktopHoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: desktopHoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-DesktopHover-Response/DesktopHover-Standard.json').then((payload2) => {
            desktopHoverResponse = extend(desktopHoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, desktopHoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopHoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopHoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, desktopHoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopHoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopHoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopHoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopHoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopHoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, desktopHoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, desktopHoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopHoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopHoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, desktopHoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, desktopHoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopHoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, desktopHoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopHoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, desktopHoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
