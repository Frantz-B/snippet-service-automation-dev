/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Middle Banner KIT Creatives', () => {
    const executionList = ['Animated', 'Explorer', 'Formation', 'Instant Native', 'NBDB', 'Polling', 'Slide To Reveal', 'Standard', 'Tiles', 'Video RM', 'Viewstream', 'Wipe Away', 'Store Locator'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Middle Banner Animated Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[0]}`;
        middleBannerPayload.execution = executionList[0];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Explorer Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[1]}`;
        middleBannerPayload.execution = executionList[1];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Formation Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[2]}`;
        middleBannerPayload.execution = executionList[2];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Instant Native Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[3]}`;
        middleBannerPayload.execution = executionList[3];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner NBDB Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[4]}`;
        middleBannerPayload.execution = executionList[4];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Polling Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[5]}`;
        middleBannerPayload.execution = executionList[5];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Slide To Reveal Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[6]}`;
        middleBannerPayload.execution = executionList[6];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Standard Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[7]}`;
        middleBannerPayload.execution = executionList[7];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Tiles Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[8]}`;
        middleBannerPayload.execution = executionList[8];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Video RM Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[9]}`;
        middleBannerPayload.execution = executionList[9];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Viewstream Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[10]}`;
        middleBannerPayload.execution = executionList[10];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[3].tid, 'test.cs-dev.video-start', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].is_auto_created, middleBannerResponse.trackers[3].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].name, middleBannerResponse.trackers[3].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].associated_field, middleBannerResponse.trackers[3].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].type, middleBannerResponse.trackers[3].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].category, middleBannerResponse.trackers[3].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].url, middleBannerResponse.trackers[3].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[4].tid, 'test.cs-dev.video-q1', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].is_auto_created, middleBannerResponse.trackers[4].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].name, middleBannerResponse.trackers[4].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].associated_field, middleBannerResponse.trackers[4].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].type, middleBannerResponse.trackers[4].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].category, middleBannerResponse.trackers[4].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].url, middleBannerResponse.trackers[4].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[5].tid, 'test.cs-dev.video-q2', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].is_auto_created, middleBannerResponse.trackers[5].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].name, middleBannerResponse.trackers[5].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].associated_field, middleBannerResponse.trackers[5].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].type, middleBannerResponse.trackers[5].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].category, middleBannerResponse.trackers[5].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].url, middleBannerResponse.trackers[5].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[6].tid, 'test.cs-dev.video-q3', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].is_auto_created, middleBannerResponse.trackers[6].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].name, middleBannerResponse.trackers[6].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].associated_field, middleBannerResponse.trackers[6].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].type, middleBannerResponse.trackers[6].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].category, middleBannerResponse.trackers[6].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].url, middleBannerResponse.trackers[6].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[7].tid, 'test.cs-dev.video-complete', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].is_auto_created, middleBannerResponse.trackers[7].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].name, middleBannerResponse.trackers[7].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].associated_field, middleBannerResponse.trackers[7].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].type, middleBannerResponse.trackers[7].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].category, middleBannerResponse.trackers[7].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].url, middleBannerResponse.trackers[7].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[8].tid, 'test.cs-dev.mute', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].is_auto_created, middleBannerResponse.trackers[8].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].name, middleBannerResponse.trackers[8].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].associated_field, middleBannerResponse.trackers[8].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].type, middleBannerResponse.trackers[8].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].category, middleBannerResponse.trackers[8].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].url, middleBannerResponse.trackers[8].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[9].tid, 'test.cs-dev.unmute', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].is_auto_created, middleBannerResponse.trackers[9].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].name, middleBannerResponse.trackers[9].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].associated_field, middleBannerResponse.trackers[9].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].type, middleBannerResponse.trackers[9].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].category, middleBannerResponse.trackers[9].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].url, middleBannerResponse.trackers[9].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[10].tid, 'test.cs-dev.replay', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].is_auto_created, middleBannerResponse.trackers[10].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].name, middleBannerResponse.trackers[10].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].associated_field, middleBannerResponse.trackers[10].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].type, middleBannerResponse.trackers[10].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].category, middleBannerResponse.trackers[10].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].url, middleBannerResponse.trackers[10].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 11, '11 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Wipe Away Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[11]}`;
        middleBannerPayload.execution = executionList[11];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Middle Banner Store Locator Creative', () => {
      let middleBannerPayload;
      cy.fixture('/DM-Creatives-Body/MiddleBanner-Body.json').then((payload) => {
        middleBannerPayload = extend(middleBannerPayload, payload);
        middleBannerPayload.name = `test MiddleBanner ${executionList[12]}`;
        middleBannerPayload.execution = executionList[12];
        middleBannerPayload.creative_id = generateRandomNumBetween(100000, 999999);
        middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(middleBannerPayload.creative_id);
        middleBannerPayload.id_alpha = `DM-CREA-${middleBannerPayload.creative_id}`;

        let middleBannerResponse;
        cy.fixture('/DM-Creatives-Response/MiddleBanner-Response.json').then((payload2) => {
          middleBannerResponse = extend(middleBannerResponse, payload2);

          let stringified = JSON.stringify(middleBannerResponse);
          stringified = replaceCreativeExecution(stringified, middleBannerPayload.execution);
          stringified = replaceCreativeName(stringified, middleBannerPayload.name);
          stringified = replaceCampaignIdentifier(stringified, middleBannerPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, middleBannerPayload.creative_id);
          stringified = replaceAlphaId(stringified, middleBannerPayload.id_alpha);
          cy.log(stringified);

          middleBannerResponse = JSON.parse(stringified);

          cy.log(middleBannerResponse);
          cy.log(middleBannerPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: middleBannerPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, middleBannerResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, middleBannerResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, middleBannerResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, middleBannerResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, middleBannerResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, middleBannerResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, middleBannerResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, middleBannerResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${middleBannerPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${middleBannerPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${middleBannerPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${middleBannerPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, middleBannerResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, middleBannerResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, middleBannerResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, middleBannerResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, middleBannerResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.impression-inside', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, middleBannerResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, middleBannerResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, middleBannerResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, middleBannerResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, middleBannerResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, middleBannerResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, middleBannerResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, middleBannerResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, middleBannerResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, middleBannerResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, middleBannerResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, middleBannerResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, middleBannerResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, middleBannerResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, middleBannerResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, middleBannerResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, middleBannerResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, middleBannerResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
