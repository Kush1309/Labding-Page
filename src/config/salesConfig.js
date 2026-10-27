/**
 * School ERP — Sales Page Configuration
 * 
 * ----------------------------------------------------------------------------
 * 1. VIDEO SOURCE CONFIGURATION:
 * ----------------------------------------------------------------------------
 * To configure your School ERP demo video:
 * 
 * Option A (Local MP4 File):
 * 1. Place your video file inside the "public" folder (e.g., public/school-erp-demo.mp4).
 * 2. Set videoUrl below to "/school-erp-demo.mp4".
 * 
 * Option B (YouTube Video):
 * 1. Paste your full YouTube URL below (e.g., "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
 *    or "https://youtu.be/YOUR_VIDEO_ID").
 * 
 * Option C (Placeholder Mode - Default):
 * 1. Keep videoUrl as "" or null.
 * 2. The Sales page will automatically display a polished, branded video placeholder
 *    with a play badge and "Our School ERP Demo Video Is Coming Soon" message.
 *    No broken player or dummy video will ever be displayed.
 */
export const SALES_VIDEO_CONFIG = {
  // Replace with your MP4 path (e.g., "/school-erp-demo.mp4") or YouTube URL:
  videoUrl: "",
  
  // Optional thumbnail image for HTML5 video player (leave empty if not available):
  videoPoster: "",
  
  // Section metadata
  title: "School ERP Software Full Demonstration",
  description: "Comprehensive walkthrough of student records, attendance, fee collection, and parent communication."
}

/**
 * ----------------------------------------------------------------------------
 * 2. FORM SUBMISSION CONFIGURATION:
 * ----------------------------------------------------------------------------
 * By default, isDemoMode is set to true so that meeting bookings and quote
 * requests run safely on the frontend with validation, informative payload logging,
 * and clear user confirmation without falsely claiming a meeting is confirmed in a
 * calendar when no backend booking service is yet attached.
 * 
 * When you are ready to connect real submissions:
 * 1. Set isDemoMode to false.
 * 2. Provide your backend endpoint URL or FormSubmit endpoint
 *    (e.g., "https://formsubmit.co/ajax/your-email@school.com").
 */
export const SALES_FORM_CONFIG = {
  isDemoMode: true,
  
  // Optional: Set your form submission endpoint or FormSubmit URL:
  // e.g. "https://formsubmit.co/ajax/kushagrasaxena0913@gmail.com"
  submissionApiUrl: "",
  
  // Notification email displayed in demo notes for inquiries:
  supportEmail: "kushagrasaxena0913@gmail.com"
}
