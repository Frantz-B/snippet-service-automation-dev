/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Top Banner KIT Creatives', () => {
    it('Test Snippet Service for Top Banner Animated Creative', () => {
      let topBannerPayload;
      let topBannerResponse;
      cy.fixture('/KIT-DM-TopBanner-Body/TopBanner-Animated.json').then((payload) => {
        topBannerPayload = extend(topBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: topBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-TopBanner-Response/TopBanner-Animated.json').then((payload2) => {
            topBannerResponse = extend(topBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, topBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, topBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, topBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, topBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, topBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, topBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, topBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, topBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, topBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, topBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, topBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, topBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, topBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, topBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, topBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, topBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, topBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, topBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, topBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Top Banner Shake Creative', () => {
      let topBannerPayload;
      let topBannerResponse;
      cy.fixture('/KIT-DM-TopBanner-Body/TopBanner-Shake.json').then((payload) => {
        topBannerPayload = extend(topBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: topBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-TopBanner-Response/TopBanner-Shake.json').then((payload2) => {
            topBannerResponse = extend(topBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, topBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, topBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, topBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, topBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, topBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, topBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, topBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, topBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, topBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, topBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, topBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, topBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, topBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, topBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, topBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, topBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, topBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, topBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, topBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Top Banner Generator Creative', () => {
      let topBannerPayload;
      let topBannerResponse;
      cy.fixture('/KIT-DM-TopBanner-Body/TopBanner-Generator.json').then((payload) => {
        topBannerPayload = extend(topBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: topBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-TopBanner-Response/TopBanner-Generator.json').then((payload2) => {
            topBannerResponse = extend(topBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, topBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, topBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, topBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, topBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, topBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, topBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, topBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, topBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, topBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, topBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, topBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, topBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, topBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, topBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, topBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, topBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, topBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, topBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, topBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
