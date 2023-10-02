/* eslint-disable max-len */
import 'cypress-file-upload';
import 'cypress-wait-until';

const { allMyHeaders } = require('../../helpers/login-helper');
const { waitTitleToBeLoaded, waitLoaderToDisappear } = require('../../helpers/wait-helper');
const { generateName } = require('../../helpers/name-helper');
const { requestOptions } = require('../../helpers/request-helper');

context('Add Creative - Top-Middle-bottom-Banner', () => {
  describe('Add Creative - Top-Middle-bottom-Banner UI', () => {
    let userSessionToken;

    const topBannerCreative = {};
    // const middleBannerCreartive = {};
    // const bottomBannerCreative = {};
    let placementId;

    before(async () => {
      await allMyHeaders('kargoqa@gmail.com', 'K@rgo123!').then((item) => {
        userSessionToken = item;
      });
    });

    beforeEach(() => {
      cy.setCookie('MP_DEV', userSessionToken[8]);
      cy.setCookie('user-token', userSessionToken[3]);
    });

    it('Retrieve a Placement', () => {
      // search for placement created this month
      const currentMonth = Cypress.moment().format('YY.MM');

      const searchForPlacementThismonth = requestOptions({
        url: `/api/v1/placements?exclude_tests=true&is_archived=0&limit=50&page=1&search=${currentMonth}&sort=name&sort_direction=ASC&status=active,upcoming&with=lineItems,kpiGoals,goals`,
      });

      cy.request(searchForPlacementThismonth).then((resp) => {
        if (resp.body.data.length) {
          placementId = resp.body.data[0].id;
          cy.log(placementId);
          cy.visit(`/advertising#/placements/${placementId}`);
          waitTitleToBeLoaded();
        } else {
          cy.task('log', 'No Placement Found');
        }
      });
      cy.get('td h5').first().scrollIntoView().should('be.visible');
    });

    it('Add Top Banner Creative', () => {
      topBannerCreative.name = generateName('UI-Top-Banner-Creative');
      topBannerCreative.format = 'Top Banner';
      topBannerCreative.execution = 'Standard';
      topBannerCreative.richMedia = 'Yes';

      cy.server();
      cy.route('GET', '/api/v1/creatives*').as('creativeAPI');
      cy.route('/api/v1/ad-unit-formats*').as('adUnitFormatsCall');

      cy.get('[ui-sref="Placement Creatives({id:tabCtrl.getID()})"]').click().wait('@creativeAPI');

      cy.get('button.button--primary').contains('Add Creative').click().wait('@adUnitFormatsCall', { timeout: 15000 });

      cy.get('[data-ng-model="creative.name"]').type(topBannerCreative.name);
      cy.get('[placeholder="Select Format"]').type(topBannerCreative.format).type('{downArrow}');

      cy.get('ul.typeahead-dropdown-new').click();
      cy.get('[placeholder="Select Execution"]', { timeout: 8000 }).type(topBannerCreative.execution);
      cy.get('.typeahead-dropdown-new').click();
      cy.get('[data-cp-pretty-checkbox-label="Is Expandable"]').click();
      topBannerCreative.expandable = 'Yes';
      cy.get('[data-cp-pretty-checkbox-label="Is Scroll Reactive"]').click();
      topBannerCreative.scrollReactive = 'Yes';

      cy.get('.u-flex .button--primary.button--onColor').click({ force: true });
      waitLoaderToDisappear();
      cy.task('log', 'Top Banner Creative has been created');
      // Search for creative
      cy.get('[placeholder="Search"]', { timeout: 8000 }).type(topBannerCreative.name);

      cy.get('krg-creatives-table > table > tbody').contains(topBannerCreative.name).click();
      cy.url().then(($url) => {
        topBannerCreative.id = $url.split('creatives/').pop(); // getting creative id from URL
      });
    });

    it('Verify the added Top Banner creative information (left rail)', () => {
      cy.visit(`/advertising#/creatives/${topBannerCreative.id}`);
      waitTitleToBeLoaded();
      cy.get('pre.codeBlock').should('be.visible');
      cy.get('h1.headerTitle').should('contain', topBannerCreative.name);
      cy.get(' dd:nth-child(2) > p3').should('contain', `${topBannerCreative.id}`);
      cy.get(' dd:nth-child(4) > p3').should('contain', topBannerCreative.execution);
      cy.get(' dd:nth-child(6) > p3').should('contain', topBannerCreative.format);
      cy.get(' div > dd:nth-child(2) > p3').should('contain', topBannerCreative.richMedia);
      cy.get(' div > dd:nth-child(4) > p3 ').should('contain', topBannerCreative.expandable);
      cy.get(' div > dd:nth-child(6) > p3 ').should('contain', topBannerCreative.scrollReactive);
      cy.get(' dd:nth-child(9) > p3:nth-child(2)').should('contain', 'N/A'); // description
    });

    it('Edit the created Top Banner creative', () => {
      topBannerCreative.name += '-updated';
      cy.server();
      cy.route('/api/v1/ad-unit-formats*').as('adUnitFormatsCall');
      cy.route('PUT', `/api/v1/creatives/${topBannerCreative.id}`).as('editAPI');
      cy.route('/api/v1/campaigns/*').as('campaignAPI');

      cy.wait('@campaignAPI');
      cy.get('[data-ng-if="creativeDetailsCtrl.canEdit()"]').click({ force: true });
      cy.wait('@adUnitFormatsCall', { timeout: 15000 });

      cy.get('[data-ng-model="creative.name"]').clear().type(topBannerCreative.name);

      cy.get('[data-cp-pretty-checkbox-label="Is Expandable"]').click();
      cy.get('[data-cp-pretty-checkbox-label="Is Scroll Reactive"]').click();
      topBannerCreative.expandable = 'No';
      topBannerCreative.scrollReactive = 'No';
      cy.get('.u-flex .button--primary.button--onColor').click();
      cy.wait('@editAPI');
      waitLoaderToDisappear();
    });

    it('Verify the edited Top Banner creative information (left rail)', () => {
      cy.visit(`/advertising#/creatives/${topBannerCreative.id}`);
      waitTitleToBeLoaded();
      cy.get('pre.codeBlock').should('be.visible');
      cy.get('h1.headerTitle').should('contain', topBannerCreative.name);
      cy.get(' dd:nth-child(2) > p3').should('contain', `${topBannerCreative.id}`);
      cy.get(' dd:nth-child(4) > p3').should('contain', topBannerCreative.execution);
      cy.get(' dd:nth-child(6) > p3').should('contain', topBannerCreative.format);
      cy.get(' div > dd:nth-child(2) > p3').should('contain', topBannerCreative.richMedia);
      cy.get(' div > dd:nth-child(4) > p3 ').should('contain', topBannerCreative.expandable);
      cy.get(' div > dd:nth-child(6) > p3 ').should('contain', topBannerCreative.scrollReactive);
      cy.get(' dd:nth-child(9) > p3:nth-child(2)').should('contain', 'N/A'); // description
    });

    it('Verify that trackers table has No Data before Generate Tag for Top Banner creative', () => {
      cy.server();
      cy.route('/api/v1/creatives/*/trackers*').as('trackersAPI');
      cy.get('[ui-sref="Creative Trackers({id:tabCtrl.getID()})"]').click().wait('@trackersAPI');
      cy.get('krg-trackers-table > table > tbody').then((tableData) => {
        const tbody = tableData.text();
        expect(tbody).equal('No Trackers');
      });
    });

    it('Generate Tag for Top Banner creative', () => {
      topBannerCreative.creativeHtml = 'testing Banner';
      topBannerCreative.tracking = 'https://www.google.com';

      cy.visit(`/advertising#/creatives/${topBannerCreative.id}`);
      waitTitleToBeLoaded();
      cy.get('.js-codeBlock.line-numbers').should('be.empty'); // code block has no snippet
      cy.get('button.button--primary').contains('Generate Tag').click();
      cy.get('[data-cp-pretty-radio="ctrl.getSetRichMedia"]').eq(0).click();
      cy.get('[data-cp-pretty-checkbox="creative.has_kargo_branding"]').click();
      cy.get('[name="creativeHtml"]').type(topBannerCreative.creativeHtml);
      cy.get('[name="additionalImpressionTrackers"]').type(topBannerCreative.tracking);
      cy.get('[data-cp-pretty-checkbox="tracker.getSetter"]').click();

      // Submit
      cy.get('.u-flex .button--primary.button--onColor').click();
      waitLoaderToDisappear();
    });

    it('Verify the buttons and code block is not empty after generating tag for Top Banner creative', () => {
      cy.visit(`/advertising#/creatives/${topBannerCreative.id}`);
      waitTitleToBeLoaded();
      cy.get(' div > dd:nth-child(2) > p3').should('contain', topBannerCreative.richMedia);
      cy.get('[data-cp-action-menu="ctrl.getCreativeActions()"]').should('be.enabled').click();
      cy.get('[data-cp-action-menu="ctrl.getPreviewActions()"]').should('be.enabled').click();
      cy.get('.js-codeBlock.line-numbers.language-markup').should('not.be.empty');
    });

    it('Verify tracker table has data after generating tag for Top Banner creative', () => {
      cy.visit(`/advertising#/creatives/${topBannerCreative.id}`);
      waitTitleToBeLoaded();

      cy.get('[ui-sref="Creative Trackers({id:tabCtrl.getID()})"]').click();
      cy.get('tr a', { timeout: 8000 }).should('be.visible');
      cy.get('krg-trackers-table > table > tbody').should('not.be.empty');
      cy.get('.cpPagination').then((text) => {
        const rows = text.text().split(' ');
        // eslint-disable-next-line radix
        expect(parseInt(rows[5])).equal(2); // 2 trackers
      });
    });

    it('Edit generated tag for Top Banner creative', () => {
      topBannerCreative.creativeWidth = 45;
      topBannerCreative.creativeHeight = 48;
      topBannerCreative.clickURL = 'https://www.yahoo.com';
      topBannerCreative.img = 'kargo.png';

      cy.visit(`/advertising#/creatives/${topBannerCreative.id}`);
      waitTitleToBeLoaded();
      cy.get('[data-ng-click="ctrl.createOrEditAdTag()"]').click();

      cy.get('[data-cp-pretty-radio-label="Static"]').click(); // click on static button
      topBannerCreative.richMedia = 'No';
      cy.get('[name="creativeWidth"]').type(topBannerCreative.creativeWidth);
      cy.get('[name="creativeHeight"]').type(topBannerCreative.creativeHeight);
      cy.get('[name="clickUrl"]').type(topBannerCreative.clickURL);
      cy.get('input.js-fileInput', { timeout: 2000 }).attachFile(topBannerCreative.img);
      cy.get('[data-cp-pretty-checkbox="creative.has_kargo_branding"]').click();
      cy.get('[data-cp-pretty-checkbox="tracker.getSetter"]').click();

      // Submit
      cy.get('.u-flex .button--primary.button--onColor').click();
      waitLoaderToDisappear('button .loader');

      // getting snippet info from API
      const getCreativeApi = requestOptions({
        url: `/api/v1/creatives/${topBannerCreative.id}?metrics=true&with=lineItems,format,execution`,
      });
      cy.request(getCreativeApi).then((response) => {
        topBannerCreative.fullSnippet = response.body.snippet.generated;
        topBannerCreative.snippetUuid = response.body.snippet_uuid;
      });
    });

    it('Verify the buttons and code block is not empty after editing generated tag for Top Banner creative', () => {
      cy.visit(`/advertising#/creatives/${topBannerCreative.id}`);
      waitTitleToBeLoaded();
      cy.get(' div > dd:nth-child(2) > p3').should('contain', topBannerCreative.richMedia);
      cy.get('[data-cp-action-menu="ctrl.getCreativeActions()"]').should('be.enabled').click();
      cy.get('[data-cp-action-menu="ctrl.getPreviewActions()"]').should('be.enabled').click();
      cy.get('.js-codeBlock.line-numbers.language-markup').should('not.be.empty');
    });

    it('Verify tracker table has data after editing generated tag for Top Banner creative', () => {
      cy.visit(`/advertising#/creatives/${topBannerCreative.id}`);
      waitTitleToBeLoaded();

      cy.get('[ui-sref="Creative Trackers({id:tabCtrl.getID()})"]').click();
      cy.get('tr a', { timeout: 8000 }).should('be.visible');
      cy.get('krg-trackers-table > table > tbody').should('not.be.empty');
      cy.get('.cpPagination').then((text) => {
        const rows = text.text().split(' ');
        // eslint-disable-next-line radix
        expect(parseInt(rows[5])).equal(2); // 2 trackers
      });
    });

    it('Validate Creative found in External Snippet Service', () => {
      cy.visit(`https://ad-snippet-service.dev.kargo.com/snippet/km/${topBannerCreative.id}`);

      cy.get('div.metadata:nth-child(2)', { timeout: 8000 }).should('contain', topBannerCreative.name);
      cy.get('div.metadata:nth-child(3)').should('contain', topBannerCreative.id); // Verifies KM Creative ID
      cy.get('div.metadata:nth-child(4)').should('contain', 'KM'); // Creative Origin will always = KM
      cy.get('div.metadata:nth-child(5)').should('contain', topBannerCreative.format.replace(' ', '')); // Verifies KM Creative Format Name with no spaces
      cy.get('div.metadata:nth-child(6)').should('contain', topBannerCreative.execution); // Verifies KM Creative Execution
      cy.get('[id="snippet"]').should('contain', topBannerCreative.fullSnippet); // Verifies large text matches Full Snippet code from KM Creative
    });

    // // ////////////////////////* Middle Banner*//////////////////////

    // it('Navigate to the retrieved Placement', () => {
    //     // this step is needed for the creative screen to load correctly
    //     cy.visit(`/advertising#/placements/${placementId}`);
    //     waitTitleToBeLoaded();
    // });

    // it('Add Creative (Middle Banner)', () => {
    //     middleBannerCreartive.name = generateName('UI-Middle-Banner-Creative');
    //     middleBannerCreartive.format = 'Middle Banner';
    //     middleBannerCreartive.execution = 'Standard';
    //     middleBannerCreartive.richMedia = 'Yes';

    //     cy.server();
    //     cy.route('GET', '/api/v1/creatives*').as('creativeAPI');
    //     cy.route('/api/v1/ad-unit-formats*').as('adUnitFormatsCall');

    //     cy.get('td h5').first().scrollIntoView().should('be.visible');

    //     cy.get('[ui-sref="Placement Creatives({id:tabCtrl.getID()})"]').click().wait('@creativeAPI');

    //     cy.get('button.button--primary').contains('Add Creative').click().wait('@adUnitFormatsCall', { timeout: 15000 });

    //     cy.get('[data-ng-model="creative.name"]').type(middleBannerCreartive.name);
    //     cy.get('[placeholder="Select Format"]').type(middleBannerCreartive.format).type('{downArrow}');

    //     cy.get('ul.typeahead-dropdown-new').click();
    //     cy.get('[placeholder="Select Execution"]', { timeout: 8000 }).type(middleBannerCreartive.execution);
    //     cy.get('.typeahead-dropdown-new').click();
    //     cy.get('[data-cp-pretty-checkbox-label="Is Scroll Reactive"]').click();
    //     middleBannerCreartive.expandable = 'No';
    //     middleBannerCreartive.scrollReactive = 'Yes';

    //     cy.get('.u-flex .button--primary.button--onColor').click({ force: true });
    //     waitLoaderToDisappear('button .loader');
    //     cy.task('log', 'Middle Banner Creative has been created');
    // });


    // it('Search for the added Middle Banner creative and retrieve its id', () => {
    //     cy.visit(`/advertising#/placements/${placementId}/creatives`);
    //     waitTitleToBeLoaded();
    //     cy.get('[placeholder="Search"]', { timeout: 8000 }).type(middleBannerCreartive.name);

    //     cy.get('krg-creatives-table > table > tbody').contains(middleBannerCreartive.name).click();
    //     cy.url().then(($url) => {
    //         middleBannerCreartive.id = $url.split('creatives/').pop(); // getting creative id from URL
    //     });
    // });

    // it('Verify the added Middle Banner creative information (left rail)', () => {
    //     cy.visit(`/advertising#/creatives/${middleBannerCreartive.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get('pre.codeBlock').should('be.visible');
    //     cy.get('h1.headerTitle').should('contain', middleBannerCreartive.name);
    //     cy.get(' dd:nth-child(2) > p3').should('contain', `${middleBannerCreartive.id}`);
    //     cy.get(' dd:nth-child(4) > p3').should('contain', middleBannerCreartive.execution);
    //     cy.get(' dd:nth-child(6) > p3').should('contain', middleBannerCreartive.format);
    //     cy.get(' div > dd:nth-child(2) > p3').should('contain', middleBannerCreartive.richMedia);
    //     cy.get(' div > dd:nth-child(4) > p3 ').should('contain', middleBannerCreartive.expandable);
    //     cy.get(' div > dd:nth-child(6) > p3 ').should('contain', middleBannerCreartive.scrollReactive);
    //     cy.get(' dd:nth-child(9) > p3:nth-child(2)').should('contain', 'N/A'); // description
    // });

    // it('Edit the created Middle Banner creative', () => {
    //     middleBannerCreartive.name += '-updated';
    //     cy.server();
    //     cy.route('/api/v1/ad-unit-formats*').as('adUnitFormatsCall');
    //     cy.route('PUT', `/api/v1/creatives/${middleBannerCreartive.id}`).as('editAPI');
    //     cy.route('/api/v1/campaigns/*').as('campaignAPI');

    //     cy.wait('@campaignAPI');
    //     cy.get('[data-ng-if="creativeDetailsCtrl.canEdit()"]').click({ force: true });
    //     cy.wait('@adUnitFormatsCall', { timeout: 15000 });

    //     cy.get('[data-ng-model="creative.name"]').clear().type(middleBannerCreartive.name);

    //     cy.get('[data-cp-pretty-checkbox-label="Is Expandable"]').click();
    //     cy.get('[data-cp-pretty-checkbox-label="Is Scroll Reactive"]').click();
    //     middleBannerCreartive.expandable = 'Yes';
    //     middleBannerCreartive.scrollReactive = 'No';
    //     cy.get('.u-flex .button--primary.button--onColor').click();
    //     cy.wait('@editAPI');
    //     waitLoaderToDisappear();
    // });

    // it('Verify the edited Middle Banner creative information (left rail)', () => {
    //     cy.visit(`/advertising#/creatives/${middleBannerCreartive.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get('pre.codeBlock').should('be.visible');
    //     cy.get('h1.headerTitle').should('contain', middleBannerCreartive.name);
    //     cy.get(' dd:nth-child(2) > p3').should('contain', `${middleBannerCreartive.id}`);
    //     cy.get(' dd:nth-child(4) > p3').should('contain', middleBannerCreartive.execution);
    //     cy.get(' dd:nth-child(6) > p3').should('contain', middleBannerCreartive.format);
    //     cy.get(' div > dd:nth-child(2) > p3').should('contain', middleBannerCreartive.richMedia);
    //     cy.get(' div > dd:nth-child(4) > p3 ').should('contain', middleBannerCreartive.expandable);
    //     cy.get(' div > dd:nth-child(6) > p3 ').should('contain', middleBannerCreartive.scrollReactive);
    //     cy.get(' dd:nth-child(9) > p3:nth-child(2)').should('contain', 'N/A'); // description
    // });

    // it('Verify that trackers table has No Data before Generate Tag for Middle Banner creative', () => {
    //     cy.server();
    //     cy.route('/api/v1/creatives/*/trackers*').as('trackersAPI');
    //     cy.get('[ui-sref="Creative Trackers({id:tabCtrl.getID()})"]').click().wait('@trackersAPI');
    //     cy.get('krg-trackers-table > table > tbody').then((tableData) => {
    //         const tbody = tableData.text();
    //         expect(tbody).equal('No Trackers');
    //     });
    // });

    // it('Generate Tag for Middle Banner creative', () => {
    //     middleBannerCreartive.creativeHtml = 'testing Banner';
    //     middleBannerCreartive.tracking = 'https://www.google.com';

    //     cy.visit(`/advertising#/creatives/${middleBannerCreartive.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get('.js-codeBlock.line-numbers').should('be.empty'); // code block has no snippet
    //     cy.get('button.button--primary').contains('Generate Tag').click();
    //     cy.get('[data-cp-pretty-radio="ctrl.getSetRichMedia"]').eq(0).click();
    //     cy.get('[data-cp-pretty-checkbox="creative.has_kargo_branding"]').click();
    //     cy.get('[name="creativeHtml"]').type(middleBannerCreartive.creativeHtml);
    //     cy.get('[name="additionalImpressionTrackers"]').type(middleBannerCreartive.tracking);
    //     cy.get('[data-cp-pretty-checkbox="tracker.getSetter"]').click();

    //     // Submit
    //     cy.get('.u-flex .button--primary.button--onColor').click();
    //     waitLoaderToDisappear();
    // });

    // it('Verify the buttons and code block is not empty after generating tag for Middle Banner creative', () => {
    //     cy.visit(`/advertising#/creatives/${middleBannerCreartive.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get(' div > dd:nth-child(2) > p3').should('contain', middleBannerCreartive.richMedia);
    //     cy.get('[data-cp-action-menu="ctrl.getCreativeActions()"]').should('be.enabled').click();
    //     cy.get('[data-cp-action-menu="ctrl.getPreviewActions()"]').should('be.enabled').click();
    //     cy.get('.js-codeBlock.line-numbers.language-markup').should('not.be.empty');
    // });

    // it('Verify tracker table has data after generating tag for Middle Banner creative', () => {
    //     cy.visit(`/advertising#/creatives/${middleBannerCreartive.id}`);
    //     waitTitleToBeLoaded();

    //     cy.get('[ui-sref="Creative Trackers({id:tabCtrl.getID()})"]').click();
    //     cy.get('tr a', { timeout: 8000 }).should('be.visible');
    //     cy.get('krg-trackers-table > table > tbody').should('not.be.empty');
    //     cy.get('.cpPagination').then((text) => {
    //         const rows = text.text().split(' ');
    //         // eslint-disable-next-line radix
    //         expect(parseInt(rows[5])).equal(2); // 2 trackers
    //     });
    // });

    // it('Edit generated tag for Middle Banner creative', () => {
    //     middleBannerCreartive.creativeWidth = 45;
    //     middleBannerCreartive.creativeHeight = 48;
    //     middleBannerCreartive.clickURL = 'https://www.yahoo.com';
    //     middleBannerCreartive.img = 'kargo.png';

    //     cy.visit(`/advertising#/creatives/${middleBannerCreartive.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get('[data-ng-click="ctrl.createOrEditAdTag()"]').click();

    //     cy.get('[data-cp-pretty-radio-label="Static"]').click(); // click on static button
    //     middleBannerCreartive.richMedia = 'No';
    //     cy.get('[name="creativeWidth"]').type(middleBannerCreartive.creativeWidth);
    //     cy.get('[name="creativeHeight"]').type(middleBannerCreartive.creativeHeight);
    //     cy.get('[name="clickUrl"]').type(middleBannerCreartive.clickURL);
    //     cy.get('input.js-fileInput', { timeout: 2000 }).attachFile(middleBannerCreartive.img);
    //     cy.get('[data-cp-pretty-checkbox="creative.has_kargo_branding"]').click();
    //     cy.get('[data-cp-pretty-checkbox="tracker.getSetter"]').click();

    //     // Submit
    //     cy.get('.u-flex .button--primary.button--onColor').click();
    //     waitLoaderToDisappear('button .loader');
    // });

    // it('Verify the buttons and code block is not empty after editing generated tag for Middle Banner creative', () => {
    //     cy.visit(`/advertising#/creatives/${middleBannerCreartive.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get(' div > dd:nth-child(2) > p3').should('contain', middleBannerCreartive.richMedia);
    //     cy.get('[data-cp-action-menu="ctrl.getCreativeActions()"]').should('be.enabled').click();
    //     cy.get('[data-cp-action-menu="ctrl.getPreviewActions()"]').should('be.enabled').click();
    //     cy.get('.js-codeBlock.line-numbers.language-markup').should('not.be.empty');
    // });

    // it('Verify tracker table has data after after editing generated tag for Top Banner creative', () => {
    //     cy.visit(`/advertising#/creatives/${middleBannerCreartive.id}`);
    //     waitTitleToBeLoaded();

    //     cy.get('[ui-sref="Creative Trackers({id:tabCtrl.getID()})"]').click();
    //     cy.get('tr a', { timeout: 8000 }).should('be.visible');
    //     cy.get('krg-trackers-table > table > tbody').should('not.be.empty');
    //     cy.get('.cpPagination').then((text) => {
    //         const rows = text.text().split(' ');
    //         // eslint-disable-next-line radix
    //         expect(parseInt(rows[5])).equal(2); // 2 trackers
    //     });
    // });

    // //         // //////////////////////////* Bottom Banner*//////////////////////

    // it('Navigate to the retrieved Placement', () => {
    //     // this step is needed for the creative screen to load correctly
    //     cy.visit(`/advertising#/placements/${placementId}`);
    //     waitTitleToBeLoaded();
    // });

    // it('Add Creative (Bottom Banner)', () => {
    //     bottomBannerCreative.name = generateName('UI-Bottom-Banner-Creative');
    //     bottomBannerCreative.format = 'Bottom Banner';
    //     bottomBannerCreative.execution = 'Standard';
    //     bottomBannerCreative.richMedia = 'Yes';

    //     cy.server();
    //     cy.route('GET', '/api/v1/creatives*').as('creativeAPI');
    //     cy.route('/api/v1/ad-unit-formats*').as('adUnitFormatsCall');

    //     cy.get('td h5').first().scrollIntoView().should('be.visible');

    //     cy.get('[ui-sref="Placement Creatives({id:tabCtrl.getID()})"]').click().wait('@creativeAPI');

    //     cy.get('button.button--primary').contains('Add Creative').click().wait('@adUnitFormatsCall', { timeout: 15000 });


    //     cy.get('[data-ng-model="creative.name"]').type(bottomBannerCreative.name);
    //     cy.get('[placeholder="Select Format"]').type(bottomBannerCreative.format).type('{downArrow}');

    //     cy.get('ul.typeahead-dropdown-new').click();
    //     cy.get('[placeholder="Select Execution"]', { timeout: 8000 }).type(bottomBannerCreative.execution);
    //     cy.get('.typeahead-dropdown-new').click();
    //     bottomBannerCreative.expandable = 'No';
    //     bottomBannerCreative.scrollReactive = 'No';

    //     cy.get('.u-flex .button--primary.button--onColor').click({ force: true });
    //     waitLoaderToDisappear('button .loader');
    //     cy.task('log', 'Bottom Banner Creative has been created');
    // });

    // it('Search for the added Bottom Banner creative and retrieve its id', () => {
    //     cy.visit(`/advertising#/placements/${placementId}/creatives`);
    //     waitTitleToBeLoaded();
    //     cy.get('[placeholder="Search"]', { timeout: 8000 }).type(bottomBannerCreative.name);

    //     cy.get('krg-creatives-table > table > tbody').contains(bottomBannerCreative.name).click();
    //     cy.url().then(($url) => {
    //         bottomBannerCreative.id = $url.split('creatives/').pop(); // getting creative id from URL
    //     });
    // });

    // it('Verify the added Bottom Banner creative information (left rail)', () => {
    //     cy.visit(`/advertising#/creatives/${bottomBannerCreative.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get('pre.codeBlock').should('be.visible');
    //     cy.get('h1.headerTitle').should('contain', bottomBannerCreative.name);
    //     cy.get(' dd:nth-child(2) > p3').should('contain', `${bottomBannerCreative.id}`);
    //     cy.get(' dd:nth-child(4) > p3').should('contain', bottomBannerCreative.execution);
    //     cy.get(' dd:nth-child(6) > p3').should('contain', bottomBannerCreative.format);
    //     cy.get(' div > dd:nth-child(2) > p3').should('contain', bottomBannerCreative.richMedia);
    //     cy.get(' div > dd:nth-child(4) > p3 ').should('contain', bottomBannerCreative.expandable);
    //     cy.get(' div > dd:nth-child(6) > p3 ').should('contain', bottomBannerCreative.scrollReactive);
    //     cy.get(' dd:nth-child(9) > p3:nth-child(2)').should('contain', 'N/A'); // description
    // });


    // it('Edit the created Bottom Banner creative', () => {
    //     bottomBannerCreative.name += '-updated';
    //     cy.server();
    //     cy.route('/api/v1/ad-unit-formats*').as('adUnitFormatsCall');
    //     cy.route('PUT', `/api/v1/creatives/${bottomBannerCreative.id}`).as('editAPI');
    //     cy.route('/api/v1/campaigns/*').as('campaignAPI');

    //     cy.wait('@campaignAPI');
    //     cy.get('[data-ng-if="creativeDetailsCtrl.canEdit()"]').click({ force: true });
    //     cy.wait('@adUnitFormatsCall', { timeout: 15000 });

    //     cy.get('[data-ng-model="creative.name"]').clear().type(bottomBannerCreative.name);

    //     cy.get('[data-cp-pretty-checkbox-label="Is Expandable"]').click();
    //     cy.get('[data-cp-pretty-checkbox-label="Is Scroll Reactive"]').click();
    //     bottomBannerCreative.expandable = 'Yes';
    //     bottomBannerCreative.scrollReactive = 'Yes';

    //     cy.get('.u-flex .button--primary.button--onColor').click();
    //     cy.wait('@editAPI');
    //     waitLoaderToDisappear();
    // });

    // it('Verify the edited Bottom Banner creative information (left rail)', () => {
    //     cy.visit(`/advertising#/creatives/${bottomBannerCreative.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get('pre.codeBlock').should('be.visible');
    //     cy.get('h1.headerTitle').should('contain', bottomBannerCreative.name);
    //     cy.get(' dd:nth-child(2) > p3').should('contain', `${bottomBannerCreative.id}`);
    //     cy.get(' dd:nth-child(4) > p3').should('contain', bottomBannerCreative.execution);
    //     cy.get(' dd:nth-child(6) > p3').should('contain', bottomBannerCreative.format);
    //     cy.get(' div > dd:nth-child(2) > p3').should('contain', bottomBannerCreative.richMedia);
    //     cy.get(' div > dd:nth-child(4) > p3 ').should('contain', bottomBannerCreative.expandable);
    //     cy.get(' div > dd:nth-child(6) > p3 ').should('contain', bottomBannerCreative.scrollReactive);
    //     cy.get(' dd:nth-child(9) > p3:nth-child(2)').should('contain', 'N/A'); // description
    // });

    // it('Verify that trackers table has No Data before Generate Tag for Bottom Banner creative', () => {
    //     cy.server();
    //     cy.route('/api/v1/creatives/*/trackers*').as('trackersAPI');
    //     cy.get('[ui-sref="Creative Trackers({id:tabCtrl.getID()})"]').click().wait('@trackersAPI');
    //     cy.get('krg-trackers-table > table > tbody').then((tableData) => {
    //         const tbody = tableData.text();
    //         expect(tbody).equal('No Trackers');
    //     });
    // });

    // it('Generate Tag for Bottom Banner creative', () => {
    //     bottomBannerCreative.creativeHtml = 'testing Banner';
    //     bottomBannerCreative.tracking = 'https://www.google.com';

    //     cy.visit(`/advertising#/creatives/${bottomBannerCreative.id}`);
    //     waitTitleToBeLoaded();
    //     waitTitleToBeLoaded();
    //     cy.get('.js-codeBlock.line-numbers').should('be.empty'); // code block has no snippet
    //     cy.get('button.button--primary').contains('Generate Tag').click();
    //     cy.get('[data-cp-pretty-radio="ctrl.getSetRichMedia"]').eq(0).click();
    //     cy.get('[name="creativeHtml"]').type(bottomBannerCreative.creativeHtml);
    //     cy.get('[name="additionalImpressionTrackers"]').type(bottomBannerCreative.tracking);
    //     cy.get('[data-cp-pretty-checkbox="tracker.getSetter"]').click();

    //     // Submit
    //     cy.get('.u-flex .button--primary.button--onColor').click();
    //     waitLoaderToDisappear();
    // });

    // it('Verify the buttons and code block is not empty after generating tag for Bottom Banner creative', () => {
    //     cy.visit(`/advertising#/creatives/${bottomBannerCreative.id}`);
    //     waitTitleToBeLoaded();

    //     cy.get(' div > dd:nth-child(2) > p3').should('contain', bottomBannerCreative.richMedia);
    //     cy.get('[data-cp-action-menu="ctrl.getCreativeActions()"]').should('be.enabled').click();
    //     cy.get('[data-cp-action-menu="ctrl.getPreviewActions()"]').should('be.enabled').click();
    //     cy.get('.js-codeBlock.line-numbers.language-markup').should('not.be.empty');
    // });

    // it('Edit generated tag for Bottom Banner creative', () => {
    //     bottomBannerCreative.creativeWidth = 45;
    //     bottomBannerCreative.creativeHeight = 48;
    //     bottomBannerCreative.clickURL = 'https://www.yahoo.com';
    //     bottomBannerCreative.img = 'kargo.png';

    //     cy.visit(`/advertising#/creatives/${bottomBannerCreative.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get('[data-ng-click="ctrl.createOrEditAdTag()"]').click();
    //     cy.get('[data-cp-pretty-radio-label="Static"]').click(); // click on static button
    //     bottomBannerCreative.richMedia = 'No';
    //     cy.get('[name="creativeWidth"]').type(bottomBannerCreative.creativeWidth);
    //     cy.get('[name="creativeHeight"]').type(bottomBannerCreative.creativeHeight);
    //     cy.get('[name="clickUrl"]').type(bottomBannerCreative.clickURL);
    //     cy.get('input.js-fileInput', { timeout: 2000 }).attachFile(bottomBannerCreative.img);
    //     cy.get('[data-cp-pretty-checkbox="creative.has_kargo_branding"]').click();
    //     cy.get('[data-cp-pretty-checkbox="tracker.getSetter"]').click();

    //     // submit
    //     cy.get('.u-flex .button--primary.button--onColor').click();
    //     waitLoaderToDisappear('button .loader');
    // });

    // it('Verify the buttons and code block is not empty after editing generated tag for bottom Banner creative', () => {
    //     cy.visit(`/advertising#/creatives/${bottomBannerCreative.id}`);
    //     waitTitleToBeLoaded();
    //     cy.get(' div > dd:nth-child(2) > p3').should('contain', bottomBannerCreative.richMedia);
    //     cy.get('[data-cp-action-menu="ctrl.getCreativeActions()"]').should('be.enabled').click();
    //     cy.get('[data-cp-action-menu="ctrl.getPreviewActions()"]').should('be.enabled').click();
    //     cy.get('.js-codeBlock.line-numbers.language-markup').should('not.be.empty');
    // });

    // it('Verify tracker table has data after after editing generated tag for Bottom Banner creative', () => {
    //     cy.visit(`/advertising#/creatives/${bottomBannerCreative.id}`);
    //     waitTitleToBeLoaded();

    //     cy.get('[ui-sref="Creative Trackers({id:tabCtrl.getID()})"]').click();
    //     cy.get('tr a', { timeout: 8000 }).should('be.visible');
    //     cy.get('krg-trackers-table > table > tbody').should('not.be.empty');
    //     cy.get('.cpPagination').then((text) => {
    //         const rows = text.text().split(' ');
    //         // eslint-disable-next-line radix
    //         expect(parseInt(rows[5])).equal(2); // 2 trackers
    //     });
    // });
  });
});
