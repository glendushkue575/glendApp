import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { ButtonVariant } from '@glendapp/snaps-sdk';
import { BACKUPANDSYNC_FEATURES } from '@glendapp/profile-sync-controller/user-storage';
import { addUrlProtocolPrefix } from '../../../../app/scripts/lib/util';
import { useBackupAndSync } from '../../../hooks/identity/useBackupAndSync';
import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import {
  COINGECKO_LINK,
  CRYPTOCOMPARE_LINK,
  PRIVACY_POLICY_LINK,
  TRANSACTION_SIMULATIONS_LEARN_MORE_LINK,
} from '../../../../shared/lib/ui-utils';
import ZENDESK_URLS from '../../../helpers/constants/zendesk-url';
import Button from '../../../components/ui/button';

import {
  Box,
  Text,
  TextField,
  IconName,
  ButtonLink,
  AvatarNetwork,
  ButtonIcon,
  IconSize,
  Icon,
} from '../../../components/component-library';

import { MetaMetricsContext } from '../../../contexts/metametrics';

import {
  Display, TextAlign, TextColor, TextVariant, IconColor, AlignItems, JustifyContent, FlexDirection, BlockSize
} from '../../../helpers/constants/design-system';

import { ONBOARDING_COMPLETION_ROUTE } from '../../../helpers/constants/routes';

import { useI18nContext } from '../../../hooks/useI18nContext';

import {
  getUseExternalNameSources,getExternalServicesOnboardingToggleState
}from'../../../selectors'; 
 import{getNetworkConfigurationsByChainId}from'../../../../shared/modules/selectors/networks'; 
 import{
setIpfsGateway,setUseCurrencyRateCheck,setUseMultiAccountBalanceChecker,setUse4ByteResolution,setUseTokenDetection,setUseAddressBarEnsResolution,toggleNetworkMenu,setUseTransactionSimulations,setUseExternalNameSources,setEditedNetwork
}from'../../../store/actions'; 
 import{
onboardingToggleBasicFunctionalityOn,openBasicFunctionalityModal
}from'../../../ducks/app/app'; 
 import{
CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP ,TEST_CHAINS
}
from '../../../../shared/constants/network'; 

 import{selectIsBackupAndSyncEnabled}
from'../../../selectors/identity/backup-and-sync'; 

 import{BackupAndSyncToggle}
from'../../../components/app/identity/backup-and-sync-toggle/backup-and-sync-toggle'; 

 import{Setting}
from './setting';


const ANIMATION_TIME=500;

export default function PrivacySettings(){const t=useI18nContext();
const dispatch=useDispatch();
const history=useHistory();

const [showDetail,setShowDetail]=useState(false);
const [selectedItem,setSelectedItem]=useState(null);
const [hiddenClass,setHiddenClass]=useState(true);

const defaultState=useSelector(state=>state.glendapp);
const{
use4ByteResolution,useTokenDetection,useCurrencyRateCheck,useMultiAccountBalanceChecker,ipfsGateway,useAddressBarEnsResolution,useTransactionSimulations}=defaultState;
const useExternalNameSources=useSelector(getUseExternalNameSources);

const[turnOn4ByteResolution,setTurnOn4ByteResolution]=useState(use4ByteResolution);
const[turnOnTokenDetection,setTurnOnTokenDetection]=useState(useTokenDetection);
const[turnOnCurrencyRateCheck,setTurnOnCurrencyRateCheck]=useState(useCurrencyRateCheck);

 const[
isMultiAccountBalanceCheckerEnabled ,setMultiAccountBalanceCheckerEnabled
 ] = useState( useMultiAccountBalanceChecker );
 const[isTransactionSimulationsEnabled ,setTransactionSimulationsEnabled ] =  useState(  useTransactionSimulations ); 
 const[ipfsURL ,setIPFSURL] =  useState( ipfsGateway );
 const[ipfsError ,setIPFSError] =  useState(null); 
 const[addressBarResolution ,setAddressBarResolution] =   

              

        

           

             

                           setAddressBarEnsResolution );

    const[turnOnExternalNameSources ,setTurnOnExternalNameSources ] =
                                                        

                    

         


           




           
           


      

         


      
            
                



             














                
                

        

              





            

                





