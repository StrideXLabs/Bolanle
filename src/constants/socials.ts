// FILLED ICONS
import instagram from '../assets/images/filled/instagram.png';
import twitter from '../assets/images/filled/twitter.png';
import youtube from '../assets/images/filled/youtube.png';
import cashApp from '../assets/images/filled/cash-app.png';
import discord from '../assets/images/filled/discord.png';
import facebook from '../assets/images/filled/facebook.png';
import github from '../assets/images/filled/github.png';
import skype from '../assets/images/filled/skype.png';
import snapchat from '../assets/images/filled/snapchat.png';
import telegram from '../assets/images/filled/telegram.png';
import tikTok from '../assets/images/filled/tik-tok.png';
import twitch from '../assets/images/filled/twitch.png';
import venmo from '../assets/images/filled/venmo.png';
import yelp from '../assets/images/filled/yelp.png';
import whatsapp from '../assets/images/filled/whatsapp.png';
import calendly from '../assets/images/filled/calendly.png';
import linkedin from '../assets/images/filled/linkedin.png';
import paypal from '../assets/images/filled/paypal.png';
import signal from '../assets/images/filled/signal.png';

// FILLED ICONS
import instagramUnfilled from '../assets/images/unfilled/instagram.png';
import twitterUnfilled from '../assets/images/unfilled/twitter.png';
import youtubeUnfilled from '../assets/images/unfilled/youtube.png';
import cashAppUnfilled from '../assets/images/unfilled/cash-app.png';
import discordUnfilled from '../assets/images/unfilled/discord.png';
import facebookUnfilled from '../assets/images/unfilled/facebook.png';
import githubUnfilled from '../assets/images/unfilled/github.png';
import skypeUnfilled from '../assets/images/unfilled/skype.png';
import snapchatUnfilled from '../assets/images/unfilled/snapchat.png';
import telegramUnfilled from '../assets/images/unfilled/telegram.png';
import tikTokUnfilled from '../assets/images/unfilled/tik-tok.png';
import twitchUnfilled from '../assets/images/unfilled/twitch.png';
import venmoUnfilled from '../assets/images/unfilled/venmo.png';
import yelpUnfilled from '../assets/images/unfilled/yelp.png';
import whatsappUnfilled from '../assets/images/unfilled/whatsapp.png';
import calendlyUnfilled from '../assets/images/unfilled/calendly.png';
import linkedinUnfilled from '../assets/images/unfilled/linkedin.png';
import paypalUnfilled from '../assets/images/unfilled/paypal.png';
import signalUnfilled from '../assets/images/unfilled/signal.png';

export interface ISocial {
  title: string;
  id: SocialLinkType;
}

export type SocialLinkType =
  | 'linkedin'
  | 'instagram'
  | 'twitter'
  | 'facebook'
  | 'youtube'
  | 'snapchat'
  | 'tikTok'
  | 'github'
  | 'yelp'
  | 'venmo'
  | 'cashApp'
  | 'discord'
  | 'skype'
  | 'telegram'
  | 'twitch'
  | 'whatsapp'
  | 'calendly'
  | 'paypal'
  | 'signal';

export const unFilledIconsMapping = {
  calendly: calendlyUnfilled,
  cashApp: cashAppUnfilled,
  discord: discordUnfilled,
  facebook: facebookUnfilled,
  github: githubUnfilled,
  instagram: instagramUnfilled,
  linkedin: linkedinUnfilled,
  paypal: paypalUnfilled,
  signal: signalUnfilled,
  skype: skypeUnfilled,
  snapchat: snapchatUnfilled,
  telegram: telegramUnfilled,
  tikTok: tikTokUnfilled,
  twitch: twitchUnfilled,
  twitter: twitterUnfilled,
  venmo: venmoUnfilled,
  whatsapp: whatsappUnfilled,
  yelp: yelpUnfilled,
  youtube: youtubeUnfilled,
} as {[key in SocialLinkType]: string};

export const filledIconsMapping = {
  calendly,
  cashApp,
  discord,
  facebook,
  github,
  instagram,
  linkedin,
  paypal,
  signal,
  skype,
  snapchat,
  telegram,
  tikTok,
  twitch,
  twitter,
  venmo,
  whatsapp,
  yelp,
  youtube,
} as {[key in SocialLinkType]: string};

export const SocialItemsList = [
  {id: 'linkedin', title: 'Linkedin'},
  {id: 'instagram', title: 'Instagram'},
  {id: 'twitter', title: 'Twitter'},
  {id: 'calendly', title: 'Calendly'},
  {id: 'facebook', title: 'Facebook'},
  {id: 'youtube', title: 'YouTube'},
  {id: 'whatsapp', title: 'WhatsApp'},
  {id: 'snapchat', title: 'Snapchat'},
  {id: 'tikTok', title: 'Tik Tok'},
  {id: 'github', title: 'Github'},
  {id: 'yelp', title: 'Yelp'},
  {id: 'venmo', title: 'Venmo'},
  {id: 'paypal', title: 'Paypal'},
  {id: 'cashApp', title: 'Cash App'},
  {id: 'discord', title: 'Discord'},
  {id: 'signal', title: 'Signal'},
  {id: 'skype', title: 'Skype'},
  {id: 'telegram', title: 'Telegram'},
  {id: 'twitch', title: 'Twitch'},
] as ISocial[];

export const socialMappings = {
  cashApp: 'Cash App',
  discord: 'Discord',
  facebook: 'Facebook',
  github: 'Github',
  instagram: 'Instagram',
  linkedin: 'Linkedin',
  skype: 'Skype',
  snapchat: 'Snapchat',
  telegram: 'Telegram',
  tikTok: 'Tik Tok',
  twitch: 'Twitch',
  twitter: 'Twitter',
  venmo: 'Venmo',
  yelp: 'Yelp',
  youtube: 'YouTube',
  calendly: 'Calendly',
  paypal: 'Paypal',
  signal: 'Signal',
  whatsapp: 'WhatsApp',
} as {[key in SocialLinkType]: string};
