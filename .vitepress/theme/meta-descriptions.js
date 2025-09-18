// Dynamic meta description generation for SEO
export function generateMetaDescription(page) {
  // If page has custom description, use it
  if (page.frontmatter?.description) {
    return page.frontmatter.description;
  }
  
  // Extract first meaningful paragraph from content
  const content = page.content || '';
  const firstParagraph = extractFirstParagraph(content);
  
  // Generate description based on page type
  if (page.relativePath?.includes('getting-started')) {
    return `Learn how to get started with FluentAffiliate WordPress plugin. ${firstParagraph}`;
  } else if (page.relativePath?.includes('admin-portal')) {
    return `Admin guide for managing affiliates, referrals, and payouts in FluentAffiliate. ${firstParagraph}`;
  } else if (page.relativePath?.includes('affiliate-portal')) {
    return `Affiliate guide for tracking performance and generating links in FluentAffiliate. ${firstParagraph}`;
  } else if (page.relativePath?.includes('integrations')) {
    return `Integration guide for connecting FluentAffiliate with your favorite plugins. ${firstParagraph}`;
  } else if (page.relativePath?.includes('settings')) {
    return `Configuration guide for customizing your FluentAffiliate settings. ${firstParagraph}`;
  }
  
  // Default description
  return `Complete guide for FluentAffiliate WordPress plugin. ${firstParagraph}`;
}

function extractFirstParagraph(content) {
  // Remove markdown syntax and extract first paragraph
  const cleanContent = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/`([^`]+)`/g, '$1') // Remove code
    .trim();
  
  // Get first paragraph (up to 120 characters)
  const firstParagraph = cleanContent.split('\n\n')[0] || cleanContent.split('\n')[0] || '';
  return firstParagraph.substring(0, 120).trim() + (firstParagraph.length > 120 ? '...' : '');
}
