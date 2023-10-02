/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Wide Skyscraper KIT Creatives', () => {
    it('Test Snippet Service for Wide Skyscraper Standard Creative', () => {
      let wideSkyscraperPayload;
      let wideSkyscraperrResponse;
      cy.fixture('KIT-DM-WideSkyscraper-Body/WideSkyscraper-Standard.json').then((payload) => {
        wideSkyscraperPayload = extend(wideSkyscraperPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: wideSkyscraperPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('KIT-DM-WideSkyscraper-Response/WideSkyscraper-Standard.json').then((payload2) => {
            wideSkyscraperrResponse = extend(wideSkyscraperrResponse, payload2);

            assert.deepEqual(snippetServiceResponse.body.options, wideSkyscraperrResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, wideSkyscraperrResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, wideSkyscraperrResponse.request_data, 'request data object');
            assert.equal(snippetServiceResponse.body.id, wideSkyscraperrResponse.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, wideSkyscraperrResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, wideSkyscraperrResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, wideSkyscraperrResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, wideSkyscraperrResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, wideSkyscraperrResponse.format, 'format');
            assert.equal(snippetServiceResponse.body.generated, wideSkyscraperrResponse.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, wideSkyscraperrResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, wideSkyscraperrResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, wideSkyscraperrResponse.placement_type, 'placement type');
            assert.equal(snippetServiceResponse.body.primary_click_tracker_id, wideSkyscraperrResponse.primary_click_tracker_id, 'Primary click tracker');
            assert.equal(snippetServiceResponse.body.primary_impression_tracker_id, wideSkyscraperrResponse.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, wideSkyscraperrResponse.version, 'version');
            assert.equal(snippetServiceResponse.body.uuid, wideSkyscraperrResponse.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, wideSkyscraperrResponse.deleted_at, 'deleted at');
            assert.deepEqual(snippetServiceResponse.body.trackers, wideSkyscraperrResponse.trackers, 'Trackers object');
          });
        });
      });
    });
  });
});
