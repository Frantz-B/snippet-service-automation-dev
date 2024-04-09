/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Hover KIT Creatives', () => {
    const executionList = ['Animated', 'BTO Interactive Adhesive Static', 'Explorer', 'Formation', 'Free Fall', 'Generator', 'Glider', 'Krush', 'Launcher', 'NBDB', 'Polling', 'Shake', 'Shootout', 'Shuffle & Flip', 'Slide to Reveal', 'Standard', 'Store Locator', 'StoryTeller', 'Tile', 'Tilt & Catch', 'Video RM', 'Wipe Away'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for Hover Animated Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[0]}`;
        hoverPayload.execution = executionList[0];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover BTO Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[1]}`;
        hoverPayload.execution = executionList[1];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[3].tid, `${trackerLink}.interactive`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].is_auto_created, hoverResponse.trackers[3].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].name, hoverResponse.trackers[3].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].associated_field, hoverResponse.trackers[3].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].type, hoverResponse.trackers[3].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].category, hoverResponse.trackers[3].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].url, hoverResponse.trackers[3].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 4, '4 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Explorer Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[2]}`;
        hoverPayload.execution = executionList[2];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Formation Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[3]}`;
        hoverPayload.execution = executionList[3];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Free Fall Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[4]}`;
        hoverPayload.execution = executionList[4];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Generator Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[5]}`;
        hoverPayload.execution = executionList[5];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Glider Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[6]}`;
        hoverPayload.execution = executionList[6];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Krush Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[7]}`;
        hoverPayload.execution = executionList[7];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Launcher Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[8]}`;
        hoverPayload.execution = executionList[8];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover NBDB Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[9]}`;
        hoverPayload.execution = executionList[9];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Polling Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[10]}`;
        hoverPayload.execution = executionList[10];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Shake Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[11]}`;
        hoverPayload.execution = executionList[11];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Shootout Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[12]}`;
        hoverPayload.execution = executionList[12];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Shuffle & Flip Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[13]}`;
        hoverPayload.execution = executionList[13];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Slide to Reveal Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[14]}`;
        hoverPayload.execution = executionList[14];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Standard Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[15]}`;
        hoverPayload.execution = executionList[15];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Store Locator Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[16]}`;
        hoverPayload.execution = executionList[16];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover StoryTeller Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[17]}`;
        hoverPayload.execution = executionList[17];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Tile Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[18]}`;
        hoverPayload.execution = executionList[18];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Tilt & Catch Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[19]}`;
        hoverPayload.execution = executionList[19];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Video RM Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[20]}`;
        hoverPayload.execution = executionList[20];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Hover Wipe Away Creative', () => {
      let hoverPayload;
      cy.fixture('/DM-Creatives-Body/Hover-Body.json').then((payload) => {
        hoverPayload = extend(hoverPayload, payload);
        hoverPayload.name = `test Hover ${executionList[21]}`;
        hoverPayload.execution = executionList[21];
        hoverPayload.creative_id = generateRandomNumBetween(100000, 999999);
        hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(hoverPayload.creative_id);
        hoverPayload.id_alpha = `DM-CREA-${hoverPayload.creative_id}`;

        let hoverResponse;
        cy.fixture('/DM-Creatives-Response/Hover-Response.json').then((payload2) => {
          hoverResponse = extend(hoverResponse, payload2);

          let stringified = JSON.stringify(hoverResponse);
          stringified = replaceCreativeExecution(stringified, hoverPayload.execution);
          stringified = replaceCreativeName(stringified, hoverPayload.name);
          stringified = replaceCampaignIdentifier(stringified, hoverPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, hoverPayload.creative_id);
          stringified = replaceAlphaId(stringified, hoverPayload.id_alpha);
          cy.log(stringified);

          hoverResponse = JSON.parse(stringified);

          cy.log(hoverResponse);
          cy.log(hoverPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: hoverPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, hoverResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, hoverResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, hoverResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, hoverResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, hoverResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, hoverResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, hoverResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, hoverResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${hoverPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${hoverPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${hoverPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=\"%%CLICK_URL%%');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${hoverPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, hoverResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, hoverResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, hoverResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, hoverResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, hoverResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, hoverResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, hoverResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, hoverResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, hoverResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, hoverResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, hoverResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, hoverResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, hoverResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, hoverResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, hoverResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, hoverResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, hoverResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, hoverResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, hoverResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, hoverResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, hoverResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, hoverResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, hoverResponse.trackers[2].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 3, '3 Trackers object');
          });
        });
      });
    });
  });
});
