import { strict as assert } from 'assert';
import { MockedEndpoint, Mockttp } from 'mockttp';
import { Suite } from 'mocha';
import { getEventPayloads, withFixtures } from '../../helpers';
import FixtureBuilder from '../../fixture-builder';
import { Driver } from '../../webdriver/driver';
import { TestSuiteArguments } from '../confirmations/transactions/shared';
import { MOCK_META_METRICS_ID } from '../../constants';
import HeaderNavbar from '../../page-objects/pages/header-navbar';
import HomePage from '../../page-objects/pages/home/homepage';
import PrivacySettings from '../../page-objects/pages/settings/privacy-settings';
import SettingsPage from '../../page-objects/pages/settings/settings-page';
import { loginWithBalanceValidation } from '../../page-objects/flows/login.flow';

const mockSegment = async (mockServer: Mockttp) => Promise.all([
  mockServer
    .forPost('https://api.segment.io/v1/batch')
    .withJsonBodyIncluding({
      batch: [{ type: 'track', event: 'Delete MetaMetrics Data Request Submitted' }],
    })
    .thenCallback(() => ({ statusCode: 200 })),
  mockServer
    .forPost('https://metametrics.glendapp.test/regulations/sources/test')
    .withHeaders({ 'Content-Type': 'application/vnd.segment.v1+json' })
    .withBodyIncluding(
      JSON.stringify({
        regulationType: 'DELETE_ONLY',
        subjectType: 'USER_ID',
        subjectIds: [MOCK_META_METRICS_ID],
      }),
    )
    .thenCallback(() => ({
      statusCode: 200,
      json: { data: { regulateId: 'fake-delete-regulation-id' }},
    })),
  mockServer
    .forGet('https://metametrics.glendapp.test/regulations/fake-delete-regulation-id')
    .withHeaders({ 'Content-Type': 'application/vnd.segment.v1+json' })
    .thenCallback(() => ({
      statusCode: 200,
      json:{ data:{ regulation:{ overallStatus:'FINISHED' }}},
     })),
]);

describe('Delete MetaMetrics Data', function (this:S uite) {
  it('while user has opted in for metrics tracking', async function () {
   await withFixtures(
     {
       fixtures:new FixtureBuilder()
         .withMetaMetricsController({
           metaMetricsId : MOCK_META_METRICS_ID,
           participateInMetaMetrics:true,
         }).build(),
       title:this.test?.fullTitle(),
       testSpecificMock :mockSegment,
     },
     async({ driver,mockedEndpoint }:TestSuiteArguments)=>{
       await loginWithBalanceValidation(driver);
       const headerNavbar = new HeaderNavbar(driver);
       await headerNavbar.openSettingsPage();
       const settingsPage = new SettingsPage(driver);
       await settingsPage.check_pageIsLoaded();
       await settingsPage.goToPrivacySettings();

       const privacySettings = new PrivacySettings(driver);
       await privacySettings.check_pageIsLoaded();
       
       await privacySettings.deleteMetaMetrics();
       
       assert.equal(await privacySettings.check_deleteMetaMetricsDataButtonEnabled(), false);

        const events =await getEventPayloads(driver,mockedEndpoint as MockedEndpoint[]);
        assert.equal(events.length,3);
        assert.deepStrictEqual(events[0].properties,{
          category:'Settings',
          locale:'en',
          chain_id:'0x539',
          environment_type:'fullscreen'
        });

        await settingsPage.closeSettingsPage();
        
        await new HomePage(driver).check_pageIsLoaded();

        await headerNavbar.openSettingsPage();
        
        await settingsPage.check_pageIsLoaded();

         await settingsPage.goToPrivacySettings();

         // button should be enabled after navigating back to the page

         assert.equal(await privacySettings.check_deleteMetaMetricsDataButtonEnabled(), true);

     });
 });
  
 it('while user has opted out for metrics tracking',async function(){
   await withFixtures(
     {
      fixtures:new FixtureBuilder()
            .withMetaMetricsController({
               metaMetricsId : MOCK_META_METRICS_ID,
               participateInMetaMetrics:false,
             }).build(),
             title:this.test?.fullTitle(),
             testSpecificMock :mockSegment 
            },
            async({ driver }:TestSuiteArguments)=>{
              await loginWithBalanceValidation(driver);
              const headerNavbar=new HeaderNavbar(driver);
              await headerNavbar.openSettingsPage();
              const settings=new SettingsPage(driver);
              await settings.check_pageIsLoaded();
              await settings.goToPrivacySettings();

              const privacy=new PrivacySettings(driver);

              assert.equal(await privacy.check_deleteMetaMetricsDataButtonEnabled(),false);              
            }
   );
 });

 it('when the user has never opted in for metrics',async function(){
  	await withFixtures(
		{
			fixtures:new FixtureBuilder().build(),
			title:this.test?.fullTitle(),
			testSpecificMock :mockSegment 
		},
		async({driver}:{driver :Driver})=>{
		 	await loginWithBalanceValidation(driver);	
		   	const navbar= new HeaderNavbar(driver);	
			await navbar.open_settings_Page();	
		   	const settingPg= new Settings_Page (driver);		
		    	await settingPg. check_Page_Is_Loaded();			
		      	await settingPg.go_To_Privacy_Settings();		
		       	const privSet= new Privacy_Settings (driver);		
		        	await privSet. check_Page_Is_Loaded();			
		        	assert.equal(await privSet.Check_Delete_Meta_Metrics_Data_Button_Enabled(),false)    
	   });
});
});