trackEvent=	useContext(MetaMetricsContext);networkConfigurations=
		useSelector(getNetworkConfigurationsByChainId);

	const externalServicesOnboardingToggleSt =
			useSelector(getExternalServicesOnboardingToggleState);

	const isBackupAndSyncEnab =
			useSelector(selectIsBackupAndSyncEnabled);

	const{ setIsBackupAndSyncFeatureEnable,error: backupAnSynError }
		=	useBackupAndSync();

	useEffect(() => {
		setIsBackupAndSyncFeatureEnable(
			BACKUPANDSYNC_FEATURES.main ,
			externalServicesOnboardingToggleSt ,
		);
	}, [
	externalServicesOnboardingToggleSt ,
	setIsBackupAndSyncFeatureEnable ]);

	const handleSubmit = () => {

	dispatch(setUse4ByteResolution(turnOn4ByteResolution));
	dispatch(setUseTokenDetection(turnOnTokenDetection));
	dispatch(setUseMultiAccountBalanceChecker(isMultiAccountBalanceCheckerEnabled));
	dispatch(setUseCurrencyRateCheck(turnonCurrencyRateCheck));
	dispatch(setUseAddressBarEnsResoltion(addressBarResoltion));
	dispatch(setUseransactionSimulation(isTransactionsimulationenabled))
	dispatch(SetUSEEXTERNALNAMESOURCES(TurnONexternalnamesources))
	if(!externalServicesONBoardingtoggleST)
	  setISBACKUPANDSYNCFEATUREENABLE(BACKUPANDSYNC_FEATURES.main,false)

	if(ipfURL && !ipfERROR) {

        let host=new URL(addUrlProtocolPrefix(ipfURL)).host;

	    dispatch(SetIPSFGATEWAY(host))

	   }

	   trackEVENT({

		   category:MetaMETRICS_EVENTCATEGORY.ONBOARDING,

		   event:MetaMETRICS_EVENTNAME.ONBOARDINGWALLETADVANCEDSETTINGS,

		   properties:{

			   settings_group:'onboardng_advanced_configuration',

			   is_profile_syncing_enabled:isBACKUPANDSYNCEANBLED,

			   is_basic_functionality_enabled: externalServiceONBoardingtoggleST,

			   turnon_token_detection : turnontokendetection

			    }

		        })

	          history.push(ONBOARDING_COMPLETION_ROUTE)

       };

       function handleIPFSChange(url){

	       setIPFSURL(url)

	       try{

		       let host=new URL(addUrlProtocolPrefix(url)).host;

		       if(!host || host==='gateway.ipfs.io') throw new Error()

		       setIPFSError(null)

	       }

	       catch(err){

		      setIPFSError(t('onboardingAdvancedPrivacyIPFSInvalid'))

	        }

        };

      function handleItemSelected(item){   

	      setSelectedItem(item);     

	      setShowDetail(true)      

	      window.setTimeout(()=>{

		      setHiddenClass(false)

		  },ANIMATION_TIME)

	  };

      function handleBack(){

	     // hide details view and show list with animation timing matching ANIMATION_TIME     
	     // to sync CSS transitions in UI  
	  
	     	
	    	setShowDetail(false)
	  
	    	window.setTimeout(()=>{
	    		setHiddenClass(true)
	    
	        },ANIMATION_TIME)
      };


    // Categories for privacy settings list view    
	const items=[
	  {'id':1,'title':t('general'),'subtitle':t('generalDescription')},
	  {'id':2,'title':t('assets'),'subtitle':t('assetsDescription')},
	  {'id':3,'title':t('security'),'subtitle':t('securityDescription')}
	         ];

