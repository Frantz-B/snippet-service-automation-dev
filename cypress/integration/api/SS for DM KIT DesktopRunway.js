/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Desktop Runway KIT Creatives', () => {
    it('Test Snippet Service for Desktop Runway Animated Creative', () => {
      let desktopRunwayPayload;
      let desktopRunwayResponse;
      cy.fixture('KIT-DM-DesktopRunway-Body/DesktopRunway-Animated.json').then((payload) => {
        desktopRunwayPayload = extend(desktopRunwayPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: desktopRunwayPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-DesktopRunway-Response/DesktopRunway-Animated.json').then((payload2) => {
            desktopRunwayResponse = extend(desktopRunwayResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, desktopRunwayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopRunwayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopRunwayResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, desktopRunwayResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopRunwayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopRunwayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopRunwayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopRunwayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopRunwayResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, desktopRunwayResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, desktopRunwayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopRunwayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopRunwayResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, desktopRunwayResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, desktopRunwayResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopRunwayResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, desktopRunwayResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopRunwayResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, desktopRunwayResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Desktop Runway Standard Creative', () => {
      let desktopRunwayPayload;
      let desktopRunwayResponse;
      cy.fixture('KIT-DM-DesktopRunway-Body/DesktopRunway-Standard.json').then((payload) => {
        desktopRunwayPayload = extend(desktopRunwayPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: desktopRunwayPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-DesktopRunway-Response/DesktopRunway-Standard.json').then((payload2) => {
            desktopRunwayResponse = extend(desktopRunwayResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, desktopRunwayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopRunwayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopRunwayResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, desktopRunwayResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopRunwayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopRunwayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopRunwayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopRunwayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopRunwayResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, desktopRunwayResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, desktopRunwayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopRunwayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopRunwayResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, desktopRunwayResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, desktopRunwayResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopRunwayResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, desktopRunwayResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopRunwayResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, desktopRunwayResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
