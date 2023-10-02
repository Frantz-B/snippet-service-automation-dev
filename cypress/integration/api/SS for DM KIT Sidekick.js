/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Sidekick KIT Creatives', () => {
    it('Test Snippet Service for Sidekick Launcher Creative', () => {
      let sidekickPayload;
      let sidekickResponse;
      cy.fixture('KIT-DM-Sidekick-Body/Sidekick-Launcher.json').then((payload) => {
        sidekickPayload = extend(sidekickPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: sidekickPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Sidekick-Response/Sidekick-Launcher.json').then((payload2) => {
            sidekickResponse = extend(sidekickResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, sidekickResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, sidekickResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, sidekickResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, sidekickResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, sidekickResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, sidekickResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, sidekickResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, sidekickResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, sidekickResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, sidekickResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, sidekickResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, sidekickResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, sidekickResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, sidekickResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, sidekickResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, sidekickResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, sidekickResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, sidekickResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, sidekickResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Sidekick Krush Creative', () => {
      let sidekickPayload;
      let sidekickResponse;
      cy.fixture('KIT-DM-Sidekick-Body/Sidekick-Krush.json').then((payload) => {
        sidekickPayload = extend(sidekickPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: sidekickPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Sidekick-Response/Sidekick-Krush.json').then((payload2) => {
            sidekickResponse = extend(sidekickResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, sidekickResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, sidekickResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, sidekickResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, sidekickResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, sidekickResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, sidekickResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, sidekickResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, sidekickResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, sidekickResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, sidekickResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, sidekickResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, sidekickResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, sidekickResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, sidekickResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, sidekickResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, sidekickResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, sidekickResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, sidekickResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, sidekickResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Sidekick Tilt & Catch Creative', () => {
      let sidekickPayload;
      let sidekickResponse;
      cy.fixture('KIT-DM-Sidekick-Body/Sidekick-Tilt&Catch.json').then((payload) => {
        sidekickPayload = extend(sidekickPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: sidekickPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Sidekick-Response/Sidekick-Tilt&Catch.json').then((payload2) => {
            sidekickResponse = extend(sidekickResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, sidekickResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, sidekickResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, sidekickResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, sidekickResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, sidekickResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, sidekickResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, sidekickResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, sidekickResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, sidekickResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, sidekickResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, sidekickResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, sidekickResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, sidekickResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, sidekickResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, sidekickResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, sidekickResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, sidekickResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, sidekickResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, sidekickResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
