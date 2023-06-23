import instagram from '../assets/images/instagram.png';
import twitter from '../assets/images/twitter.png';
import youtube from '../assets/images/youtube.png';
import cashApp from '../assets/images/cash-app.png';
import discord from '../assets/images/discord.png';
import facebook from '../assets/images/facebook.png';
import github from '../assets/images/github.png';
import skype from '../assets/images/skype.png';
import snapchat from '../assets/images/snapchat.png';
import telegram from '../assets/images/telegram.png';
import tikTok from '../assets/images/tik-tok.png';
import twitch from '../assets/images/twitch.png';
import venmo from '../assets/images/venmo.png';
import yelp from '../assets/images/yelp.png';

import whatsapp from '../assets/images/whatsapp.png';
import calendly from '../assets/images/calendly.png';
import linkedin from '../assets/images/linkedin.png';
import paypal from '../assets/images/paypal.png';
import signal from '../assets/images/signal.png';

export interface ISocial {
  image: string;
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

const SOCIALS = [
  {id: 'linkedin', image: linkedin, title: 'Linkedin'},
  {id: 'instagram', image: instagram, title: 'Instagram'},
  {id: 'twitter', image: twitter, title: 'Twitter'},
  {id: 'calendly', image: calendly, title: 'Calendly'},
  {id: 'facebook', image: facebook, title: 'Facebook'},
  {id: 'youtube', image: youtube, title: 'YouTube'},
  {id: 'whatsapp', image: whatsapp, title: 'WhatsApp'},
  {id: 'snapchat', image: snapchat, title: 'Snapchat'},
  {id: 'tikTok', image: tikTok, title: 'Tik Tok'},
  {id: 'github', image: github, title: 'Github'},
  {id: 'yelp', image: yelp, title: 'Yelp'},
  {id: 'venmo', image: venmo, title: 'Venmo'},
  {id: 'paypal', image: paypal, title: 'Paypal'},
  {id: 'cashApp', image: cashApp, title: 'Cash App'},
  {id: 'discord', image: discord, title: 'Discord'},
  {id: 'signal', image: signal, title: 'Signal'},
  {id: 'skype', image: skype, title: 'Skype'},
  {id: 'telegram', image: telegram, title: 'Telegram'},
  {id: 'twitch', image: twitch, title: 'Twitch'},
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

export default SOCIALS;