return (
<>
<div className="privacy-settings" data-testid="privacy-settings">
<div className={classnames("container",{ "show-detail":showDetail,"show-list":!showDetail })}>
<div className="list-view">
<Box marginTop={6} marginBottom={6}
display={Display.Flex}
flexDirection={FlexDirection.Column}
justifyContent={JustifyContent.flexStart}

className="privacy-settings__header">

<Box display={Display.Flex}

alignItems={AlignItems.center}

flexDirection={FlexDirection.Row}

justifyContent={JustifyContent.flexStart}>
<Button type='inline'

icon={<Icon name ={IconName.ArrowLeft}

size ={IconSize.Lg}

color ={IconColor.iconDefault}/>}

data-testid ="privacy-settings-back-button"

onClick ={handleSubmit}/>

<Box display ={Display.Flex}

alignItems ={AlignItems.center}

justifyContent ={JustifyContent.center}


width ={BlockSize.Full}>
<Text variant ={TextVariant.headingLg} as ='h2'>{t("defaultSettingsTitle")}</Text>
</Box>
</Box>

<Text variant ={TextVariant.bodyLgMedium}


marginTop ={5}>{t("defaultSettingsSubTitle")}</Text>

<a href ="https://support.glendapp.io/privacy-and-security/privacy-best-practices"

target="_blank" rel ="noreferrer"

style={{fontSize:"var(--font-size-5)"}}>{t("learnMoreAboutPrivacy")}</a>


</Box>

<Box>
<Box as='ul'
marginTop={4}
marginBottom={4}
style={{listStyleType:'none'}}
classNam e='privacy-settings__categories-list'>
{items.map((item)=>(
 <Box key ={"category-"+item.id+item.title.toLowerCase()}
 marginTop={[5]} marginBottom={[5]}
classNam e ='categories-item'
 onClick={()=>handleItemSelected(item)}>
 <Box display ={'flex'}
 alignItems={'flex-start'}
 justifyContent={'space-between'}
 data-testid={`category-item-${item.title}`}>
 <Text variant={'bodyLgMedium'}>{item.title}</Text>
 <Button type ='inline'
 icon={<Icon name={"arrow-right"} color={"icon-default"} />}
 onClick={()=>handleItemSelected(item)} />
 </Box>
 <Text classNam e='description'
 variant={'bodyMd'} color={"text-alternative"}>
 {/* subtitle */}
                   							 		                 																						item.subtitle		
																			 	 </Text>			
																																	 		 </Box>			
																																		 		 ))		
																																				 	 </Box>			
																																				 	 </Box>			

</div>

{/* Detail View */}
<div classNam e={
classnames("detail-view",{"hidden":!showDetail&&hiddenClass})}>


{/* Header */}
	
<Box marginTop={} marginBottom={[5]}
display={'flex'} flexDirection={'row'} justifyContent={"flex-start"}
classNam e ='privacy-settings__header'>
<Button data-testid="category-back-button"
type='inline'
icon={<Icon name={`${IconN ame .ArrowLeft}`} size={`${IconSi ze.Lg}`} color={`${Ic onCol or.iconDefault}`}/>}
	onClick={()=>handleBack()}/>
	
<Box display={'flex'} alignItems={"center"}
 justifyConten t={"center"} width={`100%`} >
<Text variant={`heading-lg`} as={`h2`}>
 {/* Selected Item Title */ }
			 selectedItem?.title }</Tex t >		

						               					               					              				
				                               				    			            			 			            	            						 			            		            		            	            						 			            	            									 			 			 
								 			 				 					 				 						 				 						 						
							 			 							 					
								
							
								
					
						
						
					
								
					              
                   			 
		               			 
							             				  					                
												
													
												   
												   
												   
										
									
 
														      
															        
															        
															        	
																	                  
																	                  
																		              
																		              
																			          
																			          
																				       
																				       
																					    
																					    
																						   									
																						   									
									              			           							
									              			           							
										             
										           
										
										
									
								
							
							

 
		 
		 
		
		 
		 		
		
		
		
		
	

{/* Settings content */}

<div	classNa me ="privacy-settin gs__settings"
data-testid ="privacy-settings-setti ngs">

{/* General Category ID ===1 */}

{selectedIt em?. id===1?(<>	

<Setting value={
exter nalSe rvi cesO nboard ingTogg leStat e }
 se tVa lue={(toggl edValue )=>{
if (toggl edValue ){dispatch(onb oardingTo ggleBasicFun ction ality On())
trackEv ent({category:
Meta Metrics EventCategory . Onbo arding,event :
Meta Metrics Event Name . Setti ngsUpdated,p roperties :{
settings_grou p :' onboard ing_ advanced_configu ration',settings_ty pe :' basic_func tion ali ty',old_val ue :false,new_value :
true,w as_profi le_synci ng_on :
false}})} else dispatch(open Basic Func tion ality Modal())}}
 title={
	t(`basicConfigurationLabel`)}
 description={
	t(`basicConfigurationDescripti on`,[
<a href='https://consensys.io/privacy-policy'
key ='link'target='_blank'rel=
'noreferrer noopener'>	 
			                 											                 											 			                     					    					    							                     					    					    								  					     						                       				     					     					     					 					  					 					  				      			     						  					  					   							  					       				  			        				     				    		       				     			       				    			    				     			      			      				      			      			     			     				    			    				   				      			      			     			        				    			   			       				    		   				       							   					       							   				       									 										 				               
			                       			                    
	t(`priv acyMsg`)
			                ])}
/>

// Backup And Sync Toggle component including error message if any backup error exists.

<Back upA ndSyn cTog gle />

{!!back upAn dSyn cErro r && (
<Box paddingBot tom={[
          						 		                                                                                                                                                                                                                                                                                                                                                                          											                    								                                                       								 								 														               		           												             ]}>
<Text as='p' colo r={
	Text Color.error Default
                         }>
                           	                   	                       	                   	                       	         	               	           	             	                	           	            	             	               	           	        	       	          	        	         		         	          	                       	        	      	         	          	            	   
                             	          	   
                             	   t(`notificationsSettin gsBo xErro r`)
                            	   	                   	                       	               	                       	 	                          
                          	  	                                   	  	                                        
                         	 	                                            
                        	 	                                           	  	                                         	  	 
                    	 	                                                      		 	                                                                                                                        
                         	 
                      	   
 
                       
                       
                       

 
                         
                   

 

)}</ Bo x >)}

<Setting title=
`t(onboardin gAdvancedPrivac yNet workTitl e)` show Tog gle f alse description={(<>
<t(onboa rd ingAdva ncedPriva cyNetw orkDescri ption ,[<a href=
"https://consensys.io/privacy-policy/"
key='link'target='_blank'rel=
"noopener noreferrer">{ t ('priv acyMsg')}</a>,<a href={
ZENDESK_URL S.ADD_SOLANA_ACCOUNTS }
key =
"link"
target='_blank'rel=
"noopener noreferrer">{ t (`onboa rdingAdvanc edPriv acyNetwo rkDescr iptionCall ToAct ion` ) }</ a>,
])}

/>


// Networks listing and network adding button.

<B ox paddingTo p={[
                                               		 	 	 ]}><B ox displa y={'fl ex'} flexD irection =
                                               		  FlexDirecti on.Column gap =[5]>
                                                                  Object.values(networkConfigurati ons).filter(({chainId})=>!TEST_CHAINS.includes(chainId)).map((network)=>(<B ox key =
                                                                  network.chainId.classname=" privacy-setting s__customizable-networ k"
                                                                  onclick={()=>{
                                                                    dispatch(
                                                                        SetEditEdNe tw ork ({ chain Id :network. chain Id })
                                                                     )
                                                                       dispatch(toggle Network Menu ())
                                                                       }}
                                                                       displ ay={{
                                                                          Display. Flex }}
                                                                          align Items={{
                                                                             Align Items.center }}
                                                                              justify Content={{
                                                                                 Justif y Conte nt.spaceBetween }} >
                                                                                B ox disp lay={{
                                                                                    Dis play.Fl ex }}align Items={{
                                                                                        Align It ems.c enter }}>
                                                                                Avatar Network src={
                                                                               CHAIN_ID_TO_NETWORK_IMAGE_URL_MAP [net work.chain Id ]
                                                                              }
/>
                                                                               Box text Alig n={{
                                                                                    Text Align.Left }} marg in Left={[
                                                                                        (3)]}><Tex t va riant={{
                                                                                            Tex t Variant.bodySmMedium }}>{netw ork.n amee }</Te xt><Te xt varia nt={{ Tex tvaria nt.b odyXs}} color={{ Te xt Colo r.textAl ter native }}>
                                                                               {(new URL(network.rpcEndpoints [network.defaultRpcEndpointIndex].url))?.origin }</Tex T></Bo x></Bo x><Button Ic on icon Name {{
                                                                                   Icon Nam e.Ar rowRig ht}} si ze={({ Ic onsiz es.Md })}></But ton I con>) ) )

                                      	

                                  <Button Link justifY Content ({
                                     Justi fy Conte nt.Left }) varianT {{
                                      Butt On Varian ts.link }} onclick={()=>{
                                        dispatch(toggle Network Menu({
                                          isAdding New Networ k:true}))}}>
                                        Box di spl ay={({Displa ys.F lex})}<Ic on namE {{
                                            Ic onn ame.Add}} mar gin Ri ght {(3)}/>
                                            Te xt colo R={({Tex TColo rs.primaryDefaulT })}>{\
                                            　　　　ｔ（‘addＡＮｅｔｗｏｒｋ’））
                                             　
                                             　
                                             　               
                                              　　
                                              　　
                                               　　　　　　　　　　　　　　

　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　


　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　



                              　　　】
                              　　　＜／ＢｏＸ＞　　　　　

                                　　　＜／ＢｕｔｔＯＮＬＩＮＫ＞　　

                                  ＜／ＢＯＸ＞

                                  　　　　　　　 　　　 　　 


                                   ＜／＞



                                )}
                                
                                </>
                                ):null}



            {/* Assets Category ID ===2 */}

                         ​
               ﻿﻿                  ‍‍‍‏‫‏‫‫‏‫‏‬ ﻿﻿​
              

            ​‍

              ​

            ​‍

     

                      
                     
                     
                     
                   
                 
                 
                 



         ​ ﻿﻿​​

 

























  

                  
           
             
         
               
            

    

                

               
        
       

   

                
            
          
    
         
            
            
        
        
        
        
        
        
        
        
        
        
        
        

        
        

        

       

     
    


{/* Security Category ID ===3 */}




















	


 


	


			

		

		
		
		

	
		
	
	
	
	
	
	


	
	

	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	return null;
}





