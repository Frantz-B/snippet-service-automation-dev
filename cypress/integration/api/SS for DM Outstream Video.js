/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, getGeneratedExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Outstream Video Creatives', () => {
    const executionList = ['Standard'];
    const url = Cypress.config().baseUrl; // accesing baseUrl
    let trackerLink;
    // We need to check if url is STG or dev to see select the value of trackers
    if (url.includes('dev') === true) {
      trackerLink = 'test.cs-dev';
    } else if (url.includes('staging') === true) {
      trackerLink = 'test.cs-staging';
    }

    it('Test Snippet Service for Outstream Video Standard Creative', () => {
      let outstreamVideoPayload;
      cy.fixture('/DM-Creatives-Body/OutstreamVideo-Body.json').then((payload) => {
        outstreamVideoPayload = extend(outstreamVideoPayload, payload);
        outstreamVideoPayload.name = `test Outstream Video ${executionList[0]}`;
        outstreamVideoPayload.execution = executionList[0];
        const generatedExecution = getGeneratedExecution(outstreamVideoPayload.execution);
        outstreamVideoPayload.creative_id = generateRandomNumBetween(100000, 999999);
        outstreamVideoPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = `deal-group-for-creative-automation_${outstreamVideoPayload.creative_id}`;
        outstreamVideoPayload.id_alpha = `DM-CREA-${outstreamVideoPayload.creative_id}`;

        let outstreamVideoResponse;
        cy.fixture('/DM-Creatives-Response/OutstreamVideo-Response.json').then((payload2) => {
          outstreamVideoResponse = extend(outstreamVideoResponse, payload2);
          let stringified = JSON.stringify(outstreamVideoResponse);
          stringified = replaceCreativeExecution(stringified, outstreamVideoPayload.execution);
          stringified = replaceCreativeName(stringified, outstreamVideoPayload.name);
          stringified = replaceCampaignIdentifier(stringified, outstreamVideoPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, outstreamVideoPayload.creative_id);
          stringified = replaceAlphaId(stringified, outstreamVideoPayload.id_alpha);
          cy.log(stringified);

          outstreamVideoResponse = JSON.parse(stringified);

          cy.log(outstreamVideoResponse);
          cy.log(outstreamVideoPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: outstreamVideoPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, outstreamVideoResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, outstreamVideoResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, outstreamVideoResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, outstreamVideoResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, outstreamVideoResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, outstreamVideoResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, outstreamVideoResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, outstreamVideoResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, `src=\"https://tk.kargo.com/t/${trackerLink}.received`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.click`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.impression`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-start`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-q1`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-q2`);
            assert.include(snippetServiceResponse.body.generated, `https://tk.kargo.com/t/${trackerLink}.video-q3`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.video-complete`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.mute.`);
            assert.include(snippetServiceResponse.body.generated, `https://tk.kargo.com/t/${trackerLink}.unmute`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.replay`);
            assert.include(snippetServiceResponse.body.generated, `"https://tk.kargo.com/t/${trackerLink}.error`);
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
            assert.include(snippetServiceResponse.body.generated, `creative_id=${outstreamVideoPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `&id_alpha=${outstreamVideoPayload.id_alpha}&url=`);
            assert.include(snippetServiceResponse.body.generated, `\"creativeId\": ${outstreamVideoPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `\"format\": \"${outstreamVideoPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, '\"creativeOrigin\": \"dm');
            assert.include(snippetServiceResponse.body.generated, `\"idAlpha\": \"${outstreamVideoPayload.id_alpha}`);
            assert.include(snippetServiceResponse.body.generated, `\"execution\": \"${generatedExecution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, outstreamVideoResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, outstreamVideoResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, outstreamVideoResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, outstreamVideoResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, outstreamVideoResponse.deleted_at, 'deleted at');
            assert.isNotNull(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, outstreamVideoResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, outstreamVideoResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, outstreamVideoResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, outstreamVideoResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, outstreamVideoResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, outstreamVideoResponse.trackers[0].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, outstreamVideoResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, outstreamVideoResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, outstreamVideoResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, outstreamVideoResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, outstreamVideoResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, outstreamVideoResponse.trackers[1].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.video-start`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, outstreamVideoResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, outstreamVideoResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, outstreamVideoResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, outstreamVideoResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, outstreamVideoResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, outstreamVideoResponse.trackers[2].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[3].tid, `${trackerLink}.video-q1`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].is_auto_created, outstreamVideoResponse.trackers[3].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].name, outstreamVideoResponse.trackers[3].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].associated_field, outstreamVideoResponse.trackers[3].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].type, outstreamVideoResponse.trackers[3].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].category, outstreamVideoResponse.trackers[3].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].url, outstreamVideoResponse.trackers[3].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[4].tid, `${trackerLink}.video-q2`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].is_auto_created, outstreamVideoResponse.trackers[4].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].name, outstreamVideoResponse.trackers[4].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].associated_field, outstreamVideoResponse.trackers[4].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].type, outstreamVideoResponse.trackers[4].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].category, outstreamVideoResponse.trackers[4].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].url, outstreamVideoResponse.trackers[4].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[5].tid, `${trackerLink}.video-q3`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].is_auto_created, outstreamVideoResponse.trackers[5].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].name, outstreamVideoResponse.trackers[5].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].associated_field, outstreamVideoResponse.trackers[5].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].type, outstreamVideoResponse.trackers[5].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].category, outstreamVideoResponse.trackers[5].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].url, outstreamVideoResponse.trackers[5].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[6].tid, `${trackerLink}.video-complete`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].is_auto_created, outstreamVideoResponse.trackers[6].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].name, outstreamVideoResponse.trackers[6].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].associated_field, outstreamVideoResponse.trackers[6].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].type, outstreamVideoResponse.trackers[6].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].category, outstreamVideoResponse.trackers[6].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].url, outstreamVideoResponse.trackers[6].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[7].tid, `${trackerLink}.mute`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].is_auto_created, outstreamVideoResponse.trackers[7].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].name, outstreamVideoResponse.trackers[7].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].associated_field, outstreamVideoResponse.trackers[7].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].type, outstreamVideoResponse.trackers[7].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].category, outstreamVideoResponse.trackers[7].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].url, outstreamVideoResponse.trackers[7].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[8].tid, `${trackerLink}.unmute`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].is_auto_created, outstreamVideoResponse.trackers[8].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].name, outstreamVideoResponse.trackers[8].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].associated_field, outstreamVideoResponse.trackers[8].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].type, outstreamVideoResponse.trackers[8].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].category, outstreamVideoResponse.trackers[8].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].url, outstreamVideoResponse.trackers[8].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[9].tid, `${trackerLink}.replay`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].is_auto_created, outstreamVideoResponse.trackers[9].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].name, outstreamVideoResponse.trackers[9].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].associated_field, outstreamVideoResponse.trackers[9].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].type, outstreamVideoResponse.trackers[9].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].category, outstreamVideoResponse.trackers[9].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].url, outstreamVideoResponse.trackers[9].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[10].tid, `${trackerLink}.received`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].is_auto_created, outstreamVideoResponse.trackers[10].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].name, outstreamVideoResponse.trackers[10].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].associated_field, outstreamVideoResponse.trackers[10].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].type, outstreamVideoResponse.trackers[10].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].category, outstreamVideoResponse.trackers[10].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].url, outstreamVideoResponse.trackers[10].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[11].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[11].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[11].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[11].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[11].tid, `${trackerLink}.error`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].is_auto_created, outstreamVideoResponse.trackers[11].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].name, outstreamVideoResponse.trackers[11].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].associated_field, outstreamVideoResponse.trackers[11].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].type, outstreamVideoResponse.trackers[11].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].category, outstreamVideoResponse.trackers[11].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].url, outstreamVideoResponse.trackers[11].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 12, '12 Trackers object');
          });
        });
      });
    });
  });
});
