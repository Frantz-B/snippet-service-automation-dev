/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Top Banner KIT Creatives', () => {
    const executionList = ['Animated', 'Shake', 'Generator'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for Top Banner Animated Creative', () => {
      let topBannerPayload;
      cy.fixture('/DM-Creatives-Body/TopBanner-Body.json').then((payload) => {
        topBannerPayload = extend(topBannerPayload, payload);
        topBannerPayload.name = `test TopBanner ${executionList[0]}`;
        topBannerPayload.execution = executionList[0];
        topBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        topBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(topBannerPayload.creative_id);
        topBannerPayload.id_alpha = `DM-CREA-${topBannerPayload.creative_id}`;

        let topBannerResponse;
        cy.fixture('/DM-Creatives-Response/TopBanner-Response.json').then((payload2) => {
          topBannerResponse = extend(topBannerResponse, payload2);

          let stringified = JSON.stringify(topBannerResponse);
          stringified = replaceCreativeExecution(stringified, topBannerPayload.execution);
          stringified = replaceCreativeName(stringified, topBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, topBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, topBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, topBannerPayload.id_alpha);
          cy.log(stringified);

          topBannerResponse = JSON.parse(stringified);

          cy.log(topBannerResponse);
          cy.log(topBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: topBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, topBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, topBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, topBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, topBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, topBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, topBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, topBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, topBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://s3.amazonaws.com/storage.kargo.com/ad/creative');
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${topBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${topBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${topBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${topBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${topBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, topBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, topBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, topBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, topBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, topBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, topBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, topBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, topBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, topBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, topBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, topBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, topBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, topBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, topBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, topBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, topBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, topBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, topBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, topBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, topBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, topBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, topBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, topBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Top Banner Shake Creative', () => {
      let topBannerPayload;
      cy.fixture('/DM-Creatives-Body/TopBanner-Body.json').then((payload) => {
        topBannerPayload = extend(topBannerPayload, payload);
        topBannerPayload.name = `test TopBanner ${executionList[1]}`;
        topBannerPayload.execution = executionList[1];
        topBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        topBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(topBannerPayload.creative_id);
        topBannerPayload.id_alpha = `DM-CREA-${topBannerPayload.creative_id}`;

        let topBannerResponse;
        cy.fixture('/DM-Creatives-Response/TopBanner-Response.json').then((payload2) => {
          topBannerResponse = extend(topBannerResponse, payload2);

          let stringified = JSON.stringify(topBannerResponse);
          stringified = replaceCreativeExecution(stringified, topBannerPayload.execution);
          stringified = replaceCreativeName(stringified, topBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, topBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, topBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, topBannerPayload.id_alpha);
          cy.log(stringified);

          topBannerResponse = JSON.parse(stringified);

          cy.log(topBannerResponse);
          cy.log(topBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: topBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, topBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, topBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, topBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, topBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, topBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, topBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, topBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, topBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://s3.amazonaws.com/storage.kargo.com/ad/creative');
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${topBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${topBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${topBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${topBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${topBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, topBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, topBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, topBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, topBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, topBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, topBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, topBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, topBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, topBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, topBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, topBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, topBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, topBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, topBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, topBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, topBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, topBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, topBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, topBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, topBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, topBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, topBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, topBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Top Banner Generator Creative', () => {
      let topBannerPayload;
      cy.fixture('/DM-Creatives-Body/TopBanner-Body.json').then((payload) => {
        topBannerPayload = extend(topBannerPayload, payload);
        topBannerPayload.name = `test TopBanner ${executionList[2]}`;
        topBannerPayload.execution = executionList[2];
        topBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        topBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(topBannerPayload.creative_id);
        topBannerPayload.id_alpha = `DM-CREA-${topBannerPayload.creative_id}`;

        let topBannerResponse;
        cy.fixture('/DM-Creatives-Response/TopBanner-Response.json').then((payload2) => {
          topBannerResponse = extend(topBannerResponse, payload2);

          let stringified = JSON.stringify(topBannerResponse);
          stringified = replaceCreativeExecution(stringified, topBannerPayload.execution);
          stringified = replaceCreativeName(stringified, topBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, topBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, topBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, topBannerPayload.id_alpha);
          cy.log(stringified);

          topBannerResponse = JSON.parse(stringified);

          cy.log(topBannerResponse);
          cy.log(topBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: topBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, topBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, topBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, topBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, topBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, topBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, topBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, topBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, topBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://s3.amazonaws.com/storage.kargo.com/ad/creative');
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${topBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${topBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${topBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${topBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${topBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, topBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, topBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, topBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, topBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, topBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, topBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, topBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, topBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, topBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, topBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, topBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, topBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, topBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, topBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, topBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, topBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, topBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, topBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, topBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, topBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, topBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, topBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, topBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
