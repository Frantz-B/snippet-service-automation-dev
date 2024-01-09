/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Instream Video Creatives', () => {
    const executionList = ['Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl

    it('Test Snippet Service for Instream Video Standard Creative', () => {
      let instreamVideoPayload;
      cy.fixture('/DM-Creatives-Body/InstreamVideo-Body.json').then((payload) => {
        instreamVideoPayload = extend(instreamVideoPayload, payload);
        instreamVideoPayload.name = `test Instream Video ${executionList[0]}`;
        instreamVideoPayload.execution = executionList[0];
        instreamVideoPayload.creative_id = generateRandomNumBetween(100000, 999999);
        instreamVideoPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(instreamVideoPayload.creative_id);
        instreamVideoPayload.id_alpha = `DM-CREA-${instreamVideoPayload.creative_id}`;

        let instreamVideoResponse;
        cy.fixture('/DM-Creatives-Response/InstreamVideo-Response.json').then((payload2) => {
          instreamVideoResponse = extend(instreamVideoResponse, payload2);
          let stringified = JSON.stringify(instreamVideoResponse);
          stringified = replaceCreativeExecution(stringified, instreamVideoPayload.execution);
          stringified = replaceCreativeName(stringified, instreamVideoPayload.name);
          stringified = replaceCampaignIdentifier(stringified, instreamVideoPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, instreamVideoPayload.creative_id);
          stringified = replaceAlphaId(stringified, instreamVideoPayload.id_alpha);
          cy.log(stringified);

          instreamVideoResponse = JSON.parse(stringified);

          cy.log(instreamVideoResponse);
          cy.log(instreamVideoPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: instreamVideoPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, instreamVideoResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, instreamVideoResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, instreamVideoResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, instreamVideoResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, instreamVideoResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, instreamVideoResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, instreamVideoResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, instreamVideoResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, '{\"is_vpaid\":false,\"has_kargo_privacy_icon\":true,\"has_main_content_overlay\":false,\"has_vast_simid\":false}');
            assert.include(snippetServiceResponse.body.generated, '<![CDATA[https://tk.kargo.com/t/test.cs-dev.impression');
            assert.include(snippetServiceResponse.body.generated, '<![CDATA[https://tk.kargo.com/t/test.cs-dev.video-start');
            assert.include(snippetServiceResponse.body.generated, '<![CDATA[https://tk.kargo.com/t/test.cs-dev.video-q1');
            assert.include(snippetServiceResponse.body.generated, '<![CDATA[https://tk.kargo.com/t/test.cs-dev.video-q2');
            assert.include(snippetServiceResponse.body.generated, '<![CDATA[https://tk.kargo.com/t/test.cs-dev.video-q3');
            assert.include(snippetServiceResponse.body.generated, '<![CDATA[https://tk.kargo.com/t/test.cs-dev.video-complete');
            assert.include(snippetServiceResponse.body.generated, '<![CDATA[https://tk.kargo.com/t/test.cs-dev.skip');
            assert.include(snippetServiceResponse.body.generated, '<![CDATA[https://tk.kargo.com/t/test.cs-dev.click.video');
            assert.include(snippetServiceResponse.body.generated, '<MediaFile type="video/mp4"');
            assert.include(snippetServiceResponse.body.generated, '<Tracking event=\"firstQuartile');
            assert.include(snippetServiceResponse.body.generated, '<Tracking event=\"midpoint');
            assert.include(snippetServiceResponse.body.generated, '<Tracking event=\"thirdQuartile');
            assert.include(snippetServiceResponse.body.generated, '<Tracking event=\"complete');
            assert.include(snippetServiceResponse.body.generated, '<Tracking event=\"skip');
            assert.include(snippetServiceResponse.body.generated, '<VideoClicks>\r\n              <ClickThrough>');
            assert.include(snippetServiceResponse.body.generated, '</ClickThrough>\r\n              <ClickTracking>');
            assert.include(snippetServiceResponse.body.generated, '</ClickTracking>\r\n            </VideoClicks>\r\n            <MediaFiles>\r\n');
            assert.include(snippetServiceResponse.body.generated, '?rand={cachebuster}&uuid={IMP_ID}&aslot={AD_SLOT}&creative_source=dm&');
            assert.include(snippetServiceResponse.body.generated, `creative_id=${instreamVideoPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${instreamVideoPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, '<VAST version="3.0">');
            assert.include(snippetServiceResponse.body.generated, '</VAST>');
            assert.equal(snippetServiceResponse.body.id_alpha, instreamVideoResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, instreamVideoResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, instreamVideoResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, instreamVideoResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, instreamVideoResponse.deleted_at, 'deleted at');
            assert.isNotNull(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, 'test.cs-dev.video-start', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, instreamVideoResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, instreamVideoResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, instreamVideoResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, instreamVideoResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, instreamVideoResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, instreamVideoResponse.trackers[0].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, 'test.cs-dev.video-q1', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, instreamVideoResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, instreamVideoResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, instreamVideoResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, instreamVideoResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, instreamVideoResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, instreamVideoResponse.trackers[1].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, 'test.cs-dev.video-q2', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, instreamVideoResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, instreamVideoResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, instreamVideoResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, instreamVideoResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, instreamVideoResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, instreamVideoResponse.trackers[2].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[3].tid, 'test.cs-dev.video-q3', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].is_auto_created, instreamVideoResponse.trackers[3].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].name, instreamVideoResponse.trackers[3].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].associated_field, instreamVideoResponse.trackers[3].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].type, instreamVideoResponse.trackers[3].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].category, instreamVideoResponse.trackers[3].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].url, instreamVideoResponse.trackers[3].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[4].tid, 'test.cs-dev.video-complete', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].is_auto_created, instreamVideoResponse.trackers[4].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].name, instreamVideoResponse.trackers[4].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].associated_field, instreamVideoResponse.trackers[4].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].type, instreamVideoResponse.trackers[4].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].category, instreamVideoResponse.trackers[4].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].url, instreamVideoResponse.trackers[4].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[5].tid, 'test.cs-dev.mute', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].is_auto_created, instreamVideoResponse.trackers[5].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].name, instreamVideoResponse.trackers[5].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].associated_field, instreamVideoResponse.trackers[5].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].type, instreamVideoResponse.trackers[5].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].category, instreamVideoResponse.trackers[5].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].url, instreamVideoResponse.trackers[5].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[6].tid, 'test.cs-dev.unmute', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].is_auto_created, instreamVideoResponse.trackers[6].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].name, instreamVideoResponse.trackers[6].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].associated_field, instreamVideoResponse.trackers[6].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].type, instreamVideoResponse.trackers[6].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].category, instreamVideoResponse.trackers[6].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].url, instreamVideoResponse.trackers[6].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[7].tid, 'test.cs-dev.replay', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].is_auto_created, instreamVideoResponse.trackers[7].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].name, instreamVideoResponse.trackers[7].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].associated_field, instreamVideoResponse.trackers[7].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].type, instreamVideoResponse.trackers[7].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].category, instreamVideoResponse.trackers[7].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].url, instreamVideoResponse.trackers[7].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[8].tid, 'test.cs-dev.impression.video', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].is_auto_created, instreamVideoResponse.trackers[8].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].name, instreamVideoResponse.trackers[8].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].associated_field, instreamVideoResponse.trackers[8].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].type, instreamVideoResponse.trackers[8].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].category, instreamVideoResponse.trackers[8].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].url, instreamVideoResponse.trackers[8].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[9].tid, 'test.cs-dev.click.video', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].is_auto_created, instreamVideoResponse.trackers[9].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].name, instreamVideoResponse.trackers[9].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].associated_field, instreamVideoResponse.trackers[9].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].type, instreamVideoResponse.trackers[9].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].category, instreamVideoResponse.trackers[9].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].url, instreamVideoResponse.trackers[9].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[10].tid, 'test.cs-dev.icon.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].is_auto_created, instreamVideoResponse.trackers[10].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].name, instreamVideoResponse.trackers[10].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].associated_field, instreamVideoResponse.trackers[10].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].type, instreamVideoResponse.trackers[10].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].category, instreamVideoResponse.trackers[10].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].url, instreamVideoResponse.trackers[10].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[11].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[11].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[11].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[11].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[11].tid, 'test.cs-dev.simid.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].is_auto_created, instreamVideoResponse.trackers[11].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].name, instreamVideoResponse.trackers[11].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].associated_field, instreamVideoResponse.trackers[11].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].type, instreamVideoResponse.trackers[11].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].category, instreamVideoResponse.trackers[11].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].url, instreamVideoResponse.trackers[11].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[12].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[12].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[12].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[12].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[12].tid, 'test.cs-dev.simid.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].is_auto_created, instreamVideoResponse.trackers[12].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].name, instreamVideoResponse.trackers[12].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].associated_field, instreamVideoResponse.trackers[12].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].type, instreamVideoResponse.trackers[12].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].category, instreamVideoResponse.trackers[12].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[12].url, instreamVideoResponse.trackers[12].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[13].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[13].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[13].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[13].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[13].tid, 'test.cs-dev.overlay.click', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].is_auto_created, instreamVideoResponse.trackers[13].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].name, instreamVideoResponse.trackers[13].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].associated_field, instreamVideoResponse.trackers[13].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].type, instreamVideoResponse.trackers[13].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].category, instreamVideoResponse.trackers[13].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[13].url, instreamVideoResponse.trackers[13].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[14].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[14].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[14].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[14].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[14].tid, 'test.cs-dev.overlay.impression', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[14].is_auto_created, instreamVideoResponse.trackers[14].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[14].name, instreamVideoResponse.trackers[14].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[14].associated_field, instreamVideoResponse.trackers[14].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[14].type, instreamVideoResponse.trackers[14].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[14].category, instreamVideoResponse.trackers[14].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[14].url, instreamVideoResponse.trackers[14].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[15].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[15].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[15].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[15].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[15].tid, 'test.cs-dev.skip', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[15].is_auto_created, instreamVideoResponse.trackers[15].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[15].name, instreamVideoResponse.trackers[15].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[15].associated_field, instreamVideoResponse.trackers[15].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[15].type, instreamVideoResponse.trackers[15].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[15].category, instreamVideoResponse.trackers[15].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[15].url, instreamVideoResponse.trackers[15].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[16].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[16].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[16].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[16].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[16].tid, 'test.cs-dev.creativeView.1', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[16].is_auto_created, instreamVideoResponse.trackers[16].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[16].name, instreamVideoResponse.trackers[16].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[16].associated_field, instreamVideoResponse.trackers[16].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[16].type, instreamVideoResponse.trackers[16].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[16].category, instreamVideoResponse.trackers[16].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[16].url, instreamVideoResponse.trackers[16].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[17].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[17].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[17].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[17].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[17].tid, 'test.cs-dev.creativeView.2', 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[17].is_auto_created, instreamVideoResponse.trackers[17].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[17].name, instreamVideoResponse.trackers[17].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[17].associated_field, instreamVideoResponse.trackers[17].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[17].type, instreamVideoResponse.trackers[17].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[17].category, instreamVideoResponse.trackers[17].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[17].url, instreamVideoResponse.trackers[17].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 18, '18 Trackers object');
          });
        });
      });
    });
  });
});
