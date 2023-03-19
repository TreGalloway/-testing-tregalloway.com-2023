import { siteConfigs } from '@/configs/site-config';

export const getPostOGImage = (
  socialImage: string | null | undefined
): string => {
  if (!socialImage) {
    return siteConfigs.bannerUrl;
  }
  if (socialImage.startsWith('http')) {
    return socialImage;
  }
  return siteConfigs.fqdn + socialImage;
};