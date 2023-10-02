/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Hover KIT Creatives', () => {
    it('Test Snippet Service for Hover Animated Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Animated.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Animated.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover BTO Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-BTO.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-BTO.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Explorer Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Explorer.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Explorer.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Formation Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Formation.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Formation.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Free Fall Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-FreeFall.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-FreeFall.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Generator Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Generator.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Generator.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Glider Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Glider.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Glider.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Krush Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Krush.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Krush.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Launcher Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Launcher.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Launcher.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Krush Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Krush.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Krush.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover NBDB Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-NBDB.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-NBDB.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Polling Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Polling.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Polling.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Shake Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Shake.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Shake.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Shootout Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Shootout.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Shootout.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Shuffle & Flip Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Shuffle&Flip.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Shuffle&Flip.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Slide to Reveal Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-SlideToReveal.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-SlideToReveal.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Standard Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Standard.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Standard.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Store Locator Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-StoreLocator.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-StoreLocator.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover StoryTeller Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-StoryTeller.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-StoryTeller.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Tile Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Tile.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Tile.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Tilt & Catch Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-Tilt&Catch.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-Tilt&Catch.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Video RM Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-VideoRM.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-VideoRM.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Wipe Away Creative', () => {
      let hoverPayload;
      let hoverResponse;
      cy.fixture('KIT-DM-Hover-Body/Hover-WipeAway.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: hoverPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-Hover-Response/Hover-WipeAway.json').then((payload2) => {
            hoverResponse = extend(hoverResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, hoverResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, hoverResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, hoverResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, hoverResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, hoverResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, hoverResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
