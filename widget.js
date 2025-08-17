<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CorePosture Chiropractic Chatbot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            width: 100%;
            max-width: 400px;
            overflow: hidden;
        }

        .setup-screen {
            padding: 30px;
            text-align: center;
        }

        .setup-screen.hidden {
            display: none;
        }

        .setup-screen h2 {
            color: #2d5aa0;
            margin-bottom: 15px;
            font-size: 20px;
        }

        .setup-screen p {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .api-input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 14px;
            margin-bottom: 15px;
            transition: all 0.2s ease;
        }

        .api-input:focus {
            outline: none;
            border-color: #2d5aa0;
            box-shadow: 0 0 0 3px rgba(45, 90, 160, 0.1);
        }

        .btn {
            background: linear-gradient(135deg, #2d5aa0, #1e3c72);
            color: white;
            border: none;
            padding: 15px 24px;
            border-radius: 12px;
            cursor: pointer;
            font-size: 14px;
            width: 100%;
            margin: 5px 0;
            transition: all 0.2s ease;
        }

        .btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(45, 90, 160, 0.3);
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .btn-secondary {
            background: #6b7280;
        }

        .error-box {
            background: #fee2e2;
            color: #dc2626;
            padding: 15px;
            border-radius: 10px;
            margin: 15px 0;
            font-size: 13px;
            border: 1px solid #fecaca;
            text-align: left;
        }

        .chatbot-interface {
            height: 600px;
            display: flex;
            flex-direction: column;
        }

        .chatbot-interface.hidden {
            display: none;
        }

        .chat-header {
            background: linear-gradient(135deg, #2d5aa0 0%, #1e3c72 100%);
            color: white;
            padding: 20px;
            text-align: center;
            position: relative;
        }

        .chat-header h2 {
            font-size: 18px;
            margin-bottom: 5px;
            font-weight: 600;
        }

        .chat-header p {
            font-size: 14px;
            opacity: 0.9;
        }

        .status-dot {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 12px;
            height: 12px;
            background: #4ade80;
            border-radius: 50%;
            border: 2px solid white;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }

        .messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8fafc;
        }

        .message {
            margin-bottom: 15px;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message.bot {
            display: flex;
            align-items: flex-start;
        }

        .message.user {
            display: flex;
            justify-content: flex-end;
        }

        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2d5aa0, #1e3c72);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
            margin-right: 10px;
            flex-shrink: 0;
        }

        .bubble {
            background: white;
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 85%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            line-height: 1.4;
            font-size: 14px;
        }

        .message.user .bubble {
            background: linear-gradient(135deg, #2d5aa0, #1e3c72);
            color: white;
        }

        .quick-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }

        .quick-btn {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 15px;
            padding: 6px 12px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #475569;
        }

        .quick-btn:hover {
            background: #f1f5f9;
            border-color: #2d5aa0;
            color: #2d5aa0;
        }

        .input-area {
            padding: 15px 20px;
            background: white;
            border-top: 1px solid #e2e8f0;
        }

        .input-wrapper {
            display: flex;
            align-items: center;
            background: #f1f5f9;
            border-radius: 25px;
            padding: 8px;
            transition: all 0.2s ease;
        }

        .input-wrapper:focus-within {
            background: #e2e8f0;
            box-shadow: 0 0 0 3px rgba(45, 90, 160, 0.1);
        }

        .message-input {
            flex: 1;
            border: none;
            background: transparent;
            padding: 8px 15px;
            font-size: 14px;
            outline: none;
            color: #334155;
        }

        .message-input::placeholder {
            color: #94a3b8;
        }

        .send-btn {
            background: linear-gradient(135deg, #2d5aa0, #1e3c72);
            color: white;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            font-size: 16px;
        }

        .send-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(45, 90, 160, 0.3);
        }

        .send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .typing {
            display: flex;
            align-items: center;
            padding: 10px 0;
        }

        .typing-dots {
            display: flex;
            align-items: center;
            margin-left: 10px;
        }

        .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #94a3b8;
            margin: 0 2px;
            animation: bounce 1.4s infinite ease-in-out;
        }

        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
        }

        .lead-form {
            background: white;
            border-radius: 12px;
            padding: 15px;
            margin: 10px 0;
            border: 1px solid #e2e8f0;
        }

        .lead-form input {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 14px;
        }

        .lead-form button {
            background: linear-gradient(135deg, #2d5aa0, #1e3c72);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            width: 100%;
            margin-top: 10px;
        }

        @media (max-width: 480px) {
            .container {
                height: 100vh;
                max-width: 100%;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Setup Screen -->
        <div class="setup-screen" id="setupScreen">
            <h2>🚀 CorePosture AI Chatbot</h2>
            <p>Enter your OpenAI API key to enable intelligent responses, or use the basic version that works immediately.</p>
            
            <input 
                type="password" 
                class="api-input" 
                id="apiInput" 
                placeholder="Enter your OpenAI API key (sk-...)"
                autocomplete="off"
            >
            
            <button class="btn" id="startBtn">
                🔗 Start AI Chatbot
            </button>
            
            <button class="btn btn-secondary" id="basicBtn">
                📝 Use Basic Version (Works Now!)
            </button>
            
            <div id="errorDisplay" style="display: none;"></div>
        </div>

        <!-- Chatbot Interface -->
        <div class="chatbot-interface hidden" id="chatInterface">
            <div class="chat-header">
                <div class="status-dot"></div>
                <h2>CorePosture Chiropractic</h2>
                <p id="chatMode">AI Assistant - Newport Beach, CA 🏖️</p>
            </div>
            
            <div class="messages" id="messages">
                <!-- Messages will be added here -->
            </div>
            
            <div class="input-area">
                <div class="input-wrapper">
                    <input 
                        type="text" 
                        class="message-input" 
                        id="messageInput" 
                        placeholder="Ask me anything about CorePosture..."
                        maxlength="500"
                    >
                    <button class="send-btn" id="sendBtn">
                        ➤
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // CONFIGURATION - ADD YOUR API KEY HERE BEFORE DEPLOYMENT
        const CONFIG = {
            OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY_HERE', // Replace with your actual API key before going live
            AUTO_START: true, // Chatbot starts immediately - no setup screen
            EMAIL_RECIPIENT: 'drtyler@coreposture.com'
        };

        // Global variables
        let apiKey = CONFIG.OPENAI_API_KEY;
        let isBasicMode = false;
        let conversationHistory = [];
        let leadCaptured = false;
        let messageCount = 0;
        let chatStartTime = new Date();

        // System prompt for GPT - FULLY TRAINED FOR COREPOSTURE
        const SYSTEM_PROMPT = `You are the AI assistant for CorePosture Chiropractic in Newport Beach, California, founded by Dr. Tyler Meier, DC. You are an expert on CBP (Chiropractic BioPhysics) treatment and represent a highly-rated practice with 300+ 5-star reviews.

PRACTICE INFORMATION:
- Practice Name: CorePosture Chiropractic
- Location: Newport Beach, California
- Phone: 949-536-5506
- Website: www.coreposturechiropractic.com
- Founded by: Dr. Tyler Meier, DC (Board-certified, CBP certified)
- Experience: 10+ years, 2,000+ patients served
- Reviews: 300+ 5-star Google & Yelp reviews
- Additional doctors: Dr. Julia Rose

OFFICE HOURS:
- Monday: 8:45am – 12:30pm / 3:30pm – 6:00pm
- Tuesday: 12:30pm – 5:30pm  
- Wednesday: 8:45am – 12:30pm / 3:30pm – 6:00pm
- Thursday: 12:30pm – 6:00pm
- Friday: 8:45am – 12:30pm / 3:30pm – 6:00pm
- By appointment only

SPECIALIZATIONS & CREDENTIALS:
- CBP (Chiropractic BioPhysics) - Dr. Tyler is one of only a handful of CBP practitioners in California
- Scoliosis treatment using ScoliBrace technology (revolutionary over-corrective bracing)
- Spinal corrective care and postural rehabilitation
- Digital X-ray analysis and customized treatment plans
- Dr. Tyler graduated Magna Cum Laude from Life Chiropractic College West with Clinical Honors

TREATMENT APPROACH & PHILOSOPHY:
- Focus on correcting the SOURCE of the problem, not just masking symptoms
- Scientific, research-based CBP protocols that reshape the spine
- Multi-faceted approach: adjustments, mirror image traction, decompression therapy, home exercises
- Custom treatment plans based on digital X-ray analysis and postural assessment
- Unlike traditional chiropractic that focuses on immediate pain relief, CBP corrects spinal structure long-term

CONDITIONS TREATED:
- Scoliosis (with ScoliBrace technology) - aim to CORRECT curves, not just stop progression
- Back pain (chronic and acute)
- Neck pain and headaches/migraines
- Sciatica and nerve pain
- Poor posture and postural distortions
- Sports and auto accident injuries
- Fatigue and fibromyalgia
- Joint pain and mobility issues

SUCCESS RATES & TESTIMONIALS:
- Over 2,000 patients successfully treated
- Scoliosis patients often see significant curve reduction (goal is correction, not just stopping progression)
- Many patients avoid surgery completely
- Anna (clinic manager) was cured of weekly migraines after years of failed treatments
- Patients travel from San Diego and Los Angeles for Dr. Tyler's expertise
- Even orthopedic surgeons refer scoliosis cases to CorePosture

PRICING & CONSULTATION:
- Initial consultation is ALWAYS complimentary
- Comprehensive first visit includes examination and X-rays
- Custom treatment plans created after thorough analysis
- Payment plans and insurance accepted (mention they handle insurance paperwork)

INSURANCE INFORMATION:
- For ALL insurance questions, use this exact response: "Most of our patients with PPO insurance are able to get reimbursed for their care 🙌. We'll verify your benefits with you at your first visit so you know exactly what's covered. Would you like me to help you get scheduled?"
- Focus on PPO reimbursement rather than direct acceptance
- Always offer to help with scheduling after insurance discussion
- Benefits verification happens at first visit
- Keep response consistent and simple

COMMUNICATION STYLE:
- Confident and knowledgeable about CBP's scientific advantages
- Empathetic to patient pain and frustration with failed treatments
- Emphasize hope and real solutions (not just symptom management)
- Professional but warm and encouraging
- Use 1-2 emojis per response maximum
- Always provide clear next steps

UNIQUE VALUE PROPOSITIONS:
- One of only a handful of CBP practitioners in California
- ScoliBrace technology for scoliosis (revolutionary over-corrective system)
- Scientific approach using digital X-ray analysis
- Focus on correcting spinal structure, not just pain relief
- 300+ 5-star reviews and 2,000+ successful patients
- Magna Cum Laude graduate with Clinical Honors
- Complimentary consultations

KEY MESSAGING:
- "Unlike traditional chiropractic that focuses on immediate pain relief, CBP corrects the source"
- "We don't just treat symptoms - we reshape your spine back to health"
- "Scientific, research-based approach with digital X-ray analysis"
- "Consultation is always complimentary"
- "Many patients avoid surgery with proper CBP treatment"
- "Patients travel from across Southern California for our expertise"

COMMON OBJECTIONS TO ADDRESS:
- Cost concerns: Mention complimentary consultation, insurance accepted, payment plans
- Skepticism about chiropractic: Emphasize scientific CBP approach, Dr. Tyler's credentials
- Fear of not working: Share success stories, 300+ 5-star reviews, orthopedic surgeon referrals
- Time commitment: Explain that correcting the source takes time but provides lasting results
- Pain concerns: Emphasize gentle approach and gradual spinal remodeling

APPOINTMENT SCHEDULING PROCESS:
- When someone wants to schedule, provide two clickable buttons instead of asking them to type
- Use this exact HTML for scheduling responses:
<div style='margin: 15px 0;'><button onclick="window.open('https://coreposturechiropractic.com/schedule/', '_blank')" style='background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; margin: 5px 10px 5px 0; transition: all 0.2s ease;'>🆕 New Patient</button><button onclick="window.open('https://coreposturechiropractic.com/schedule-existing/', '_blank')" style='background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; margin: 5px;'>👤 Existing Patient</button></div>
- Always include phone backup: 949-536-5506
- Mention quick scheduling: "usually within 1-2 days"
- Both buttons are bright red for maximum impact and urgency

GUIDELINES:
- Always mention the complimentary consultation
- Emphasize CBP's scientific advantage over traditional chiropractic
- For scoliosis cases, highlight ScoliBrace technology
- Reference Dr. Tyler's unique qualifications and patient success
- Never promise specific medical outcomes, but share general success statistics
- Direct serious medical questions to the complimentary consultation
- Be encouraging about avoiding surgery when appropriate
- Mention the practice's reputation and reviews when building credibility`;

        // Enhanced basic responses - CUSTOMIZE THESE AS NEEDED
        const basicResponses = {
            'cbp': "CBP (Chiropractic BioPhysics®) is our specialty! 📊 Dr. Tyler Meier is one of only a handful of CBP-certified practitioners in California. Unlike traditional chiropractic that focuses on immediate pain relief, CBP scientifically corrects and reshapes your spine back to health using digital X-ray analysis, mirror image traction, and customized treatment plans. We've successfully treated over 2,000 patients with this research-based approach! Your complimentary consultation will determine if you're a candidate for this life-changing care. Ready to experience the CBP difference? 🎯",
            
            'scoliosis': "Absolutely! Dr. Tyler Meier specializes in scoliosis treatment using revolutionary ScoliBrace technology! 🌟 Unlike traditional bracing that only aims to stop progression, ScoliBrace works to actually CORRECT spinal curves back toward normal. We're one of the few practices in Southern California offering this over-corrective system. Even orthopedic surgeons refer their scoliosis patients to us because many want to try a non-surgical option first. With our CBP approach, patients often see significant curve reduction. Call 949-536-5506 for your complimentary scoliosis consultation! 📏✨",
            
            'sciatica': "Sciatica can be debilitating, but our CBP approach targets the root cause! 🙏 Dr. Tyler uses scientifically-based spinal decompression, mirror image traction, and precise adjustments to eliminate nerve interference. With over 2,000 successful patients and 300+ 5-star reviews, we've helped countless people get their lives back from sciatica pain. Your spine is analyzed with digital X-rays to create a custom treatment plan. Don't suffer another day - call 949-536-5506 for your complimentary consultation! 💪",
            
            'insurance': "Most of our patients with PPO insurance are able to get reimbursed for their care 🙌. We'll verify your benefits with you at your first visit so you know exactly what's covered. Would you like me to help you get scheduled?",
            
            'coverage': "Most of our patients with PPO insurance are able to get reimbursed for their care 🙌. We'll verify your benefits with you at your first visit so you know exactly what's covered. Would you like me to help you get scheduled?",
            
            'copay': "Most of our patients with PPO insurance are able to get reimbursed for their care 🙌. We'll verify your benefits with you at your first visit so you know exactly what's covered. Would you like me to help you get scheduled?",
            
            'medicare': "Most of our patients with PPO insurance are able to get reimbursed for their care 🙌. We'll verify your benefits with you at your first visit so you know exactly what's covered. Would you like me to help you get scheduled?",
            
            'benefits': "Most of our patients with PPO insurance are able to get reimbursed for their care 🙌. We'll verify your benefits with you at your first visit so you know exactly what's covered. Would you like me to help you get scheduled?",
            
            'reimbursement': "Most of our patients with PPO insurance are able to get reimbursed for their care 🙌. We'll verify your benefits with you at your first visit so you know exactly what's covered. Would you like me to help you get scheduled?",
            
            'appointment': "I'd love to help you schedule! 📅 Please select which applies to you:\n\n<div style='margin: 15px 0;'><button onclick=\"window.open('https://coreposturechiropractic.com/schedule/', '_blank')\" style='background: linear-gradient(135deg, #2d5aa0, #1e3c72); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; margin: 5px 10px 5px 0; transition: all 0.2s ease;' onmouseover='this.style.transform=\"translateY(-2px)\"; this.style.boxShadow=\"0 4px 12px rgba(45,90,160,0.3)\"' onmouseout='this.style.transform=\"translateY(0)\"; this.style.boxShadow=\"none\"'>🆕 New Patient - Free Consultation</button><button onclick=\"window.open('https://coreposturechiropractic.com/schedule-existing/', '_blank')\" style='background: linear-gradient(135deg, #2d5aa0, #1e3c72); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; margin: 5px; transition: all 0.2s ease;' onmouseover='this.style.transform=\"translateY(-2px)\"; this.style.boxShadow=\"0 4px 12px rgba(45,90,160,0.3)\"' onmouseout='this.style.transform=\"translateY(0)\"; this.style.boxShadow=\"none\"'>👤 Existing Patient</button></div>\n\nOr call us at 949-536-5506 - we can usually get you scheduled within 1-2 days! ☎️",
            
            'schedule': "I'd love to help you schedule! 📅 Please select which applies to you:\n\n<div style='margin: 15px 0;'><button onclick=\"window.open('https://coreposturechiropractic.com/schedule/', '_blank')\" style='background: linear-gradient(135deg, #2d5aa0, #1e3c72); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; margin: 5px 10px 5px 0; transition: all 0.2s ease;' onmouseover='this.style.transform=\"translateY(-2px)\"; this.style.boxShadow=\"0 4px 12px rgba(45,90,160,0.3)\"' onmouseout='this.style.transform=\"translateY(0)\"; this.style.boxShadow=\"none\"'>🆕 New Patient - Free Consultation</button><button onclick=\"window.open('https://coreposturechiropractic.com/schedule-existing/', '_blank')\" style='background: linear-gradient(135deg, #2d5aa0, #1e3c72); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; margin: 5px; transition: all 0.2s ease;' onmouseover='this.style.transform=\"translateY(-2px)\"; this.style.boxShadow=\"0 4px 12px rgba(45,90,160,0.3)\"' onmouseout='this.style.transform=\"translateY(0)\"; this.style.boxShadow=\"none\"'>👤 Existing Patient</button></div>\n\nOr call us at 949-536-5506 - we can usually get you scheduled within 1-2 days! ☎️",
            
            'new_patient': "Perfect! As a new patient, you'll receive a complimentary consultation with Dr. Tyler! 🎉\n\n📋 **Your consultation includes:**\n• Comprehensive examination\n• Digital X-ray analysis (if needed)\n• Personalized treatment plan\n• Determining if you're a candidate for CBP care\n\n🔗 **Ready to schedule?** <a href='https://coreposturechiropractic.com/schedule/' target='_blank' style='color: #2d5aa0; font-weight: bold;'>Click here to book your complimentary consultation!</a>\n\nOr call us at 949-536-5506. We can usually get you in within 1-2 days! 📞",
            
            'existing_patient': "Great! Welcome back! 👋 Ready to continue your CBP journey?\n\n🔗 **Ready to book?** <a href='https://coreposturechiropractic.com/schedule-existing/' target='_blank' style='color: #2d5aa0; font-weight: bold;'>Click here to schedule your appointment!</a>\n\nOr call us at 949-536-5506 if you need to discuss scheduling or have any questions about your treatment plan! 📞",
            
            'first_time': "Perfect! As a new patient, you'll receive a complimentary consultation with Dr. Tyler! 🎉\n\n📋 **Your consultation includes:**\n• Comprehensive examination\n• Digital X-ray analysis (if needed)\n• Personalized treatment plan\n• Determining if you're a candidate for CBP care\n\n🔗 **Ready to schedule?** <a href='https://coreposturechiropractic.com/schedule/' target='_blank' style='color: #2d5aa0; font-weight: bold;'>Click here to book your complimentary consultation!</a>\n\nOr call us at 949-536-5506. We can usually get you in within 1-2 days! 📞",
            
            'book': "I'd love to help you schedule! 📅 Please select which applies to you:\n\n<div style='margin: 15px 0;'><button onclick=\"window.open('https://coreposturechiropractic.com/schedule/', '_blank')\" style='background: linear-gradient(135deg, #2d5aa0, #1e3c72); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; margin: 5px 10px 5px 0; transition: all 0.2s ease;' onmouseover='this.style.transform=\"translateY(-2px)\"; this.style.boxShadow=\"0 4px 12px rgba(45,90,160,0.3)\"' onmouseout='this.style.transform=\"translateY(0)\"; this.style.boxShadow=\"none\"'>🆕 New Patient - Free Consultation</button><button onclick=\"window.open('https://coreposturechiropractic.com/schedule-existing/', '_blank')\" style='background: linear-gradient(135deg, #2d5aa0, #1e3c72); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 14px; margin: 5px; transition: all 0.2s ease;' onmouseover='this.style.transform=\"translateY(-2px)\"; this.style.boxShadow=\"0 4px 12px rgba(45,90,160,0.3)\"' onmouseout='this.style.transform=\"translateY(0)\"; this.style.boxShadow=\"none\"'>👤 Existing Patient</button></div>\n\nOr call us at 949-536-5506 - we can usually get you scheduled within 1-2 days! ☎️",
            
            'cost': "Here's the great news - your consultation is ALWAYS complimentary! 💰 This includes your examination with Dr. Tyler Meier and determining if you're a candidate for CBP care. We accept most insurance plans and our team handles all the paperwork. We also offer payment plans because we believe everyone deserves access to corrective care. Many patients find they actually save money by avoiding surgery! Call 949-536-5506 for your free consultation and insurance verification! 💳",
            
            'pain': "I understand your pain, and you're in the right place for real solutions! 😔 Unlike traditional approaches that mask symptoms, Dr. Tyler Meier's CBP method corrects the SOURCE of your pain by scientifically reshaping your spine. With 300+ 5-star reviews and over 2,000 successful patients, we've helped people eliminate chronic pain naturally. Your complimentary consultation includes digital X-ray analysis to identify exactly what's causing your pain. Ready to address the root cause? Call 949-536-5506! 💪✨",
            
            // ADD YOUR CUSTOM RESPONSES HERE:
            'custom_keyword': "Your custom response here...",
            'another_topic': "Another custom response...",
            
            // TEMPLATE FOR NEW RESPONSES:
            // 'keyword': "Your response with practice info, phone 949-536-5506, and call-to-action! 😊"
        };

        // Initialize event listeners when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Check if auto-start is enabled and API key is provided
            if (CONFIG.AUTO_START && CONFIG.OPENAI_API_KEY && CONFIG.OPENAI_API_KEY !== 'YOUR_API_KEY_HERE') {
                apiKey = CONFIG.OPENAI_API_KEY;
                isBasicMode = false;
                initializeChatbot();
                return;
            }
            
            document.getElementById('startBtn').addEventListener('click', startChatbot);
            document.getElementById('basicBtn').addEventListener('click', useBasicMode);
            document.getElementById('sendBtn').addEventListener('click', sendMessage);
        });

        function startChatbot() {
            console.log('Start button clicked!');
            
            const input = document.getElementById('apiInput');
            const btn = document.getElementById('startBtn');
            const errorDiv = document.getElementById('errorDisplay');
            
            apiKey = input.value.trim();
            
            if (!apiKey) {
                showError('Please enter your OpenAI API key');
                return;
            }
            
            if (!apiKey.startsWith('sk-')) {
                showError('API key should start with "sk-" - please check your key');
                return;
            }
            
            btn.textContent = '🧪 Testing API...';
            btn.disabled = true;
            errorDiv.style.display = 'none';
            
            // Test API key
            testApiKey(apiKey).then(result => {
                if (result.success) {
                    isBasicMode = false;
                    initializeChatbot();
                } else {
                    showError(result.error);
                    btn.textContent = '🔗 Start AI Chatbot';
                    btn.disabled = false;
                }
            });
        }

        function useBasicMode() {
            console.log('Basic mode selected!');
            isBasicMode = true;
            document.getElementById('chatMode').textContent = 'Smart Assistant (Basic Mode) 🤖';
            initializeChatbot();
        }

        function initializeChatbot() {
            console.log('Initializing chatbot...');
            
            // Hide setup, show chat
            document.getElementById('setupScreen').classList.add('hidden');
            document.getElementById('chatInterface').classList.remove('hidden');
            
            // Add welcome message
            const welcomeMsg = isBasicMode ? 
                "Hi there! 👋 Welcome to CorePosture Chiropractic in Newport Beach! I'm your smart assistant, ready to answer questions about our CBP treatments, scoliosis care, insurance, and scheduling. How can I help you today?" :
                "Hi there! 👋 Welcome to CorePosture Chiropractic in Newport Beach! I'm your AI assistant, powered by advanced technology and trained on our CBP treatments and services. I can answer detailed questions about scoliosis, sciatica, insurance, and scheduling. How can I help you today?";
            
            addBotMessage(welcomeMsg, true);
            
            // Setup input listener
            const input = document.getElementById('messageInput');
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            input.focus();
        }

        async function testApiKey(key) {
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${key}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [{ role: "user", content: "Test" }],
                        max_tokens: 5
                    })
                });

                if (response.ok) {
                    return { success: true };
                } else {
                    const errorData = await response.json();
                    let errorMsg = '';
                    
                    switch (response.status) {
                        case 401:
                            errorMsg = 'Invalid API key. Please check your key and ensure billing is set up.';
                            break;
                        case 402:
                            errorMsg = 'Payment required. Please add a payment method at platform.openai.com/account/billing';
                            break;
                        case 429:
                            errorMsg = 'Rate limit exceeded. Please wait a few minutes and try again.';
                            break;
                        default:
                            errorMsg = `Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`;
                    }
                    
                    return { success: false, error: errorMsg };
                }
            } catch (error) {
                return { success: false, error: `Connection failed: ${error.message}` };
            }
        }

        function showError(message) {
            const errorDiv = document.getElementById('errorDisplay');
            errorDiv.innerHTML = `<div class="error-box">❌ ${message}</div>`;
            errorDiv.style.display = 'block';
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            addUserMessage(message);
            input.value = '';
            messageCount++;
            
            // Show typing indicator
            showTyping();
            
            // Process message
            if (isBasicMode) {
                setTimeout(() => {
                    hideTyping();
                    processBasicMessage(message);
                }, 1500);
            } else {
                processGPTMessage(message);
            }
            
            // Show lead form after 3 messages
            if (messageCount >= 3 && !leadCaptured) {
                setTimeout(() => {
                    showLeadForm();
                }, 4000);
            }
        }

        function sendQuickMessage(text) {
            addUserMessage(text);
            messageCount++;
            showTyping();
            
            if (isBasicMode) {
                setTimeout(() => {
                    hideTyping();
                    processBasicMessage(text);
                }, 1200);
            } else {
                processGPTMessage(text);
            }
        }

        function processBasicMessage(message) {
            const lowerMsg = message.toLowerCase();
            let response = '';
            
            // Find matching response
            for (const [key, value] of Object.entries(basicResponses)) {
                if (lowerMsg.includes(key) || lowerMsg.includes(key.replace('_', ' '))) {
                    response = value;
                    break;
                }
            }
            
            // Default response
            if (!response) {
                if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                    response = "Hello! 👋 Thanks for contacting CorePosture Chiropractic in Newport Beach! We specialize in CBP treatment for scoliosis, sciatica, disc issues, and headaches. What can I help you with today? 🌟";
                } else {
                    response = "That's a great question! 🤔 We specialize in CBP treatment for conditions like scoliosis, sciatica, disc problems, and headaches here in Newport Beach. For detailed information about your specific situation, I recommend calling our office at (520) 572-2596 to speak with our doctors directly. What specific condition interests you? 📞";
                }
            }
            
            addBotMessage(response);
        }

        async function processGPTMessage(message) {
            try {
                conversationHistory.push({ role: "user", content: message });
                
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            { role: "system", content: SYSTEM_PROMPT },
                            ...conversationHistory
                        ],
                        max_tokens: 300,
                        temperature: 0.7
                    })
                });

                hideTyping();

                if (response.ok) {
                    const data = await response.json();
                    const botResponse = data.choices[0].message.content;
                    
                    conversationHistory.push({ role: "assistant", content: botResponse });
                    
                    // Keep history manageable
                    if (conversationHistory.length > 10) {
                        conversationHistory = conversationHistory.slice(-10);
                    }
                    
                    addBotMessage(botResponse);
                } else {
                    addBotMessage("I'm having trouble connecting right now. Please call us at (520) 572-2596 for immediate assistance! 📞");
                }
                
            } catch (error) {
                hideTyping();
                addBotMessage("I'm experiencing technical difficulties. Please call us at (520) 572-2596 for help! 📞");
            }
        }

        function addUserMessage(text) {
            const messagesDiv = document.getElementById('messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message user';
            messageDiv.innerHTML = `<div class="bubble">${text}</div>`;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function addBotMessage(text, includeQuickButtons = false) {
            const messagesDiv = document.getElementById('messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            
            let html = `
                <div class="avatar">CP</div>
                <div class="bubble">${text}`;
            
            if (includeQuickButtons) {
                html += `
                    <div class="quick-buttons">
                        <div class="quick-btn" onclick="sendQuickMessage('What is CBP treatment?')">CBP Treatment</div>
                        <div class="quick-btn" onclick="sendQuickMessage('Do you treat scoliosis?')">Scoliosis</div>
                        <div class="quick-btn" onclick="sendQuickMessage('Insurance coverage?')">Insurance</div>
                        <div class="quick-btn" onclick="sendQuickMessage('Book appointment')">Book Now</div>
                    </div>`;
            }
            
            html += `</div>`;
            
            messageDiv.innerHTML = html;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function showTyping() {
            const messagesDiv = document.getElementById('messages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot typing';
            typingDiv.id = 'typingIndicator';
            typingDiv.innerHTML = `
                <div class="avatar">CP</div>
                <div class="bubble">
                    <div class="typing-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            `;
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function hideTyping() {
            const typingDiv = document.getElementById('typingIndicator');
            if (typingDiv) {
                typingDiv.remove();
            }
        }

        function showLeadForm() {
            const formHTML = `
                <div class="lead-form">
                    <strong>📋 Let's Connect You With Our Newport Beach Team!</strong>
                    <p style="margin: 8px 0; font-size: 13px; color: #64748b;">To schedule your consultation and get personalized treatment information:</p>
                    <input type="text" id="leadName" placeholder="Your Name *" required>
                    <input type="email" id="leadEmail" placeholder="Email Address *" required>
                    <input type="tel" id="leadPhone" placeholder="Phone Number *" required>
                    <button onclick="submitLead()">Submit & Continue Chat 🚀</button>
                </div>
            `;
            
            addBotMessage(formHTML);
        }

        function submitLead() {
            const name = document.getElementById('leadName').value.trim();
            const email = document.getElementById('leadEmail').value.trim();
            const phone = document.getElementById('leadPhone').value.trim();
            
            if (name && email && phone) {
                leadCaptured = true;
                
                // Log lead data
                console.log('Lead captured:', { name, email, phone, timestamp: new Date() });
                
                // Send email transcript
                setTimeout(() => {
                    sendEmailTranscript({ name, email, phone });
                }, 1000);
                
                const thankYou = `Perfect, ${name}! 🎉 Our Newport Beach team has your information and will reach out within 24 hours to schedule your consultation. In the meantime, I'm here to answer any other questions about CBP treatment or our services. What else would you like to know? 💪`;
                
                setTimeout(() => {
                    addBotMessage(thankYou);
                }, 500);
            } else {
                alert('Please fill in all required fields to continue.');
            }
        }

        function sendEmailTranscript(leadData) {
            // Generate transcript
            const messages = document.querySelectorAll('.message');
            let transcript = '';
            
            transcript += `COREPOSTURE CHIROPRACTIC - CHAT TRANSCRIPT\n`;
            transcript += `==========================================\n\n`;
            transcript += `Date: ${new Date().toLocaleDateString()}\n`;
            transcript += `Time: ${chatStartTime.toLocaleTimeString()} - ${new Date().toLocaleTimeString()}\n`;
            transcript += `Mode: ${isBasicMode ? 'Basic Assistant' : 'AI Powered'}\n\n`;
            
            transcript += `LEAD INFORMATION:\n`;
            transcript += `Name: ${leadData.name}\n`;
            transcript += `Email: ${leadData.email}\n`;
            transcript += `Phone: ${leadData.phone}\n\n`;
            
            transcript += `CONVERSATION:\n=============\n\n`;
            
            messages.forEach((message, index) => {
                const isBot = message.classList.contains('bot');
                const bubble = message.querySelector('.bubble');
                if (!bubble || message.classList.contains('typing')) return;
                
                const text = bubble.textContent.trim();
                if (text.length < 5 || text.includes('Let\'s Connect')) return;
                
                const timestamp = new Date(chatStartTime.getTime() + (index * 30000)).toLocaleTimeString();
                transcript += `[${timestamp}] ${isBot ? 'CorePosture Assistant' : 'Website Visitor'}: ${text}\n\n`;
            });
            
            transcript += `\n==========================================\n`;
            transcript += `Generated by CorePosture AI Chatbot\n`;
            transcript += `Newport Beach, CA | www.coreposturechiropractic.com\n`;
            
            // Send via mailto
            const subject = encodeURIComponent(`CorePosture Chat Lead: ${leadData.name}`);
            const body = encodeURIComponent(transcript);
            const mailtoURL = `mailto:drtyler@coreposture.com?subject=${subject}&body=${body}`;
            
            // Create hidden link to trigger mailto
            const link = document.createElement('a');
            link.href = mailtoURL;
            link.style.display = 'none';
            document.body.appendChild(link);
            
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                link.click();
                document.body.removeChild(link);
            }, 100);
            
            console.log('Email transcript prepared for:', leadData.email);
        }
    </script>
</body>
</html>
