/**
 * Solutrix branding for Hugin.
 *
 * When `solutrixOnly` is true, account setup is reduced to a single
 * "Sign in with Solutrix" step: OIDC (PKCE) against the Solutrix identity
 * provider, then a JMAP account against the public Solutrix JMAP endpoint.
 * The generic Mustang setup flow (autoconfig, IMAP/POP3, manual config)
 * stays in the codebase behind this flag, for other/multiple accounts later.
 *
 * Only public endpoints belong here — this repository is public.
 */
import { JMAPAccount } from "../JMAP/JMAPAccount";
import { newAccountForProtocol } from "../AccountsList/MailAccounts";
import { AuthMethod } from "../../Abstract/Account";
import { getOAuth2BuiltIn } from "../../Auth/OAuth2Util";
import type { OAuth2 } from "../../Auth/OAuth2";
import { OAuth2UIMethod } from "../../Auth/UI/OAuth2UIMethod";
import { assert } from "../../util/util";

/** Reduce the welcome/setup flow to Solutrix sign-in only. */
export const solutrixOnly = true;

/** Public JMAP session endpoint (RFC 8620 Session resource). */
export const solutrixJMAPURL = "https://jmap.solutrix.io/.well-known/jmap";

/**
 * A ready-to-login Solutrix mail account: JMAP + OAuth2 (PKCE) via the
 * Solutrix IdP. The email address is not known yet — it comes from the JMAP
 * Session (`session.username`) after the interactive login.
 */
export function makeSolutrixConfig(): JMAPAccount {
  let config = newAccountForProtocol("jmap") as JMAPAccount;
  config.name = "Solutrix";
  config.url = solutrixJMAPURL;
  config.source = "builtin";
  config.authMethod = AuthMethod.OAuth2;
  let oAuth2 = getOAuth2BuiltIn(config) as OAuth2;
  assert(oAuth2, "Solutrix OAuth2 config not found in OAuth2URLs");
  // Desktop: system browser + loopback redirect (RFC 8252).
  oAuth2.uiMethod = OAuth2UIMethod.SystemBrowser;
  // The address is only known after login. Set it from the id_token during the
  // token exchange (before storeRefreshToken), so the refresh token is keyed by
  // the real address and survives restarts. The JMAP Session is the authority
  // for the account address afterwards; this is only for the token storage key.
  oAuth2.idTokenCallback = (idToken) => {
    try {
      let b64 = idToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      let claims = JSON.parse(atob(b64));
      let address = claims.email ?? claims.preferred_username;
      if (address) config.username = address;
    } catch (ex) {
      console.error("Solutrix: could not read address from id_token", ex);
    }
  };
  config.oAuth2 = oAuth2;
  return config;
}
