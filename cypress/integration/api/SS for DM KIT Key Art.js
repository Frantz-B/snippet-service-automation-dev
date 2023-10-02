/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Key Art KIT Creatives', () => {
    it('Test Snippet Service for Key Art BTO Creative', () => {
      let keyArtPayload;
      let keyArtResponse;
      cy.fixture('KIT-DM-KeyArt-Body/KeyArt-BTO.json').then((payload) => {
        keyArtPayload = extend(keyArtPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: keyArtPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-KeyArt-Response/KeyArt-BTO.json').then((payload2) => {
            keyArtResponse = extend(keyArtResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, keyArtResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, keyArtResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, keyArtResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, keyArtResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, keyArtResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, keyArtResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, keyArtResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, keyArtResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, keyArtResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, keyArtResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, keyArtResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, keyArtResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, keyArtResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, keyArtResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, keyArtResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, keyArtResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, keyArtResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, keyArtResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, keyArtResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Key Art Standard Creative', () => {
      let keyArtPayload;
      let keyArtResponse;
      cy.fixture('KIT-DM-KeyArt-Body/KeyArt-Standard.json').then((payload) => {
        keyArtPayload = extend(keyArtPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: keyArtPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-KeyArt-Response/KeyArt-Standard.json').then((payload2) => {
            keyArtResponse = extend(keyArtResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, keyArtResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, keyArtResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, keyArtResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, keyArtResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, keyArtResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, keyArtResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, keyArtResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, keyArtResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, keyArtResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, keyArtResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, keyArtResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, keyArtResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, keyArtResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, keyArtResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, keyArtResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, keyArtResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, keyArtResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, keyArtResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, keyArtResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
