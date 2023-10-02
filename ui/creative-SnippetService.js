/* eslint-disable max-len */
import 'cypress-wait-until';

const { extend } = Cypress._; // _ using lodash built-in library;
// const { allMyHeaders } = require('../../helpers/login-helper');
const { generateName } = require('../../helpers/name-helper');
const { requestOptions } = require('../../helpers/request-helper');

const creativePayload = require('../../fixtures/creative');


context('Add Creative - Top-Middle-bottom-Banner', () => {
  describe('Add Creative - Top-Middle-bottom-Banner UI', () => {
    // const topBannerCreative = {};
    let middleBannerCreartive = {};
    let bottomBannerCreative = {};
    let snippetMiddleBanner = {};
    let snippetBottomBanner = {};
    let placementId;

    it('Retrieve a Placement', () => {
      // search for placement created this month
      const currentMonth = Cypress.moment().format('YY.MM');

      const searchForPlacement = requestOptions({
        url: `/api/v1/placements?exclude_tests=true&is_archived=0&limit=50&page=1&search=${currentMonth}&sort=name&sort_direction=ASC&status=active,upcoming&with=lineItems,kpiGoals,goals`,
      });

      cy.request(searchForPlacement).then((searchResponse) => {
        if (searchResponse.body.data.length) {
          placementId = searchResponse.body.data[0].id;
          cy.log(placementId);
        } else {
          cy.task('log', 'No Placement Found');
        }
      });
    });

    // Create Middle Banner Creative Snippet & Verify it in Ad Snippet Service
    it('Add Middle Banner Creative', () => {
      cy.fixture('snippet.json').then((snippet) => {
        snippetMiddleBanner = extend(snippetMiddleBanner, snippet);
        middleBannerCreartive = extend(middleBannerCreartive, creativePayload);
        middleBannerCreartive.name = generateName('API-Middle-Banner-Creative');
        middleBannerCreartive.placement_id = placementId;
        middleBannerCreartive.execution_id = 51;
        middleBannerCreartive.format_id = 9;

        // create creative
        const creativeRequest = requestOptions({
          method: 'POST',
          body: middleBannerCreartive,
          url: `${Cypress.env('km')}/creatives`,
        });

        cy.request(creativeRequest).then((creativeResponse) => {
          assert.equal(creativeResponse.status, 201, 'Response Status value ');
          assert.include(creativeResponse.body.message, 'Creative was created', 'Creative creation message');
          middleBannerCreartive.id = creativeResponse.body.id;
        });
      });
    });

    it('Verify the created Middle Banner Creative information in KM', () => {
      const getCreativeRequest = requestOptions();
      getCreativeRequest.url = `${Cypress.env('km')}/creatives/${middleBannerCreartive.id}?metrics=true&with=lineItems,format,execution`;
      cy.request(getCreativeRequest).then((getCreativeResponse) => {
        const kmCreativeResponse = getCreativeResponse.body;
        assert.equal(getCreativeResponse.status, 200, 'Response Status Value ');
        assert.equal(kmCreativeResponse.id, middleBannerCreartive.id, 'Creative id');
        assert.equal(kmCreativeResponse.name, middleBannerCreartive.name, 'Creative name');
        assert.equal(kmCreativeResponse.placement_id, middleBannerCreartive.placement_id, 'Creative placement_id');
        assert.equal(kmCreativeResponse.id_alpha, `KM-CREA-${middleBannerCreartive.id}`, 'Creative Alpha id');
        assert.include(kmCreativeResponse.demo_link_url, middleBannerCreartive.id, 'Demo Link contains Creative id ');
        assert.equal(kmCreativeResponse.destination, snippetMiddleBanner.config.adserver.toUpperCase(), 'Creative destination');
        assert.equal(kmCreativeResponse.execution.id, middleBannerCreartive.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.execution.name, 'Standard', 'Creative execution name');
        assert.equal(kmCreativeResponse.execution_id, middleBannerCreartive.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.format.id, middleBannerCreartive.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.format.name, 'Middle Banner', 'Creative format name');
        assert.equal(kmCreativeResponse.format_id, middleBannerCreartive.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.exist_in_adserver, false, 'Creative not in ad server');
        assert.equal(kmCreativeResponse.is_adbuilder, middleBannerCreartive.is_adbuilder, 'Creative is_adbuilder');
        assert.equal(kmCreativeResponse.is_kbr, false, 'Creative is_kbr');
        assert.equal(kmCreativeResponse.is_expandable, middleBannerCreartive.is_expandable, 'Creative is_expandable');
        assert.equal(kmCreativeResponse.is_scroll_reactive, middleBannerCreartive.is_scroll_reactive, 'Creative is_scroll_reactive');
        assert.equal(kmCreativeResponse.type, 'Banner', 'Creative Type');
        assert.equal(kmCreativeResponse.status, 'IN-DEVELOPMENT', 'Creative Status after Snippet');
        // expected to has no snippet
        assert.isNull(kmCreativeResponse.snippet.generated, 'Creative snippet is null');
        assert.isNull(kmCreativeResponse.snippet.snippet_uuid, 'Creative snippet_uuid is null');
        // expected to has no trackers
        assert.isNull(kmCreativeResponse.primary_click_tracker, 'Creative click Tracker');
        assert.isNull(kmCreativeResponse.primary_impression_tracker, 'Creative impression Tracker');
        // Verify values from snippet playload
        assert.equal(kmCreativeResponse.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media'); // outside snippet object
        assert.equal(kmCreativeResponse.has_kargo_branding, snippetMiddleBanner.has_kargo_branding, 'Creative has_kargo_branding'); // outside snippet object
      });
    });

    it('Edit the created Middle Banner creative', () => {
      middleBannerCreartive.name += '-updated';
      middleBannerCreartive.is_scroll_reactive = true;
      middleBannerCreartive.is_expandable = false;

      // update creative
      const creativeRequest = requestOptions({
        method: 'PUT',
        body: middleBannerCreartive,
        url: `${Cypress.env('km')}/creatives/${middleBannerCreartive.id}`,
      });

      cy.request(creativeRequest).then((creativeResponse) => {
        assert.equal(creativeResponse.status, 200, 'Response Status value ');
        assert.include(creativeResponse.body.message, 'Creative updated', 'Creative creation message');
        assert.equal(creativeResponse.body.id, middleBannerCreartive.id, 'Creative id ');
      });
    });

    it('Verify the edited Middle Banner creative information in KM', () => {
      const getCreativeRequest = requestOptions();
      getCreativeRequest.url = `${Cypress.env('km')}/creatives/${middleBannerCreartive.id}?metrics=true&with=lineItems,format,execution`;
      cy.request(getCreativeRequest).then((getCreativeResponse) => {
        const kmCreativeResponse = getCreativeResponse.body;
        assert.equal(getCreativeResponse.status, 200, 'Response Status Value ');
        assert.equal(kmCreativeResponse.id, middleBannerCreartive.id, 'Creative id');
        assert.equal(kmCreativeResponse.name, middleBannerCreartive.name, 'Creative name');
        assert.equal(kmCreativeResponse.placement_id, middleBannerCreartive.placement_id, 'Creative placement_id');
        assert.equal(kmCreativeResponse.id_alpha, `KM-CREA-${middleBannerCreartive.id}`, 'Creative Alpha id');
        assert.include(kmCreativeResponse.demo_link_url, middleBannerCreartive.id, 'Demo Link contains Creative id ');
        assert.equal(kmCreativeResponse.destination, snippetMiddleBanner.config.adserver.toUpperCase(), 'Creative destination');
        assert.equal(kmCreativeResponse.execution.id, middleBannerCreartive.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.execution.name, 'Standard', 'Creative execution name');
        assert.equal(kmCreativeResponse.execution_id, middleBannerCreartive.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.format.id, middleBannerCreartive.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.format.name, 'Middle Banner', 'Creative format name');
        assert.equal(kmCreativeResponse.format_id, middleBannerCreartive.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.exist_in_adserver, false, 'Creative not in ad server');
        assert.equal(kmCreativeResponse.is_adbuilder, middleBannerCreartive.is_adbuilder, 'Creative is_adbuilder');
        assert.equal(kmCreativeResponse.is_kbr, false, 'Creative is_kbr');
        assert.equal(kmCreativeResponse.is_expandable, middleBannerCreartive.is_expandable, 'Creative is_expandable');
        assert.equal(kmCreativeResponse.is_scroll_reactive, middleBannerCreartive.is_scroll_reactive, 'Creative is_scroll_reactive');
        assert.equal(kmCreativeResponse.type, 'Banner', 'Creative Type');
        assert.equal(kmCreativeResponse.status, 'IN-DEVELOPMENT', 'Creative Status after Snippet');
        // expected to has no snippet
        assert.isNull(kmCreativeResponse.snippet.generated, 'Creative snippet is null');
        assert.isNull(kmCreativeResponse.snippet.snippet_uuid, 'Creative snippet_uuid is null');
        // expected to has no trackers
        assert.isNull(kmCreativeResponse.primary_click_tracker, 'Creative click Tracker');
        assert.isNull(kmCreativeResponse.primary_impression_tracker, 'Creative impression Tracker');
        // Verify values from snippet playload
        assert.equal(kmCreativeResponse.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media'); // outside snippet object
        assert.equal(kmCreativeResponse.has_kargo_branding, snippetMiddleBanner.has_kargo_branding, 'Creative has_kargo_branding'); // outside snippet object
      });
    });

    it('Generate Tag for Middle Banner creative', () => {
      snippetMiddleBanner.id = middleBannerCreartive.id;
      snippetMiddleBanner.config.creative_html = 'testing Banner Snippet';

      const snippetRequest = requestOptions({
        method: 'PUT',
        body: snippetMiddleBanner,
        url: `${Cypress.env('km')}/creatives/${middleBannerCreartive.id}/snippet`,
      });

      cy.request(snippetRequest).then((snippetResponse) => {
        assert.equal(snippetResponse.status, 200, 'Response Status value ');
        assert.include(snippetResponse.body.message, 'Creative snippet updated', 'The Creative snippet updated');
        assert.equal(snippetResponse.body.id, middleBannerCreartive.id, 'Updated Creative id ');
      });
    });

    it('Verify the Creative after generating Snippet in KM', () => {
      const getCreativeRequest = requestOptions();
      getCreativeRequest.url = `${Cypress.env('km')}/creatives/${middleBannerCreartive.id}?metrics=true&with=lineItems,format,execution`;
      cy.request(getCreativeRequest).then((getCreativeResponse) => {
        const kmCreativeResponse = getCreativeResponse.body;
        assert.equal(getCreativeResponse.status, 200, 'Response Status Value ');
        assert.equal(kmCreativeResponse.id, middleBannerCreartive.id, 'Creative id');
        assert.equal(kmCreativeResponse.name, middleBannerCreartive.name, 'Creative name');
        assert.equal(kmCreativeResponse.placement_id, middleBannerCreartive.placement_id, 'Creative placement_id');
        assert.equal(kmCreativeResponse.id_alpha, `KM-CREA-${middleBannerCreartive.id}`, 'Creative Alpha id');
        assert.include(kmCreativeResponse.demo_link_url, middleBannerCreartive.id, 'Demo Link contains Creative id ');
        assert.equal(kmCreativeResponse.destination, snippetMiddleBanner.config.adserver.toUpperCase(), 'Creative destination');
        assert.equal(kmCreativeResponse.execution.id, middleBannerCreartive.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.execution.name, 'Standard', 'Creative execution name');
        assert.equal(kmCreativeResponse.execution_id, middleBannerCreartive.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.format.id, middleBannerCreartive.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.format.name, 'Middle Banner', 'Creative format name');
        assert.equal(kmCreativeResponse.format_id, middleBannerCreartive.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.exist_in_adserver, false, 'Creative not in ad server');
        assert.equal(kmCreativeResponse.is_adbuilder, middleBannerCreartive.is_adbuilder, 'Creative is_adbuilder');
        assert.equal(kmCreativeResponse.is_kbr, false, 'Creative is_kbr');
        assert.equal(kmCreativeResponse.is_expandable, middleBannerCreartive.is_expandable, 'Creative is_expandable');
        assert.equal(kmCreativeResponse.is_scroll_reactive, middleBannerCreartive.is_scroll_reactive, 'Creative is_scroll_reactive');
        assert.equal(kmCreativeResponse.type, 'Banner', 'Creative Type');
        assert.equal(kmCreativeResponse.status, 'READY', 'Creative Status after Snippet');
        // Verify Creative has generated snippet
        assert.isNotNull(kmCreativeResponse.snippet.generated, 'Creative snippet is generated');
        assert.include(kmCreativeResponse.snippet.generated, `id_alpha=KM-CREA-${middleBannerCreartive.id}`, 'Creative alpha id in generated snippet');
        assert.isNotNull(kmCreativeResponse.snippet.snippet_uuid, 'Creative snippet_uuid is not null after sbippet is generated'); // uuid inside snippet object
        assert.equal(kmCreativeResponse.snippet.ad_unit_execution.id, middleBannerCreartive.execution_id, 'Creative execution in Snippet');
        assert.equal(kmCreativeResponse.snippet.ad_unit_format.id, middleBannerCreartive.format_id, 'Creative format in Snippet');
        assert.equal(kmCreativeResponse.snippet_url, `https://creative-snippet.dev.kargo.com/snippet/km/${middleBannerCreartive.id}`, 'Creative snippet_url');
        assert.isNotNull(kmCreativeResponse.snippet_uuid, 'Creative snippet_uuid is not null after sbippet is generated'); // uuid outside snippet object
        // Verify values from snippet playload
        assert.equal(kmCreativeResponse.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media'); // outside snippet object
        assert.equal(kmCreativeResponse.has_kargo_branding, snippetMiddleBanner.has_kargo_branding, 'Creative has_kargo_branding'); // outside snippet object
        // Verfiy Snippet Config
        assert.equal(kmCreativeResponse.snippet.config.adserver, snippetMiddleBanner.config.adserver, 'Creative adserver');
        assert.isEmpty(kmCreativeResponse.snippet.config.additional_impression_trackers, 'Creative additional_impression_trackers');
        assert.equal(kmCreativeResponse.snippet.config.has_kargo_branding, snippetMiddleBanner.config.has_kargo_branding, 'Creative has_kargo_branding');
        assert.equal(kmCreativeResponse.snippet.config.has_responsive_width, snippetMiddleBanner.config.has_responsive_width, 'Creative html');
        assert.equal(kmCreativeResponse.snippet.config.creative_html, snippetMiddleBanner.config.creative_html, 'Creative html');
        assert.equal(kmCreativeResponse.snippet.config.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media');
        // expected to has trackers
        assert.isNotNull(kmCreativeResponse.primary_click_tracker, 'Creative click Tracker');
        assert.equal(kmCreativeResponse.primary_click_tracker.type, 'click', 'Creative click Tracker'); // tracker type should be click
        assert.isNotNull(kmCreativeResponse.primary_impression_tracker, 'Creative impression Tracker');
        assert.equal(kmCreativeResponse.primary_impression_tracker.type, 'impression', 'Creative impression Tracker'); // tracker type should be impression
      });
    });

    it('Edit generated tag for Middle Banner creative', () => {
      snippetMiddleBanner.config.additional_impression_trackers = ['<script>test snippet</script>'];
      snippetMiddleBanner.config.is_rich_media = false;
      snippetMiddleBanner.config.creative_width = 300;
      snippetMiddleBanner.config.creative_height = 250;
      snippetMiddleBanner.config.creative_image_url = 'https://storage.cloud.kargo.com/cp/file-assets/2022/1676549552_63ee1db05e9fc.jpg?filename=/AspireInfotech.jpg';
      snippetMiddleBanner.config.click_url = 'https://www.kargo.com';

      const snippetRequest = requestOptions({
        method: 'PUT',
        body: snippetMiddleBanner,
        url: `${Cypress.env('km')}/creatives/${middleBannerCreartive.id}/snippet`,
      });

      cy.request(snippetRequest).then((snippetResponse) => {
        assert.equal(snippetResponse.status, 200, 'Response Status value ');
        assert.include(snippetResponse.body.message, 'Creative snippet updated', 'The Creative snippet updated');
        assert.equal(snippetResponse.body.id, middleBannerCreartive.id, 'Updated Creative id ');
      });
    });

    it('Verify the Creative after Updating Snippet in KM', () => {
      const getCreativeRequest = requestOptions();
      getCreativeRequest.url = `${Cypress.env('km')}/creatives/${middleBannerCreartive.id}?metrics=true&with=lineItems,format,execution`;
      cy.request(getCreativeRequest).then((getCreativeResponse) => {
        const kmCreativeResponse = getCreativeResponse.body;

        // assigning Snippet info to be used in snippet service verification
        middleBannerCreartive.fullSnippet = kmCreativeResponse.snippet.generated;
        middleBannerCreartive.snippetUuid = kmCreativeResponse.snippet_uuid;
        middleBannerCreartive.snippetUrl = kmCreativeResponse.snippet_url;
        middleBannerCreartive.clickTrackerId = kmCreativeResponse.primary_click_tracker.id;
        middleBannerCreartive.clickTrackerTid = kmCreativeResponse.primary_click_tracker.tid;
        middleBannerCreartive.clickTrackerType = kmCreativeResponse.primary_click_tracker.type;
        middleBannerCreartive.impressionTrackerId = kmCreativeResponse.primary_impression_tracker.id;
        middleBannerCreartive.impressionTrackerTid = kmCreativeResponse.primary_impression_tracker.tid;
        middleBannerCreartive.impressionTrackerType = kmCreativeResponse.primary_impression_tracker.type;
        middleBannerCreartive.formatName = kmCreativeResponse.format.name;
        middleBannerCreartive.executionName = kmCreativeResponse.execution.name;

        assert.equal(getCreativeResponse.status, 200, 'Response Status Value ');
        assert.equal(kmCreativeResponse.id, middleBannerCreartive.id, 'Creative id');
        assert.equal(kmCreativeResponse.name, middleBannerCreartive.name, 'Creative name');
        assert.equal(kmCreativeResponse.placement_id, middleBannerCreartive.placement_id, 'Creative placement_id');
        assert.equal(kmCreativeResponse.id_alpha, `KM-CREA-${middleBannerCreartive.id}`, 'Creative Alpha id');
        assert.include(kmCreativeResponse.demo_link_url, middleBannerCreartive.id, 'Demo Link contains Creative id ');
        assert.equal(kmCreativeResponse.destination, snippetMiddleBanner.config.adserver.toUpperCase(), 'Creative destination');
        assert.equal(kmCreativeResponse.execution.id, middleBannerCreartive.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.execution.name, 'Standard', 'Creative execution name');
        assert.equal(kmCreativeResponse.execution_id, middleBannerCreartive.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.format.id, middleBannerCreartive.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.format.name, 'Middle Banner', 'Creative format name');
        assert.equal(kmCreativeResponse.format_id, middleBannerCreartive.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.exist_in_adserver, false, 'Creative not in ad server');
        assert.equal(kmCreativeResponse.is_adbuilder, middleBannerCreartive.is_adbuilder, 'Creative is_adbuilder');
        assert.equal(kmCreativeResponse.is_kbr, false, 'Creative is_kbr');
        assert.equal(kmCreativeResponse.is_expandable, middleBannerCreartive.is_expandable, 'Creative is_expandable');
        assert.equal(kmCreativeResponse.is_scroll_reactive, middleBannerCreartive.is_scroll_reactive, 'Creative is_scroll_reactive');
        assert.equal(kmCreativeResponse.type, 'Banner', 'Creative Type');
        assert.equal(kmCreativeResponse.status, 'READY', 'Creative Status after Snippet');
        // Verify Creative has generated snippet
        assert.isNotNull(kmCreativeResponse.snippet.generated, 'Creative snippet is generated');
        assert.include(kmCreativeResponse.snippet.generated, `id_alpha=KM-CREA-${middleBannerCreartive.id}`, 'Creative alpha id in generated snippet');
        assert.isNotNull(kmCreativeResponse.snippet.snippet_uuid, 'Creative snippet_uuid is not null after snippet is generated'); // uuid inside snippet object
        assert.equal(kmCreativeResponse.snippet.ad_unit_execution.id, middleBannerCreartive.execution_id, 'Creative execution in Snippet');
        assert.equal(kmCreativeResponse.snippet.ad_unit_format.id, middleBannerCreartive.format_id, 'Creative format in Snippet');
        assert.equal(kmCreativeResponse.snippet_url, `https://creative-snippet.dev.kargo.com/snippet/km/${middleBannerCreartive.id}`, 'Creative snippet_url');
        assert.isNotNull(kmCreativeResponse.snippet_uuid, 'Creative snippet_uuid is not null after snippet is generated'); // uuid outside snippet object
        // Verify values from snippet playload
        assert.equal(kmCreativeResponse.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media'); // outside snippet object
        assert.equal(kmCreativeResponse.has_kargo_branding, snippetMiddleBanner.has_kargo_branding, 'Creative has_kargo_branding'); // outside snippet object
        // Verfiy Snippet Config
        assert.equal(kmCreativeResponse.snippet.config.adserver, snippetMiddleBanner.config.adserver, 'Creative adserver');
        assert.include(kmCreativeResponse.snippet.config.additional_impression_trackers[0], snippetMiddleBanner.config.additional_impression_trackers[0], 'Creative additional_impression_trackers');
        assert.equal(kmCreativeResponse.snippet.config.has_kargo_branding, snippetMiddleBanner.config.has_kargo_branding, 'Creative has_kargo_branding');
        assert.equal(kmCreativeResponse.snippet.config.has_responsive_width, snippetMiddleBanner.config.has_responsive_width, 'Creative html');
        assert.equal(kmCreativeResponse.snippet.config.creative_html, snippetMiddleBanner.config.creative_html, 'Creative html');
        assert.equal(kmCreativeResponse.snippet.config.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media');
        assert.equal(kmCreativeResponse.snippet.config.click_url, snippetMiddleBanner.config.click_url, 'Creative click_url');
        assert.equal(kmCreativeResponse.snippet.config.creative_height, snippetMiddleBanner.config.creative_height, 'Creative creative_height');
        assert.equal(kmCreativeResponse.snippet.config.creative_image_url, snippetMiddleBanner.config.creative_image_url, 'Creative creative_image_url');
        assert.equal(kmCreativeResponse.snippet.config.creative_width, snippetMiddleBanner.config.creative_width, 'Creative creative_width');
        // expected to has trackers
        assert.isNotNull(kmCreativeResponse.primary_click_tracker, 'Creative click Tracker');
        assert.equal(kmCreativeResponse.primary_click_tracker.type, 'click', 'Creative click Tracker'); // tracker type should be click
        assert.isNotNull(kmCreativeResponse.primary_impression_tracker, 'Creative impression Tracker');
        assert.equal(kmCreativeResponse.primary_impression_tracker.type, 'impression', 'Creative impression Tracker'); // tracker type should be impression;
      });
    });

    it('Validate Middle Banner Creative found in UI External Snippet Service', () => {
      cy.visit(middleBannerCreartive.snippetUrl);

      cy.get('div.metadata:nth-child(2)', { timeout: 8000 }).should('contain', middleBannerCreartive.name);
      cy.get('div.metadata:nth-child(3)').should('contain', middleBannerCreartive.id); // Verifies KM Creative ID
      cy.get('div.metadata:nth-child(4)').should('contain', 'KM'); // Creative Origin will always = KM
      cy.get('div.metadata:nth-child(5)').should('contain', middleBannerCreartive.formatName.replace(' ', '')); // Verifies KM Creative Format Name with no spaces
      cy.get('div.metadata:nth-child(6)').should('contain', middleBannerCreartive.executionName); // Verifies KM Creative Execution
      cy.get('[id="snippet"]').should('contain', middleBannerCreartive.fullSnippet); // Verifies large text matches Full Snippet code from KM Creative
    });

    it('Validate Middle Banner Creative found in API External Snippet Service', () => {
      const getCreativeSnippetRequest = requestOptions();
      getCreativeSnippetRequest.url = `https://ad-snippet-service.dev.kargo.com/api/snippet/${middleBannerCreartive.snippetUuid}`;
      cy.request(getCreativeSnippetRequest).then((getCreativeSnippetResponse) => {
        const snippetResponse = getCreativeSnippetResponse.body;
        assert.equal(getCreativeSnippetResponse.status, 200, 'Response Status Value ');
        // Verify config{} object in Ad Snippet Servie
        assert.equal(snippetResponse.config.adserver, snippetMiddleBanner.config.adserver, 'Creative adserver');
        assert.include(snippetResponse.config.additional_impression_trackers[0], snippetMiddleBanner.config.additional_impression_trackers[0], 'Creative additional_impression_trackers');
        assert.equal(snippetResponse.config.has_kargo_branding, snippetMiddleBanner.config.has_kargo_branding, 'Creative has_kargo_branding');
        assert.equal(snippetResponse.config.has_responsive_width, snippetMiddleBanner.config.has_responsive_width, 'Creative has_responsive_width');
        assert.equal(snippetResponse.config.creative_html, snippetMiddleBanner.config.creative_html, 'Creative creative_html');
        assert.equal(snippetResponse.config.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media');
        assert.equal(snippetResponse.config.creative_width, snippetMiddleBanner.config.creative_width, 'Creative creative_width');
        assert.equal(snippetResponse.config.creative_height, snippetMiddleBanner.config.creative_height, 'Creative creative_height');
        assert.equal(snippetResponse.config.creative_image_url, snippetMiddleBanner.config.creative_image_url, 'Creative creative_image_url');
        assert.equal(snippetResponse.config.click_url, snippetMiddleBanner.config.click_url, 'Creative click_url');
        // Verify request_data{} object in Ad Snippet Servie
        assert.equal(snippetResponse.request_data.creative_origin, 'km', 'Creative Origin'); // Creative Origin will always = KM
        assert.equal(snippetResponse.request_data.creative_id, middleBannerCreartive.id, 'Creative id in KM');
        assert.equal(snippetResponse.request_data.format, middleBannerCreartive.formatName.replace(' ', ''), 'Creative format name');
        assert.equal(snippetResponse.request_data.execution, middleBannerCreartive.executionName, 'Creative execution name');
        assert.equal(snippetResponse.request_data.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media');
        assert.equal(snippetResponse.request_data.is_ad_builder, middleBannerCreartive.is_adbuilder, 'Creative is ad builder');
        assert.isNull(snippetResponse.request_data.ad_builder_ad_id, 'Creative ad builder id');
        assert.isTrue(snippetResponse.request_data.add_auto_trackers, 'Creative add_auto_trackers');
        assert.equal(snippetResponse.request_data.id_alpha, `KM-CREA-${middleBannerCreartive.id}`, 'Creative alpha id');
        assert.isTrue(snippetResponse.request_data.enable_download_impression_tracking, 'Creative download for tracker');
        assert.equal(snippetResponse.request_data.config.adserver, snippetMiddleBanner.config.adserver, 'Creative adserver');
        assert.include(snippetResponse.request_data.config.additional_impression_trackers[0], snippetMiddleBanner.config.additional_impression_trackers[0], 'Creative additional_impression_trackers');
        assert.equal(snippetResponse.request_data.config.has_kargo_branding, snippetMiddleBanner.config.has_kargo_branding, 'Creative has_kargo_branding');
        assert.equal(snippetResponse.request_data.config.has_responsive_width, snippetMiddleBanner.config.has_responsive_width, 'Creative has_responsive_width');
        assert.equal(snippetResponse.request_data.config.creative_html, snippetMiddleBanner.config.creative_html, 'Creative creative_html');
        assert.equal(snippetResponse.request_data.config.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media');
        assert.equal(snippetResponse.request_data.config.creative_width, snippetMiddleBanner.config.creative_width, 'Creative creative_width');
        assert.equal(snippetResponse.request_data.config.creative_height, snippetMiddleBanner.config.creative_height, 'Creative creative_height');
        assert.equal(snippetResponse.request_data.config.creative_image_url, snippetMiddleBanner.config.creative_image_url, 'Creative creative_image_url');
        assert.equal(snippetResponse.request_data.config.click_url, snippetMiddleBanner.config.click_url, 'Creative click_url');
        assert.equal(snippetResponse.request_data.trackers_config.default_impression.tid, middleBannerCreartive.impressionTrackerTid, 'Creative impression tracker tid');
        assert.equal(snippetResponse.request_data.trackers_config.default_click.tid, middleBannerCreartive.clickTrackerTid, 'Creative click tracker tid');

        assert.isTrue(snippetResponse.add_auto_trackers, 'Creative add auto trackers');
        assert.equal(snippetResponse.creative_id, middleBannerCreartive.id, 'Creative id');
        assert.equal(snippetResponse.creative_origin, 'km', 'Creative origin');
        assert.equal(snippetResponse.execution, middleBannerCreartive.executionName, 'Creative execution');
        assert.equal(snippetResponse.format, middleBannerCreartive.formatName.replace(' ', ''), 'Creative format');
        assert.equal(snippetResponse.generated, middleBannerCreartive.fullSnippet, 'Creative generated');
        assert.include(snippetResponse.generated, `id_alpha=KM-CREA-${middleBannerCreartive.id}`, 'Creative alpha id in generated snippet');
        assert.equal(snippetResponse.id_alpha, `KM-CREA-${middleBannerCreartive.id}`, 'Creative alpha id');
        assert.equal(snippetResponse.is_rich_media, snippetMiddleBanner.config.is_rich_media, 'Creative is_rich_media');
        // assert.equal(snippetResponse.primary_click_tracker_id, middleBannerCreartive.clickTrackerId, 'Creative click tracker id');
        // assert.equal(snippetResponse.primary_impression_tracker_id, middleBannerCreartive.impressionTrackerId, 'Creative impression tracker id');
        assert.equal(snippetResponse.uuid, middleBannerCreartive.snippetUuid, 'Creative snippet uuid');
        // assert.equal(snippetResponse.trackers[0].id, middleBannerCreartive.impressionTrackerId, 'Creative impression tracker id');
        assert.equal(snippetResponse.trackers[0].tid, middleBannerCreartive.impressionTrackerTid, 'Creative impression tracker tid');
        assert.equal(snippetResponse.trackers[0].type, middleBannerCreartive.impressionTrackerType, 'Creative impression tracker type');
        // assert.equal(snippetResponse.trackers[1].id, middleBannerCreartive.clickTrackerId, 'Creative click tracker id');
        assert.equal(snippetResponse.trackers[1].tid, middleBannerCreartive.clickTrackerTid, 'Creative click tracker tid');
        assert.equal(snippetResponse.trackers[1].type, middleBannerCreartive.clickTrackerType, 'Creative click tracker type');
      });
    });

    // Create Bottom Banner Creative Snippet & Verify it in Ad Snippet Service
    it('Add Bottom Banner Creative', () => {
      cy.fixture('snippet.json').then((snippet) => {
        snippetBottomBanner = extend(snippetBottomBanner, snippet);
        bottomBannerCreative = extend(bottomBannerCreative, creativePayload);
        bottomBannerCreative.name = generateName('API-Bottom-Banner-Creative');
        bottomBannerCreative.placement_id = placementId;
        bottomBannerCreative.execution_id = 1234;
        bottomBannerCreative.format_id = 11;
        bottomBannerCreative.is_expandable = false;

        // create creative
        const creativeRequest = requestOptions({
          method: 'POST',
          body: bottomBannerCreative,
          url: `${Cypress.env('km')}/creatives`,
        });

        cy.request(creativeRequest).then((creativeResponse) => {
          assert.equal(creativeResponse.status, 201, 'Response Status value ');
          assert.include(creativeResponse.body.message, 'Creative was created', 'Creative creation message');
          bottomBannerCreative.id = creativeResponse.body.id;
        });
      });
    });

    it('Verify the created Bottom Banner Creative information in KM', () => {
      const getCreativeRequest = requestOptions();
      getCreativeRequest.url = `${Cypress.env('km')}/creatives/${bottomBannerCreative.id}?metrics=true&with=lineItems,format,execution`;
      cy.request(getCreativeRequest).then((getCreativeResponse) => {
        const kmCreativeResponse = getCreativeResponse.body;
        assert.equal(getCreativeResponse.status, 200, 'Response Status Value ');
        assert.equal(kmCreativeResponse.id, bottomBannerCreative.id, 'Creative id');
        assert.equal(kmCreativeResponse.name, bottomBannerCreative.name, 'Creative name');
        assert.equal(kmCreativeResponse.placement_id, bottomBannerCreative.placement_id, 'Creative placement_id');
        assert.equal(kmCreativeResponse.id_alpha, `KM-CREA-${bottomBannerCreative.id}`, 'Creative Alpha id');
        assert.include(kmCreativeResponse.demo_link_url, bottomBannerCreative.id, 'Demo Link contains Creative id ');
        assert.equal(kmCreativeResponse.destination, snippetBottomBanner.config.adserver.toUpperCase(), 'Creative destination');
        assert.equal(kmCreativeResponse.execution.id, bottomBannerCreative.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.execution.name, 'Animated', 'Creative execution name');
        assert.equal(kmCreativeResponse.execution_id, bottomBannerCreative.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.format.id, bottomBannerCreative.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.format.name, 'Bottom Banner', 'Creative format name');
        assert.equal(kmCreativeResponse.format_id, bottomBannerCreative.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.exist_in_adserver, false, 'Creative not in ad server');
        assert.equal(kmCreativeResponse.is_adbuilder, bottomBannerCreative.is_adbuilder, 'Creative is_adbuilder');
        assert.equal(kmCreativeResponse.is_kbr, false, 'Creative is_kbr');
        assert.equal(kmCreativeResponse.is_expandable, bottomBannerCreative.is_expandable, 'Creative is_expandable');
        assert.equal(kmCreativeResponse.is_scroll_reactive, bottomBannerCreative.is_scroll_reactive, 'Creative is_scroll_reactive');
        assert.equal(kmCreativeResponse.type, 'Banner', 'Creative Type');
        assert.equal(kmCreativeResponse.status, 'IN-DEVELOPMENT', 'Creative Status after Snippet');
        // expected to has no snippet
        assert.isNull(kmCreativeResponse.snippet.generated, 'Creative snippet is null');
        assert.isNull(kmCreativeResponse.snippet.snippet_uuid, 'Creative snippet_uuid is null');
        // expected to has no trackers
        assert.isNull(kmCreativeResponse.primary_click_tracker, 'Creative click Tracker');
        assert.isNull(kmCreativeResponse.primary_impression_tracker, 'Creative impression Tracker');
        // Verify values from snippet playload
        assert.equal(kmCreativeResponse.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media'); // outside snippet object
        assert.equal(kmCreativeResponse.has_kargo_branding, snippetBottomBanner.has_kargo_branding, 'Creative has_kargo_branding'); // outside snippet object
      });
    });

    it('Edit the created Bottom Banner creative', () => {
      bottomBannerCreative.name += '-updated';
      bottomBannerCreative.is_scroll_reactive = true;
      bottomBannerCreative.is_expandable = true;

      // update creative
      const creativeRequest = requestOptions({
        method: 'PUT',
        body: bottomBannerCreative,
        url: `${Cypress.env('km')}/creatives/${bottomBannerCreative.id}`,
      });

      cy.request(creativeRequest).then((creativeResponse) => {
        assert.equal(creativeResponse.status, 200, 'Response Status value ');
        assert.include(creativeResponse.body.message, 'Creative updated', 'Creative creation message');
        assert.equal(creativeResponse.body.id, bottomBannerCreative.id, 'Creative id ');
      });
    });

    it('Verify the edited Bottom Banner creative information in KM', () => {
      const getCreativeRequest = requestOptions();
      getCreativeRequest.url = `${Cypress.env('km')}/creatives/${bottomBannerCreative.id}?metrics=true&with=lineItems,format,execution`;
      cy.request(getCreativeRequest).then((getCreativeResponse) => {
        const kmCreativeResponse = getCreativeResponse.body;
        assert.equal(getCreativeResponse.status, 200, 'Response Status Value ');
        assert.equal(kmCreativeResponse.id, bottomBannerCreative.id, 'Creative id');
        assert.equal(kmCreativeResponse.name, bottomBannerCreative.name, 'Creative name');
        assert.equal(kmCreativeResponse.placement_id, bottomBannerCreative.placement_id, 'Creative placement_id');
        assert.equal(kmCreativeResponse.id_alpha, `KM-CREA-${bottomBannerCreative.id}`, 'Creative Alpha id');
        assert.include(kmCreativeResponse.demo_link_url, bottomBannerCreative.id, 'Demo Link contains Creative id ');
        assert.equal(kmCreativeResponse.destination, snippetBottomBanner.config.adserver.toUpperCase(), 'Creative destination');
        assert.equal(kmCreativeResponse.execution.id, bottomBannerCreative.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.execution.name, 'Animated', 'Creative execution name');
        assert.equal(kmCreativeResponse.execution_id, bottomBannerCreative.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.format.id, bottomBannerCreative.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.format.name, 'Bottom Banner', 'Creative format name');
        assert.equal(kmCreativeResponse.format_id, bottomBannerCreative.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.exist_in_adserver, false, 'Creative not in ad server');
        assert.equal(kmCreativeResponse.is_adbuilder, bottomBannerCreative.is_adbuilder, 'Creative is_adbuilder');
        assert.equal(kmCreativeResponse.is_kbr, false, 'Creative is_kbr');
        assert.equal(kmCreativeResponse.is_expandable, bottomBannerCreative.is_expandable, 'Creative is_expandable');
        assert.equal(kmCreativeResponse.is_scroll_reactive, bottomBannerCreative.is_scroll_reactive, 'Creative is_scroll_reactive');
        assert.equal(kmCreativeResponse.type, 'Banner', 'Creative Type');
        assert.equal(kmCreativeResponse.status, 'IN-DEVELOPMENT', 'Creative Status after Snippet');
        // expected to has no snippet
        assert.isNull(kmCreativeResponse.snippet.generated, 'Creative snippet is null');
        assert.isNull(kmCreativeResponse.snippet.snippet_uuid, 'Creative snippet_uuid is null');
        // expected to has no trackers
        assert.isNull(kmCreativeResponse.primary_click_tracker, 'Creative click Tracker');
        assert.isNull(kmCreativeResponse.primary_impression_tracker, 'Creative impression Tracker');
        // Verify values from snippet playload
        assert.equal(kmCreativeResponse.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media'); // outside snippet object
        assert.equal(kmCreativeResponse.has_kargo_branding, snippetBottomBanner.has_kargo_branding, 'Creative has_kargo_branding'); // outside snippet object
      });
    });

    it('Generate Tag for Bottom Banner creative', () => {
      snippetBottomBanner.id = bottomBannerCreative.id;
      snippetBottomBanner.config.creative_html = 'testing Bottom Banner Snippet';

      const snippetRequest = requestOptions({
        method: 'PUT',
        body: snippetBottomBanner,
        url: `${Cypress.env('km')}/creatives/${bottomBannerCreative.id}/snippet`,
      });

      cy.request(snippetRequest).then((snippetResponse) => {
        assert.equal(snippetResponse.status, 200, 'Response Status value ');
        assert.include(snippetResponse.body.message, 'Creative snippet updated', 'The Creative snippet updated');
        assert.equal(snippetResponse.body.id, bottomBannerCreative.id, 'Updated Creative id ');
      });
    });

    it('Verify the Creative after generating Snippet in KM', () => {
      const getCreativeRequest = requestOptions();
      getCreativeRequest.url = `${Cypress.env('km')}/creatives/${bottomBannerCreative.id}?metrics=true&with=lineItems,format,execution`;
      cy.request(getCreativeRequest).then((getCreativeResponse) => {
        const kmCreativeResponse = getCreativeResponse.body;
        assert.equal(getCreativeResponse.status, 200, 'Response Status Value ');
        assert.equal(kmCreativeResponse.id, bottomBannerCreative.id, 'Creative id');
        assert.equal(kmCreativeResponse.name, bottomBannerCreative.name, 'Creative name');
        assert.equal(kmCreativeResponse.placement_id, bottomBannerCreative.placement_id, 'Creative placement_id');
        assert.equal(kmCreativeResponse.id_alpha, `KM-CREA-${bottomBannerCreative.id}`, 'Creative Alpha id');
        assert.include(kmCreativeResponse.demo_link_url, bottomBannerCreative.id, 'Demo Link contains Creative id ');
        assert.equal(kmCreativeResponse.destination, snippetBottomBanner.config.adserver.toUpperCase(), 'Creative destination');
        assert.equal(kmCreativeResponse.execution.id, bottomBannerCreative.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.execution.name, 'Animated', 'Creative execution name');
        assert.equal(kmCreativeResponse.execution_id, bottomBannerCreative.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.format.id, bottomBannerCreative.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.format.name, 'Bottom Banner', 'Creative format name');
        assert.equal(kmCreativeResponse.format_id, bottomBannerCreative.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.exist_in_adserver, false, 'Creative not in ad server');
        assert.equal(kmCreativeResponse.is_adbuilder, bottomBannerCreative.is_adbuilder, 'Creative is_adbuilder');
        assert.equal(kmCreativeResponse.is_kbr, false, 'Creative is_kbr');
        assert.equal(kmCreativeResponse.is_expandable, bottomBannerCreative.is_expandable, 'Creative is_expandable');
        assert.equal(kmCreativeResponse.is_scroll_reactive, bottomBannerCreative.is_scroll_reactive, 'Creative is_scroll_reactive');
        assert.equal(kmCreativeResponse.type, 'Banner', 'Creative Type');
        assert.equal(kmCreativeResponse.status, 'READY', 'Creative Status after Snippet');
        // Verify Creative has generated snippet
        assert.isNotNull(kmCreativeResponse.snippet.generated, 'Creative snippet is generated');
        assert.include(kmCreativeResponse.snippet.generated, `id_alpha=KM-CREA-${bottomBannerCreative.id}`, 'Creative alpha id in generated snippet');
        assert.isNotNull(kmCreativeResponse.snippet.snippet_uuid, 'Creative snippet_uuid is not null after sbippet is generated'); // uuid inside snippet object
        assert.equal(kmCreativeResponse.snippet.ad_unit_execution.id, bottomBannerCreative.execution_id, 'Creative execution in Snippet');
        assert.equal(kmCreativeResponse.snippet.ad_unit_format.id, bottomBannerCreative.format_id, 'Creative format in Snippet');
        assert.equal(kmCreativeResponse.snippet_url, `https://creative-snippet.dev.kargo.com/snippet/km/${bottomBannerCreative.id}`, 'Creative snippet_url');
        assert.isNotNull(kmCreativeResponse.snippet_uuid, 'Creative snippet_uuid is not null after sbippet is generated'); // uuid outside snippet object
        // Verify values from snippet playload
        assert.equal(kmCreativeResponse.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media'); // outside snippet object
        assert.equal(kmCreativeResponse.has_kargo_branding, snippetBottomBanner.has_kargo_branding, 'Creative has_kargo_branding'); // outside snippet object
        // Verfiy Snippet Config
        assert.equal(kmCreativeResponse.snippet.config.adserver, snippetBottomBanner.config.adserver, 'Creative adserver');
        assert.isEmpty(kmCreativeResponse.snippet.config.additional_impression_trackers, 'Creative additional_impression_trackers');
        assert.equal(kmCreativeResponse.snippet.config.has_kargo_branding, snippetBottomBanner.config.has_kargo_branding, 'Creative has_kargo_branding');
        assert.equal(kmCreativeResponse.snippet.config.has_responsive_width, snippetBottomBanner.config.has_responsive_width, 'Creative html');
        assert.equal(kmCreativeResponse.snippet.config.creative_html, snippetBottomBanner.config.creative_html, 'Creative html');
        assert.equal(kmCreativeResponse.snippet.config.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media');
        // expected to has trackers
        assert.isNotNull(kmCreativeResponse.primary_click_tracker, 'Creative click Tracker');
        assert.equal(kmCreativeResponse.primary_click_tracker.type, 'click', 'Creative click Tracker'); // tracker type should be click
        assert.isNotNull(kmCreativeResponse.primary_impression_tracker, 'Creative impression Tracker');
        assert.equal(kmCreativeResponse.primary_impression_tracker.type, 'impression', 'Creative impression Tracker'); // tracker type should be impression
      });
    });

    it('Edit generated tag for Bottom Banner creative', () => {
      snippetBottomBanner.config.additional_impression_trackers = ['<script>test Bottom Banner snippet</script>'];
      snippetBottomBanner.config.is_rich_media = false;
      snippetBottomBanner.config.creative_width = 345;
      snippetBottomBanner.config.creative_height = 160;
      snippetBottomBanner.config.creative_image_url = 'https://storage.cloud.kargo.com/cp/file-assets/2022/1676549552_63ee1db05e9fc.jpg?filename=/AspireInfotech.jpg';
      snippetBottomBanner.config.click_url = 'https://www.kargo.com';

      const snippetRequest = requestOptions({
        method: 'PUT',
        body: snippetBottomBanner,
        url: `${Cypress.env('km')}/creatives/${bottomBannerCreative.id}/snippet`,
      });

      cy.request(snippetRequest).then((snippetResponse) => {
        assert.equal(snippetResponse.status, 200, 'Response Status value ');
        assert.include(snippetResponse.body.message, 'Creative snippet updated', 'The Creative snippet updated');
        assert.equal(snippetResponse.body.id, bottomBannerCreative.id, 'Updated Creative id ');
      });
    });

    it('Verify the Creative after Updating Snippet in KM', () => {
      const getCreativeRequest = requestOptions();
      getCreativeRequest.url = `${Cypress.env('km')}/creatives/${bottomBannerCreative.id}?metrics=true&with=lineItems,format,execution`;
      cy.request(getCreativeRequest).then((getCreativeResponse) => {
        const kmCreativeResponse = getCreativeResponse.body;

        // assigning Snippet & Creative info to be used in snippet service verification
        bottomBannerCreative.fullSnippet = kmCreativeResponse.snippet.generated;
        bottomBannerCreative.snippetUuid = kmCreativeResponse.snippet_uuid;
        bottomBannerCreative.snippetUrl = kmCreativeResponse.snippet_url;
        bottomBannerCreative.clickTrackerId = kmCreativeResponse.primary_click_tracker.id;
        bottomBannerCreative.clickTrackerTid = kmCreativeResponse.primary_click_tracker.tid;
        bottomBannerCreative.clickTrackerType = kmCreativeResponse.primary_click_tracker.type;
        bottomBannerCreative.impressionTrackerId = kmCreativeResponse.primary_impression_tracker.id;
        bottomBannerCreative.impressionTrackerTid = kmCreativeResponse.primary_impression_tracker.tid;
        bottomBannerCreative.impressionTrackerType = kmCreativeResponse.primary_impression_tracker.type;
        bottomBannerCreative.formatName = kmCreativeResponse.format.name;
        bottomBannerCreative.executionName = kmCreativeResponse.execution.name;

        assert.equal(getCreativeResponse.status, 200, 'Response Status Value ');
        assert.equal(kmCreativeResponse.id, bottomBannerCreative.id, 'Creative id');
        assert.equal(kmCreativeResponse.name, bottomBannerCreative.name, 'Creative name');
        assert.equal(kmCreativeResponse.placement_id, bottomBannerCreative.placement_id, 'Creative placement_id');
        assert.equal(kmCreativeResponse.id_alpha, `KM-CREA-${bottomBannerCreative.id}`, 'Creative Alpha id');
        assert.include(kmCreativeResponse.demo_link_url, bottomBannerCreative.id, 'Demo Link contains Creative id ');
        assert.equal(kmCreativeResponse.destination, snippetBottomBanner.config.adserver.toUpperCase(), 'Creative destination');
        assert.equal(kmCreativeResponse.execution.id, bottomBannerCreative.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.execution.name, 'Animated', 'Creative execution name');
        assert.equal(kmCreativeResponse.execution_id, bottomBannerCreative.execution_id, 'Creative execution id');
        assert.equal(kmCreativeResponse.format.id, bottomBannerCreative.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.format.name, 'Bottom Banner', 'Creative format name');
        assert.equal(kmCreativeResponse.format_id, bottomBannerCreative.format_id, 'Creative format id');
        assert.equal(kmCreativeResponse.exist_in_adserver, false, 'Creative not in ad server');
        assert.equal(kmCreativeResponse.is_adbuilder, bottomBannerCreative.is_adbuilder, 'Creative is_adbuilder');
        assert.equal(kmCreativeResponse.is_kbr, false, 'Creative is_kbr');
        assert.equal(kmCreativeResponse.is_expandable, bottomBannerCreative.is_expandable, 'Creative is_expandable');
        assert.equal(kmCreativeResponse.is_scroll_reactive, bottomBannerCreative.is_scroll_reactive, 'Creative is_scroll_reactive');
        assert.equal(kmCreativeResponse.type, 'Banner', 'Creative Type');
        assert.equal(kmCreativeResponse.status, 'READY', 'Creative Status after Snippet');
        // Verify Creative has generated snippet
        assert.isNotNull(kmCreativeResponse.snippet.generated, 'Creative snippet is generated');
        assert.include(kmCreativeResponse.snippet.generated, `id_alpha=KM-CREA-${bottomBannerCreative.id}`, 'Creative alpha id in generated snippet');
        assert.isNotNull(kmCreativeResponse.snippet.snippet_uuid, 'Creative snippet_uuid is not null after sbippet is generated'); // uuid inside snippet object
        assert.equal(kmCreativeResponse.snippet.ad_unit_execution.id, bottomBannerCreative.execution_id, 'Creative execution in Snippet');
        assert.equal(kmCreativeResponse.snippet.ad_unit_format.id, bottomBannerCreative.format_id, 'Creative format in Snippet');
        assert.equal(kmCreativeResponse.snippet_url, `https://creative-snippet.dev.kargo.com/snippet/km/${bottomBannerCreative.id}`, 'Creative snippet_url');
        assert.isNotNull(kmCreativeResponse.snippet_uuid, 'Creative snippet_uuid is not null after sbippet is generated'); // uuid outside snippet object
        // Verify values from snippet playload
        assert.equal(kmCreativeResponse.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media'); // outside snippet object
        assert.equal(kmCreativeResponse.has_kargo_branding, snippetBottomBanner.has_kargo_branding, 'Creative has_kargo_branding'); // outside snippet object
        // Verfiy Snippet Config
        assert.equal(kmCreativeResponse.snippet.config.adserver, snippetBottomBanner.config.adserver, 'Creative adserver');
        assert.include(kmCreativeResponse.snippet.config.additional_impression_trackers[0], snippetBottomBanner.config.additional_impression_trackers[0], 'Creative additional_impression_trackers');
        assert.equal(kmCreativeResponse.snippet.config.has_kargo_branding, snippetBottomBanner.config.has_kargo_branding, 'Creative has_kargo_branding');
        assert.equal(kmCreativeResponse.snippet.config.has_responsive_width, snippetBottomBanner.config.has_responsive_width, 'Creative html');
        assert.equal(kmCreativeResponse.snippet.config.creative_html, snippetBottomBanner.config.creative_html, 'Creative html');
        assert.equal(kmCreativeResponse.snippet.config.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media');
        assert.equal(kmCreativeResponse.snippet.config.click_url, snippetBottomBanner.config.click_url, 'Creative click_url');
        assert.equal(kmCreativeResponse.snippet.config.creative_height, snippetBottomBanner.config.creative_height, 'Creative creative_height');
        assert.equal(kmCreativeResponse.snippet.config.creative_image_url, snippetBottomBanner.config.creative_image_url, 'Creative creative_image_url');
        assert.equal(kmCreativeResponse.snippet.config.creative_width, snippetBottomBanner.config.creative_width, 'Creative creative_width');
        // expected to has trackers
        assert.isNotNull(kmCreativeResponse.primary_click_tracker, 'Creative click Tracker');
        assert.equal(kmCreativeResponse.primary_click_tracker.type, 'click', 'Creative click Tracker'); // tracker type should be click
        assert.isNotNull(kmCreativeResponse.primary_impression_tracker, 'Creative impression Tracker');
        assert.equal(kmCreativeResponse.primary_impression_tracker.type, 'impression', 'Creative impression Tracker'); // tracker type should be impression;
      });
    });

    it('Validate Bottom Banner Creative found in UI External Snippet Service', () => {
      cy.visit(bottomBannerCreative.snippetUrl);

      cy.get('div.metadata:nth-child(2)', { timeout: 8000 }).should('contain', bottomBannerCreative.name);
      cy.get('div.metadata:nth-child(3)').should('contain', bottomBannerCreative.id); // Verifies KM Creative ID
      cy.get('div.metadata:nth-child(4)').should('contain', 'KM'); // Creative Origin will always = KM
      cy.get('div.metadata:nth-child(5)').should('contain', bottomBannerCreative.formatName.replace(' ', '')); // Verifies KM Creative Format Name with no spaces
      cy.get('div.metadata:nth-child(6)').should('contain', bottomBannerCreative.executionName); // Verifies KM Creative Execution
      cy.get('[id="snippet"]').should('contain', bottomBannerCreative.fullSnippet); // Verifies large text matches Full Snippet code from KM Creative
    });

    it('Validate Bottom Banner Creative found in API External Snippet Service', () => {
      const getCreativeSnippetRequest = requestOptions();
      getCreativeSnippetRequest.url = `https://ad-snippet-service.dev.kargo.com/api/snippet/${bottomBannerCreative.snippetUuid}`;
      cy.request(getCreativeSnippetRequest).then((getCreativeSnippetResponse) => {
        const snippetResponse = getCreativeSnippetResponse.body;
        assert.equal(getCreativeSnippetResponse.status, 200, 'Response Status Value ');
        // Verify config{} object in Ad Snippet Servie
        assert.equal(snippetResponse.config.adserver, snippetBottomBanner.config.adserver, 'Creative adserver');
        assert.include(snippetResponse.config.additional_impression_trackers[0], snippetBottomBanner.config.additional_impression_trackers[0], 'Creative additional_impression_trackers');
        assert.equal(snippetResponse.config.has_kargo_branding, snippetBottomBanner.config.has_kargo_branding, 'Creative has_kargo_branding');
        assert.equal(snippetResponse.config.has_responsive_width, snippetBottomBanner.config.has_responsive_width, 'Creative has_responsive_width');
        assert.equal(snippetResponse.config.creative_html, snippetBottomBanner.config.creative_html, 'Creative creative_html');
        assert.equal(snippetResponse.config.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media');
        assert.equal(snippetResponse.config.creative_width, snippetBottomBanner.config.creative_width, 'Creative creative_width');
        assert.equal(snippetResponse.config.creative_height, snippetBottomBanner.config.creative_height, 'Creative creative_height');
        assert.equal(snippetResponse.config.creative_image_url, snippetBottomBanner.config.creative_image_url, 'Creative creative_image_url');
        assert.equal(snippetResponse.config.click_url, snippetBottomBanner.config.click_url, 'Creative click_url');
        // Verify request_data{} object in Ad Snippet Servie
        assert.equal(snippetResponse.request_data.creative_origin, 'km', 'Creative Origin'); // Creative Origin will always = KM
        assert.equal(snippetResponse.request_data.creative_id, bottomBannerCreative.id, 'Creative id in KM');
        assert.equal(snippetResponse.request_data.format, bottomBannerCreative.formatName.replace(' ', ''), 'Creative format name');
        assert.equal(snippetResponse.request_data.execution, bottomBannerCreative.executionName, 'Creative execution name');
        assert.equal(snippetResponse.request_data.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media');
        assert.equal(snippetResponse.request_data.is_ad_builder, bottomBannerCreative.is_adbuilder, 'Creative is ad builder');
        assert.isNull(snippetResponse.request_data.ad_builder_ad_id, 'Creative ad builder id');
        assert.isTrue(snippetResponse.request_data.add_auto_trackers, 'Creative add_auto_trackers');
        assert.equal(snippetResponse.request_data.id_alpha, `KM-CREA-${bottomBannerCreative.id}`, 'Creative alpha id');
        assert.isTrue(snippetResponse.request_data.enable_download_impression_tracking, 'Creative download for tracker');
        assert.equal(snippetResponse.request_data.config.adserver, snippetBottomBanner.config.adserver, 'Creative adserver');
        assert.include(snippetResponse.request_data.config.additional_impression_trackers[0], snippetBottomBanner.config.additional_impression_trackers[0], 'Creative additional_impression_trackers');
        assert.equal(snippetResponse.request_data.config.has_kargo_branding, snippetBottomBanner.config.has_kargo_branding, 'Creative has_kargo_branding');
        assert.equal(snippetResponse.request_data.config.has_responsive_width, snippetBottomBanner.config.has_responsive_width, 'Creative has_responsive_width');
        assert.equal(snippetResponse.request_data.config.creative_html, snippetBottomBanner.config.creative_html, 'Creative creative_html');
        assert.equal(snippetResponse.request_data.config.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media');
        assert.equal(snippetResponse.request_data.config.creative_width, snippetBottomBanner.config.creative_width, 'Creative creative_width');
        assert.equal(snippetResponse.request_data.config.creative_height, snippetBottomBanner.config.creative_height, 'Creative creative_height');
        assert.equal(snippetResponse.request_data.config.creative_image_url, snippetBottomBanner.config.creative_image_url, 'Creative creative_image_url');
        assert.equal(snippetResponse.request_data.config.click_url, snippetBottomBanner.config.click_url, 'Creative click_url');
        assert.equal(snippetResponse.request_data.trackers_config.default_impression.tid, bottomBannerCreative.impressionTrackerTid, 'Creative impression tracker tid');
        assert.equal(snippetResponse.request_data.trackers_config.default_click.tid, bottomBannerCreative.clickTrackerTid, 'Creative click tracker tid');

        assert.isTrue(snippetResponse.add_auto_trackers, 'Creative add auto trackers');
        assert.equal(snippetResponse.creative_id, bottomBannerCreative.id, 'Creative id');
        assert.equal(snippetResponse.creative_origin, 'km', 'Creative origin');
        assert.equal(snippetResponse.execution, bottomBannerCreative.executionName, 'Creative execution');
        assert.equal(snippetResponse.format, bottomBannerCreative.formatName.replace(' ', ''), 'Creative format');
        assert.equal(snippetResponse.generated, bottomBannerCreative.fullSnippet, 'Creative generated');
        assert.include(snippetResponse.generated, `id_alpha=KM-CREA-${bottomBannerCreative.id}`, 'Creative alpha id in generated snippet');
        assert.equal(snippetResponse.id_alpha, `KM-CREA-${bottomBannerCreative.id}`, 'Creative alpha id');
        assert.equal(snippetResponse.is_rich_media, snippetBottomBanner.config.is_rich_media, 'Creative is_rich_media');
        // assert.equal(snippetResponse.primary_click_tracker_id, bottomBannerCreative.clickTrackerId, 'Creative click tracker id');
        // assert.equal(snippetResponse.primary_impression_tracker_id, bottomBannerCreative.impressionTrackerId, 'Creative impression tracker id');
        assert.equal(snippetResponse.uuid, bottomBannerCreative.snippetUuid, 'Creative snippet uuid');
        // assert.equal(snippetResponse.trackers[0].id, bottomBannerCreative.impressionTrackerId, 'Creative impression tracker id');
        assert.equal(snippetResponse.trackers[0].tid, bottomBannerCreative.impressionTrackerTid, 'Creative impression tracker tid');
        assert.equal(snippetResponse.trackers[0].type, bottomBannerCreative.impressionTrackerType, 'Creative impression tracker type');
        // assert.equal(snippetResponse.trackers[1].id, bottomBannerCreative.clickTrackerId, 'Creative click tracker id');
        assert.equal(snippetResponse.trackers[1].tid, bottomBannerCreative.clickTrackerTid, 'Creative click tracker tid');
        assert.equal(snippetResponse.trackers[1].type, bottomBannerCreative.clickTrackerType, 'Creative click tracker type');
      });
    });
  });
});
