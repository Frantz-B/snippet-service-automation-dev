/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Breakout KIT Creatives', () => {
    const executionList = ['Animated', 'Polling', 'Standard', 'WalletAds', 'NBDB'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Breakout Animated Creative', () => {
      let breakoutPayload;
      cy.fixture('/DM-Creatives-Body/Breakout-Body.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);
        breakoutPayload.name = `test Breakout ${executionList[0]}`;
        breakoutPayload.execution = executionList[0];
        breakoutPayload.creative_id = generateRandomNumBetween(100000, 999999);
        breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(breakoutPayload.creative_id);
        breakoutPayload.id_alpha = `DM-CREA-${breakoutPayload.creative_id}`;

        let breakoutResponse;
        cy.fixture('/DM-Creatives-Response/Breakout-Response.json').then((payload2) => {
          breakoutResponse = extend(breakoutResponse, payload2);

          let stringified = JSON.stringify(breakoutResponse);
          stringified = replaceCreativeExecution(stringified, breakoutPayload.execution);
          stringified = replaceCreativeName(stringified, breakoutPayload.name);
          stringified = replaceCampaignIdentifier(stringified, breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, breakoutPayload.creative_id);
          stringified = replaceAlphaId(stringified, breakoutPayload.id_alpha);
          cy.log(stringified);

          breakoutResponse = JSON.parse(stringified);

          cy.log(breakoutResponse);
          cy.log(breakoutPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: breakoutPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${breakoutPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${breakoutPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${breakoutPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, breakoutResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, breakoutResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, breakoutResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, breakoutResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, breakoutResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, breakoutResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, breakoutResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, breakoutResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, breakoutResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, breakoutResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, breakoutResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, breakoutResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, breakoutResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, breakoutResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, breakoutResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, breakoutResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, breakoutResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, breakoutResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakout Polling Creative', () => {
      let breakoutPayload;
      cy.fixture('/DM-Creatives-Body/Breakout-Body.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);
        breakoutPayload.name = `test Breakout ${executionList[1]}`;
        breakoutPayload.execution = executionList[1];
        breakoutPayload.creative_id = generateRandomNumBetween(100000, 999999);
        breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(breakoutPayload.creative_id);
        breakoutPayload.id_alpha = `DM-CREA-${breakoutPayload.creative_id}`;

        let breakoutResponse;
        cy.fixture('/DM-Creatives-Response/Breakout-Response.json').then((payload2) => {
          breakoutResponse = extend(breakoutResponse, payload2);

          let stringified = JSON.stringify(breakoutResponse);
          stringified = replaceCreativeExecution(stringified, breakoutPayload.execution);
          stringified = replaceCreativeName(stringified, breakoutPayload.name);
          stringified = replaceCampaignIdentifier(stringified, breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, breakoutPayload.creative_id);
          stringified = replaceAlphaId(stringified, breakoutPayload.id_alpha);
          cy.log(stringified);

          breakoutResponse = JSON.parse(stringified);

          cy.log(breakoutResponse);
          cy.log(breakoutPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: breakoutPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${breakoutPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${breakoutPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${breakoutPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, breakoutResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, breakoutResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, breakoutResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, breakoutResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, breakoutResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, breakoutResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, breakoutResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, breakoutResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, breakoutResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, breakoutResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, breakoutResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, breakoutResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, breakoutResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, breakoutResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, breakoutResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, breakoutResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, breakoutResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, breakoutResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakout Standard Creative', () => {
      let breakoutPayload;
      cy.fixture('/DM-Creatives-Body/Breakout-Body.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);
        breakoutPayload.name = `test Breakout ${executionList[2]}`;
        breakoutPayload.execution = executionList[2];
        breakoutPayload.creative_id = generateRandomNumBetween(100000, 999999);
        breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(breakoutPayload.creative_id);
        breakoutPayload.id_alpha = `DM-CREA-${breakoutPayload.creative_id}`;

        let breakoutResponse;
        cy.fixture('/DM-Creatives-Response/Breakout-Response.json').then((payload2) => {
          breakoutResponse = extend(breakoutResponse, payload2);

          let stringified = JSON.stringify(breakoutResponse);
          stringified = replaceCreativeExecution(stringified, breakoutPayload.execution);
          stringified = replaceCreativeName(stringified, breakoutPayload.name);
          stringified = replaceCampaignIdentifier(stringified, breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, breakoutPayload.creative_id);
          stringified = replaceAlphaId(stringified, breakoutPayload.id_alpha);
          cy.log(stringified);

          breakoutResponse = JSON.parse(stringified);

          cy.log(breakoutResponse);
          cy.log(breakoutPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: breakoutPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${breakoutPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${breakoutPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${breakoutPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, breakoutResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, breakoutResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, breakoutResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, breakoutResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, breakoutResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, breakoutResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, breakoutResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, breakoutResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, breakoutResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, breakoutResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, breakoutResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, breakoutResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, breakoutResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, breakoutResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, breakoutResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, breakoutResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, breakoutResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, breakoutResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakout WalletAds Creative', () => {
      let breakoutPayload;
      cy.fixture('/DM-Creatives-Body/Breakout-Body.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);
        breakoutPayload.name = `test Breakout ${executionList[3]}`;
        breakoutPayload.execution = executionList[3];
        breakoutPayload.creative_id = generateRandomNumBetween(100000, 999999);
        breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(breakoutPayload.creative_id);
        breakoutPayload.id_alpha = `DM-CREA-${breakoutPayload.creative_id}`;

        let breakoutResponse;
        cy.fixture('/DM-Creatives-Response/Breakout-Response.json').then((payload2) => {
          breakoutResponse = extend(breakoutResponse, payload2);

          let stringified = JSON.stringify(breakoutResponse);
          stringified = replaceCreativeExecution(stringified, breakoutPayload.execution);
          stringified = replaceCreativeName(stringified, breakoutPayload.name);
          stringified = replaceCampaignIdentifier(stringified, breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, breakoutPayload.creative_id);
          stringified = replaceAlphaId(stringified, breakoutPayload.id_alpha);
          cy.log(stringified);

          breakoutResponse = JSON.parse(stringified);

          cy.log(breakoutResponse);
          cy.log(breakoutPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: breakoutPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${breakoutPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${breakoutPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${breakoutPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, breakoutResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, breakoutResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, breakoutResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, breakoutResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, breakoutResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, breakoutResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, breakoutResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, breakoutResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, breakoutResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, breakoutResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, breakoutResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, breakoutResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, breakoutResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, breakoutResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, breakoutResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, breakoutResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, breakoutResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, breakoutResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Breakout NBDB Creative', () => {
      let breakoutPayload;
      cy.fixture('/DM-Creatives-Body/Breakout-Body.json').then((payload) => {
        breakoutPayload = extend(breakoutPayload, payload);
        breakoutPayload.name = `test Breakout ${executionList[4]}`;
        breakoutPayload.execution = executionList[4];
        breakoutPayload.creative_id = generateRandomNumBetween(100000, 999999);
        breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(breakoutPayload.creative_id);
        breakoutPayload.id_alpha = `DM-CREA-${breakoutPayload.creative_id}`;

        let breakoutResponse;
        cy.fixture('/DM-Creatives-Response/Breakout-Response.json').then((payload2) => {
          breakoutResponse = extend(breakoutResponse, payload2);

          let stringified = JSON.stringify(breakoutResponse);
          stringified = replaceCreativeExecution(stringified, breakoutPayload.execution);
          stringified = replaceCreativeName(stringified, breakoutPayload.name);
          stringified = replaceCampaignIdentifier(stringified, breakoutPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, breakoutPayload.creative_id);
          stringified = replaceAlphaId(stringified, breakoutPayload.id_alpha);
          cy.log(stringified);

          breakoutResponse = JSON.parse(stringified);

          cy.log(breakoutResponse);
          cy.log(breakoutPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: breakoutPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, breakoutResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, breakoutResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, breakoutResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, breakoutResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, breakoutResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, breakoutResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, breakoutResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, breakoutResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${breakoutPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${breakoutPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${breakoutPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${breakoutPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, breakoutResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, breakoutResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, breakoutResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, breakoutResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, breakoutResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, breakoutResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, breakoutResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, breakoutResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, breakoutResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, breakoutResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, breakoutResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, breakoutResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, breakoutResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, breakoutResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, breakoutResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, breakoutResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, breakoutResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, breakoutResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, breakoutResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, breakoutResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, breakoutResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, breakoutResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, breakoutResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
