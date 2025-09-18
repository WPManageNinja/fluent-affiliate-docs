// Auto-generate alt text for images without alt attributes
export function enhanceImageAltText(content) {
  // This will be used to automatically add alt text to images
  // that don't have alt attributes
  return content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      // If alt is empty, generate one based on filename
      if (!alt || alt.trim() === '') {
        const filename = src.split('/').pop().split('.')[0];
        const generatedAlt = filename
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return `![${generatedAlt}](${src})`;
      }
      return match;
    }
  );
}

// Common alt text patterns for FluentAffiliate images
export const imageAltPatterns = {
  'dashboard': 'FluentAffiliate Dashboard Overview',
  'onboarding': 'FluentAffiliate Onboarding Setup',
  'integration': 'FluentAffiliate Integration Configuration',
  'settings': 'FluentAffiliate Settings Panel',
  'affiliate': 'FluentAffiliate Affiliate Management',
  'payout': 'FluentAffiliate Payout Management',
  'referral': 'FluentAffiliate Referral Tracking',
  'visits': 'FluentAffiliate Visit Analytics'
};
