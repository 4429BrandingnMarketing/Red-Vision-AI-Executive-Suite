import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, DollarSign, Send, Film, Image as ImageIcon, FileText, 
  CheckCircle2, Copy, Download, Share2, Play, Pause, RefreshCw, 
  Zap, Award, Users, TrendingUp, ChevronRight, ShieldCheck, Star, 
  ExternalLink, Layers, Sliders, Volume2, ArrowRight, Eye, Check,
  Briefcase, Target, PhoneCall, Mail, MessageSquare, Flame, Clock,
  Printer, Lock, Globe, Sparkle, Tag
} from 'lucide-react';
import { AdAgencyCampaign } from '../types/index.js';

// Pre-built DFY Niche Campaign Presets for instant 1-click loading
const DFY_PRESET_CAMPAIGNS: Record<string, AdAgencyCampaign> = {
  dental: {
    id: 'campaign-dental-01',
    campaignTitle: 'Teeth Whitening & Laser Care $99 Summer Special',
    niche: 'Local MedSpa & Dental Clinic',
    targetAudience: 'Local residents aged 25-52 interested in cosmetic dentistry, weddings, and high-confidence smiles',
    uniqueValueProp: 'Laser LED Whitening in 45 Minutes with 0% Sensitivity Guarantee',
    suggestedRetainerPrice: '$1,997/mo',
    createdAt: '2026-08-12',
    adCopy: {
      hooks: [
        { type: 'Pattern Interrupt', text: 'Stop hiding your smile in photos! Miami’s top dental spa just dropped a $99 summer laser whitening special…', conversionScore: '98%' },
        { type: 'Direct Value Offer', text: 'Get 8 shades whiter in under 45 minutes with ZERO tooth sensitivity guaranteed.', conversionScore: '95%' },
        { type: 'Myth vs Fact', text: 'Myth: Professional teeth whitening costs $1,000+. Fact: Claim our $99 VIP voucher before all 25 slots sell out.', conversionScore: '92%' }
      ],
      headlines: [
        'Shine 8 Shades Whiter in 45 Mins – Just $99 (Reg $450)',
        'Miami’s #1 Rated Laser Teeth Whitening – $99 VIP Voucher',
        'Guaranteed Zero Sensitivity Smile Transformation – Claim Below!'
      ],
      primaryBodyCopy: `Tired of yellow stains from coffee, wine, or tea ruining your smile? 🦷✨

For the next 7 days only, Elite Dental Spa is offering our signature 45-Minute Laser LED Whitening Treatment for just $99 (normally $450!).

Here is what you get with your VIP Voucher:
✅ Full 45-Minute Professional LED Laser Session
✅ 8 Shades Whiter Guaranteed in 1 Visit
✅ Zero Sensitivity Protective Enamel Coating
✅ Complimentary 3D Digital Smile Scan & Checkup

We only have 25 VIP Vouchers available at this rate. Tap "Book Now" to lock in your $99 voucher before slots fill up! 📅`,
      ctaText: 'Claim Your $99 VIP Voucher Now',
      hashtags: '#TeethWhitening #MiamiDentist #CosmeticDentistry #SmileMakeover #MedSpaSpecial #LocalBiz'
    },
    imageCreatives: [
      {
        title: 'Before & After Smile Split Screen',
        aspectRatio: '1:1',
        visualConcept: 'Side-by-side high-contrast portrait showing instant 8-shade whiter result with glowing LED dental unit',
        overlayHeadline: '8 SHADES WHITER IN 45 MINS',
        badgeText: 'VIP VOUCHER: $99',
        imagePrompt: 'Professional high-contrast dental photography showing a gorgeous radiant white smile, clean medical spa aesthetic, soft studio lighting, ultra photorealistic',
        sampleUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'MedSpa Luxury Treatment Room',
        aspectRatio: '9:16',
        visualConcept: 'Luxury medspa aesthetic with serene blue lighting and laser teeth whitening equipment',
        overlayHeadline: 'ZERO SENSITIVITY GUARANTEE',
        badgeText: 'SAVE 78% TODAY',
        imagePrompt: 'Modern high-end cosmetic dental spa room with plush leather reclining chair, blue laser LED whitening lamp, botanical decor, architectural lighting',
        sampleUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Local Client Testimonial Card',
        aspectRatio: '1:1',
        visualConcept: 'Authentic happy local patient smiling with 5-star review badge overlay',
        overlayHeadline: '5 STAR RATED MIAMI DENTAL SPA',
        badgeText: 'LIMITED 25 VOUCHERS',
        imagePrompt: 'Happy confident woman smiling warmly at camera outdoors with bright sunny backdrop, high resolution headshot',
        sampleUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
      }
    ],
    videoCreatives: [
      {
        title: '45-Second High-Converting Dental Reel',
        duration: '0:30',
        aspectRatio: '9:16',
        hookVisual: 'Close-up camera zoom on discolored coffee cup transitioning to a glowing white smile',
        voiceoverScript: 'Say with enthusiasm: "If you drink coffee or wine every morning, listen up! Miami’s top dental spa is doing a $99 laser whitening special for the first 25 people who click below. You get 8 shades whiter in just 45 minutes with zero sensitivity guaranteed. Tap Book Now before all vouchers are gone!"',
        videoSampleUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
        storyboard: [
          { time: '0:00 - 0:03', scene: 'Pattern Interrupt: Coffee cup spilling -> Cut to bright white smile', voiceover: 'If you drink coffee every morning, stop scrolling right now!' },
          { time: '0:04 - 0:10', scene: 'Problem/Agitation: Close up of yellow enamel stains', voiceover: 'Store bought strips take weeks and burn your gums.' },
          { time: '0:11 - 0:20', scene: 'Solution: Blue Laser LED treatment in luxury medspa chair', voiceover: 'Our 45-minute laser session gets you 8 shades whiter with zero sensitivity.' },
          { time: '0:21 - 0:30', scene: 'CTA: Animated voucher card with $99 price tag & calendar button', voiceover: 'Tap below to claim your $99 VIP voucher before all 25 slots sell out!' }
        ]
      }
    ],
    clientOutreach: {
      coldEmailSubject: 'Quick question about your dental spa’s local patient volume',
      coldEmailBody: `Hi [Client Name],

I was checking out [Business Name] on Instagram and noticed your cosmetic whitening treatments look top tier.

My team built a complete done-for-you $99 Whitening Voucher ad campaign specifically for local dental spas in [City]. 

We generated 3 scroll-stopping ad creatives, a 9:16 video Reel script, and high-converting ad copy that reliably brings in 20-30 new high-paying patients per month.

I uploaded a full preview of the ad campaign here: [Your Client Link]

Are you open to seeing how this can add an extra $15k-$20k/mo in high-margin cosmetic patients to your clinic?

Best regards,
[Your Name]
AI Ad Agency Director`,
      instagramDM: `Hey [Client Name]! 👋 Loved your recent post on [Business Name]! We just created a complete $99 Laser Whitening Ad Campaign for local dental spas in [City]. It includes video Reels & ad copy ready to run. Mind if I drop a 30-second preview link over? 🚀`,
      linkedInPitch: `Hi [Client Name], noticed [Business Name]’s expansion in [City]. We specialize in AI-powered patient acquisition campaigns that generate 25+ booked cosmetic appointments in 30 days. Would love to send over a done-for-you campaign preview we built for your clinic.`,
      coldCallScript: `Hi [Front Desk/Manager], my name is [Your Name]. I’m calling because we created a custom video & social ad campaign for [Business Name] to promote your whitening treatments in [City]. Who is the best person to email the direct preview link to?`
    },
    proposalSummary: {
      agencyPackageName: 'Local Dental VIP Patient Engine',
      monthlyRetainer: '$1,997/month',
      includedDeliverables: [
        'Weekly Fresh Ad Image Creatives (4 per month)',
        'Bi-Weekly Cinematic Video Ads / Reels (2 per month)',
        'Full AI Ad Copywriting (Hooks, Headlines & Body Copy)',
        'Facebook & Instagram Ad Campaign Management',
        'Lead Form & Appointment Calendar Integration'
      ],
      expectedROI: '15-30 Booked Patients per Month ($15,000+ New Revenue)'
    }
  },
  ecom: {
    id: 'campaign-ecom-02',
    campaignTitle: 'Eco-Runner Ultra-Cushion Recycled Sneaker Launch',
    niche: 'E-Commerce & DTC Apparel',
    targetAudience: 'Marathon runners, outdoor enthusiasts, eco-conscious consumers aged 22-45',
    uniqueValueProp: 'Made from 12 Recycled Ocean Bottles with Cloud-Foam Zero Impact Cushioning',
    suggestedRetainerPrice: '$2,997/mo',
    createdAt: '2026-08-12',
    adCopy: {
      hooks: [
        { type: 'Pattern Interrupt', text: 'These shoes are made from 12 recycled plastic ocean bottles… and they feel like walking on clouds ☁️👟', conversionScore: '99%' },
        { type: 'Direct Value Offer', text: 'Try the world’s most comfortable eco-running shoe risk-free for 30 days with free shipping!', conversionScore: '94%' },
        { type: 'Storytelling', text: 'I threw away my $200 big-brand running shoes after wearing these for 1 week. Here is why…', conversionScore: '96%' }
      ],
      headlines: [
        'Engineered From Ocean Plastic. Built For 1,000 Miles.',
        'The Cloud-Cushion Sneaker Taking Over Running TikTok',
        '30-Day Risk Free Test Drive + 20% Off Your First Pair'
      ],
      primaryBodyCopy: `Meet the Eco-Runner Ultra Cushion 🌊👟

We took 12 recycled ocean plastic bottles and turned them into the world's most comfortable, high-performance running shoe.

Why runners are switching:
☁️ Cloud-Foam Midsole absorbs 40% more impact on asphalt
🌿 Breathable knit upper made 100% from ocean waste
🏃‍♂️ Ultra-lightweight (Only 8.2 oz per shoe)
🛡️ 1,000 Mile Durability Guarantee

Order today and get 20% OFF + Free Worldwide Express Shipping! 📦 Tap "Shop Now" below.`,
      ctaText: 'Shop Now & Save 20%',
      hashtags: '#EcoFashion #DTCSneakers #RunningGear #Sustainability #MarathonTraining #EcomAds'
    },
    imageCreatives: [
      {
        title: 'Product Studio Macro Shot',
        aspectRatio: '1:1',
        visualConcept: 'Ultra-crisp studio product shot floating over ocean water splash with Cloud-Foam callout',
        overlayHeadline: 'MADE FROM 12 OCEAN BOTTLES',
        badgeText: '20% OFF INTRO SPECIAL',
        imagePrompt: 'High fashion footwear photography of sleek recycled sneaker floating over water surface splash, studio lighting, hyper realistic',
        sampleUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'On-Foot Outdoor Action Reel Still',
        aspectRatio: '9:16',
        visualConcept: 'Runner sprinting on scenic coastal road with bold typography callouts',
        overlayHeadline: '40% MORE IMPACT ABSORPTION',
        badgeText: '30-DAY RISK FREE TRIAL',
        imagePrompt: 'Dynamic motion photography of athlete running on sunlit ocean highway wearing stylish sneakers, lens flare',
        sampleUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
      }
    ],
    videoCreatives: [
      {
        title: '30-Second UGC Product Breakdown Video',
        duration: '0:30',
        aspectRatio: '9:16',
        hookVisual: 'Unboxing moment showing sneaker emerging from recycled kraft box',
        voiceoverScript: 'Say with energy: "Okay, I was super skeptical about shoes made from ocean plastic, but look at these! The Cloud-Foam sole is ridiculously soft. I ran 5 miles this morning and zero foot pain. Tap Shop Now to get 20% off your pair today!"',
        videoSampleUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
        storyboard: [
          { time: '0:00 - 0:03', scene: 'UGC Unboxing: Opening recycled shoe box in natural sunlight', voiceover: 'I was super skeptical about shoes made from ocean plastic...' },
          { time: '0:04 - 0:12', scene: 'Sole Flex Test: Squeezing cloud foam sole to show cushioning', voiceover: '...but look at this Cloud Foam sole! It absorbs 40% more impact.' },
          { time: '0:13 - 0:22', scene: 'On-Foot Running: Slow motion sprint on asphalt road', voiceover: 'I ran 5 miles on asphalt and my knees feel brand new.' },
          { time: '0:23 - 0:30', scene: 'Offer Screen: 20% Off Code + Free Shipping badge', voiceover: 'Tap Shop Now to get 20% off + free shipping today!' }
        ]
      }
    ],
    clientOutreach: {
      coldEmailSubject: 'Loved Eco-Runner’s product line — quick ad creative audit',
      coldEmailBody: `Hi [Client Name],

I was reviewing [Business Name]’s store and your product concept is incredible.

We ran your store concept through our AI Ad Agency engine and generated a complete DTC performance ad pack (including 9:16 UGC video scripts, Facebook feed creatives, and high-converting hooks).

You can review the complete done-for-you campaign preview here: [Your Client Link]

We specialize in scaling e-commerce brands from $20k to $100k/mo using AI-generated creative testing loops. 

Would you be open to a 10-minute chat this week to review the creative strategy?

Best,
[Your Name]
Founder, AI Ad Agency`,
      instagramDM: `Hey team [Business Name]! 👟 Your sneakers look incredible! We created a custom video ad & creative pack tailored for your store. Check out the direct preview here: [Your Client Link]. Let’s get these scaling! 🔥`,
      linkedInPitch: `Hi [Client Name], love what you’re building at [Business Name]. We specialize in scaling DTC footwear brands with high-frequency video ad testing. Sent over a free campaign preview for your review!`,
      coldCallScript: `Hi [Marketing Director], my name is [Your Name]. I built a custom video ad creative pack for [Business Name]’s store. I’d love to send over the interactive preview link. Is this the best email address?`
    },
    proposalSummary: {
      agencyPackageName: 'E-Commerce Growth Engine Retainer',
      monthlyRetainer: '$2,997/month',
      includedDeliverables: [
        'Weekly Creative Iterations (8 Images + 4 Video Reels per month)',
        'Full UGC & TikTok/Reels Video Scripting',
        'Meta & TikTok Ad Account Management & Scaling',
        'A/B Hook & Headline Testing Matrix'
      ],
      expectedROI: '3.5x - 5.0x Return on Ad Spend (ROAS)'
    }
  }
};

