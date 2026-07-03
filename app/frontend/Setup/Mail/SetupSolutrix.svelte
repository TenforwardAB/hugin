<vbox flex class="solutrix-login">
  <Header title={$t`Sign in to Solutrix`}
    subtitle={$t`Your mail, calendar and contacts — one login`} />
  {#if running}
    <vbox class="waiting">
      <Spinner size="64px" />
      <hbox class="text">
        {$t`Waiting for you to complete the login in your browser`}
      </hbox>
    </vbox>
  {:else}
    <vbox class="start">
      <Button label={$t`Sign in with Solutrix`} classes="large filled"
        onClick={() => catchErrors(startLogin, onFailed)}
        />
    </vbox>
  {/if}
</vbox>

<script lang="ts">
  import { makeSolutrixConfig } from "../../../logic/Mail/Solutrix/solutrix";
  import type { MailAccount } from "../../../logic/Mail/MailAccount";
  import Header from "../Shared/Header.svelte";
  import Button from "../../Shared/Button.svelte";
  import Spinner from "../../Shared/Spinner.svelte";
  import { catchErrors } from "../../Util/error";
  import { t } from "../../../l10n/l10n";

  /** The account being set up. Set by this component after a successful login. */
  export let config: MailAccount = null;
  /** Called after the OAuth2 login and JMAP session succeeded.
   * `config.session.username` then holds the account's email address. */
  export let onSucceeded = () => undefined;
  export let onError = (ex: Error) => undefined;

  let running = false;

  async function startLogin() {
    running = true;
    try {
      config = makeSolutrixConfig();
      // Interactive OIDC (PKCE) in the system browser, then fetch the JMAP
      // session — same verification the generic flow runs in CheckConfig.
      await config.verifyLogin();
      onSucceeded();
    } catch (ex) {
      running = false;
      throw ex;
    }
  }

  function onFailed(ex: Error) {
    running = false;
    onError(ex);
  }
</script>

<style>
  .solutrix-login {
    justify-content: center;
  }
  .start {
    margin-block-start: 24px;
    align-items: center;
  }
  .waiting {
    margin-block-start: 24px;
    align-items: center;
  }
  .waiting .text {
    margin-block-start: 16px;
    font-weight: 300;
  }
</style>
