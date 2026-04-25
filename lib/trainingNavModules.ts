/** Cards shown on the training home grid and the module-page explorer (same order and copy). */
export interface TrainingNavModule {
  slug: string;
  title: string;
  /** One-line purpose for the bottom-of-lesson module list (keep short). */
  purposeLine: string;
  storyTitle: string;
  description: string;
  buttonLabel: string;
  image: string;
  icon: null;
}

export const TRAINING_NAV_MODULES: TrainingNavModule[] = [
  {
    slug: "getting-comfortable",
    title: "Module 1: Getting Comfortable with Your Device",
    purposeLine: "Easier reading, simple gestures, and undoing mistakes.",
    storyTitle: "Making the Screen Work for You",
    description:
      "Font size, gestures, and what to do when you make a mistake. Learn to use your device without fear.",
    buttonLabel: "Start Learning",
    image: "/arthur-accessibility.png",
    icon: null,
  },
  {
    slug: "first-line-of-defence",
    title: "Module 2: Your First Line of Defence",
    purposeLine: "Lock the screen and use PIN, pattern, or biometrics.",
    storyTitle: "Screen Lock & Biometrics",
    description:
      "Why screen lock matters, PINs vs. patterns, Face ID, and what to do if your phone is lost.",
    buttonLabel: "Lock Your Device",
    image: "/elena-security.png",
    icon: null,
  },
  {
    slug: "two-factor-auth",
    title: "Module 3: Two-Factor Authentication (2FA)",
    purposeLine: "Add a second step so a password alone is not enough.",
    storyTitle: "The Double Lock",
    description:
      "Add a second lock to your accounts. Learn what 2FA is, how to set it up, and backup codes.",
    buttonLabel: "Add 2FA",
    image: "/two-factor-auth.png",
    icon: null,
  },
  {
    slug: "app-permissions",
    title: "Module 4: App Permissions & Safety",
    purposeLine: "Decide what apps may access on your phone.",
    storyTitle: "When to Say Yes or No",
    description:
      "What app permissions are, the six key permissions, and how to spot app store red flags.",
    buttonLabel: "Check Permissions",
    image: "/app-permissions.png",
    icon: null,
  },
  {
    slug: "software-updates",
    title: "Module 5: Software Updates & Habits",
    purposeLine: "Keep software current and build a small monthly habit.",
    storyTitle: "The Monthly Safety Routine",
    description:
      "Why updates matter, how to check for them, automatic updates, and the monthly safety checklist.",
    buttonLabel: "Start the Routine",
    image: "/software-updates.png",
    icon: null,
  },
  {
    slug: "scams-phishing",
    title: "Module 6: Recognising Scams & Phishing",
    purposeLine: "Recognise dodgy messages and pause before you act.",
    storyTitle: "The PAUSE Method",
    description:
      "Common scams, the PAUSE method, and what to do if you spot a suspicious message.",
    buttonLabel: "Spot the Scam",
    image: "/scams-phishing.png",
    icon: null,
  },
  {
    slug: "public-wifi-browsing",
    title: "Module 7: Public Wi-Fi & Safe Browsing",
    purposeLine: "Use public Wi-Fi and the web a little more safely.",
    storyTitle: "Browse Safely Away from Home",
    description:
      "Public Wi-Fi risks, recognising secure websites, and what a VPN is.",
    buttonLabel: "Browse Safely",
    image: "/public-wifi-browsing.png",
    icon: null,
  },
  {
    slug: "caches-cookies-clutter",
    title: "Module 8: Caches, Cookies & Digital Clutter",
    purposeLine: "Clear stored data and tidy your browsing trail.",
    storyTitle: "Clear the Clutter",
    description:
      "What a cache is, clearing cookies and history, and private browsing mode.",
    buttonLabel: "Clear Clutter",
    image: "/caches-cookies-clutter.png",
    icon: null,
  },
];
