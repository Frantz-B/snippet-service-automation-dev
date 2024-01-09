/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Wide Skyscraper KIT Creatives', () => {
    const executionList = ['Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Wide Skyscraper Standard Creative', () => {
      let wideSkyscraperPayload;
      cy.fixture('/DM-Creatives-Body/WideSkyscraper-Body.json').then((payload) => {
        wideSkyscraperPayload = extend(wideSkyscraperPayload, payload);
        wideSkyscraperPayload.name = `test WideSkyscraper ${executionList[0]}`;
        wideSkyscraperPayload.execution = executionList[0];
        wideSkyscraperPayload.creative_id = generateRandomNumBetween(100000, 999999);
        wideSkyscraperPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(wideSkyscraperPayload.creative_id);
        wideSkyscraperPayload.id_alpha = `DM-CREA-${wideSkyscraperPayload.creative_id}`;

        let wideSkyscraperrResponse;
        cy.fixture('/DM-Creatives-Response/WideSkyscraper-Response.json').then((payload2) => {
          wideSkyscraperrResponse = extend(wideSkyscraperrResponse, payload2);

          let stringified = JSON.stringify(wideSkyscraperrResponse);
          stringified = replaceCreativeExecution(stringified, wideSkyscraperPayload.execution);
          stringified = replaceCreativeName(stringified, wideSkyscraperPayload.name);
          stringified = replaceCampaignIdentifier(stringified, wideSkyscraperPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, wideSkyscraperPayload.creative_id);
          stringified = replaceAlphaId(stringified, wideSkyscraperPayload.id_alpha);
          cy.log(stringified);

          wideSkyscraperrResponse = JSON.parse(stringified);

          cy.log(wideSkyscraperrResponse);
          cy.log(wideSkyscraperPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: wideSkyscraperPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, wideSkyscraperrResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, wideSkyscraperrResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, wideSkyscraperrResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, wideSkyscraperrResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, wideSkyscraperrResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, wideSkyscraperrResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, wideSkyscraperrResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, wideSkyscraperrResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://s3.amazonaws.com/storage.kargo.com/ad/creative');
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${wideSkyscraperPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${wideSkyscraperPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${wideSkyscraperPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${wideSkyscraperPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${wideSkyscraperPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, wideSkyscraperrResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, wideSkyscraperrResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, wideSkyscraperrResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, wideSkyscraperrResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, wideSkyscraperrResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, wideSkyscraperrResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, wideSkyscraperrResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, wideSkyscraperrResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, wideSkyscraperrResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, wideSkyscraperrResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, wideSkyscraperrResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, wideSkyscraperrResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, wideSkyscraperrResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, wideSkyscraperrResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, wideSkyscraperrResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, wideSkyscraperrResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, wideSkyscraperrResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, wideSkyscraperrResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, wideSkyscraperrResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, wideSkyscraperrResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, wideSkyscraperrResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, wideSkyscraperrResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, wideSkyscraperrResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
