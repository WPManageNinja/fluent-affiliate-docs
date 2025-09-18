// Schema.org structured data for SEO
export function generateSchema(page) {
  const baseUrl = 'https://docs.fluentaffiliate.com'
  const currentUrl = `${baseUrl}${page.relativePath.replace('.md', '')}`
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title || "FluentAffiliate Documentation",
    "description": page.description || "Complete documentation for FluentAffiliate WordPress plugin",
    "url": currentUrl,
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "FluentAffiliate",
      "applicationCategory": "WordPress Plugin",
      "operatingSystem": "WordPress",
      "description": "WordPress affiliate management plugin for creating and managing affiliate programs",
      "url": "https://fluentaffiliate.com",
      "author": {
        "@type": "Organization",
        "name": "WPManageNinja",
        "url": "https://wpmanageninja.com"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": generateBreadcrumbs(page)
    },
    "publisher": {
      "@type": "Organization",
      "name": "FluentAffiliate",
      "url": "https://fluentaffiliate.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/brand/main_logo.png`
      }
    }
  }
  
  return schema
}

function generateBreadcrumbs(page) {
  const baseUrl = 'https://docs.fluentaffiliate.com'
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ]
  
  if (page.relativePath && page.relativePath !== 'index.md') {
    const pathParts = page.relativePath.replace('.md', '').split('/')
    let currentPath = ''
    
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`
      breadcrumbs.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": formatBreadcrumbName(part),
        "item": `${baseUrl}${currentPath}`
      })
    })
  }
  
  return breadcrumbs
}

function formatBreadcrumbName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
