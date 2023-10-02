/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Desktop Breakout KIT Creatives', () => {
    it('Test Snippet Service for Desktop Breakout Standard Creative', () => {
      let desktopBreakoutPayload;
      let desktopBreakoutResponse;
      cy.fixture('KIT-DM-DesktopBreakout-Body/DesktopBreakout-Standard.json').then((payload) => {
        desktopBreakoutPayload = extend(desktopBreakoutPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: desktopBreakoutPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-DesktopBreakout-Response/DesktopBreakout-Standard.json').then((payload2) => {
            desktopBreakoutResponse = extend(desktopBreakoutResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, desktopBreakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, desktopBreakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, desktopBreakoutResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, desktopBreakoutResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, desktopBreakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, desktopBreakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, desktopBreakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, desktopBreakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, desktopBreakoutResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, desktopBreakoutResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, desktopBreakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, desktopBreakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, desktopBreakoutResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, desktopBreakoutResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, desktopBreakoutResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, desktopBreakoutResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, desktopBreakoutResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, desktopBreakoutResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, desktopBreakoutResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
