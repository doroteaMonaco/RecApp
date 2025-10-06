import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { findUserByEmail, createUser } from '../models/userModel.js';
import { findAccountByProvider, linkOAuthAccountByEmail } from '../models/accountModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google OAuth profile:', profile.displayName, profile.emails);
      // Estrai l'email in modo sicuro
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      const name = profile.displayName;
      const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
      const provider = 'google';
      const providerId = profile.id;

      if (!email) {
        console.log('Email non disponibile nel profilo Google');
        return done(new Error('Email non disponibile dal profilo Google'), null);
      }

      // Cerca se esiste già un account OAuth collegato
      let account = await findAccountByProvider(provider, providerId);

      if (account) {
        // Account esiste, trova l'utente associato
        const user = await findUserByEmail(account.userEmail);
        return done(null, user);
      }

      // Cerca se esiste un utente con questa email
      let user = await findUserByEmail(email);

      if (!user) {
        // Crea nuovo utente
        user = await createUser({
          email,
          name,
          password: null, // OAuth users don't have passwords
          avatar
        });
      }

      // Collega l'account OAuth all'utente
      await linkOAuthAccountByEmail({
        userId: user.id,
        provider,
        providerAccountId: providerId,
        accessToken,
        refreshToken
      });

      return done(null, user);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, null);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Per GitHub, l'email potrebbe non essere disponibile nei profili pubblici
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.local`;
      const name = profile.displayName || profile.username;
      const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
      const provider = 'github';
      const providerId = profile.id;

      // Cerca se esiste già un account OAuth collegato
      let account = await findAccountByProvider(provider, providerId);

      if (account) {
        // Account esiste, trova l'utente associato
        const user = await findUserByEmail(account.userEmail);
        return done(null, user);
      }

      // Cerca se esiste un utente con questa email
      let user = await findUserByEmail(email);

      if (!user) {
        // Crea nuovo utente
        user = await createUser({
          email,
          name,
          password: null, // OAuth users don't have passwords
          avatar
        });
      }

      // Collega l'account OAuth all'utente
      await linkOAuthAccountByEmail({
        userId: user.id,
        provider,
        providerAccountId: providerId,
        accessToken,
        refreshToken
      });

      return done(null, user);
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      return done(error, null);
    }
}));

// Serializzazione dell'utente per la sessione
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;