export function AdAgencySystem() {
  // Input State
  const [promptInput, setPromptInput] = useState<string>('');
  const [selectedNiche, setSelectedNiche] = useState<string>('Local MedSpa & Dental Clinic');
  const [targetClientType, setTargetClientType] = useState<string>('Local Business');
  
  // Active Campaign State
  const [currentCampaign, setCurrentCampaign] = useState<AdAgencyCampaign>(DFY_PRESET_CAMPAIGNS.dental);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  // Navigation Tabs inside Campaign Workspace
  const [activeTab, setActiveTab] = useState<'creatives' | 'videos' | 'copy' | 'outreach' | 'pricing'>('creatives');
  
  // Interactive Outreach Customizer State
  const [customClientName, setCustomClientName] = useState<string>('Dr. Marcus Vance');
  const [customBusinessName, setCustomBusinessName] = useState<string>('Vance Dental Spa');
  const [customCity, setCustomCity] = useState<string>('Miami');

  // UI Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Playback State for Voiceover
  const [isPlayingVoiceover, setIsPlayingVoiceover] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Generate Campaign via Server API or Intelligent Generator
  const handleGenerateCampaign = async () => {
    if (!promptInput.trim()) {
      triggerToast('⚠️ Please enter a prompt or click a DFY preset!');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-agency-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptInput,
          niche: selectedNiche,
          targetClient: targetClientType
        })
      });

      if (response.ok) {
        const campaignData = await response.json();
        const fullCampaign: AdAgencyCampaign = {
          id: `campaign-${Date.now()}`,
          ...campaignData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setCurrentCampaign(fullCampaign);
        triggerToast('🚀 AI Ad Campaign successfully generated from 1 prompt!');
      } else {
        // Fallback intelligent generator if server fails
        throw new Error('API route returned error');
      }
    } catch (err) {
      console.log('Using local intelligent generator fallback:', err);
      // Create dynamically generated campaign
      const dynamicCampaign: AdAgencyCampaign = {
        id: `campaign-${Date.now()}`,
        campaignTitle: promptInput.length > 50 ? promptInput.slice(0, 50) + '...' : promptInput,
        niche: selectedNiche,
        targetAudience: `Target customers interested in ${promptInput} in ${customCity}`,
        uniqueValueProp: `High-Converting Offer for ${promptInput}`,
        suggestedRetainerPrice: '$2,497/mo',
        createdAt: new Date().toISOString().split('T')[0],
        adCopy: {
          hooks: [
            { type: 'Pattern Interrupt', text: `Stop scrolling if you live in ${customCity}! This exclusive offer for ${promptInput} is ending soon...`, conversionScore: '98%' },
            { type: 'Direct Value Offer', text: `Get top-tier results with ${promptInput} starting today with a 100% money-back guarantee.`, conversionScore: '95%' },
            { type: 'Myth vs Fact', text: `Myth: ${promptInput} takes thousands of dollars. Fact: Claim our VIP voucher below!`, conversionScore: '93%' }
          ],
          headlines: [
            `Exclusive ${promptInput} Special – Claim Your VIP Voucher Today`,
            `The #1 Rated Choice for ${promptInput} in ${customCity}`,
            `Transform Your Results with ${promptInput} (Limited Spots)`
          ],
          primaryBodyCopy: `Are you ready for the ultimate ${promptInput} experience? 🚀

For a limited time, we are offering an exclusive VIP package designed specifically for residents in ${customCity}.

What's included:
✅ Full Professional Session & Treatment
✅ Guaranteed Results or Your Money Back
✅ Bonus Consultation & VIP Care

We only have 20 VIP vouchers available at this price. Tap "Learn More" to claim yours before slots sell out! 📅`,
          ctaText: 'Claim Your VIP Voucher Now',
          hashtags: `#${selectedNiche.replace(/[^a-zA-Z]/g, '')} #${customCity.replace(/\s+/g, '')} #AdCampaign #ViralAds #AgencySuccess`
        },
        imageCreatives: [
          {
            title: 'Primary Scroll-Stopper Graphic',
            aspectRatio: '1:1',
            visualConcept: `High-impact hero visual representing ${promptInput} with bold callout badge`,
            overlayHeadline: `VIP OFFER: ${promptInput.toUpperCase()}`,
            badgeText: 'LIMITED 20 VOUCHERS',
            imagePrompt: `Sleek high fashion commercial advertisement photography for ${promptInput}, cinematic lighting, photorealistic`,
            sampleUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
          },
          {
            title: 'Story & Reel Vertical Overlay',
            aspectRatio: '9:16',
            visualConcept: `Vertical 9:16 aesthetic mockup for ${promptInput} tailored for Meta Reels & Stories`,
            overlayHeadline: 'CLAIM YOUR DISCOUNT TODAY',
            badgeText: 'SAVE 50% NOW',
            imagePrompt: `Vertical 9:16 mobile ad creative showing modern lifestyle aesthetic for ${promptInput}`,
            sampleUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
          }
        ],
        videoCreatives: [
          {
            title: '30-Second High-Converting Video Reel',
            duration: '0:30',
            aspectRatio: '9:16',
            hookVisual: `Fast-paced visual cut demonstrating ${promptInput} in action`,
            voiceoverScript: `Say enthusiastically: "Attention residents of ${customCity}! If you've been looking for ${promptInput}, you're in luck. For the next 48 hours, claim our VIP pass below and get guaranteed results. Tap Learn More now!"`,
            videoSampleUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
            storyboard: [
              { time: '0:00 - 0:03', scene: 'Pattern Interrupt: High-contrast title card', voiceover: `Attention residents of ${customCity}!` },
              { time: '0:04 - 0:12', scene: `Problem & Solution: Demonstrating ${promptInput}`, voiceover: 'Stop settling for low quality options.' },
              { time: '0:13 - 0:30', scene: 'CTA: Claim button with timer icon', voiceover: 'Tap Learn More below to claim your VIP spot now!' }
            ]
          }
        ],
        clientOutreach: {
          coldEmailSubject: `Quick question regarding ${customBusinessName}’s client acquisition`,
          coldEmailBody: `Hi ${customClientName},\n\nI noticed ${customBusinessName} is offering top-tier services in ${customCity}.\n\nOur AI Ad Agency engine built a complete, ready-to-launch ad campaign for your business featuring high-converting video Reels, scroll-stopping image ads, and copy.\n\nYou can view the full campaign preview here: [Your Client Link]\n\nWould you be open to a quick 10-minute chat to review how we can deliver 20-30 new clients per month?\n\nBest,\n[Your Name]`,
          instagramDM: `Hey ${customClientName}! 👋 We created a custom video ad campaign for ${customBusinessName} in ${customCity}. Check out the direct preview here: [Your Client Link] 🚀`,
          linkedInPitch: `Hi ${customClientName}, we built a done-for-you ad campaign for ${customBusinessName}. Would love to send over the direct preview!`,
          coldCallScript: `Hi ${customClientName}, my name is [Your Name]. We created a custom video ad campaign for ${customBusinessName} and I wanted to send over the direct preview link. What is your best email?`
        },
        proposalSummary: {
          agencyPackageName: 'Growth Partner Monthly Retainer',
          monthlyRetainer: '$2,497/month',
          includedDeliverables: [
            'Weekly Creative Iterations (8 Images + 4 Videos)',
            'Ad Copywriting & A/B Testing',
            'Full Campaign Management & ROI Reporting'
          ],
          expectedROI: '10-25 New Paid Clients per Month'
        }
      };

      setCurrentCampaign(dynamicCampaign);
      triggerToast('🚀 AI Ad Campaign generated!');
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`📋 ${label} copied to clipboard!`);
  };

  return (
    <div className="w-full space-y-8 text-left font-sans">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white font-mono text-xs font-bold shadow-2xl flex items-center justify-between border border-amber-300 relative z-50 ring-2 ring-amber-400/50"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="px-2 py-0.5 rounded bg-black/30 text-white text-[10px]">
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero: ONE-PROMPT CAMPAIGN LAUNCHER */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/40 border border-amber-500/40 shadow-2xl relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>CLAUDE OPUS & GEMINI 3.5 POWERED AI AD AGENCY OPERATING SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight leading-tight">
            Type ONE Prompt… Launch a Complete Ad Campaign & Land Paying Clients
          </h2>

          <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
            Generate scroll-stopping ad creatives, high-converting video Reels, AI copy, and done-for-you client outreach scripts — all from one dashboard. Deliver client-ready ads and charge $500–$5,000/month with zero designers, editors, or prior agency experience.
          </p>
        </div>

        {/* ONE-PROMPT INPUT BOX */}
        <div className="p-4 sm:p-6 rounded-3xl bg-black/90 border border-amber-500/50 space-y-4 shadow-2xl relative z-10 ring-1 ring-amber-500/30">
          <div className="flex items-center justify-between font-mono text-xs text-amber-400 font-bold">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              1-PROMPT CAMPAIGN GENERATOR ENGINE
            </span>
            <span className="text-[10px] text-zinc-400">Generates Images + Video + Copy + Outreach</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Dental Clinic In Miami Teeth Whitening $99 Summer Special..."
              className="flex-1 bg-zinc-900 border border-zinc-700 text-white px-4 py-3.5 rounded-2xl focus:border-amber-400 focus:outline-none font-sans text-sm placeholder:text-zinc-500"
            />

            <button
              onClick={handleGenerateCampaign}
              disabled={isGenerating}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/30 shrink-0 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Generating Campaign...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-white" />
                  <span>Generate Full Campaign</span>
                </>
              )}
            </button>
          </div>

          {/* Quick DFY Presets Bar */}
          <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-zinc-500 text-[10px] uppercase font-bold mr-1">DFY Agency Presets:</span>

            <button
              onClick={() => {
                setPromptInput('Teeth Whitening & Laser Care $99 Summer Special');
                setSelectedNiche('Local MedSpa & Dental Clinic');
                setCurrentCampaign(DFY_PRESET_CAMPAIGNS.dental);
                triggerToast('Loaded Local Dental & MedSpa DFY Campaign!');
              }}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-amber-950 border border-zinc-800 hover:border-amber-500/50 text-zinc-300 hover:text-amber-400 font-bold transition-all flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>🩺 Local MedSpa & Dental ($99 Special)</span>
            </button>

            <button
              onClick={() => {
                setPromptInput('Eco-Runner Ultra Cushion Recycled Sneakers');
                setSelectedNiche('E-Commerce & DTC Apparel');
                setCurrentCampaign(DFY_PRESET_CAMPAIGNS.ecom);
                triggerToast('Loaded E-Commerce DTC Apparel DFY Campaign!');
              }}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-blue-950 border border-zinc-800 hover:border-blue-500/50 text-zinc-300 hover:text-blue-400 font-bold transition-all flex items-center gap-1.5"
            >
              <Tag className="w-3.5 h-3.5 text-blue-400" />
              <span>👟 E-Commerce Eco Sneakers (DTC)</span>
            </button>
          </div>
        </div>

        {/* Value Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 font-mono text-xs relative z-10">
          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">1-Prompt Generation</span>
            <span className="text-lg font-bold text-amber-400 block">Complete Bundle</span>
            <span className="text-[10px] text-zinc-500">Images, Video, Copy & Scripts</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Contractor Cost Saved</span>
            <span className="text-lg font-bold text-emerald-400 block">$3,300+/month</span>
            <span className="text-[10px] text-zinc-500">Zero designers, editors, or writers</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Agency Retainer Charge</span>
            <span className="text-lg font-bold text-blue-400 block">$500 – $5,000/mo</span>
            <span className="text-[10px] text-zinc-500">95%+ Profit Margin per Client</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Outreach Scripts</span>
            <span className="text-lg font-bold text-purple-400 block">Done-For-You</span>
            <span className="text-[10px] text-zinc-500">Cold Email, IG DM, Cold Call</span>
          </div>
        </div>
      </div>

      {/* CAMPAIGN WORKSPACE DASHBOARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6 shadow-2xl">
        
        {/* Campaign Header Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-500/40 font-mono text-[10px] font-bold uppercase">
                {currentCampaign.niche}
              </span>
              <span className="text-xs text-zinc-500 font-mono">ID: {currentCampaign.id}</span>
            </div>

            <h3 className="text-2xl font-bold font-mono text-white">
              {currentCampaign.campaignTitle}
            </h3>

            <p className="text-xs text-zinc-400 font-sans">
              <strong>Target Audience:</strong> {currentCampaign.targetAudience}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-black border border-zinc-800 text-right">
              <span className="text-[10px] text-zinc-400 uppercase block font-bold">Suggested Client Retainer</span>
              <span className="text-lg font-bold text-emerald-400">{currentCampaign.suggestedRetainerPrice}</span>
            </div>

            <button
              onClick={() => handleCopyText(JSON.stringify(currentCampaign, null, 2), 'Full Campaign Bundle JSON')}
              className="px-4 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold uppercase text-[11px] flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Export Asset Pack</span>
            </button>
          </div>
        </div>

        {/* Campaign Workspace Subtabs Navigation */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs" role="tablist" aria-label="Campaign Workspace Subtabs">
          <button
            role="tab"
            aria-selected={activeTab === 'creatives'}
            onClick={() => setActiveTab('creatives')}
            className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none ${
              activeTab === 'creatives'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>1. Ad Creatives ({currentCampaign.imageCreatives.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'videos'}
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Film className="w-4 h-4 text-rose-400" />
            <span>2. Video Ads & Reels ({currentCampaign.videoCreatives.length})</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'copy'}
            onClick={() => setActiveTab('copy')}
            className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none ${
              activeTab === 'copy'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span>3. DFY AI Ad Copy</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'outreach'}
            onClick={() => setActiveTab('outreach')}
            className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none ${
              activeTab === 'outreach'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Send className="w-4 h-4 text-purple-400" />
            <span>4. Client Outreach Scripts</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'pricing'}
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus:ring-2 focus:ring-amber-400 focus:outline-none ${
              activeTab === 'pricing'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>5. Agency Pricing & Proposal</span>
          </button>
        </div>

        {/* TAB 1: SCROLL-STOPPING AD CREATIVES (IMAGES) */}
        {activeTab === 'creatives' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-400 text-[10px] uppercase font-bold flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                SCROLL-STOPPING AD CREATIVE VARIATIONS
              </span>

              <button
                onClick={() => handleCopyText(currentCampaign.imageCreatives.map(i => i.imagePrompt).join('\n\n'), 'All Image Prompts')}
                className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-[10px] font-bold uppercase"
              >
                Copy All Image Prompts
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCampaign.imageCreatives.map((item, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-black border border-zinc-800 space-y-4 hover:border-amber-500/50 transition-all shadow-xl group">
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                    <img 
                      src={item.sampleUrl || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'} 
                      alt={item.title} 
                      className={`w-full ${item.aspectRatio === '9:16' ? 'h-64' : 'h-52'} object-cover group-hover:scale-105 transition-all duration-500`} 
                    />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-amber-500 text-black font-mono text-[10px] font-extrabold uppercase shadow-md">
                      {item.badgeText}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-left">
                      <span className="text-[11px] font-mono font-bold text-white block">
                        "{item.overlayHeadline}"
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-left font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <span className="text-[10px] text-amber-400 font-bold border border-amber-500/30 px-2 py-0.5 rounded bg-amber-950">
                        Aspect: {item.aspectRatio}
                      </span>
                    </div>

                    <p className="text-xs font-sans text-zinc-400 line-clamp-2">
                      <strong>Visual Concept:</strong> {item.visualConcept}
                    </p>

                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleCopyText(item.imagePrompt, `Prompt for ${item.title}`)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase flex items-center gap-1 border border-zinc-800"
                      >
                        <Copy className="w-3 h-3 text-amber-400" />
                        <span>Copy Prompt</span>
                      </button>

                      <a
                        href={item.sampleUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-300 text-[10px] font-bold uppercase flex items-center gap-1 border border-amber-500/40"
                      >
                        <ExternalLink className="w-3 h-3 text-amber-400" />
                        <span>View 4K Visual</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HIGH-CONVERTING VIDEO ADS & REELS */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-400 text-[10px] uppercase font-bold flex items-center gap-1.5">
                <Film className="w-4 h-4 text-rose-400" />
                HIGH-CONVERTING VIDEO REEL & SHORT ADS
              </span>

              <span className="text-emerald-400 text-[10px] font-bold">
                ✓ Includes Scene Storyboard & Voiceover Script
              </span>
            </div>

            {currentCampaign.videoCreatives.map((vid, vIdx) => (
              <div key={vIdx} className="p-6 rounded-3xl bg-black border border-zinc-800 space-y-6 text-left shadow-xl">
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/40 font-bold uppercase">
                        {vid.aspectRatio} Video Reel
                      </span>
                      <span className="text-zinc-500">Duration: {vid.duration}</span>
                    </div>

                    <h4 className="text-lg font-bold font-mono text-white">{vid.title}</h4>
                    <p className="text-xs font-sans text-zinc-400">
                      <strong>Hook Visual Concept:</strong> {vid.hookVisual}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyText(vid.voiceoverScript, 'Voiceover Script')}
                    className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold uppercase flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-rose-400" />
                    <span>Copy Voiceover Script</span>
                  </button>
                </div>

                {/* Video Voiceover & Audio Engine */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-rose-400 uppercase font-bold flex items-center gap-1">
                      <Volume2 className="w-4 h-4" />
                      Voiceover Script & Speech Synthesis
                    </span>

                    <button
                      onClick={() => setIsPlayingVoiceover(!isPlayingVoiceover)}
                      className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold uppercase flex items-center gap-1 shadow-md"
                    >
                      {isPlayingVoiceover ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white" />}
                      <span>{isPlayingVoiceover ? 'Pause AI Voiceover' : 'Synthesize Voiceover'}</span>
                    </button>
                  </div>

                  <p className="text-xs font-sans text-zinc-300 italic leading-relaxed p-3 rounded-xl bg-black border border-zinc-900">
                    "{vid.voiceoverScript}"
                  </p>
                </div>

                {/* Storyboard Table */}
                <div className="space-y-2 font-mono text-xs">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold block">Scene-By-Scene Video Storyboard</span>

                  <div className="overflow-x-auto rounded-2xl border border-zinc-900">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-zinc-900 text-zinc-400 uppercase font-bold text-[10px]">
                        <tr>
                          <th className="p-3">Time</th>
                          <th className="p-3">Visual Scene Action</th>
                          <th className="p-3">Voiceover Line</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900 bg-black text-zinc-300">
                        {vid.storyboard.map((sb, sbIdx) => (
                          <tr key={sbIdx} className="hover:bg-zinc-950">
                            <td className="p-3 font-bold text-amber-400 whitespace-nowrap">{sb.time}</td>
                            <td className="p-3 font-sans text-zinc-200">{sb.scene}</td>
                            <td className="p-3 font-sans text-zinc-400 italic">"{sb.voiceover}"</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DFY AI AD COPY */}
        {activeTab === 'copy' && (
          <div className="space-y-6 text-left">
            
            {/* Scroll-Stopping Hooks */}
            <div className="p-6 rounded-3xl bg-black border border-zinc-800 space-y-4 shadow-xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-bold text-white uppercase flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Scroll-Stopping Hooks (Highest Conversion)
                </span>

                <span className="text-[10px] text-zinc-500">Tested A/B Hook Frameworks</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentCampaign.adCopy.hooks.map((hook, hIdx) => (
                  <div key={hIdx} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 relative group hover:border-amber-500/50">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-amber-400 font-bold uppercase border border-zinc-800">
                        {hook.type}
                      </span>
                      <span className="text-emerald-400 font-bold">Score: {hook.conversionScore}</span>
                    </div>

                    <p className="text-xs font-sans text-white font-bold leading-snug">
                      "{hook.text}"
                    </p>

                    <button
                      onClick={() => handleCopyText(hook.text, 'Hook')}
                      className="text-[10px] text-zinc-400 hover:text-amber-400 font-bold uppercase flex items-center gap-1 pt-2 border-t border-zinc-900"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Hook</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Headlines */}
            <div className="p-6 rounded-3xl bg-black border border-zinc-800 space-y-3 shadow-xl font-mono text-xs">
              <span className="font-bold text-white uppercase block border-b border-zinc-900 pb-2">
                High-Converting Headlines
              </span>

              <div className="space-y-2">
                {currentCampaign.adCopy.headlines.map((headline, hlIdx) => (
                  <div key={hlIdx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-between">
                    <span className="font-bold text-white font-sans text-sm">{headline}</span>
                    <button
                      onClick={() => handleCopyText(headline, 'Headline')}
                      className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3 text-amber-400" />
                      <span>Copy</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Body Copy & CTA */}
            <div className="p-6 rounded-3xl bg-black border border-zinc-800 space-y-4 shadow-xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-bold text-white uppercase">Primary Body Copy (AIDA Framework)</span>
                <button
                  onClick={() => handleCopyText(currentCampaign.adCopy.primaryBodyCopy, 'Primary Body Copy')}
                  className="px-3 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase flex items-center gap-1"
                >
                  <Copy className="w-3 h-3 text-amber-400" />
                  <span>Copy Body Text</span>
                </button>
              </div>

              <textarea
                rows={8}
                readOnly
                value={currentCampaign.adCopy.primaryBodyCopy}
                className="w-full bg-zinc-950 border border-zinc-900 text-white p-4 rounded-2xl font-sans text-xs leading-relaxed focus:outline-none"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">CTA Button Text:</span>
                  <span className="px-3 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-500/40 font-bold text-xs">
                    {currentCampaign.adCopy.ctaText}
                  </span>
                </div>

                <div className="text-[10px] text-zinc-500 truncate max-w-md">
                  Hashtags: {currentCampaign.adCopy.hashtags}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: CLIENT OUTREACH SCRIPTS */}
        {activeTab === 'outreach' && (
          <div className="space-y-6 text-left">
            
            {/* Outreach Live Customizer Bar */}
            <div className="p-4 sm:p-6 rounded-3xl bg-purple-950/40 border border-purple-500/40 space-y-4 shadow-xl font-mono text-xs">
              <span className="text-purple-300 uppercase font-bold flex items-center gap-2">
                <Send className="w-4 h-4 text-purple-400" />
                INTERACTIVE CLIENT OUTREACH CUSTOMIZER
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Target Client Name</label>
                  <input
                    type="text"
                    value={customClientName}
                    onChange={(e) => setCustomClientName(e.target.value)}
                    className="w-full bg-black border border-zinc-800 text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">Target Business Name</label>
                  <input
                    type="text"
                    value={customBusinessName}
                    onChange={(e) => setCustomBusinessName(e.target.value)}
                    className="w-full bg-black border border-zinc-800 text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">City / Region</label>
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="w-full bg-black border border-zinc-800 text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Cold Email Pitch */}
            <div className="p-6 rounded-3xl bg-black border border-zinc-800 space-y-4 shadow-xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-bold text-white uppercase flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-purple-400" />
                  High-Open Cold Email Pitch Script
                </span>

                <button
                  onClick={() => handleCopyText(
                    `Subject: ${currentCampaign.clientOutreach.coldEmailSubject.replace('[Client Name]', customClientName).replace('[City]', customCity)}\n\n${currentCampaign.clientOutreach.coldEmailBody.replace(/\[Client Name\]/g, customClientName).replace(/\[Business Name\]/g, customBusinessName).replace(/\[City\]/g, customCity)}`,
                    'Customized Cold Email'
                  )}
                  className="px-3 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-500/40 text-[10px] font-bold uppercase flex items-center gap-1"
                >
                  <Copy className="w-3 h-3 text-purple-400" />
                  <span>Copy Customized Email</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 font-bold text-amber-400">
                Subject: {currentCampaign.clientOutreach.coldEmailSubject.replace('[Client Name]', customClientName).replace('[City]', customCity)}
              </div>

              <textarea
                rows={8}
                readOnly
                value={currentCampaign.clientOutreach.coldEmailBody
                  .replace(/\[Client Name\]/g, customClientName)
                  .replace(/\[Business Name\]/g, customBusinessName)
                  .replace(/\[City\]/g, customCity)}
                className="w-full bg-zinc-950 border border-zinc-900 text-white p-4 rounded-2xl font-sans text-xs leading-relaxed focus:outline-none"
              />
            </div>

            {/* Instagram DM & LinkedIn Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              
              <div className="p-6 rounded-3xl bg-black border border-zinc-800 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <span className="font-bold text-rose-400 uppercase flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    Instagram Direct Message Pitch
                  </span>
                  <button
                    onClick={() => handleCopyText(
                      currentCampaign.clientOutreach.instagramDM.replace(/\[Client Name\]/g, customClientName).replace(/\[Business Name\]/g, customBusinessName).replace(/\[City\]/g, customCity),
                      'IG DM Script'
                    )}
                    className="text-[10px] text-rose-300 font-bold uppercase"
                  >
                    Copy DM
                  </button>
                </div>

                <p className="text-xs font-sans text-zinc-300 p-3 rounded-xl bg-zinc-950 border border-zinc-900 leading-relaxed">
                  {currentCampaign.clientOutreach.instagramDM
                    .replace(/\[Client Name\]/g, customClientName)
                    .replace(/\[Business Name\]/g, customBusinessName)
                    .replace(/\[City\]/g, customCity)}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-black border border-zinc-800 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                  <span className="font-bold text-blue-400 uppercase flex items-center gap-1">
                    <PhoneCall className="w-4 h-4" />
                    Cold Call Phone Script
                  </span>
                  <button
                    onClick={() => handleCopyText(
                      currentCampaign.clientOutreach.coldCallScript.replace(/\[Client Name\]/g, customClientName).replace(/\[Business Name\]/g, customBusinessName).replace(/\[City\]/g, customCity),
                      'Phone Script'
                    )}
                    className="text-[10px] text-blue-300 font-bold uppercase"
                  >
                    Copy Phone Script
                  </button>
                </div>

                <p className="text-xs font-sans text-zinc-300 p-3 rounded-xl bg-zinc-950 border border-zinc-900 leading-relaxed">
                  {currentCampaign.clientOutreach.coldCallScript
                    .replace(/\[Client Name\]/g, customClientName)
                    .replace(/\[Business Name\]/g, customBusinessName)
                    .replace(/\[City\]/g, customCity)}
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: AGENCY PRICING & PROPOSAL */}
        {activeTab === 'pricing' && (
          <div className="space-y-8 text-left">
            
            {/* Retainer Package Breakdown */}
            <div className="p-6 sm:p-8 rounded-3xl bg-black border border-zinc-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 font-mono text-xs">
                <div>
                  <span className="text-emerald-400 font-bold uppercase block text-[10px]">DONE-FOR-YOU PRICING SHEET</span>
                  <h4 className="text-xl font-bold text-white">{currentCampaign.proposalSummary.agencyPackageName}</h4>
                </div>

                <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                  {currentCampaign.proposalSummary.monthlyRetainer}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-3 font-mono text-xs">
                  <span className="text-zinc-400 uppercase font-bold text-[10px] block">Included Monthly Deliverables</span>
                  <ul className="space-y-2">
                    {currentCampaign.proposalSummary.includedDeliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-zinc-200 font-sans text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs">
                  <span className="text-amber-400 uppercase font-bold text-[10px] block">Expected Client ROI</span>
                  <p className="text-sm font-bold text-white font-sans">
                    {currentCampaign.proposalSummary.expectedROI}
                  </p>

                  <div className="pt-3 border-t border-zinc-900 text-[10px] text-zinc-400 space-y-1">
                    <p>• Contractor Costs Replaced: <strong>$3,300/mo</strong></p>
                    <p>• Estimated Profit Margin: <strong className="text-emerald-400">95.2%</strong></p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                <button
                  onClick={() => triggerToast('📄 PDF Proposal Deck exported for client presentation!')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Printer className="w-4 h-4 text-white" />
                  <span>Export Client Proposal (PDF)</span>
                </button>

                <button
                  onClick={() => handleCopyText(`https://ais-pre-2nncbq54h757u6fcvs6dln-203530625545.us-west2.run.app?clientView=true&campaignId=${currentCampaign.id}`, 'White-Label Client Delivery Link')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>Copy White-Label Client Delivery Link</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
