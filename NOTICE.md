# Hugin

Hugin is a fork of **Mustang** (https://github.com/mustang-im/mustang),
© Ben Bucksch, Mustang GmbH, Beonex GmbH and others, licensed under the
**EUPL-1.2**. This fork remains under the EUPL-1.2.

## Changes in this fork
- Removed the proprietary components that are **not** covered by the EUPL and
  which we have no license to redistribute: **Exchange support** (EWS/OWA/MS
  Graph/ActiveSync), **Web Mail**, and **Meet** (video). These were stripped
  from the working tree **and from the full git history**.
- Disabled the proprietary build flag (`includeProprietary = false`).
- Removed the upstream telemetry (Sentry runtime init + build source-map upload).
- Rebranded application identity (name/appId) to Hugin. Upstream copyright and
  attribution notices are retained as required by the license.

Full upstream source and history for the EUPL-licensed parts:
https://github.com/mustang-im/mustang

This product is not affiliated with or endorsed by Mustang GmbH.
