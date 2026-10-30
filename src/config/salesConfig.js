/**
 * SAMAGRA — Sales Page Configuration
 * 
 * ----------------------------------------------------------------------------
 * 1. VIDEO SOURCE CONFIGURATION:
 * ----------------------------------------------------------------------------
 * To configure your SAMAGRA demo video:
 * 
 * Option A (Local MP4 File):
 * 1. Place your video file inside the "public" folder (e.g., public/samagra-demo.mp4).
 * 2. Set videoUrl below to "/samagra-demo.mp4".
 * 
 * Option B (YouTube Video):
 * 1. Paste your full YouTube URL below (e.g., "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
 *    or "https://youtu.be/YOUR_VIDEO_ID").
 * 
 * Option C (Placeholder Mode - Default):
 * 1. Keep videoUrl as "" or null.
 * 2. The Sales page will automatically display a polished, branded video placeholder
 *    with a play badge and "Our SAMAGRA Demo Video Is Coming Soon" message.
 *    No broken player or dummy video will ever be displayed.
 */
export const SALES_VIDEO_CONFIG = {
  // Replace with your MP4 path (e.g., "/samagra-demo.mp4") or YouTube URL:
  videoUrl: "",
  
  // Optional thumbnail image for HTML5 video player (leave empty if not available):
  videoPoster: "",
  
  // Section metadata
  title: "SAMAGRA School ERP Software Full Demonstration",
  description: "Comprehensive walkthrough of student records, attendance, fee collection, and parent communication."
}

/**
 * ----------------------------------------------------------------------------
 * 2. FORM SUBMISSION CONFIGURATION:
 * ----------------------------------------------------------------------------
 * Meeting bookings and quote requests are sent to the configured FormSubmit
 * recipient. FormSubmit may require the recipient to confirm its activation email.
 */
export const SALES_FORM_CONFIG = {
  isDemoMode: false,
  
  submissionApiUrl: "https://formsubmit.co/ajax/kushagrasaxena0913@gmail.com",
  
  // Contact email shown when a submission cannot be delivered:
  supportEmail: "kushagrasaxena0913@gmail.com"
}
