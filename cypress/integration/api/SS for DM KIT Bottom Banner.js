/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, getGeneratedExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Bottom Banner KIT Creatives', () => {
    const executionList = ['Animated', 'Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Bottom Banner Animated Creative', () => {
      let bottomBannerPayload;
      cy.fixture('/DM-Creatives-Body/BottomBanner-Body.json').then((payload) => {
        bottomBannerPayload = extend(bottomBannerPayload, payload);
        bottomBannerPayload.name = `test Bottom Banner ${executionList[0]}`;
        bottomBannerPayload.execution = executionList[0];
        const generatedExecution = getGeneratedExecution(bottomBannerPayload.execution);
        bottomBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        bottomBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(bottomBannerPayload.creative_id);
        bottomBannerPayload.id_alpha = `DM-CREA-${bottomBannerPayload.creative_id}`;

        let bottomBannerResponse;
        cy.fixture('/DM-Creatives-Response/BottomBanner-Response.json').then((payload2) => {
          bottomBannerResponse = extend(bottomBannerResponse, payload2);

          let stringified = JSON.stringify(bottomBannerResponse);
          stringified = replaceCreativeExecution(stringified, bottomBannerPayload.execution);
          stringified = replaceCreativeName(stringified, bottomBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, bottomBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, bottomBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, bottomBannerPayload.id_alpha);
          cy.log(stringified);

          bottomBannerResponse = JSON.parse(stringified);

          cy.log(bottomBannerResponse);
          cy.log(bottomBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: bottomBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, bottomBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, bottomBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, bottomBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, bottomBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, bottomBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, bottomBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, bottomBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, bottomBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, bottomBannerPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${bottomBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${bottomBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${bottomBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${bottomBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${bottomBannerPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\"');
            assert.equal(snippetServiceResponse.body.id_alpha, bottomBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, bottomBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, bottomBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, bottomBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, bottomBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, bottomBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, bottomBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, bottomBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, bottomBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, bottomBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, bottomBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, bottomBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, bottomBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, bottomBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, bottomBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, bottomBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, bottomBannerResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Bottom Banner Standard Creative', () => {
      let bottomBannerPayload;
      cy.fixture('/DM-Creatives-Body/BottomBanner-Body.json').then((payload) => {
        bottomBannerPayload = extend(bottomBannerPayload, payload);
        bottomBannerPayload.name = `test Bottom Banner ${executionList[1]}`;
        bottomBannerPayload.execution = executionList[1];
        const generatedExecution = getGeneratedExecution(bottomBannerPayload.execution);
        bottomBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        bottomBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(bottomBannerPayload.creative_id);
        bottomBannerPayload.id_alpha = `DM-CREA-${bottomBannerPayload.creative_id}`;

        let bottomBannerResponse;
        cy.fixture('/DM-Creatives-Response/BottomBanner-Response.json').then((payload2) => {
          bottomBannerResponse = extend(bottomBannerResponse, payload2);

          let stringified = JSON.stringify(bottomBannerResponse);
          stringified = replaceCreativeExecution(stringified, bottomBannerPayload.execution);
          stringified = replaceCreativeName(stringified, bottomBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, bottomBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, bottomBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, bottomBannerPayload.id_alpha);
          cy.log(stringified);

          bottomBannerResponse = JSON.parse(stringified);

          cy.log(bottomBannerResponse);
          cy.log(bottomBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: bottomBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, bottomBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, bottomBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, bottomBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, bottomBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, bottomBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, bottomBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, bottomBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, bottomBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, bottomBannerPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${bottomBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${bottomBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${bottomBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${bottomBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${bottomBannerPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\"');
            assert.equal(snippetServiceResponse.body.id_alpha, bottomBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, bottomBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, bottomBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, bottomBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, bottomBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, bottomBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, bottomBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, bottomBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, bottomBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, bottomBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, bottomBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, bottomBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, bottomBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, bottomBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, bottomBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, bottomBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, bottomBannerResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });
  });
});
