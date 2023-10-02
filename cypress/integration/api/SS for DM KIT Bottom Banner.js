/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Bottom Banner KIT Creatives', () => {
    it('Test Snippet Service for Bottom Banner Animated Creative', () => {
      let bottomBannerPayload;
      let bottomBannerResponse;
      cy.fixture('/KIT-DM-BottomBanner-Body/BottomBanner-Animated.json').then((payload) => {
        bottomBannerPayload = extend(bottomBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: bottomBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-BottomBanner-Response/BottomBanner-Animated.json').then((payload2) => {
            bottomBannerResponse = extend(bottomBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, bottomBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, bottomBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, bottomBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, bottomBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, bottomBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, bottomBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, bottomBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, bottomBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, bottomBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, bottomBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, bottomBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, bottomBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, bottomBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, bottomBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, bottomBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, bottomBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, bottomBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, bottomBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, bottomBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Bottom Banner Standard Creative', () => {
      let bottomBannerPayload;
      let bottomBannerResponse;
      cy.fixture('/KIT-DM-BottomBanner-Body/BottomBanner-Standard.json').then((payload) => {
        bottomBannerPayload = extend(bottomBannerPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: bottomBannerPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/KIT-DM-BottomBanner-Response/BottomBanner-Standard.json').then((payload2) => {
            bottomBannerResponse = extend(bottomBannerResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, bottomBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, bottomBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, bottomBannerResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, bottomBannerResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, bottomBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, bottomBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, bottomBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, bottomBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, bottomBannerResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, bottomBannerResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, bottomBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, bottomBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, bottomBannerResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, bottomBannerResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, bottomBannerResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, bottomBannerResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, bottomBannerResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, bottomBannerResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, bottomBannerResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
