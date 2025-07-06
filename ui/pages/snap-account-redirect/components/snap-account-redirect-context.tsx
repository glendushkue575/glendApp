import React from 'react';
import {
  BannerAlert,
  BannerAlertSeverity,
  Box,
  Button,
  ButtonSize,
  ButtonVariant,
  Text,
} from '../../../components/component-library';
import type { SnapAccountRedirectProps } from '../snap-account-redirect';
import {
  AlignItems,
  Display,
  FlexDirection,
  JustifyContent,
  TextAlign,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import SnapAccountRedirectMessage from './snap-account-redirect-message';

const SnapAccountRedirectContent = ({
  url = '',
  snapName = '',
  isBlockedUrl = false,
  message = '',
  onSubmit,
}: SnapAccountRedirectProps) => {
  const t = useI18nContext();
  
  const learnMoreAboutBlockedUrls =
    'https://support.glendapp.io/troubleshooting/deceptive-site-ahead-when-trying-to-connect-to-a-site/';

 return (
    <Box
      display={Display.Flex}
      flexDirection={FlexDirection.Row}
      justifyContent={JustifyContent.spaceBetween}
      paddingTop={4}
    >
      <Box
        gap={4}
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        alignItems={AlignItems.center}
      >
        <Text
          data-testid="snap-account-redirect-content-title"
          textAlign={TextAlign.Center}
          variant={TextVariant.headingLg}
          paddingBottom={2}
        >
          {t('snapAccountRedirectFinishSigningTitle')}
        </Text>
        {isBlockedUrl ? (
          <Box display={Display.Flex} px={4}>
            <BannerAlert
              severity={BannerAlertSeverity.Danger}
              data-testid="snap-account-redirect-content-blocked-url-banner"
            >
              <Text>
                {t('snapUrlIsBlocked', [
                  <Button
                    variant={ButtonVariant.Link}
                    size={ButtonSize.Inherit}
                    onClick={() =>
                      global.platform.openTab({
                        url: learnMoreAboutBlockedUrls, 
                      })
                    }
                    key="learn-more-button"
                  >
                    {t('learnMore')}
                  </Button>,
                ])}
              </Text>
            </BannerAlert>
          </Box>
        ) : (
          <>
            <Text
              data-testid="snap-account-redirect-content-description"
              textAlign={TextAlign.Center} 
              variant ={TextVariant.bodyMd}>
                {t('snapAccountRedirectSiteDescription', [snapName])}</Text>

            {(url.length >0 || message.length >0) && (
               <SnapAccountRedirectMessage 
                 snapName ={snapName} url ={url} message ={message} onSubmit ={onSubmit}/>
             )}
           </>
         )}
       </Box>    
     </Box>);
};

export default SnapAccountRedirectContent;
