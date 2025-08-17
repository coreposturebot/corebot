# CorePosture Chiropractic AI Chatbot

## 🏥 Overview

A fully-featured AI-powered chatbot designed specifically for CorePosture Chiropractic in Newport Beach, California. This intelligent assistant helps patients learn about CBP (Chiropractic BioPhysics) treatment, get answers about scoliosis care, check insurance coverage, and seamlessly book appointments.

## ✨ Features

### 🤖 **AI-Powered Intelligence**
- **GPT-4 Integration** - Advanced conversational AI
- **Custom Training** - Specialized knowledge about CBP and CorePosture
- **Context Awareness** - Remembers conversation history
- **Natural Responses** - Professional, empathetic communication

### 📅 **Smart Booking System**
- **Direct Scheduling** - Clickable buttons for immediate booking
- **Patient Type Recognition** - Separate flows for new vs existing patients
- **Custom Booking Links** - Direct integration with practice schedulers
- **Mobile Optimized** - Perfect experience on all devices

### 💼 **Practice-Specific Training**
- **Dr. Tyler Meier** - Board-certified CBP specialist information
- **ScoliBrace Technology** - Revolutionary scoliosis treatment details
- **300+ 5-Star Reviews** - Credibility and success stories
- **2,000+ Patients Served** - Proven track record
- **Newport Beach Location** - Local practice information

### 📧 **Lead Management**
- **Automatic Lead Capture** - Collects contact information
- **Email Transcripts** - Sends conversation logs to practice
- **Contact Integration** - Seamless patient follow-up

### 🎨 **Professional Design**
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Brand Colors** - Matches CorePosture branding
- **Smooth Animations** - Professional user experience
- **Accessibility** - Screen reader friendly

## 🚀 Quick Start

### Prerequisites
- OpenAI API key (for GPT functionality)
- Web hosting (Squarespace, Cloudflare Pages, or any web server)
- Basic HTML knowledge

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/coreposture-chatbot.git
   ```

2. **Add Your API Key**
   Open the HTML file and replace:
   ```javascript
   OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY_HERE'
   ```
   With your actual OpenAI API key:
   ```javascript
   OPENAI_API_KEY: 'sk-proj-your-actual-key-here'
   ```

3. **Deploy**
   - Upload the HTML file to your web server
   - Or integrate into your existing website

## ⚙️ Configuration

### API Setup
1. Get an OpenAI API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Ensure billing is set up in your OpenAI account
3. Replace the placeholder in the code with your key

### Booking Links
The chatbot uses these URLs by default:
- **New Patients**: `https://coreposturechiropractic.com/schedule/`
- **Existing Patients**: `https://coreposturechiropractic.com/schedule-existing/`

To customize, update the booking links in the code.

### Email Configuration
Transcripts are sent to `drtyler@coreposture.com` by default. Update the `EMAIL_RECIPIENT` in the configuration.

## 🎯 Usage

### Embedding in Website
Add this iframe to any page:
```html
<iframe 
    src="path/to/your/chatbot.html" 
    width="400" 
    height="600" 
    frameborder="0"
    style="border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
</iframe>
```

### Squarespace Integration
1. Create a new page with a Code Block
2. Paste the entire HTML code
3. Add the widget code to your footer (see documentation)

### Standalone Page
Upload the HTML file and link to it directly from your main website.

## 🧠 Training & Customization

### Current Training Includes:
- **CBP Treatment** - Detailed explanation and benefits
- **Scoliosis Care** - ScoliBrace technology and success rates
- **Insurance Information** - PPO reimbursement details
- **Practice Information** - Hours, location, staff details
- **Scheduling Process** - Appointment booking flow

### Customizing Responses
1. **Basic Mode**: Edit the `basicResponses` object for keyword-triggered answers
2. **AI Mode**: Modify the `SYSTEM_PROMPT` for GPT behavior
3. **New Topics**: Add keywords and responses as needed

### Example Customization:
```javascript
// Add new response
'keyword': "Your custom response here with practice info! 📞",

// Update existing response
'insurance': "Your specific insurance policy information..."
```

## 📊 Analytics & Monitoring

### Lead Tracking
- Automatic email transcripts with conversation details
- Lead information captured (name, email, phone)
- Conversation timestamps and duration

### OpenAI Usage
Monitor your API usage at [platform.openai.com/usage](https://platform.openai.com/usage)

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **AI**: OpenAI GPT-3.5-turbo API
- **Styling**: CSS3 with modern gradients and animations
- **Responsive**: Mobile-first design approach

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- **Lightweight**: Single HTML file under 50KB
- **Fast Loading**: Minimal dependencies
- **Responsive**: Optimized for all screen sizes

## 🔒 Security

### API Key Protection
- Never commit API keys to public repositories
- Use environment variables in production
- Monitor API usage regularly

### CORS Policy
- Designed to work with standard web hosting
- No server-side requirements
- Client-side implementation

## 📞 Support

### Practice Information
- **Practice**: CorePosture Chiropractic
- **Location**: Newport Beach, California
- **Phone**: (949) 536-5506
- **Website**: [www.coreposturechiropractic.com](https://www.coreposturechiropractic.com)

### Technical Support
- Review the configuration section above
- Check OpenAI API documentation
- Ensure billing is set up correctly

## 🚀 Deployment Options

### Recommended Hosting
1. **Squarespace** (Current) - Easy integration with existing site
2. **Cloudflare Pages** - Enterprise-grade performance and security
3. **GitHub Pages** - Free hosting for public repositories
4. **Netlify** - Simple deployment with form handling

### Production Checklist
- ✅ API key added and tested
- ✅ Booking links verified
- ✅ Email recipient configured
- ✅ Mobile responsiveness tested
- ✅ SSL certificate enabled

## 📈 Expected Results

### Conversion Improvements
- **Faster Response** - Instant answers vs. waiting for staff
- **24/7 Availability** - Capture leads outside business hours
- **Reduced Friction** - Direct booking without phone calls
- **Professional Image** - Modern, tech-forward practice

### Patient Benefits
- **Immediate Information** - Instant answers about CBP and treatments
- **Easy Booking** - One-click appointment scheduling
- **Consistent Experience** - Same quality information every time
- **Mobile Friendly** - Works perfectly on phones and tablets

## 🔧 Troubleshooting

### Common Issues

**Chatbot not responding intelligently?**
- Check that API key is correctly added
- Verify OpenAI billing is set up
- Check browser console for errors

**Booking buttons not working?**
- Verify booking URLs are correct
- Test links manually
- Check for JavaScript errors

**Email transcripts not sending?**
- Verify email recipient is correct
- Check if browser blocks mailto links
- Consider server-side email solution

## 📄 License

This chatbot is custom-built for CorePosture Chiropractic. Contact the practice for licensing and usage rights.

## 🎉 Getting Started

1. **Download** the HTML file
2. **Add your OpenAI API key**
3. **Upload** to your website
4. **Start converting visitors into patients!**

---

**Built with ❤️ for CorePosture Chiropractic**  
*Helping patients discover the power of CBP treatment through intelligent conversation*