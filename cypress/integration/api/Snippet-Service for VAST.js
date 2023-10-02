/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For VAST Creatives', () => {
    it('Test Snippet Service for VTB Instream Creative - Scenario 1', () => {
      // VTB instream - inline - no trackers - enable privacy icon - no SIMID
      let vtbInstreamPayload;
      let vtbInstreamResponse;
      cy.fixture('/Snippet-Service-Body-Json/VTBInstream-VAST-1.json').then((payload) => {
        vtbInstreamPayload = extend(vtbInstreamPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: vtbInstreamPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/VTBInstream-VAST-1.json').then((payload2) => {
            vtbInstreamResponse = extend(vtbInstreamResponse, payload2);
            const latestSnippetId = snippetServiceResponse.body.id;
            const oldSnippetId = vtbInstreamResponse.id;

            assert.deepEqual(snippetServiceResponse.body.options, vtbInstreamResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, vtbInstreamResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, vtbInstreamResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id not empty');
            expect(latestSnippetId).to.be.greaterThan(oldSnippetId); // new generated it is greater than old id
            assert.equal(snippetServiceResponse.body.add_auto_trackers, vtbInstreamResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, vtbInstreamResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, vtbInstreamResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, vtbInstreamResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, vtbInstreamResponse.format, 'format');
            assert.isNotEmpty(snippetServiceResponse.body.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, vtbInstreamResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, vtbInstreamResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, vtbInstreamResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, vtbInstreamResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, vtbInstreamResponse.deleted_at, 'deleted at');
            assert.equal(snippetServiceResponse.body.trackers.length, vtbInstreamResponse.trackers.length, 'Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for VTB Instream Creative - Scenario 2', () => {
      // VTB instream - inline - no trackers - skip after 5 secs - enable privacy icon - no SIMID
      let vtbInstreamPayload;
      let vtbInstreamResponse;
      cy.fixture('/Snippet-Service-Body-Json/VTBInstream-VAST-2.json').then((payload) => {
        vtbInstreamPayload = extend(vtbInstreamPayload, payload);

        const snippetServiceRequest = requestOptions({
          method: 'POST',
          body: vtbInstreamPayload,
          url: 'https://ad-snippet-service.dev.kargo.com/api/snippet',
        });

        cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
          cy.fixture('/Snippet-Service-Response-Json/VTBInstream-VAST-2.json').then((payload2) => {
            vtbInstreamResponse = extend(vtbInstreamResponse, payload2);
            const latestSnippetId = snippetServiceResponse.body.id;
            const oldSnippetId = vtbInstreamResponse.id;

            assert.deepEqual(snippetServiceResponse.body.options, vtbInstreamResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, vtbInstreamResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, vtbInstreamResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id not empty');
            expect(latestSnippetId).to.be.greaterThan(oldSnippetId); // new generated it is greater than old id
            assert.equal(snippetServiceResponse.body.add_auto_trackers, vtbInstreamResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, vtbInstreamResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, vtbInstreamResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, vtbInstreamResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, vtbInstreamResponse.format, 'format');
            assert.isNotEmpty(snippetServiceResponse.body.generated, 'generated');
            assert.equal(snippetServiceResponse.body.id_alpha, vtbInstreamResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, vtbInstreamResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, vtbInstreamResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, vtbInstreamResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, vtbInstreamResponse.deleted_at, 'deleted at');
            assert.equal(snippetServiceResponse.body.trackers.length, vtbInstreamResponse.trackers.length, 'Trackers object');
          });
        });
      });
    });
  });
});
