/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Breakout KIT Creatives', () => {
    it('Test Snippet Service for Breakout Animated Creative', () => {
      let breakoutPayload;
      let breakoutResponse;
      cy.fixture('KIT-DM-Breakout-Body/Breakout-Animated.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakoutPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Breakout-Response/Breakout-Animated.json').then((payload2) => {
            breakoutResponse = extend(breakoutResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, breakoutResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, breakoutResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, breakoutResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, breakoutResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, breakoutResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, breakoutResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakout Polling Creative', () => {
      let breakoutPayload;
      let breakoutResponse;
      cy.fixture('KIT-DM-Breakout-Body/Breakout-Polling.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakoutPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Breakout-Response/Breakout-Polling.json').then((payload2) => {
            breakoutResponse = extend(breakoutResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, breakoutResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, breakoutResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, breakoutResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, breakoutResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, breakoutResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, breakoutResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakout Standard Creative', () => {
      let breakoutPayload;
      let breakoutResponse;
      cy.fixture('KIT-DM-Breakout-Body/Breakout-Standard.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakoutPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Breakout-Response/Breakout-Standard.json').then((payload2) => {
            breakoutResponse = extend(breakoutResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, breakoutResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, breakoutResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, breakoutResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, breakoutResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, breakoutResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, breakoutResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakout WalletAds Creative', () => {
      let breakoutPayload;
      let breakoutResponse;
      cy.fixture('KIT-DM-Breakout-Body/Breakout-WalletAds.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakoutPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Breakout-Response/Breakout-WalletAds.json').then((payload2) => {
            breakoutResponse = extend(breakoutResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, breakoutResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, breakoutResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, breakoutResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, breakoutResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, breakoutResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, breakoutResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakout NBDB Creative', () => {
      let breakoutPayload;
      let breakoutResponse;
      cy.fixture('KIT-DM-Breakout-Body/Breakout-NBDB.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakoutPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Breakout-Response/Breakout-NBDB.json').then((payload2) => {
            breakoutResponse = extend(breakoutResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, breakoutResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, breakoutResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, breakoutResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, breakoutResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, breakoutResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, breakoutResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
