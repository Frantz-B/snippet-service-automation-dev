/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Middle Banner KIT Creatives', () => {
    it('Test Snippet Service for Middle Banner Animated Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-Animated.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-Animated.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Explorer Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-Explorer.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-Explorer.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Formation Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-Formation.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-Formation.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Instant Native Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-InstantNative.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-InstantNative.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner NBDB Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-NBDB.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-NBDB.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Polling Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-Polling.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-Polling.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Slide To Reveal Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-SlideToReveal.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-SlideToReveal.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Standard Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-Standard.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-Standard.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Tiles Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-Tiles.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-Tiles.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Video RM Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-VideoRM.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-VideoRM.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Viewstream Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-ViewStream.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-ViewStream.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Wipe Away Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-WipeAway.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-WipeAway.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Store Locator Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('KIT-DM-MiddleBanner-Body/MiddleBanner-StoreLocator.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-MiddleBanner-Response/MiddleBanner-StoreLocator.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, middleBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, middleBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, middleBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, middleBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, middleBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, middleBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
