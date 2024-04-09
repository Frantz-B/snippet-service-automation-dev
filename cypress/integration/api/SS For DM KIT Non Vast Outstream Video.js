/* eslint-disable no-useless-escape */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

const { extend } = Cypress._; // _ using lodash built-in library;
const { requestOptions } = require('../../helpers/request-helper');
const {
  replaceCreativeName, replaceCreativeExecution, generateRandomNumBetween, replaceCampaignIdentifier, replaceCreativeId, replaceAlphaId, getGeneratedCampaignIdentifier,
} = require('../../helpers/name-helper');

context('Snippet-Service API Test', () => {
  describe('Snippet-Service API Test For DM Non-VAST Outstream Video KIT Creatives', () => {
    it('Test Snippet Service for Non-VAST Outstream Video Standard Creative', () => {
      const executionList = ['Viewstream'];
      const url = Cypress.config().baseUrl; // accesing baseUrl
      let trackerLink;
      // We need to check if url is STG or dev to see select the value of trackers
      if (url.includes('dev') === true) {
        trackerLink = 'test.cs-dev';
      } else if (url.includes('staging') === true) {
        trackerLink = 'test.cs-staging';
      }

      let nonVastPayload;
      cy.fixture('/DM-Creatives-Body/NonVastOutstream-Body.json').then((payload) => {
        nonVastPayload = extend(nonVastPayload, payload);
        nonVastPayload.name = `test NonVastOutstream ${executionList[0]}`;
        nonVastPayload.execution = executionList[0];
        nonVastPayload.creative_id = generateRandomNumBetween(100000, 999999);
        nonVastPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier = getGeneratedCampaignIdentifier(nonVastPayload.creative_id);
        nonVastPayload.id_alpha = `DM-CREA-${nonVastPayload.creative_id}`;

        let nonVatsResponse;
        cy.fixture('/DM-Creatives-Response/NonVastOutstream-Response.json').then((payload2) => {
          nonVatsResponse = extend(nonVatsResponse, payload2);

          let stringified = JSON.stringify(nonVatsResponse);
          stringified = replaceCreativeExecution(stringified, nonVastPayload.execution);
          stringified = replaceCreativeName(stringified, nonVastPayload.name);
          stringified = replaceCampaignIdentifier(stringified, nonVastPayload.config.ext_tracker_placed_options.query_params.payload_campaign_identifier);
          stringified = replaceCreativeId(stringified, nonVastPayload.creative_id);
          stringified = replaceAlphaId(stringified, nonVastPayload.id_alpha);
          cy.log(stringified);

          nonVatsResponse = JSON.parse(stringified);

          cy.log(nonVatsResponse);
          cy.log(nonVastPayload);

          const snippetServiceRequest = requestOptions({
            method: 'POST',
            body: nonVastPayload,
            url,
          });

          cy.request(snippetServiceRequest).then((snippetServiceResponse) => {
            assert.deepEqual(snippetServiceResponse.body.options, nonVatsResponse.options, 'option object');
            assert.deepEqual(snippetServiceResponse.body.config, nonVatsResponse.config, 'config object');
            assert.deepEqual(snippetServiceResponse.body.request_data, nonVatsResponse.request_data, 'request data object');
            assert.isNotNull(snippetServiceResponse.body.id, 'id');
            assert.isNumber(snippetServiceResponse.body.id, 'id');
            assert.equal(snippetServiceResponse.body.add_auto_trackers, nonVatsResponse.add_auto_trackers, 'add auto trackers');
            assert.equal(snippetServiceResponse.body.creative_id, nonVatsResponse.creative_id, 'Creative id');
            assert.equal(snippetServiceResponse.body.creative_origin, nonVatsResponse.creative_origin, 'Creative Origin');
            assert.equal(snippetServiceResponse.body.execution, nonVatsResponse.execution, 'execution');
            assert.equal(snippetServiceResponse.body.format, nonVatsResponse.format, 'format');
            // verify main values in generated html
            assert.include(snippetServiceResponse.body.generated, 'src=\"https://s3.amazonaws.com/storage.kargo.com/ad/creative');
            assert.include(snippetServiceResponse.body.generated, `data-creative-id=\"${nonVastPayload.creative_id}`);
            assert.include(snippetServiceResponse.body.generated, `data-ad-format=\"${nonVastPayload.format}`);
            assert.include(snippetServiceResponse.body.generated, 'data-click-url=');
            assert.include(snippetServiceResponse.body.generated, `data-ad-execution=\"${nonVastPayload.execution}`);
            assert.equal(snippetServiceResponse.body.id_alpha, nonVatsResponse.id_alpha, 'alpha_id');
            assert.equal(snippetServiceResponse.body.is_rich_media, nonVatsResponse.is_rich_media, 'is rich media');
            assert.equal(snippetServiceResponse.body.placement_type, nonVatsResponse.placement_type, 'placement type');
            assert.isNotNull(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNumber(snippetServiceResponse.body.primary_click_tracker_id, 'Primary click tracker');
            assert.isNotNull(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.isNumber(snippetServiceResponse.body.primary_impression_tracker_id, 'Primary impression tracker');
            assert.equal(snippetServiceResponse.body.version, nonVatsResponse.version, 'version');
            assert.isNotNull(snippetServiceResponse.body.uuid, 'uuid');
            assert.isString(snippetServiceResponse.body.uuid, 'uuid');
            assert.equal(snippetServiceResponse.body.deleted_at, nonVatsResponse.deleted_at, 'deleted at');
            assert.isNumber(snippetServiceResponse.body.trackers[0].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[0].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[0].tid, `${trackerLink}.impression-inside`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].is_auto_created, nonVatsResponse.trackers[0].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].name, nonVatsResponse.trackers[0].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].associated_field, nonVatsResponse.trackers[0].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].type, nonVatsResponse.trackers[0].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].category, nonVatsResponse.trackers[0].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[0].url, nonVatsResponse.trackers[0].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[1].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[1].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[1].tid, `${trackerLink}.impression`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].is_auto_created, nonVatsResponse.trackers[1].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].name, nonVatsResponse.trackers[1].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].associated_field, nonVatsResponse.trackers[1].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].type, nonVatsResponse.trackers[1].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].category, nonVatsResponse.trackers[1].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[1].url, nonVatsResponse.trackers[1].url, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[2].id, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[2].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[2].tid, `${trackerLink}.click`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].is_auto_created, nonVatsResponse.trackers[2].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].name, nonVatsResponse.trackers[2].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].associated_field, nonVatsResponse.trackers[2].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].type, nonVatsResponse.trackers[2].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].category, nonVatsResponse.trackers[2].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[2].url, nonVatsResponse.trackers[2].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[3].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[3].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[3].tid, `${trackerLink}.video-start`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].is_auto_created, nonVatsResponse.trackers[3].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].name, nonVatsResponse.trackers[3].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].associated_field, nonVatsResponse.trackers[3].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].type, nonVatsResponse.trackers[3].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].category, nonVatsResponse.trackers[3].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[3].url, nonVatsResponse.trackers[3].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[4].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[4].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[4].tid, `${trackerLink}.video-q1`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].is_auto_created, nonVatsResponse.trackers[4].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].name, nonVatsResponse.trackers[4].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].associated_field, nonVatsResponse.trackers[4].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].type, nonVatsResponse.trackers[4].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].category, nonVatsResponse.trackers[4].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[4].url, nonVatsResponse.trackers[4].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[5].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[5].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[5].tid, `${trackerLink}.video-q2`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].is_auto_created, nonVatsResponse.trackers[5].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].name, nonVatsResponse.trackers[5].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].associated_field, nonVatsResponse.trackers[5].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].type, nonVatsResponse.trackers[5].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].category, nonVatsResponse.trackers[5].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[5].url, nonVatsResponse.trackers[5].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[6].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[6].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[6].tid, `${trackerLink}.video-q3`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].is_auto_created, nonVatsResponse.trackers[6].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].name, nonVatsResponse.trackers[6].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].associated_field, nonVatsResponse.trackers[6].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].type, nonVatsResponse.trackers[6].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].category, nonVatsResponse.trackers[6].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[6].url, nonVatsResponse.trackers[6].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[7].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[7].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[7].tid, `${trackerLink}.video-complete`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].is_auto_created, nonVatsResponse.trackers[7].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].name, nonVatsResponse.trackers[7].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].associated_field, nonVatsResponse.trackers[7].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].type, nonVatsResponse.trackers[7].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].category, nonVatsResponse.trackers[7].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[7].url, nonVatsResponse.trackers[7].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[8].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[8].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[8].tid, `${trackerLink}.mute`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].is_auto_created, nonVatsResponse.trackers[8].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].name, nonVatsResponse.trackers[8].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].associated_field, nonVatsResponse.trackers[8].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].type, nonVatsResponse.trackers[8].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].category, nonVatsResponse.trackers[8].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[8].url, nonVatsResponse.trackers[8].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[9].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[9].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[9].tid, `${trackerLink}.unmute`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].is_auto_created, nonVatsResponse.trackers[9].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].name, nonVatsResponse.trackers[9].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].associated_field, nonVatsResponse.trackers[9].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].type, nonVatsResponse.trackers[9].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].category, nonVatsResponse.trackers[9].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[9].url, nonVatsResponse.trackers[9].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[10].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[10].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[10].tid, `${trackerLink}.replay`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].is_auto_created, nonVatsResponse.trackers[10].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].name, nonVatsResponse.trackers[10].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].associated_field, nonVatsResponse.trackers[10].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].type, nonVatsResponse.trackers[10].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].category, nonVatsResponse.trackers[10].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[10].url, nonVatsResponse.trackers[10].url, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[11].id, 'Trackers object');
            assert.isNumber(snippetServiceResponse.body.trackers[11].id, 'Trackers object');
            assert.isNotNull(snippetServiceResponse.body.trackers[11].tid, 'Trackers object');
            assert.isString(snippetServiceResponse.body.trackers[11].tid, 'Trackers object');
            assert.include(snippetServiceResponse.body.trackers[11].tid, `${trackerLink}.received`, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].is_auto_created, nonVatsResponse.trackers[11].is_auto_created, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].name, nonVatsResponse.trackers[11].name, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].associated_field, nonVatsResponse.trackers[11].associated_field, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].type, nonVatsResponse.trackers[11].type, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].category, nonVatsResponse.trackers[11].category, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers[11].url, nonVatsResponse.trackers[11].url, 'Trackers object');
            assert.equal(snippetServiceResponse.body.trackers.length, 12, '12 Trackers object');
          });
        });
      });
    });
  });
});
