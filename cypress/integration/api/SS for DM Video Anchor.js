/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, getGeneratedExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Video Anchor Creatives', () => {
    const executionList = ['Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for Video Anchor Standard Creative', () => {
      let videoAnchorPayload;
      cy.fixture('/DM-Creatives-Body/VideoAnchor-Body.json').then((payload) => {
        videoAnchorPayload = extend(videoAnchorPayload, payload);
        videoAnchorPayload.name = `test Video Anchor ${executionList[0]}`;
        videoAnchorPayload.execution = executionList[0];
        const generatedExecution = getGeneratedExecution(videoAnchorPayload.execution);
        videoAnchorPayload.creative_id = generateRandomNumBetween(100000, 999999);
        videoAnchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = `deal-group-for-creative-automation_${videoAnchorPayload.creative_id}`;
        videoAnchorPayload.id_alpha = `DM-CREA-${videoAnchorPayload.creative_id}`;

        let videoAnchorResponse;
        cy.fixture('/DM-Creatives-Response/VideoAnchor-Response.json').then((payload2) => {
          videoAnchorResponse = extend(videoAnchorResponse, payload2);
          let stringified = JSON.stringify(videoAnchorResponse);
          stringified = replaceCreativeExecution(stringified, videoAnchorPayload.execution);
          stringified = replaceCreativeName(stringified, videoAnchorPayload.name);
          stringified = replaceCampaignIdentifier(stringified, videoAnchorPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, videoAnchorPayload.creative_id);
          stringified = replaceAlphaId(stringified, videoAnchorPayload.id_alpha);
          cy.log(stringified);

          videoAnchorResponse = JSON.parse(stringified);

          cy.log(videoAnchorResponse);
          cy.log(videoAnchorPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: videoAnchorPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, videoAnchorResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, videoAnchorResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, videoAnchorResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, videoAnchorResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, videoAnchorResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, videoAnchorResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, videoAnchorResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, videoAnchorResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, '\"vast_xml\": \"<VAST version=\\\"3.0\\\">\\n  <!-- KARGO_VAST_PROPS: {\\\"is_vpaid\\\":false,\\\"has_kargo_privacy_icon\\\":true,\\\"has_main_content_overlay\\\":false,\\\"has_vast_simid\\\":false}');
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.received`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.click`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-start`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-q1`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-q2`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-q3`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-complete`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.mute.`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.unmute`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.replay`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.error`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.expand`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.dismiss`);
            assert.include(snippetServiceResponse.body.generated, '\"error\"');
            assert.include(snippetServiceResponse.body.generated, '\"replay\"');
            assert.include(snippetServiceResponse.body.generated, ' \"unmute\"');
            assert.include(snippetServiceResponse.body.generated, '\"mute\"');
            assert.include(snippetServiceResponse.body.generated, '\"complete\"');
            assert.include(snippetServiceResponse.body.generated, '\"click_url_prefix\"');
            assert.include(snippetServiceResponse.body.generated, '\"thirdQuartile\"');
            assert.include(snippetServiceResponse.body.generated, '\"midpoint\"');
            assert.include(snippetServiceResponse.body.generated, ' \"firstQuartile\"');
            assert.include(snippetServiceResponse.body.generated, 'rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&deal_id={DEAL_ID}&line_item_id={LINE_ITEM_ID}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${videoAnchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${videoAnchorPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${videoAnchorPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${videoAnchorPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${videoAnchorPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, videoAnchorResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, videoAnchorResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, videoAnchorResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, videoAnchorResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, videoAnchorResponse.deleted_at, 'deleted at');
            assert.isNotNull(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, videoAnchorResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, videoAnchorResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, videoAnchorResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, videoAnchorResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, videoAnchorResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, videoAnchorResponse.trackers[0].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, videoAnchorResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, videoAnchorResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, videoAnchorResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, videoAnchorResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, videoAnchorResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, videoAnchorResponse.trackers[1].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.video-start`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, videoAnchorResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, videoAnchorResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, videoAnchorResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, videoAnchorResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, videoAnchorResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, videoAnchorResponse.trackers[2].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[3].tid, `${trackerLink}.video-q1`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].is_auto_created, videoAnchorResponse.trackers[3].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].name, videoAnchorResponse.trackers[3].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].associated_field, videoAnchorResponse.trackers[3].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].type, videoAnchorResponse.trackers[3].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].category, videoAnchorResponse.trackers[3].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].url, videoAnchorResponse.trackers[3].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[4].tid, `${trackerLink}.video-q2`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].is_auto_created, videoAnchorResponse.trackers[4].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].name, videoAnchorResponse.trackers[4].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].associated_field, videoAnchorResponse.trackers[4].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].type, videoAnchorResponse.trackers[4].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].category, videoAnchorResponse.trackers[4].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].url, videoAnchorResponse.trackers[4].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[5].tid, `${trackerLink}.video-q3`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].is_auto_created, videoAnchorResponse.trackers[5].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].name, videoAnchorResponse.trackers[5].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].associated_field, videoAnchorResponse.trackers[5].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].type, videoAnchorResponse.trackers[5].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].category, videoAnchorResponse.trackers[5].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].url, videoAnchorResponse.trackers[5].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[6].tid, `${trackerLink}.video-complete`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].is_auto_created, videoAnchorResponse.trackers[6].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].name, videoAnchorResponse.trackers[6].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].associated_field, videoAnchorResponse.trackers[6].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].type, videoAnchorResponse.trackers[6].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].category, videoAnchorResponse.trackers[6].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].url, videoAnchorResponse.trackers[6].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[7].tid, `${trackerLink}.mute`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].is_auto_created, videoAnchorResponse.trackers[7].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].name, videoAnchorResponse.trackers[7].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].associated_field, videoAnchorResponse.trackers[7].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].type, videoAnchorResponse.trackers[7].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].category, videoAnchorResponse.trackers[7].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].url, videoAnchorResponse.trackers[7].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[8].tid, `${trackerLink}.unmute`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].is_auto_created, videoAnchorResponse.trackers[8].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].name, videoAnchorResponse.trackers[8].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].associated_field, videoAnchorResponse.trackers[8].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].type, videoAnchorResponse.trackers[8].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].category, videoAnchorResponse.trackers[8].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].url, videoAnchorResponse.trackers[8].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[9].tid, `${trackerLink}.replay`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].is_auto_created, videoAnchorResponse.trackers[9].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].name, videoAnchorResponse.trackers[9].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].associated_field, videoAnchorResponse.trackers[9].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].type, videoAnchorResponse.trackers[9].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].category, videoAnchorResponse.trackers[9].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].url, videoAnchorResponse.trackers[9].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[10].tid, `${trackerLink}.received`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].is_auto_created, videoAnchorResponse.trackers[10].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].name, videoAnchorResponse.trackers[10].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].associated_field, videoAnchorResponse.trackers[10].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].type, videoAnchorResponse.trackers[10].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].category, videoAnchorResponse.trackers[10].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].url, videoAnchorResponse.trackers[10].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[11].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[11].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[11].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[11].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[11].tid, `${trackerLink}.error`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].is_auto_created, videoAnchorResponse.trackers[11].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].name, videoAnchorResponse.trackers[11].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].associated_field, videoAnchorResponse.trackers[11].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].type, videoAnchorResponse.trackers[11].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].category, videoAnchorResponse.trackers[11].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].url, videoAnchorResponse.trackers[11].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[12].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[12].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[12].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[12].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[12].tid, `${trackerLink}.expand`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].is_auto_created, videoAnchorResponse.trackers[12].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].name, videoAnchorResponse.trackers[12].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].associated_field, videoAnchorResponse.trackers[12].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].type, videoAnchorResponse.trackers[12].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].category, videoAnchorResponse.trackers[12].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].url, videoAnchorResponse.trackers[12].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[13].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[13].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[13].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[13].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[13].tid, `${trackerLink}.dismiss`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].is_auto_created, videoAnchorResponse.trackers[13].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].name, videoAnchorResponse.trackers[13].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].associated_field, videoAnchorResponse.trackers[13].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].type, videoAnchorResponse.trackers[13].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].category, videoAnchorResponse.trackers[13].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].url, videoAnchorResponse.trackers[13].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 14, '14 Trackers object');
          });
        });
      });
    });
  });
});
