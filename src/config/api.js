// API Configuration
// Production: Vercel deployment → uses cPanel backend at api.mohidul.me
// Local: uses localhost

const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  'https://api.mohidul.me'; // Production URL (cPanel backend)

export const API_ENDPOINTS = {
  // GET endpoints
  HERO: `${API_BASE_URL}/GET/index.php`,
  ABOUT_ME: `${API_BASE_URL}/GET/about_me.php`,
  SERVICES: `${API_BASE_URL}/GET/service.php`,
  PORTFOLIO: `${API_BASE_URL}/GET/portfolio.php`,
  BLOGS: `${API_BASE_URL}/GET/blog.php`,
  BLOG_DETAIL: `${API_BASE_URL}/GET/blog_detail.php`,
  BLOG_CONTENT: `${API_BASE_URL}/GET/blog_content.php`,
  TESTIMONIALS: `${API_BASE_URL}/GET/testimonial.php`,
  CASE_STUDY: `${API_BASE_URL}/GET/case_study.php`,
  BRAND_LOGO: `${API_BASE_URL}/GET/brand_logo.php`,
  CTA: `${API_BASE_URL}/GET/cta.php`,
  FOOTER_GALLERY: `${API_BASE_URL}/GET/footer_galary.php`,
  FORM_DROPDOWN: `${API_BASE_URL}/GET/form_dropdown.php`,
  
  // POST endpoints
  SUBMIT_FORM: `${API_BASE_URL}/POST/submit.php`,
};

export default API_ENDPOINTS;

