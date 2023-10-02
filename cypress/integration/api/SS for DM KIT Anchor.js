/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Anchor KIT Creatives', () => {
    it('Test Snippet Service for Anchor Animated Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-Animated.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-Animated.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Explorer Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-Explorer.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-Explorer.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Free Fall Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-FreeFall.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-FreeFall.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Generator Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-Generator.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-Generator.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Glider Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-Glider.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-Glider.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor NBDB Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-NBDB.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-NBDB.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Polling Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-Polling.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-Polling.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Shake Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-Shake.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-Shake.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Shuffle & Flip Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-Shuffle&Flip.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-Shuffle&Flip.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Slide to Reveal Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-SlideToReveal.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-SlideToReveal.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Standard Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-Standard.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-Standard.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Store Locator Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-StoreLocator.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-StoreLocator.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for StoryTeller Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-StoryTeller.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-StoryTeller.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Video RM Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-VideoRM.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-VideoRM.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Wipe Away Creative', () => {
      let anchorPayload;
      let anchorResponse;
      cy.fixture('/KIT-DM-Anchor-Body/Anchor-WipeAway.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-Anchor-Response/Anchor-WipeAway.json').then((payload2) => {
            anchorResponse = extend(anchorResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, anchorResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, anchorResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, anchorResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, anchorResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, anchorResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, anchorResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
