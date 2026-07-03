# Hugin

**Hugin** is a cross-platform, local-first email, calendar and contacts client
for Linux, Windows, macOS, Android and iOS — written entirely in TypeScript and
Svelte, running on Electron (desktop) and Capacitor (mobile).

Hugin is a fork of **[Mustang](https://github.com/mustang-im/mustang)**
(© Ben Bucksch, Mustang GmbH, Beonex GmbH and others), licensed under the
**EUPL-1.2**. See [`NOTICE.md`](NOTICE.md) for what this fork changes and the
attribution it retains. This product is not affiliated with or endorsed by
Mustang GmbH.

Data is stored and processed **locally** — nothing passes through a server or
cloud beyond your own mail/calendar servers. The codebase keeps a strict
separation between logic (`app/logic`) and UI (`app/frontend`).

## Supported protocols (open standards only)

- **Mail:** [JMAP](https://datatracker.ietf.org/doc/html/rfc8621),
  [IMAP4rev2](https://www.ietf.org/rfc/rfc9051.html) (incl. SPECIAL-USE,
  CONDSTORE/MODSEQ, ACL), [SMTP](https://datatracker.ietf.org/doc/html/rfc5321),
  POP3
- **Calendar:** JMAP (JSCalendar), CalDAV, iCalendar (RFC 5545) with recurrence
  and iTIP invitations
- **Contacts:** JMAP (JSContact), CardDAV, vCard
- **Encryption:** OpenPGP and S/MIME

## Removed from this fork

The proprietary components of upstream Mustang — which are **not** covered by the
EUPL and which we have no license to redistribute — are removed from the working
tree and from the full git history:

- **Exchange** support (EWS / OWA / MS Graph / ActiveSync)
- **Web Mail**
- **Meet** (video conferencing)

The proprietary build flag is disabled (`includeProprietary = false` in
`app/logic/build.ts`).

## Repository layout

| Path | What |
|------|------|
| `app/` | Shared Svelte + TypeScript app (logic + UI), built with Vite |
| `desktop/` | Electron shell (electron-builder → Linux / Windows / macOS) |
| `mobile/` | Capacitor shell (Android / iOS) |
| `lib/` | Shared utilities |

## Build (desktop)

```bash
cd app        && yarn install
cd ../desktop && yarn install
yarn dev            # run locally
yarn build:linux   # -> Linux installers (AppImage/deb) via electron-builder
# yarn build:win  /  yarn build:mac
```

## License

**EUPL-1.2** — see [`LICENSE`](LICENSE). Modifications are distributed under the
same license; source (including git history) is published here as required.
