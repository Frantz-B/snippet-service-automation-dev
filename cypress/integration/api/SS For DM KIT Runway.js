/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Runway KIT Creatives', () => {
    it('Test Snippet Service for Runway Standard Creative', () => {
      let runwayPayload;
      let runwayResponse;
      cy.fixture('KIT-DM-Runway-Body/Runway-Standard.json').then((payload) => {
        runwayPayload = extend(runwayPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: runwayPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Runway-Response/Runway-Standard.json').then((payload2) => {
            runwayResponse = extend(runwayResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, runwayResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, runwayResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, runwayResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, runwayResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, runwayResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, runwayResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, runwayResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, runwayResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, runwayResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, runwayResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, runwayResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, runwayResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, runwayResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, runwayResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, runwayResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, runwayResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, runwayResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, runwayResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, runwayResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
