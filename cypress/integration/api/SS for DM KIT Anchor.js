/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, getGeneratedExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Anchor KIT Creatives', () => {
    const executionList = ['Animated', 'Explorer', 'Free Fall', 'Generator', 'Glider', 'NBDB', 'Polling', 'Shake', 'Shuffle & Flip', 'Slide to Reveal', 'Standard', 'Store Locator', 'StoryTeller', 'Video RM', 'Wipe Away'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for Anchor Animated Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[0]}`;
        anchorPayload.execution = executionList[0];
        const generatedExecution = getGeneratedExecution(anchorPayload.execution);
        anchorPayload.creative_id = generateRandomNumBetween(100000, 999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);
          cy.log(stringified);

          anchorResponse = JSON.parse(stringified);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Explorer Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[1]}`;
        anchorPayload.execution = executionList[1];
        const generatedExecution = getGeneratedExecution(anchorPayload.execution);
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Free Fall Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[2]}`;
        anchorPayload.execution = executionList[2];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Generator Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[3]}`;
        anchorPayload.execution = executionList[3];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Glider Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[4]}`;
        anchorPayload.execution = executionList[4];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor NBDB Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[5]}`;
        anchorPayload.execution = executionList[5];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Polling Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[6]}`;
        anchorPayload.execution = executionList[6];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Shake Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[7]}`;
        anchorPayload.execution = executionList[7];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Shuffle & Flip Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[8]}`;
        anchorPayload.execution = executionList[8];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Slide to Reveal Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[9]}`;
        anchorPayload.execution = executionList[9];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Standard Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[10]}`;
        anchorPayload.execution = executionList[10];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Store Locator Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[11]}`;
        anchorPayload.execution = executionList[11];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor StoryTeller Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[12]}`;
        anchorPayload.execution = executionList[12];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Video RM Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[13]}`;
        anchorPayload.execution = executionList[13];
        anchorPayload.creative_id = generateRandomNumBetween(10000000, 99999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });

    it('Test Snippet Service for Anchor Wipe Away Creative', () => {
      let anchorPayload;
      cy.fixture('/DM-Creatives-Body/Anchor-Body.json').then((payload) => {
        anchorPayload = extend(anchorPayload, payload);
        anchorPayload.name = `test Anchor ${executionList[14]}`;
        anchorPayload.execution = executionList[14];
        anchorPayload.creative_id = generateRandomNumBetween(100000, 999999);
        anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(anchorPayload.creative_id);
        anchorPayload.id_alpha = `DM-CREA-${anchorPayload.creative_id}`;

        let anchorResponse;
        cy.fixture('/DM-Creatives-Response/Anchor-Response.json').then((payload2) => {
          anchorResponse = extend(anchorResponse, payload2);

          let stringified = JSON.stringify(anchorResponse);
          stringified = replaceCreativeExecution(stringified, anchorPayload.execution);
          stringified = replaceCreativeName(stringified, anchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, anchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, anchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, anchorPayload.id_alpha);

          anchorResponse = JSON.parse(stringified);

          const generatedExecution = getGeneratedExecution(anchorPayload.execution);

          cy.log(anchorResponse);
          cy.log(anchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: anchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, anchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, anchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, anchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, anchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, anchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, anchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, anchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, anchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, anchorPayload.config.creative_html);
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${anchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${anchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${anchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${anchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.include(snippetServiceResponse.body.generated, '\"branding\": \"kargo\",\n        \"tracking\": [],\n        \"disable_hover_hiding\": false\n');
            assert.equal(snippetServiceResponse.body.id_alpha, anchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, anchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, anchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, anchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, anchorResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, anchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, anchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, anchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, anchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, anchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, anchorResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, anchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, anchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, anchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, anchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, anchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, anchorResponse.trackers[1].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 2, '2 Trackers object');
          });
        });
      });
    });
  });
});
