/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For KIT Creatives', () => {
    it('Test Snippet Service for Breakout KIT Creative', () => {
      let breakoutPayload;
      let breakoutResponse;
      cy.fixture('/Snippet-Service-Body-Json/Breakout-KIT.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakoutPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/Breakout-KIT.json').then((payload2) => {
            breakoutResponse = extend(breakoutResponse, payload2);

            assert.deepEqual(breakoutResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(breakoutResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(breakoutResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(breakoutResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(breakoutResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(breakoutResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(breakoutResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(breakoutResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(breakoutResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(breakoutResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(breakoutResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(breakoutResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(breakoutResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(breakoutResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(breakoutResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(breakoutResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(breakoutResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(breakoutResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(breakoutResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor KIT Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/Snippet-Service-Body-Json/Anchor-KIT.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/Anchor-KIT.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(anchorResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(anchorResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(anchorResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(anchorResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(anchorResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(anchorResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(anchorResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(anchorResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(anchorResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(anchorResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(anchorResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(anchorResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(anchorResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(anchorResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(anchorResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(anchorResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(anchorResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(anchorResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(anchorResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover KIT Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('/Snippet-Service-Body-Json/Hover-KIT.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/Hover-KIT.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(hoverResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(hoverResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(hoverResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(hoverResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(hoverResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(hoverResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(hoverResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(hoverResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(hoverResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(hoverResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(hoverResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(hoverResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(hoverResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(hoverResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(hoverResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(hoverResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(hoverResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(hoverResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(hoverResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Key Art KIT Creative', () => {
      let keyArtPayload;
      let keyArtResponse;
      cy.fixture('/Snippet-Service-Body-Json/keyArt-KIT.json').then((payload) => {
        keyArtPayload = extend(keyArtPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: keyArtPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/keyArt-KIT.json').then((payload2) => {
            keyArtResponse = extend(keyArtResponse, payload2);

            assert.deepEqual(keyArtResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(keyArtResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(keyArtResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(keyArtResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(keyArtResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(keyArtResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(keyArtResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(keyArtResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(keyArtResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(keyArtResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(keyArtResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(keyArtResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(keyArtResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(keyArtResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(keyArtResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(keyArtResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(keyArtResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(keyArtResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(keyArtResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
