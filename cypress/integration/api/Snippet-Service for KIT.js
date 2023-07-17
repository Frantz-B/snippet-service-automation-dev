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

    it('Test Snippet Service for Sidekick KIT Creative', () => {
      let sidekickPayload;
      let sidekickResponse;
      cy.fixture('/Snippet-Service-Body-Json/Sidekick-KIT.json').then((payload) => {
        sidekickPayload = extend(sidekickPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: sidekickPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/Sidekick-KIT.json').then((payload2) => {
            sidekickResponse = extend(sidekickResponse, payload2);

            assert.deepEqual(sidekickResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(sidekickResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(sidekickResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(sidekickResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(sidekickResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(sidekickResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(sidekickResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(sidekickResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(sidekickResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(sidekickResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(sidekickResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(sidekickResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(sidekickResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(sidekickResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(sidekickResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(sidekickResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(sidekickResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(sidekickResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(sidekickResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for TopBanner KIT Creative', () => {
      let topBannerPayload;
      let topBannerResponse;
      cy.fixture('/Snippet-Service-Body-Json/TopBanner-KIT.json').then((payload) => {
        topBannerPayload = extend(topBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: topBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/TopBanner-KIT.json').then((payload2) => {
            topBannerResponse = extend(topBannerResponse, payload2);

            assert.deepEqual(topBannerResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(topBannerResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(topBannerResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(topBannerResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(topBannerResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(topBannerResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(topBannerResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(topBannerResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(topBannerResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(topBannerResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(topBannerResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(topBannerResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(topBannerResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(topBannerResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(topBannerResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(topBannerResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(topBannerResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(topBannerResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(topBannerResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Venti KIT Creative', () => {
      let ventiPayload;
      let ventiResponse;
      cy.fixture('/Snippet-Service-Body-Json/Venti-KIT.json').then((payload) => {
        ventiPayload = extend(ventiPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: ventiPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/Venti-KIT.json').then((payload2) => {
            ventiResponse = extend(ventiResponse, payload2);

            assert.deepEqual(ventiResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(ventiResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(ventiResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(ventiResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(ventiResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(ventiResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(ventiResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(ventiResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(ventiResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(ventiResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(ventiResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(ventiResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(ventiResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(ventiResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(ventiResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(ventiResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(ventiResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(ventiResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(ventiResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Instagram Carousel KIT Creative', () => {
      let igCarouselPayload;
      let igCarouselResponse;
      cy.fixture('/Snippet-Service-Body-Json/InstagramCarousel-KIT.json').then((payload) => {
        igCarouselPayload = extend(igCarouselPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: igCarouselPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/InstagramCarousel-KIT.json').then((payload2) => {
            igCarouselResponse = extend(igCarouselResponse, payload2);

            assert.deepEqual(igCarouselResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(igCarouselResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(igCarouselResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(igCarouselResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(igCarouselResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(igCarouselResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(igCarouselResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(igCarouselResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(igCarouselResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(igCarouselResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(igCarouselResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(igCarouselResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(igCarouselResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(igCarouselResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(igCarouselResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(igCarouselResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(igCarouselResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(igCarouselResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(igCarouselResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Celtra KIT Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('/Snippet-Service-Body-Json/MiddleBanner-Celtra-KIT.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/MiddleBanner-Celtra-KIT.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(middleBannerResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(middleBannerResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(middleBannerResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(middleBannerResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(middleBannerResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(middleBannerResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(middleBannerResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(middleBannerResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(middleBannerResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(middleBannerResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(middleBannerResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(middleBannerResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(middleBannerResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(middleBannerResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(middleBannerResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(middleBannerResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(middleBannerResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(middleBannerResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(middleBannerResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner KIT Creative', () => {
      let middleBannerPayload;
      let middleBannerResponse;
      cy.fixture('/Snippet-Service-Body-Json/MiddleBanner-KIT.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: middleBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/MiddleBanner-KIT.json').then((payload2) => {
            middleBannerResponse = extend(middleBannerResponse, payload2);

            assert.deepEqual(middleBannerResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(middleBannerResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(middleBannerResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(middleBannerResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(middleBannerResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(middleBannerResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(middleBannerResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(middleBannerResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(middleBannerResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(middleBannerResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(middleBannerResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(middleBannerResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(middleBannerResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(middleBannerResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(middleBannerResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(middleBannerResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(middleBannerResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(middleBannerResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(middleBannerResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Wrapper Breakout KIT Creative', () => {
      let wrapperBreakoutPayload;
      let wrapperBreakoutResponse;
      cy.fixture('/Snippet-Service-Body-Json/WrapperBreakout-KIT.json').then((payload) => {
        wrapperBreakoutPayload = extend(wrapperBreakoutPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: wrapperBreakoutPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/WrapperBreakout-KIT.json').then((payload2) => {
            wrapperBreakoutResponse = extend(wrapperBreakoutResponse, payload2);

            assert.deepEqual(wrapperBreakoutResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(wrapperBreakoutResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(wrapperBreakoutResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(wrapperBreakoutResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(wrapperBreakoutResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(wrapperBreakoutResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(wrapperBreakoutResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(wrapperBreakoutResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(wrapperBreakoutResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(wrapperBreakoutResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(wrapperBreakoutResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(wrapperBreakoutResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(wrapperBreakoutResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(wrapperBreakoutResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(wrapperBreakoutResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(wrapperBreakoutResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(wrapperBreakoutResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(wrapperBreakoutResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(wrapperBreakoutResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Wrapper Standard KIT Creative', () => {
      let wrapperStandardPayload;
      let wrapperStandardResponse;
      cy.fixture('/Snippet-Service-Body-Json/WrapperStandard-KIT.json').then((payload) => {
        wrapperStandardPayload = extend(wrapperStandardPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: wrapperStandardPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/WrapperStandard-KIT.json').then((payload2) => {
            wrapperStandardResponse = extend(wrapperStandardResponse, payload2);

            assert.deepEqual(wrapperStandardResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(wrapperStandardResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(wrapperStandardResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(wrapperStandardResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(wrapperStandardResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(wrapperStandardResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(wrapperStandardResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(wrapperStandardResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(wrapperStandardResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(wrapperStandardResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(wrapperStandardResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(wrapperStandardResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(wrapperStandardResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(wrapperStandardResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(wrapperStandardResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(wrapperStandardResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(wrapperStandardResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(wrapperStandardResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(wrapperStandardResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for High Rise Max KIT Creative', () => {
      let highRiseMaxPayload;
      let highRiseMaxResponse;
      cy.fixture('/Snippet-Service-Body-Json/HighRiseMax-KIT.json').then((payload) => {
        highRiseMaxPayload = extend(highRiseMaxPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: highRiseMaxPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/HighRiseMax-KIT.json').then((payload2) => {
            highRiseMaxResponse = extend(highRiseMaxResponse, payload2);

            assert.deepEqual(highRiseMaxResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(highRiseMaxResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(highRiseMaxResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(highRiseMaxResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(highRiseMaxResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(highRiseMaxResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(highRiseMaxResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(highRiseMaxResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(highRiseMaxResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(highRiseMaxResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(highRiseMaxResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(highRiseMaxResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(highRiseMaxResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(highRiseMaxResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(highRiseMaxResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(highRiseMaxResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(highRiseMaxResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(highRiseMaxResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(highRiseMaxResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for High Rise ViewStream KIT Creative', () => {
      let highRiseViewStreamPayload;
      let highRiseViewStreamResponse;
      cy.fixture('/Snippet-Service-Body-Json/HighRiseViewstream-KIT.json').then((payload) => {
        highRiseViewStreamPayload = extend(highRiseViewStreamPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: highRiseViewStreamPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/HighRiseViewstream-KIT.json').then((payload2) => {
            highRiseViewStreamResponse = extend(highRiseViewStreamResponse, payload2);

            assert.deepEqual(highRiseViewStreamResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(highRiseViewStreamResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(highRiseViewStreamResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(highRiseViewStreamResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(highRiseViewStreamResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(highRiseViewStreamResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(highRiseViewStreamResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(highRiseViewStreamResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(highRiseViewStreamResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(highRiseViewStreamResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(highRiseViewStreamResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(highRiseViewStreamResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(highRiseViewStreamResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(highRiseViewStreamResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(highRiseViewStreamResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(highRiseViewStreamResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(highRiseViewStreamResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(highRiseViewStreamResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(highRiseViewStreamResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for High Rise KIT Creative', () => {
      let highRisePayload;
      let highRiseResponse;
      cy.fixture('/Snippet-Service-Body-Json/HighRiseViewstream-KIT.json').then((payload) => {
        highRisePayload = extend(highRisePayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: highRisePayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/HighRiseViewstream-KIT.json').then((payload2) => {
            highRiseResponse = extend(highRiseResponse, payload2);

            assert.deepEqual(highRiseResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(highRiseResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(highRiseResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(highRiseResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(highRiseResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(highRiseResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(highRiseResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(highRiseResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(highRiseResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(highRiseResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(highRiseResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(highRiseResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(highRiseResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(highRiseResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(highRiseResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(highRiseResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(highRiseResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(highRiseResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(highRiseResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakaway KIT Creative', () => {
      let breakawayPayload;
      let breakawayResponse;
      cy.fixture('/Snippet-Service-Body-Json/Breakaway-KIT.json').then((payload) => {
        breakawayPayload = extend(breakawayPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: breakawayPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/Breakaway-KIT.json').then((payload2) => {
            breakawayResponse = extend(breakawayResponse, payload2);

            assert.deepEqual(breakawayResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(breakawayResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(breakawayResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(breakawayResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(breakawayResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(breakawayResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(breakawayResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(breakawayResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(breakawayResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(breakawayResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(breakawayResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(breakawayResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(breakawayResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(breakawayResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(breakawayResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(breakawayResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(breakawayResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(breakawayResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(breakawayResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for non Vast Outsream KIT Creative', () => {
      let nonVastOutstreamPayload;
      let nonVastOutstreamResponse;
      cy.fixture('/Snippet-Service-Body-Json/NonVastOutstream-KIT.json').then((payload) => {
        nonVastOutstreamPayload = extend(nonVastOutstreamPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: nonVastOutstreamPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/NonVastOutstream-KIT.json').then((payload2) => {
            nonVastOutstreamResponse = extend(nonVastOutstreamResponse, payload2);

            assert.deepEqual(nonVastOutstreamResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(nonVastOutstreamResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(nonVastOutstreamResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(nonVastOutstreamResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(nonVastOutstreamResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(nonVastOutstreamResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(nonVastOutstreamResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(nonVastOutstreamResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(nonVastOutstreamResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(nonVastOutstreamResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(nonVastOutstreamResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(nonVastOutstreamResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(nonVastOutstreamResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(nonVastOutstreamResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(nonVastOutstreamResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(nonVastOutstreamResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(nonVastOutstreamResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(nonVastOutstreamResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(nonVastOutstreamResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for non Vast Outsream 2 KIT Creative', () => {
      let nonVastOutstream2Payload;
      let nonVastOutstream2Response;
      cy.fixture('/Snippet-Service-Body-Json/NonVastOutstream2-KIT.json').then((payload) => {
        nonVastOutstream2Payload = extend(nonVastOutstream2Payload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: nonVastOutstream2Payload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/NonVastOutstream2-KIT.json').then((payload2) => {
            nonVastOutstream2Response = extend(nonVastOutstream2Response, payload2);

            assert.deepEqual(nonVastOutstream2Response.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(nonVastOutstream2Response.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(nonVastOutstream2Response.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(nonVastOutstream2Response.id, snippetServiceResponse.body.id, 'id');
            assert.equal(nonVastOutstream2Response.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(nonVastOutstream2Response.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(nonVastOutstream2Response.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(nonVastOutstream2Response.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(nonVastOutstream2Response.format, snippetServiceResponse.body.format, 'format');
            assert.equal(nonVastOutstream2Response.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(nonVastOutstream2Response.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(nonVastOutstream2Response.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(nonVastOutstream2Response.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(nonVastOutstream2Response.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(nonVastOutstream2Response.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(nonVastOutstream2Response.version, snippetServiceResponse.body.version, 'version');
            assert.equal(nonVastOutstream2Response.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(nonVastOutstream2Response.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(nonVastOutstream2Response.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Trade Desk KIT Creative', () => {
      let anchorTradeDeskPayload;
      let anchorTradeDeskResponse;
      cy.fixture('/Snippet-Service-Body-Json/Anchor-TradeDesk-KIT.json').then((payload) => {
        anchorTradeDeskPayload = extend(anchorTradeDeskPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: anchorTradeDeskPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/Anchor-TradeDesk-KIT.json').then((payload2) => {
            anchorTradeDeskResponse = extend(anchorTradeDeskResponse, payload2);

            assert.deepEqual(anchorTradeDeskResponse.options, snippetServiceResponse.body.options, 'option object');
            assert.deepEqual(anchorTradeDeskResponse.config, snippetServiceResponse.body.config, 'config object');
            assert.deepEqual(anchorTradeDeskResponse.request_data, snippetServiceResponse.body.request_data, 'request data object');
            assert.equal(anchorTradeDeskResponse.id, snippetServiceResponse.body.id, 'id');
            assert.equal(anchorTradeDeskResponse.add_auto_trackers, snippetServiceResponse.body.add_auto_trackers, 'add auto trackers');
            assert.equal(anchorTradeDeskResponse.creative_id, snippetServiceResponse.body.creative_id, 'Creative id');
            assert.equal(anchorTradeDeskResponse.creative_origin, snippetServiceResponse.body.creative_origin, 'Creative Origin');
            assert.equal(anchorTradeDeskResponse.execution, snippetServiceResponse.body.execution, 'execution');
            assert.equal(anchorTradeDeskResponse.format, snippetServiceResponse.body.format, 'format');
            assert.equal(anchorTradeDeskResponse.generated, snippetServiceResponse.body.generated, 'generated');
            assert.equal(anchorTradeDeskResponse.id_alpha, snippetServiceResponse.body.id_alpha, 'alpha_id');
            assert.equal(anchorTradeDeskResponse.is_rich_media, snippetServiceResponse.body.is_rich_media, 'is rich media');
            assert.equal(anchorTradeDeskResponse.placement_type, snippetServiceResponse.body.placement_type, 'placement type');
            assert.equal(anchorTradeDeskResponse.primary_click_tracker_id, snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(anchorTradeDeskResponse.primary_impression_tracker_id, snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(anchorTradeDeskResponse.version, snippetServiceResponse.body.version, 'version');
            assert.equal(anchorTradeDeskResponse.uuid, snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(anchorTradeDeskResponse.deleted_at, snippetServiceResponse.body.deleted_at, 'deleted at');
            assert.deepEqual(anchorTradeDeskResponse.trackers, snippetServiceResponse.body.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
