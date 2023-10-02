/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For Composer Creatives', () => {
    it('Test Snippet Service for Instagram Carousel Creative', () => {
      let instagramCarouselPayload;
      let instagramCarouselResponse;
      cy.fixture('CM-Creatives-Body/InstagramCarousel.json').then((payload) => {
        instagramCarouselPayload = extend(instagramCarouselPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: instagramCarouselPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/InstagramCarousel.json').then((payload2) => {
            instagramCarouselResponse = extend(instagramCarouselResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, instagramCarouselResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, instagramCarouselResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, instagramCarouselResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, instagramCarouselResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, instagramCarouselResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, instagramCarouselResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, instagramCarouselResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, instagramCarouselResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, instagramCarouselResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, instagramCarouselResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, instagramCarouselResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, instagramCarouselResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, instagramCarouselResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, instagramCarouselResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, instagramCarouselResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, instagramCarouselResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, instagramCarouselResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, instagramCarouselResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, instagramCarouselResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Reels Video Creative', () => {
      let reelsVideoPayload;
      let reelsVideoResponse;
      cy.fixture('CM-Creatives-Body/ReelsVideo.json').then((payload) => {
        reelsVideoPayload = extend(reelsVideoPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: reelsVideoPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/ReelsVideo.json').then((payload2) => {
            reelsVideoResponse = extend(reelsVideoResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, reelsVideoResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, reelsVideoResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, reelsVideoResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, reelsVideoResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, reelsVideoResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, reelsVideoResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, reelsVideoResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, reelsVideoResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, reelsVideoResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, reelsVideoResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, reelsVideoResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, reelsVideoResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, reelsVideoResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, reelsVideoResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, reelsVideoResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, reelsVideoResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, reelsVideoResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, reelsVideoResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, reelsVideoResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Tiktok Video Creative', () => {
      let tiktokVideoPayload;
      let tiktoVideoResponse;
      cy.fixture('CM-Creatives-Body/TiktokVideo.json').then((payload) => {
        tiktokVideoPayload = extend(tiktokVideoPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: tiktokVideoPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/TiktokVideo.json').then((payload2) => {
            tiktoVideoResponse = extend(tiktoVideoResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, tiktoVideoResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, tiktoVideoResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, tiktoVideoResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, tiktoVideoResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, tiktoVideoResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, tiktoVideoResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, tiktoVideoResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, tiktoVideoResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, tiktoVideoResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, tiktoVideoResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, tiktoVideoResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, tiktoVideoResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, tiktoVideoResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, tiktoVideoResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, tiktoVideoResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, tiktoVideoResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, tiktoVideoResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, tiktoVideoResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, tiktoVideoResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Instagram Standard Banner Creative', () => {
      let instagramPayload;
      let instagramResponse;
      cy.fixture('CM-Creatives-Body/InstagramStandardBanner.json').then((payload) => {
        instagramPayload = extend(instagramPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: instagramPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/InstagramStandardBanner.json').then((payload2) => {
            instagramResponse = extend(instagramResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, instagramResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, instagramResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, instagramResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, instagramResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, instagramResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, instagramResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, instagramResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, instagramResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, instagramResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, instagramResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, instagramResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, instagramResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, instagramResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, instagramResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, instagramResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, instagramResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, instagramResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, instagramResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, instagramResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Instagram Standard Video Creative', () => {
      let instagramPayload;
      let instagramResponse;
      cy.fixture('CM-Creatives-Body/InstagramStandardVideo.json').then((payload) => {
        instagramPayload = extend(instagramPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: instagramPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/InstagramStandardVideo.json').then((payload2) => {
            instagramResponse = extend(instagramResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, instagramResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, instagramResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, instagramResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, instagramResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, instagramResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, instagramResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, instagramResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, instagramResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, instagramResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, instagramResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, instagramResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, instagramResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, instagramResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, instagramResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, instagramResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, instagramResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, instagramResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, instagramResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, instagramResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Instagram Scroll Reactive Banner Creative', () => {
      let instagramPayload;
      let instagramResponse;
      cy.fixture('CM-Creatives-Body/InstagramScrollBanner.json').then((payload) => {
        instagramPayload = extend(instagramPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: instagramPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/InstagramScrollBanner.json').then((payload2) => {
            instagramResponse = extend(instagramResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, instagramResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, instagramResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, instagramResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, instagramResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, instagramResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, instagramResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, instagramResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, instagramResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, instagramResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, instagramResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, instagramResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, instagramResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, instagramResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, instagramResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, instagramResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, instagramResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, instagramResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, instagramResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, instagramResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Instagram Scroll Reactive Video Creative', () => {
      let instagramPayload;
      let instagramResponse;
      cy.fixture('CM-Creatives-Body/InstagramScrollVideo.json').then((payload) => {
        instagramPayload = extend(instagramPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: instagramPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/InstagramScrollVideo.json').then((payload2) => {
            instagramResponse = extend(instagramResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, instagramResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, instagramResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, instagramResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, instagramResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, instagramResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, instagramResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, instagramResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, instagramResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, instagramResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, instagramResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, instagramResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, instagramResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, instagramResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, instagramResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, instagramResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, instagramResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, instagramResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, instagramResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, instagramResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Facebook Standard Banner Creative', () => {
      let facebookPayload;
      let facebookResponse;
      cy.fixture('CM-Creatives-Body/FacebookStandardBanner.json').then((payload) => {
        facebookPayload = extend(facebookPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: facebookPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/FacebookStandardBanner.json').then((payload2) => {
            facebookResponse = extend(facebookResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, facebookResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, facebookResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, facebookResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, facebookResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, facebookResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, facebookResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, facebookResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, facebookResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, facebookResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, facebookResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, facebookResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, facebookResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, facebookResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, facebookResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, facebookResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, facebookResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, facebookResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, facebookResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, facebookResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Facebook Standard Video Creative', () => {
      let facebookPayload;
      let facebookResponse;
      cy.fixture('CM-Creatives-Body/FacebookStandardVideo.json').then((payload) => {
        facebookPayload = extend(facebookPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: facebookPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/FacebookStandardVideo.json').then((payload2) => {
            facebookResponse = extend(facebookResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, facebookResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, facebookResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, facebookResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, facebookResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, facebookResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, facebookResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, facebookResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, facebookResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, facebookResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, facebookResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, facebookResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, facebookResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, facebookResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, facebookResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, facebookResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, facebookResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, facebookResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, facebookResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, facebookResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Facebook Scroll Reactive Banner Creative', () => {
      let facebookPayload;
      let facebookResponse;
      cy.fixture('CM-Creatives-Body/FacebookScrollBanner.json').then((payload) => {
        facebookPayload = extend(facebookPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: facebookPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/FacebookScrollBanner.json').then((payload2) => {
            facebookResponse = extend(facebookResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, facebookResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, facebookResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, facebookResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, facebookResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, facebookResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, facebookResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, facebookResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, facebookResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, facebookResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, facebookResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, facebookResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, facebookResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, facebookResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, facebookResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, facebookResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, facebookResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, facebookResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, facebookResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, facebookResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Facebook Scroll Reactive Video Creative', () => {
      let facebookPayload;
      let facebookResponse;
      cy.fixture('CM-Creatives-Body/FacebookScrollVideo.json').then((payload) => {
        facebookPayload = extend(facebookPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: facebookPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('CM-Creatives-Response/FacebookScrollVideo.json').then((payload2) => {
            facebookResponse = extend(facebookResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, facebookResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, facebookResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, facebookResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, facebookResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, facebookResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, facebookResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, facebookResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, facebookResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, facebookResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, facebookResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, facebookResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, facebookResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, facebookResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, facebookResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, facebookResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, facebookResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, facebookResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, facebookResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, facebookResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
